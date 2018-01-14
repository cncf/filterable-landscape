import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeSortField } from '../reducers/mainReducer.js';

const options = [{
  id: 'name',
  label: 'Alphabetical'
}, {
  id: 'marketCap',
  label: 'Market Cap'
}, {
  id: 'stars',
  label: 'Stars'
}, {
  id: 'startDate',
  label: 'Date project started'
}];

const mapStateToProps = (state) => ({
  value: state.main.sortField,
  options: options
});
const onChange = function(newValue) {
  return changeSortField(newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
