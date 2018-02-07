const Promise = require('bluebird');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
const traverse = require('traverse');
import _ from 'lodash';
const rp = require('request-promise');
import { JSDOM } from 'jsdom';

import { getRepoLastDate } from './githubDates';

const tree = traverse(source);
const repos = {};
tree.map(function(node) {
  if (!node) {
    return;
  }
  if (node.item !== null) {
    return;
  }
  if (node.repo_url && node.repo_url.indexOf('https://github.com') === 0) {
    repos[node.repo_url] = node.branch || 'master';
  } /* else {
    if (!node.repo_url) {
      console.info(`item: ${node.name} has no repo url`)
    } else {
      console.info(`item: ${node.name} has a non github repo url`)
    }
  } */
});
const urls = _.keys(repos);

const result = [];
async function readGithubStats() {
  await Promise.map(urls, async function(url) {
    if (url.split('/').length !==  5 || !url.split('/')[4]) {
      result.push({url, stars: 'N/A', license: 'Unknown License'});
      console.info(url, ' does not look like a GitHub repo');
      return;
    }
    const repo = url.split('/').slice(3,5).join('/');
    var response = await rp({
      uri: url,
      followRedirect: true,
      simple: true
    });
    const dom = new JSDOM(response);
    const doc = dom.window.document;
    var stars = 'N/A';
    var license = 'Unknown License';
    const starsElement = doc.querySelector('.js-social-count');
    if (starsElement) {
      stars = +starsElement.textContent.replace(/,/g,'');
    }
    const licenseElement = doc.querySelector('.octicon-law');
    if (stars !== 'N/A' && licenseElement) {
      license = licenseElement.nextSibling.textContent.replace(/\n/g, '').trim();
    }
    const descriptionElement = doc.querySelector('.repository-meta-content > [itemprop="about"]');
    var description = '';
    if (descriptionElement) {
      description = descriptionElement.textContent.replace(/\n/g, '').trim();
    }
    var date;
    try {
      const branch = repos[url];
      date = await getRepoLastDate({repo, branch });
    } catch (ex) {
      console.info ('can not fetch last date for ', repo);
    }
    result.push({url, stars, license, description, latest_commit_date: date});
    await Promise.delay(1 * 1000);
  }, {concurrency: 20});_


}
async function main() {
  await readGithubStats();
  require('fs').writeFileSync('src/github.json', JSON.stringify(_.orderBy(result, 'url'), null, 2));
}
main();
