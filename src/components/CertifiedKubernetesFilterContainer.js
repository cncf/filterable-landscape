import { connect } from 'react-redux';
import CertifiedKubernetesFilter from './CertifiedKubernetesFilter';
import { changeFilter } from '../reducers/mainReducer.js';

const mapStateToProps = (state) => ({
  value: state.main.filters.certifiedKubernetes || ''
});
const onChange = function(newValue) {
  return changeFilter('certifiedKubernetes', newValue || null);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(CertifiedKubernetesFilter);
