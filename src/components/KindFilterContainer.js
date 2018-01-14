import { connect } from 'react-redux';
import KindFilter from './KindFilter';
import { changeFilter } from '../reducers/mainReducer.js';

const mapStateToProps = (state) => ({
  value: state.main.filters.kind
});
const onChange = function(newValue) {
  return changeFilter('kind', newValue);
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(KindFilter);
