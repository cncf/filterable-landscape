import _ from 'lodash';
export default function(v) {
  if (_.isString(v)) {
    return v;
  }
  if (v < 1000000) {
    return '$' + Math.round(v / 1000) + 'K';
  } else {
    return '$' + Math.round(v / 1000 / 1000) + 'M';
  }
}
