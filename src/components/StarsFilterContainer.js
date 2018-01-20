import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Any'
}, {
  id: '1to100',
  label: '1-100'
}, {
  id: '100to1000',
  label: '100-1000'
}, {
  id: '1000to10000',
  label: '1000-10000'
}, {
  id: 'over10000',
  label: '10000+'
}];

const mapStateToProps = (state) => ({
  value: state.main.filters.stars,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('stars', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
