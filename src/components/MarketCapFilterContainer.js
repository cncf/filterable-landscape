import { connect } from 'react-redux';
import RadioSelector from './RadioSelector';
import { changeFilter } from '../reducers/mainReducer.js';

const options = [{
  id: null,
  label: 'Any'
}, {
  id: '<1M',
  label: '<1M'
}, {
  id: '1M-10M',
  label: '1M-10M'
}, {
  id: '10M-100M',
  label: '10M-100M'
}, {
  id: '100M-1000M',
  label: '100M-1000M'
}, {
  id: '1000M+',
  label: '1000M+'
}];

const mapStateToProps = (state) => ({
  value: state.main.filters.marketCap,
  options: options
});
const onChange = function(newValue) {
  return changeFilter('marketCap', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioSelector);
