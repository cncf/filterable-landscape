import React from 'react';

import { GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div key={"subheader:" + groupedItem.header} style={{position: 'relative', height: 80, margin: 20}}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return (<div className="mosaic" key={item.id}>
                <div className={item.logo} onClick={() => onSelectItem(item.id)}/>
                <GridListTileBar
                  title={item.name}
                  subtitle={<div><span>{item.company} (${item.marketCap}M)</span> | <span>⭐️ {item.stars}</span></div>}
                />
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
