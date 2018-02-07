import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeSortFieldAndDirection } from '../reducers/mainReducer.js';

export const options = [{
  id: {field: 'name', direction: 'asc'},
  label: 'Alphabetical (a to z)',
}, {
  id: {field: 'stars', direction: 'desc'},
  label: 'Stars (high to low)',
}, {
  id: {field: 'marketCap', direction: 'desc'},
  label: 'Funding / Market Cap (high to low)',
}, {
  id: {field: 'firstCommitDate', direction: 'asc'},
  label: 'Project Started (earlier to sooner)',
}, {
  id: {field: 'latestCommitDate', direction: 'asc'},
  label: 'Latest Commit (earlier to sooner)',
}].map(function(x) {
  return {
    id: JSON.stringify(x.id),
    label: x.label
  }
});

const mapStateToProps = (state) => ({
  value: JSON.stringify({
    field: state.main.sortField,
    direction: state.main.sortDirection
  }),
  options: options
});
const onChange = function(newValue) {
  return changeSortFieldAndDirection(JSON.parse(newValue));
}
const mapDispatchToProps = {
  onChange: onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxSelector);
