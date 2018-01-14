import React from 'react';

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems}) => {
  const itemsAndHeaders = _.map(groupedItems, function(value, key) {
    return [
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">{key}</Subheader>
      </GridListTile>
    ].concat(_.map(value, function(item) {
      return <GridListTile key={item.name}>
            <img src={item.raw_logo} alt={item.name} />
            <GridListTileBar
              title={item.name}
              subtitle={<span>company: {item.company}</span>}
            />
          </GridListTile>
    }));
  });
  return (
      <GridList cellHeight={180}>
      { _.flatten(itemsAndHeaders) }
    </GridList>
  );
};

export default MainContent;
