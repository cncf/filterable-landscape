import { connect } from 'react-redux';
import LeftPanelInfo from './LeftPanelInfo';

const mapStateToProps = (state) => ({
  values: {
    filters: state.main.filters,
    grouping: state.main.grouping
  }
});
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanelInfo);
