import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const Filters = ({reset}) => {
  return (
    <div className="filter_btn">
    <IconButton style={{ fontSize:'0.8em', width:'100px' }} onClick={()=>reset()} aria-label="Reset Filters">
      <Icon>settings_backup_restore</Icon> Reset Filters
    </IconButton>
    
    </div>
  );
};
export default Filters;
