import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Either'
},{
  id: false,
  label: 'No'
}, {
  id: true,
  label: 'Yes'
}];
const mapStateToProps = (state) => ({
  value: state.main.filters.oss,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('oss', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
