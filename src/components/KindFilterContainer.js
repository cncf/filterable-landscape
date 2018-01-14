import { connect } from 'react-redux';
import CheckboxSelector from './CheckboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: 'cncfMember',
  label: 'CNCF Member'
}, {
  id: 'cncfHostedProject',
  label: 'CNCF Hosted Project'
}, {
  id: 'commercial',
  label: 'Commercial Product'
}, {
  id: 'opensource',
  label: 'Open Source'
}];
const mapStateToProps = (state) => ({
  value: state.main.filters.kind,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('kind', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxSelector);
