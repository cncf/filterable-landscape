import { connect } from 'react-redux';
import ComboboxMultiSelector from './ComboboxMultiSelector';
import { changeFilter } from '../reducers/mainReducer.js';
import { options } from '../types/fields';

const mapStateToProps = (state) => ({
  value: state.main.filters.license,
  options: options('license')
});
const onChange = function(newValue) {
  return changeFilter('license', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxMultiSelector);
