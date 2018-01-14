import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

import _ from 'lodash';

const getLandscapeList = createSelector(
  (state) => state.main.data,
  function(data) {
    const names = data.landscape.map((c) => c.name);
    return _.sortBy(names);
  }
);

const getOptions = createSelector(
  (state) => getLandscapeList(state),
  function(names) {
    return [{id: null, label: 'Any'}].concat(names.map((text) => ({id: text, label: text})))
  }
);


const mapStateToProps = (state) => ({
  value: state.main.filters.landscape,
  options: getOptions(state)
});
const onChange = function(newValue) {
  return changeFilter('landscape', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
