const Promise = require('bluebird');
const traverse = require('traverse');
import fs from 'fs';
import _ from 'lodash';

import { getRepoStartDate } from './githubDates';

export async function extractSavedStartDateEntries() {
  const result = [];
  const traverse = require('traverse');
  let source = [];
  try {
    source =  require('js-yaml').safeLoad(fs.readFileSync('processed_landscape.yml'));
  } catch(_ex) {
    console.info('Can not extract github entries from the processed_landscape.yml');
  }
  const tree = traverse(source);
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.github_start_commit_data) {
      result.push({...node.github_start_commit_data, repo_url: node.repo_url});
    }
  });
  return result;
}

async function getGithubRepos() {
  const source =  require('js-yaml').safeLoad(fs.readFileSync('landscape.yml'));
  const tree = traverse(source);
  const repos = [];
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.item !== null) {
      return;
    }
    if (node.repo_url && node.repo_url.indexOf('https://github.com') === 0) {
      repos.push({
        url: node.repo_url,
        branch: node.branch || 'master'
      });
    } /* else {
      if (!node.repo_url) {
        console.info(`item: ${node.name} has no repo url`)
      } else {
        console.info(`item: ${node.name} has a non github repo url`)
      }
    } */
  });
  return _.uniq(repos);
}

export async function fetchStartDateEntries({cache, preferCache}) {
  const repos = await getGithubRepos();
  return await Promise.map(repos, async function(repo) {
    const cachedEntry = _.find(cache, {url: repo.repo_url});
    if (cachedEntry && preferCache) {
      return cachedEntry;
    }
    await Promise.delay(1 * 1000);
    const url = repo.url;
    const branch  = repo.branch;
    if (url.split('/').length !==  5 || !url.split('/')[4]) {
      console.info(url, ' does not look like a GitHub repo');
      return;
    }
    const repoName = url.split('/').slice(3,5).join('/');
    try {
      const { date, commitLink } = await getRepoStartDate({repo: repoName, branch});
      return ({url: repo.repo_url, start_commit_link: commitLink, start_date: date});
    } catch (ex) {
      console.info ('can not fetch dates for ', url);
      console.info(ex);
      return cachedEntry || null;
    }
  }, {concurrency: 20});
}
