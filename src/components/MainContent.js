import React from 'react';
import classNames from 'classnames';
import Icon from 'material-ui/Icon';

import { GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div className="sh_wrapper" key={"subheader:" + groupedItem.header}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return (<div className="mosaic" key={item.id}>
                <div className={classNames(`${item.logo}`,{ logo: true})} onClick={() => onSelectItem(item.id)}/>
                <div className="info">
                  {item.name}
                  <span>{item.company} (${item.marketCap}M)</span>
                  <span><Icon color="disabled">star</Icon> {item.stars}</span>
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
