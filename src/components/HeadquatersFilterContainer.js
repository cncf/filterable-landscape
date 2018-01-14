import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Any'
}, {
  id: 'NY',
  label: 'NY'
}, {
  id: 'San Francisco',
  label: 'San Francisco'
}, {
  id: 'West Palm Beach',
  label: 'West Palm Beach'
}];

const mapStateToProps = (state) => ({
  value: state.main.filters.headquaters,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('headquaters', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
