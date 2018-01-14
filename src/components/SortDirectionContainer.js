import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeSortDirection } from '../reducers/mainReducer.js';

const options = [{
  id: 'asc',
  label: 'Asc'
}, {
  id: 'desc',
  label: 'Desc'
}];

const mapStateToProps = (state) => ({
  value: state.main.sortDirection,
  options: options
});
const onChange = function(newValue) {
  return changeSortDirection(newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
