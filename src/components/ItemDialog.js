import React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import KeyHandler from 'react-key-handler';

import '../styles/itemModal.scss';

const ItemDialog = ({onClose, itemInfo, previousItemId, nextItemId, onSelectItem }) => {
  if (!itemInfo) {
    return null;
  }
  return (
    <Dialog open={true} onClose={() => onClose()} className="modal" classes={{paper:'modal-body'}}>
      { nextItemId && <KeyHandler keyValue="ArrowRight" onKeyHandle={() => onSelectItem(nextItemId)} /> }
      { previousItemId && <KeyHandler keyValue="ArrowLeft" onKeyHandle={() => onSelectItem(previousItemId)} /> }
        <a className="modal-close" onClick={() => onClose()}>×</a>
        <span className="modal-prev" disabled={!previousItemId} onClick={() => onSelectItem(previousItemId)}>
          <Icon style={{ fontSize:'1.2em'}}>chevron_left</Icon>
        </span>
        <span className="modal-next" disabled={!nextItemId} onClick={() => onSelectItem(nextItemId)}>
          <Icon style={{ fontSize:'1.2em'}}>chevron_right</Icon>
        </span>
        <div className="row">
          <div className="col col-25">
            <div className="product-logo" style={{backgroundImage: 'url(../logos' + itemInfo.hrefLarge + ')'}} />
            <div className="product-tags">
              <span className="tag tag-blue">
                <span className="tag-name">CNCF Project</span>
                <span className="tag-value">Incubating</span>
              </span>
              <span className="tag tag-grass">
                <span className="tag-value">Open Source Software</span>
              </span>
              <span className="tag tag-green">
                <span className="tag-name">License</span>
                <span className="tag-value">Apache-2.0</span>
              </span>
            </div>
          </div>
          <div className="col col-75">
            <div className="product-main">
              <div className="product-name">{itemInfo.name}</div>
              <div className="product-parent">{itemInfo.organization}</div>
              <div className="product-landscape">{itemInfo.landscape}</div>
              <div className="product-description">{itemInfo.description}</div>
            </div>
            <div className="product-properties">
              <div className="product-property row">
                <div className="product-property-name col col-25">Website</div>
                <div className="product-property-value col col-75">
                  <a href={itemInfo.homepage_url} target="_blank">{itemInfo.homepage_url}</a>
                </div>
              </div>
              {itemInfo.repo_url &&
              <div className="product-property row">
                <div className="product-property-name col col-25">Repository</div>
                <div className="product-property-value product-repo col col-75">
                  <a href={itemInfo.repo_url} target="_blank">{itemInfo.repo_url}</a>
                  <span className="product-repo-stars">
                    <Icon>star</Icon>
                    {itemInfo.starsAsText}
                  </span>
                </div>
              </div>
              }
              {itemInfo.crunchbase &&
              <div className="product-property row">
                <div className="product-property-name col col-25">Crunchbase</div>
                <div className="product-property-value col col-75">
                  <a href={itemInfo.crunchbase} target="_blank">{itemInfo.crunchbase}</a>
                </div>
              </div>
              }
              <div className="product-property row">
                <div className="product-property-name col col-25">Headquarters</div>
                <div className="product-property-value col col-75">{itemInfo.headquarters}</div>
              </div>
              <div className="product-property row">
                <div className="product-property-name col col-25">CB Rank</div>
                <div className="product-property-value col col-75">{itemInfo.rank}</div>
              </div>
              <div className="product-property row">
                <div className="product-property-name col col-25">VC Funder</div>
                <div className="product-property-value col col-75">Other Funder</div>
              </div>
            </div>

            <div style={{display: "none"}}>{JSON.stringify(itemInfo, null, 2)}</div>
          </div>
        </div>
    </Dialog>
  );
}
export default ItemDialog;
