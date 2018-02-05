const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
var dump = require('js-yaml').dump(source, {lineWidth: 160});
dump = dump.replace(/(- \w+:) null/g, '$1');
require('fs').writeFileSync('landscape.yml', dump);
