import React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import KeyHandler from 'react-key-handler';

const ItemDialog = ({onClose, itemInfo, previousItemId, nextItemId, onSelectItem }) => {
  if (!itemInfo) {
    return null;
  }
  return (
    <Dialog open={true} onClose={() => onClose()}>
      { nextItemId && <KeyHandler keyValue="ArrowRight" onKeyHandle={() => onSelectItem(nextItemId)} /> }
      { previousItemId && <KeyHandler keyValue="ArrowLeft" onKeyHandle={() => onSelectItem(previousItemId)} /> }
      <DialogTitle id="simple-dialog-title">{itemInfo.name}</DialogTitle>
      <div style={{width: 600, height: 600, background: 'white', overflow: 'hidden'}}>
        <div className={itemInfo.logo} style={{
          'cursor': 'pointer',
          'width': '100%',
          'height': 200,
          'backgroundSize': 'contain',
          'backgroundRepeat': 'no-repeat',
          'backgroundPosition': 'center'
        }} />
      <Button disabled={!previousItemId} onClick={() => onSelectItem(previousItemId)}>Previous</Button>
      <Button disabled={!nextItemId} onClick={() => onSelectItem(nextItemId)}>Next</Button>
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
