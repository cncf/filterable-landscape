import { connect } from 'react-redux';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  hasData: !!state.mainReducer.data
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
