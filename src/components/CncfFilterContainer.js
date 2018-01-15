import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Any'
},{
  id: false,
  label: 'CNCF Member Product'
}, {
  id: true,
  label: 'CNCF Hosted Project'
}];
const mapStateToProps = (state) => ({
  value: state.main.filters.cncfHostedProject,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('cncfHostedProject', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
