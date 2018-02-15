import { connect } from 'react-redux';
import HomePage from './HomePage';
import {showFilters, hideFilters } from '../reducers/mainReducer';

const mapStateToProps = (state) => ({
  ready: !!state.main.ready,
  filtersVisible: state.main.filtersVisible,

});
const mapDispatchToProps = {
  showFilters: showFilters,
  hideFilters: hideFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
