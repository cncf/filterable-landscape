const Promise = require('bluebird');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('src/data.yml'));
const traverse = require('traverse');
import _ from 'lodash';
const rp = require('request-promise');
import { JSDOM } from 'jsdom';

const tree = traverse(source);
const repos = {};
tree.map(function(node) {
  if (node && node.item === null && node.repo_url && node.repo_url.indexOf('https://github.com') === 0) {
    repos[node.repo_url] = 1;
  }
});
const urls = _.keys(repos);

const result = [];
async function readGithubStats() {
  await Promise.map(urls, async function(url) {
    if (url.split('/').length !==  5 || !url.split('/')[4]) {
      result.push({url, stars: 'N/A', license: 'N/A'});
      console.info(url, ' looks like not a github repo');
      return;
    }
    var response = await rp({
      uri: url,
      followRedirect: true,
      simple: true
    });
    const dom = new JSDOM(response);
    const doc = dom.window.document;
    var stars = 'N/A';
    var license = 'N/A';
    const starsElement = doc.querySelector('.js-social-count');
    if (starsElement) {
      stars = +starsElement.textContent.replace(/,/g,'');
    }
    const licenseElement = doc.querySelector('.octicon-law');
    if (stars !== 'N/A' && licenseElement) {
      license = licenseElement.nextSibling.textContent.replace(/\n/g, '').trim();
    }
    result.push({url, stars, license});
    console.info(response.length, url, stars, license);

    await Promise.delay(1 * 1000);
  }, {concurrency: 5});_


}
async function main() {
  await readGithubStats();
  require('fs').writeFileSync('src/github.json', JSON.stringify(result, null, 2));
}
main();

console.info(_.keys(repos));
