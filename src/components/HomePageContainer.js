import { connect } from 'react-redux';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  ready: !!state.main.ready
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
