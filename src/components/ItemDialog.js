import React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const ItemDialog = ({onClose, itemInfo }) => {
  if (!itemInfo) {
    return null;
  }
  return (
    <Dialog open={true} onClose={() => onClose()}>
      <DialogTitle id="simple-dialog-title">{itemInfo.name}</DialogTitle>
      <div style={{width: 400, height: 600, background: 'white'}}>
        <div className={itemInfo.logo} style={{
          'cursor': 'pointer',
          'width': '100%',
          'height': 200,
          'backgroundSize': 'contain',
          'backgroundRepeat': 'no-repeat',
          'backgroundPosition': 'center'
        }} />
        <span>Name</span>{itemInfo.name}
        <br/>
        <span>Stars</span>{itemInfo.stars}
        <br/>
        <div> Just all the properties: </div>
        <div>{JSON.stringify(itemInfo, null, 2)} </div>
      </div>
    </Dialog>
  );
}
export default ItemDialog;
