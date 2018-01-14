import { connect } from 'react-redux';
import LicenseFilter from './LicenseFilter';
import { changeFilter } from '../reducers/mainReducer.js';

const mapStateToProps = (state) => ({
  value: state.main.filters.license
});
const onChange = function(newValue) {
  return changeFilter('license', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseFilter);
