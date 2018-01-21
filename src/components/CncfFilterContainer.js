import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer';
import { options } from '../types/fields';

const mapStateToProps = (state) => ({
  value: state.main.filters.cncfHostedProject,
  options: options('cncfHostedProject')
});
const onChange = function(newValue) {
  return changeFilter('cncfHostedProject', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
