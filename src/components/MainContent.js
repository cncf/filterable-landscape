import React from 'react';
import Icon from 'material-ui/Icon';
import millify from 'millify'
import classNames from 'classnames'
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const cardWidth = 200;
const itemsCache = {};

const MainContent = ({groupedItems, onSelectItem, onHeaderClick}) => {
  const getItems = function(width) {
    if (itemsCache.width === width && itemsCache.groupedItems === groupedItems) {
      return itemsCache.result;
    }
    const cardsPerRow = Math.floor(width / cardWidth);
    const rows = _.map(groupedItems, function(groupedItem) {
      return [{
        type: 'header',
        href: groupedItem.href,
        header: groupedItem.header,
        count: groupedItem.items.length
      }].concat(_.chunk(groupedItem.items, cardsPerRow).map(function(itemsInRow) {
        return {
          type: 'row',
          items: itemsInRow
        };
      }));
    });
    const result = _.flatten(rows);
    _.assign(itemsCache, {
      width,
      groupedItems,
      result
    });
    return result;
  };
  const rowRenderer = function(width) {
    return ({index, key, style}) => {
      const items = getItems(width);
      const row = items[index];
      const element = do {
        if (row.type === 'header') {
          <div className="sh_wrapper" key={key} style={style}>
            <Subheader component="div" style={{fontSize: 24}}>
              <span
                className={ row.href ? "link" : "" }
                onClick={ () => row.href && onHeaderClick(row.href.name, row.href.value)}>
                {row.header}
            </span> ({row.count})</Subheader>
          </div>
        } else if (row.type === 'row') {
          <div className="cards-row" key={key} style={style}>
            {row.items.map( (item) => (
              <div className="mosaic-wrap">
                <div className={classNames('mosaic',{inception : item.cncfRelation ==='inception'},
                  {incubating : item.cncfRelation ==='incubating'},
                  {graduated : item.cncfRelation ==='graduated'},
                  {nonoss : item.oss === false})}
                  key={item.id} onClick={() => onSelectItem(item.id)} >
                  <div className="logo_wrapper">
                    <img src={item.href} className='logo' max-height='100%' max-width='100%' />
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
                      { Number.isInteger(item.amount) &&
                          <div className="mosaic-funding">{item.amountKind === 'funding' ? 'Funding: ': 'MCap: '} {'$'+ millify( item.amount )}</div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        } else {
          throw new Error('Unkown row type in' + row);
        }
      };
      // const className = cn(styles.row, {
      // [styles.rowScrolling]: isScrolling,
      // isVisible: isVisible,
      // });

      return element ;
    };
  };
  const getRowHeight = function(width) {
    return function({index}) {
      const items = getItems(width);
      const row = items[index];
      if (row.type === 'header') {
        return 50;
      }
      if (row.type === 'row') {
        return 210;
      }
      throw new Error('Wrong type', row.type);
    }
  };
  return (
    <WindowScroller
      scrollElement={window}>
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
            <div>
              <AutoSizer disableHeight>
                {({width}) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      overscanRowCount={2}
                      rowCount={getItems(width).length}
                      rowHeight={getRowHeight(width)}
                      rowRenderer={rowRenderer(width)}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
  );
};

export default MainContent;
