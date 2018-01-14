import { connect } from 'react-redux';
import ComboboxMultiSelector from './ComboboxMultiSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: 'ycombinator',
  label: 'YCombinator'
}, {
  id: 'other1',
  label: 'Other Funder 1'
}, {
  id: 'other2',
  label: 'Other Funder 2'
}, {
  id: 'other3',
  label: 'Other Funder 3'
}];

const mapStateToProps = (state) => ({
  value: state.main.filters.vcFunder,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('vcFunder', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxMultiSelector);
