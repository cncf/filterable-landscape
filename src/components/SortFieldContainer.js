import { connect } from 'react-redux';
import ComboboxSelector from './ComboboxSelector';
import { changeSortFieldAndDirection } from '../reducers/mainReducer.js';

const options = [{
  id: {field: 'name', direction: 'asc'},
  label: 'Alphabetical (a to z)',
}, {
  id: {field: 'name', direction: 'desc'},
  label: 'Alphabetical (z to a)',
}, {
  id: {field: 'marketCap', direction: 'asc'},
  label: 'Funding / Market Cap (low to high)',
}, {
  id: {field: 'marketCap', direction: 'desc'},
  label: 'Funding / Market Cap (high to low)',
}, {
  id: {field: 'stars', direction: 'asc'},
  label: 'Stars (low to high)',
}, {
  id: {field: 'stars', direction: 'desc'},
  label: 'Stars (high to low)',
}, {
  id: {field: 'startDate', direction: 'asc'},
  label: 'Project Started (low to high)',
}, {
  id: {field: 'startDate', direction: 'desc'},
  label: 'Project Started (high to low)',
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
