import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ComboboxMultiSelector from './ComboboxMultiSelector';
import { changeFilter } from '../reducers/mainReducer.js';
import _ from 'lodash';

const getCompanies = createSelector(
  (state) => state.main.data,
  function(data) {
    return _.uniq(_.sortBy(_.map(data, 'company')));
  }
);

const getOptions = createSelector(
  (state) => getCompanies(state),
  function(companies) {
    return companies.map((text) => ({id: text, label: text}))
  }
);


const mapStateToProps = (state) => ({
  value: state.main.filters.company,
  options: getOptions(state)
});
const onChange = function(newValue) {
  return changeFilter('company', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxMultiSelector);
