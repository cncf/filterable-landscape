import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const Filters = ({reset}) => {
  return (
    <div className="filter_btn">
    <IconButton style={{ fontSize:'0.8em', width:'100px' }} onClick={()=>reset()} aria-label="Reset Filters">
      <Icon>alarm</Icon> Reset Filters
    </IconButton>
    
    </div>
  );
};
export default Filters;
