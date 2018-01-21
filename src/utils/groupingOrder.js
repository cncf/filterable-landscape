import fields from '../types/fields';
import _ from 'lodash';
export default function groupFn(field) {
  const values = fields[field].values;
  const sortedValues = _.orderBy(values, 'groupingSortOrder');
  return function(x) {
    if (x === 'true') {
      x = true;
    }
    if (x === 'false') {
      x = false;
    }
    return _.findIndex(sortedValues, {id: x});
  }
}
