import React from 'react';

const HeaderContainer = (props) => {

  return (
    <div className="header_container">
      <div className="header">
        
          {props.children}
          <span className="landscape-logo"><img src="/styles/assets/cncf-landscape.svg" /></span>
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer" className="cncf-logo">
          	<img src="/styles/assets/cncf.svg" />
          </a>

      </div>
    </div>
  );
};

export default HeaderContainer;
