import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeGrouping } from '../reducers/mainReducer.js';

const options = [{
  id: 'kind',
  label: 'Kind'
}, {
  id: 'stars',
  label: 'Number of stars'
}, {
  id: 'certifiedKubernetes',
  label: 'Kubernetes Certified Service Provider'
}, {
  id: 'license',
  label: 'License'
}, {
  id: 'marketCap',
  label: 'Market cap of company'
}, {
  id: 'vcFunder',
  label: 'VC funders'
}, {
  id: 'company',
  label: 'Company'
}, {
  id: 'headquaters',
  label: 'Headquaters location'
}, {
  id: 'landscape',
  label: 'Landscape section'
}];

const mapStateToProps = (state) => ({
  value: state.main.grouping,
  options: options
});
const onChange = function(newValue) {
  return changeGrouping(newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
