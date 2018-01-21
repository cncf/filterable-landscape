import fields from '../types/fields';
import _ from 'lodash';
export default function(field, id) {
  if (id === 'true') {
    id = true;
  }
  if (id === 'false') {
    id = false;
  }
  const values = fields[field].values
  const valueInfo = _.find(values, {id: id});
  console.info(valueInfo, field, id);
  return valueInfo.groupingLabel;
}
