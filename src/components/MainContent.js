import React from 'react';

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div key={"subheader:" + groupedItem.header} style={{position: 'relative', height: 80, margin: 20}}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return <div style={{position: 'relative', display: 'inline-block', width: 200, height: 180, margin: 20}} key={item.path + '/' + item.name}>
            <div style={{
              'width': '100%',
              'height': '50%',
              'backgroundSize': 'contain',
              'backgroundRepeat': 'no-repeat',
              'backgroundPosition': 'center',
              'backgroundImage': `url("${item.raw_logo}")`
            }}/>
            <GridListTileBar
              title={item.name}
              subtitle={<div><span>company: {item.company} (${item.marketCap}M)</span> | <span>stars: {item.stars}</span></div>}
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
