import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const Filters = ({reset}) => {
  return (
    <IconButton disableRipple style={{ color:'#4567d8', fontSize:'0.8em', width:'100%', justifyContent:'flex-start' }} onClick={()=>reset()} aria-label="Reset Filters">
      <Icon style={{ fontSize:'1.2em'}}>settings_backup_restore</Icon> Reset Filters
    </IconButton>
  );
};
export default Filters;
