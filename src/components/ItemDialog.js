import React from 'react';
import Dialog from 'material-ui/Dialog';
import { NavLink } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import KeyHandler from 'react-key-handler';
import _ from 'lodash';
import millify from 'millify';
import relativeDate from 'relative-date';
import { filtersToUrl } from '../utils/syncToUrl';
import saneName from '../utils/saneName';
import formatNumber from '../utils/formatNumber';

const formatDate = function(x) {
  if (x === '$TODAY$') {
    return 'today';
  }
  return relativeDate(new Date(x));
};

import '../styles/itemModal.scss';
import fields from '../types/fields';

const iconGithub = <svg viewBox="0 0 24 24">
    <path fill="#000000" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58
    9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81
    5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18
    9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5
     6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84
    13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39
    18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68
    14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
    </svg>

const cncfTag = function(cncfRelation) {
  const text = _.find(fields.cncfRelation.values, {id: cncfRelation}).tag;
  if (cncfRelation === false) {
    return null;
  }
  if (cncfRelation === 'member') {
    return (<span className="tag tag-blue">
      <span className="tag-value"><NavLink to={filtersToUrl({filters:{cncfRelation: cncfRelation}})}>{text}</NavLink></span>
    </span>)
  }
  return (<NavLink to={filtersToUrl({filters:{cncfRelation: cncfRelation}})} className="tag tag-blue">
    <span className="tag-name">CNCF Project</span>
    <span className="tag-value">{text}</span>
  </NavLink>)
};
const openSourceTag = function(oss) {
  if (!oss) {
    return null;
  }
  return (<NavLink to="/license=open-source" className="tag tag-grass">
    <span className="tag-value">Open Source Software</span>
  </NavLink>)
}
const licenseTag = function(license) {
  const text = _.find(fields.license.values, {id: license}).label;
  return (<NavLink to={filtersToUrl({filters:{license: license}})} className="tag tag-green">
    <span className="tag-name">License</span>
    <span className="tag-value">{text}</span>
  </NavLink>);
}
const ItemDialog = ({onClose, itemInfo, previousItemId, nextItemId, onSelectItem }) => {
  if (!itemInfo) {
    return null;
  }
  const linkToOrganization = filtersToUrl({filters: {organization: itemInfo.organization}});
  const itemCategory = function(path) {
    var separator = <span className="product-category-separator">•</span>;
    var [category, subcategory] = path.split(' / ');
    var categoryMarkup = (
      <NavLink to={`/landscape=${saneName(category)}`}>{category}</NavLink>
    )
    var subcategoryMarkup = (
      <NavLink to={filtersToUrl({filters: {landscape: path}})}>{subcategory}</NavLink>
    )
    return (<span>{[categoryMarkup, separator, subcategoryMarkup]}</span>);
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
          <div className="col col-33">
            <div className="product-logo">
              <img src={itemInfo.href} className='product-logo-img'/>
            </div>
            <div className="product-tags">
              <div>{cncfTag(itemInfo.cncfRelation)}</div>
              <div>{openSourceTag(itemInfo.oss)}</div>
              <div>{licenseTag(itemInfo.license)}</div>
            </div>
          </div>
          <div className="col col-66">
            <div className="product-main">
              <div className="product-name">{itemInfo.name}</div>
              <div className="product-parent"><NavLink to={linkToOrganization}>{itemInfo.organization}</NavLink></div>
              <div className="product-category">{itemCategory(itemInfo.landscape)}</div>
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
                </div>
              </div>
              }
              {itemInfo.starsAsText &&
              <div className="product-property row">
                <div className="product-property-name col col-25"></div>
                <div className="product-property-value col col-75">
                  <span className="product-repo-stars">
                    <Icon>{iconGithub}</Icon>
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
              {itemInfo.twitter &&
              <div className="product-property row">
                <div className="product-property-name col col-25">Twitter</div>
                <div className="product-property-value col col-75">
                  <a href={itemInfo.twitter} target="_blank">{itemInfo.twitter}</a>
                </div>
              </div>
              }
              {itemInfo.crunchbaseData.linkedin &&
              <div className="product-property row">
                <div className="product-property-name col col-25">LinkedIn</div>
                <div className="product-property-value col col-75">
                  <a href={itemInfo.crunchbaseData.linkedin} target="_blank">{itemInfo.crunchbaseData.linkedin}</a>
                </div>
              </div>
              }
              { itemInfo.headquarters && itemInfo.headquarters !== 'N/A' && (
                <div className="product-property row">
                  <div className="product-property-name col col-25">Headquarters</div>
                  <div className="product-property-value col col-75"><NavLink to={filtersToUrl({filters:{headquarters:itemInfo.headquarters}})}>{itemInfo.headquarters}</NavLink></div>
                </div>
              )
              }
              { itemInfo.crunchbaseData && itemInfo.crunchbaseData.numEmployeesMin && (
                <div className="product-property row">
                  <div className="product-property-name col col-25">Headcount</div>
                  <div className="product-property-value col col-75">{formatNumber(itemInfo.crunchbaseData.numEmployeesMin)}-{formatNumber(itemInfo.crunchbaseData.numEmployeesMax)}</div>
                </div>
              )
              }
              {Number.isInteger(itemInfo.marketCap) && (
              <div className="product-property row">
                <div className="product-property-name col col-25">{itemInfo.crunchbaseData.kind === 'funding' ? 'Funding' : 'Market Cap'}</div>
                <div className="product-property-value col col-75">
                  {'$' + millify(itemInfo.marketCap)}
                </div>
              </div>
              )
              }
              {itemInfo.crunchbaseData.ticker && (
              <div className="product-property row">
                <div className="product-property-name col col-25">Ticker</div>
                <div className="product-property-value col col-75"><a target="_blank" href={"https://finance.yahoo.com/quote/" + itemInfo.crunchbaseData.ticker}>{itemInfo.crunchbaseData.ticker}</a></div>
              </div>
              )
              }
              { itemInfo.firstCommitDate && (
                <div className="product-property row">
                  <div className="product-property-name col col-25">First Commit</div>
                  <div className="product-property-value col col-75"><a href={itemInfo.firstCommitLink} target="_blank">{formatDate(itemInfo.firstCommitDate)}</a></div>
                </div>
              )
              }
              { itemInfo.latestCommitDate && (
                <div className="product-property row">
                  <div className="product-property-name col col-25">Latest Commit</div>
                  <div className="product-property-value col col-75"><a href={itemInfo.latestCommitLink} target="_blank">{formatDate(itemInfo.latestCommitDate)}</a></div>
                </div>
              )
              }
            </div>

            <div style={{display: "none"}}>{JSON.stringify(itemInfo, null, 2)}</div>
          </div>
        </div>
    </Dialog>
  );
}
export default ItemDialog;
