import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Any'
}, {
  id: 'gpl-v2',
  label: 'GPL V2'
}, {
  id: 'gpl-v3',
  label: 'GPL V3'
}, {
  id: 'mit',
  label: 'MIT'
}, {
  id: 'apache',
  label: 'APACHE 2'
}, {
  id: 'commercial',
  label: 'Commercial'
}];

const mapStateToProps = (state) => ({
  value: state.main.filters.license,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('license', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
