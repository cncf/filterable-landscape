import React from 'react';
import Button from 'material-ui/Button';

const Filters = ({reset}) => {
  return <div>
    <Button style={{width: 200, marginBottom: 10}} raised onClick={()=>reset()}>Reset Filters</Button>
    <br/>
    </div>;
};
export default Filters;
