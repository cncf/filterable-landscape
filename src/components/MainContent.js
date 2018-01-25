import React from 'react';

import { GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';
import formatAmount from '../utils/formatAmount';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div key={"subheader:" + groupedItem.header} style={{position: 'relative', height: 80, margin: 20}}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return <div style={{position: 'relative', display: 'inline-block', width: 200, height: 180, margin: 20}} key={item.id}>
            <div className={item.logo} style={{
              'cursor': 'pointer',
              'width': '100%',
              'height': '50%',
              'backgroundSize': 'contain',
              'backgroundRepeat': 'no-repeat',
              'backgroundPosition': 'center'
            }} onClick={() => onSelectItem(item.id)}/>
            <GridListTileBar
              title={item.name}
              subtitle={<div><span>{item.company} ({formatAmount(item.marketCap)})</span> | <span>⭐️ {item.stars}</span></div>}
            />
          </div>
    }));
  });
  return (
      <div>
      { _.flatten(itemsAndHeaders) }
    </div>
  );
};

export default MainContent;
