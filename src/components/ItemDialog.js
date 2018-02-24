import React from 'react';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import KeyHandler from 'react-key-handler';
import classNames from 'classnames'
import ItemDialogContent from './ItemDialogContent';

import '../styles/itemModal.scss';
import isIphone from '../utils/isIphone';

const ItemDialog = ({onClose, itemInfo, previousItemId, nextItemId, onSelectItem }) => {
  if (!itemInfo) {
    return null;
  }
  if (isIphone) {
    return (
      <div className={classNames('modal', 'product', {inception : itemInfo.cncfRelation ==='inception'},
          {incubating : itemInfo.cncfRelation ==='incubating'},
          {graduated : itemInfo.cncfRelation ==='graduated'},
          {nonoss : itemInfo.oss === false})}
        >
          { nextItemId && <KeyHandler keyValue="ArrowRight" onKeyHandle={() => onSelectItem(nextItemId)} /> }
          { previousItemId && <KeyHandler keyValue="ArrowLeft" onKeyHandle={() => onSelectItem(previousItemId)} /> }
          <a className="modal-close" onClick={() => onClose()}>×</a>

          <span className="modal-prev" disabled={!previousItemId} onClick={() => onSelectItem(previousItemId)}>
            <Icon style={{ fontSize:'1.2em'}}>chevron_left</Icon>
          </span>
          <span className="modal-next" disabled={!nextItemId} onClick={() => onSelectItem(nextItemId)}>
            <Icon style={{ fontSize:'1.2em'}}>chevron_right</Icon>
          </span>

          <ItemDialogContent itemInfo={itemInfo}/>
        </div>
    )
  }
  // setTimeout(function() {
    // const existingFrame = document.querySelector('iframe[data-widget-id]');
    // if (existingFrame) {
      // existingFrame.parentNode.removeChild(existingFrame);
    // }
    // window.twttr.widgets.load();
  // });
  return (
    <Dialog open={true} onClose={() => onClose()}
      classes={{paper:'modal-body'}}
      className={classNames('modal', 'product', {inception : itemInfo.cncfRelation ==='inception'},
                                                 {incubating : itemInfo.cncfRelation ==='incubating'},
                                                 {graduated : itemInfo.cncfRelation ==='graduated'},
                                                 {nonoss : itemInfo.oss === false})}
      >
      { nextItemId && <KeyHandler keyValue="ArrowRight" onKeyHandle={() => onSelectItem(nextItemId)} /> }
      { previousItemId && <KeyHandler keyValue="ArrowLeft" onKeyHandle={() => onSelectItem(previousItemId)} /> }
        <a className="modal-close" onClick={() => onClose()}>×</a>

        <span className="modal-prev" disabled={!previousItemId} onClick={() => onSelectItem(previousItemId)}>
          <Icon style={{ fontSize:'1.2em'}}>chevron_left</Icon>
        </span>
        <span className="modal-next" disabled={!nextItemId} onClick={() => onSelectItem(nextItemId)}>
          <Icon style={{ fontSize:'1.2em'}}>chevron_right</Icon>
        </span>

        <ItemDialogContent itemInfo={itemInfo}/>
    </Dialog>
  );
}
export default ItemDialog;
