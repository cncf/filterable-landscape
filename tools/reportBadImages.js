const traverse = require('traverse');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('processed_landscape.yml'));
const tree = traverse(source);
tree.map(function(node) {
  if (node && node.low_res) {
    console.info(`Item ${node.name} of ${node.organization} has a low resolution image: ${node.low_res}`);
    return;
  }
});
