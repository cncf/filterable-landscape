import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import ItemDialog from './ItemDialog';
import { closeDialog } from '../reducers/mainReducer';

const getSelectedItem = createSelector(
  (state) => state.main.data,
  (state) => state.main.selectedItemId,
  function(items, selectedItemId) {
    return _.find(items, {path: selectedItemId});
  }
)
const mapStateToProps = (state) => ({
  itemInfo: getSelectedItem(state)
});
const mapDispatchToProps = {
  onClose: closeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDialog);
