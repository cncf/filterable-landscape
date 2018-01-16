import React from 'react';

const LeftPanelInfo = ({values}) => {
  return <div>
    { JSON.stringify(values, null, 2) }
  </div>
}
export default LeftPanelInfo;
