import process from 'process';
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
const traverse = require('traverse');
const _ = require('lodash');
import formatCity from '../src/utils/formatCity';
import { fetchImages } from './fetchImages';

import { getCrunchbaseOrganizationsList, fetchCrunchbaseEntries, extractSavedCrunchbaseEntries } from './crunchbase';

async function main() {

  const crunchbaseOrganizations = await getCrunchbaseOrganizationsList();
  var crunchbaseEntries;
  var savedCrunchbaseEntries = [];
  try {
    savedCrunchbaseEntries = await extractSavedCrunchbaseEntries();
  } catch (ex) {
    console.info('can not get saved crunchbase entries');
  }
  if (process.env.CRUNCHBASE_KEY) {
    crunchbaseEntries = await fetchCrunchbaseEntries(crunchbaseOrganizations);
  } else {
    console.info('CRUNCHBASE_KEY is not set. Using processed_landscape.yml as a source for crunchbase info');
    crunchbaseEntries = savedCrunchbaseEntries;
  }

  const githubEntries = require('../src/github.json');
  const dateEntries = require('js-yaml').safeLoad(require('fs').readFileSync('src/github_dates.yml'));
  const cncfMembers = require('js-yaml').safeLoad(require('fs').readFileSync('src/cncf_members.yml'));

  const tree = traverse(source);
  const newSource = tree.map(function(node) {
    if (node && node.item === null) {
      var crunchbaseInfo = _.find(crunchbaseEntries, {url: node.crunchbase});
      var crunchbaseData = {
        headquarters: 'N/A'
      };
      if (!crunchbaseInfo) {
        if (node.crunchbase) {
          crunchbaseInfo = _.find(savedCrunchbaseEntries, {url: node.crunchbase});
          if (crunchbaseInfo) {
            console.info(node.crunchbase, '    - using saved value ');
            crunchbaseData = crunchbaseInfo;
          } else {
            console.info('Probably an error - no info for ', node.crunchbase, node.organization, node.name);
          }
        } else {
          console.info('No crunchbase info',  node.organization, node.name);
        }
      } else {
        crunchbaseData = crunchbaseInfo;
      }
      delete crunchbaseData.url;
      node.headquarters = crunchbaseData.headquarters || formatCity(crunchbaseData);
      if (!node.headquarters) {
        node.headquarters='N/A';
      }
      if (crunchbaseData.twitter && !node.twitter) {
        console.info(`Warning: ${node.name} has no twitter but its crunchbase ${node.crunchbase} has a twitter: ${crunchbaseData.twitter}`);
      }
      node.description = node.description || crunchbaseData.description;
      node.organization = crunchbaseData.name || node.organization;
      var githubInfo = {
        stars: 'N/A',
        license: 'NotOpenSource'
      };
      var githubEntry = _.find(githubEntries, {url: node.repo_url});
      if (githubEntry) {
        githubInfo = {
          stars: githubEntry.stars,
          license: githubEntry.license,
          latest_commit_date: githubEntry.latest_commit_date,
          latest_commit_link: 'https://github.com' + githubEntry.latest_commit_link
        };
      }
      var dateEntry = _.find(dateEntries, {url: node.repo_url});
      if (dateEntry) {
        node.first_commit_date = dateEntry.start_date;
        node.first_commit_link = 'https://github.com' + dateEntry.start_commit_link;
      }
      var description = node.description || (githubEntry || {}).description || (crunchbaseInfo || {})['Description'] || '';
      description = description.replace(/\n/g, ' ');

      node.crunchbase_data = crunchbaseData;
      _.assign(node, githubInfo);
      node.description = description;
      node.cncf_member = cncfMembers.indexOf(node.organization) !== -1;
    }
  });
  await fetchImages(newSource);


  var dump = require('js-yaml').dump(newSource);
  dump = dump.replace(/(- \w+:) null/g, '$1');
  dump = "# THIS FILE IS GENERATED AUTOMATICALLY!\n" + dump;
  require('fs').writeFileSync('processed_landscape.yml', dump);
}
main();
