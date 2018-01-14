import { connect } from 'react-redux';
import StarsFilter from './StarsFilter';
import { changeFilter } from '../reducers/mainReducer.js';

const mapStateToProps = (state) => ({
  value: state.main.filters.stars || ''
});
const onChange = function(newValue) {
  return changeFilter('stars', newValue || null);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(StarsFilter);
