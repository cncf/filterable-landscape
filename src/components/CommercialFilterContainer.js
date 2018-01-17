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
  value: state.main.filters.commercial,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('commercial', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
