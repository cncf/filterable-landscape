const Promise = require('bluebird');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
const traverse = require('traverse');
import fs from 'fs';
import _ from 'lodash';

import { getRepoStartDate } from './githubDates';
const existingDates = do {
  try {
    require('js-yaml').safeLoad(require('fs').readFileSync('src/github_dates.yml'));
  } catch (ex) { null; }
} || [];


const tree = traverse(source);
const entries = [];
tree.map(function(node) {
  if (!node) {
    return;
  }
  if (node.item !== null) {
    return;
  }
  if (node.repo_url && node.repo_url.indexOf('https://github.com') === 0) {
    entries.push({
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

const result = [];
async function readGithubStats() {
  await Promise.map(entries, async function(entry) {
    const url = entry.url;
    const branch  = entry.branch;
    if (url.split('/').length !==  5 || !url.split('/')[4]) {
      console.info(url, ' does not look like a GitHub repo');
      return;
    }
    const existingEntry = _.find(existingDates, {url: url});
    if (existingEntry) {
      result.push(existingEntry);
      // console.info('cached: ', existingEntry);
      return;
    }
    const repo = url.split('/').slice(3,5).join('/');
    try {
      const { date, commitLink } = await getRepoStartDate({repo, branch});
      result.push({url, start_commit_link: commitLink, start_date: date});
    } catch (ex) {
      console.info ('can not fetch dates for ', url);
      console.info(ex);
    }
    await Promise.delay(1 * 1000);
  }, {concurrency: 20});_
}
async function main() {
  await readGithubStats();
  var dump = require('js-yaml').dump(result);
  dump = "# THIS FILE IS GENERATED AUTOMATICALLY based on landscape.yml via babel-node tools/fetchGithubStartDate !\n" + dump;
  fs.writeFileSync('src/github_dates.yml', dump);
}
main();
