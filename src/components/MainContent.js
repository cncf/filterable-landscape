import React from 'react';
import Icon from 'material-ui/Icon';
import millify from 'millify'
import Subheader from 'material-ui/List/ListSubheader';
import _ from 'lodash';

const MainContent = ({groupedItems, onSelectItem}) => {
  const itemsAndHeaders = _.map(groupedItems, function(groupedItem) {
    return [
      <div className="sh_wrapper" key={"subheader:" + groupedItem.header}>
          <Subheader component="div" style={{fontSize: 24}}>{groupedItem.header} ({groupedItem.items.length})</Subheader>
      </div>
    ].concat(_.map(groupedItem.items, function(item) {
      return (<div className="mosaic" key={item.id} style={{ background: item.oss ? 'white' : '#eeeeee'}} onClick={() => onSelectItem(item.id)} >
                <div className="logo_wrapper" style={{border: '1px solid #f0f0f0'}}>
                  <img src={item.hrefTile} className='logo' max-height='100%' max-width='100%' />
                </div>
                <div className="info">
                  <div>
                    <h5>{item.name}</h5>
                    { item.starsPresent &&
                      <span>
                        <Icon color="disabled" style={{ fontSize: 15 }}>star</Icon>
                        <span>{item.starsAsText}</span>
                      </span>
                    }
                  </div>
                  <div>
                    {item.organization}
                    { Number.isInteger(item.marketCap) ? ' ($'+ millify( item.marketCap )+')' : '' }
                    {/*{item.organization} { Number.isInteger(item.funcing) ? 'Funding:'+ millify( item.funding )+'' : '' } */}

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
