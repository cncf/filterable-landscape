import React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const ItemDialog = ({onClose, itemInfo }) => {
  if (!itemInfo) {
    return null;
  }
  return (
    <Dialog open={true} onClose={() => onClose()}>
      <DialogTitle id="simple-dialog-title">{itemInfo.name}</DialogTitle>
      <div style={{width: 800, height: 600, background: 'grey'}}>
      </div>
    </Dialog>
  );
}
export default ItemDialog;
