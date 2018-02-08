import React from 'react';
import Icon from 'material-ui/Icon';
import millify from 'millify'
import classNames from 'classnames'
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div className="sh_wrapper" key={"subheader:" + groupedItem.header}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return (<div className={classNames('mosaic',{inception : item.cncfRelation ==='inception'},
                                                  {incubating : item.cncfRelation ==='incubating'},
                                                  {graduated : item.cncfRelation ==='graduated'})}
                   key={item.id} style={{ background: item.oss ? 'white' : '#eeeeee'}}
                   onClick={() => onSelectItem(item.id)} >
                <div className="logo_wrapper">
                  <img src={item.hrefTile} className='logo' max-height='100%' max-width='100%' />
                </div>
                <div className="mosaic-info">
                  <div>
                    <h5>{item.name}</h5>
                     {item.organization}
                  </div>
                  <div className="mosaic-stars">
                    { item.starsPresent &&
                      <div>
                        <Icon color="disabled" style={{ fontSize: 15 }}>star</Icon>
                        <span>{item.starsAsText}</span>
                      </div>
                    }
                    { Number.isInteger(item.marketCap) &&
                      <div className="mosaic-funding">Funding: {'$'+ millify( item.marketCap )}</div>
                    }
                  </div>
                </div>
              </div>);
    }));
  });
  return (
      <div>
      { _.flatten(itemsAndHeaders) }
    </div>
  );
};

export default MainContent;
