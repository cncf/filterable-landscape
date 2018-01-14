import { connect } from 'react-redux';
import RadioSelector from './RadioSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: 'platform',
  label: 'Platform'
}, {
  id: 'distribution',
  label: 'Distribution'
}, {
  id: 'platformOrDistribution',
  label: 'Platform Or Distribution'
}, {
  id: 'notCertified',
  label: 'Not Certified'
}];
const mapStateToProps = (state) => ({
  value: state.main.filters.certifiedKubernetes,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('certifiedKubernetes', newValue || null);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioSelector);
