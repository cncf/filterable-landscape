import React from 'react';
import classNames from 'classnames';
import Icon from 'material-ui/Icon';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div className="sh_wrapper" key={"subheader:" + groupedItem.header}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return (<div className="mosaic" key={item.id} style={{ background: item.oss ? 'white' : '#eeeeee'}}>
                <div className="logo_wrapper" style={{border: '1px solid #f0f0f0'}}
                >
                  <div className={classNames(`${item.logo}`,{ logo: true})} onClick={() => onSelectItem(item.id)}/>
                </div>
                <div className="info">
                  <h5>{item.name}</h5>
                  <div>
                    <span>{item.company} ({item.marketCapAsText})</span>
                    { item.starsPresent &&
                      <span>
                        <Icon color="disabled" style={{ fontSize: 15 }}>star</Icon>
                        <span>{item.starsAsText}</span>
                      </span>
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
