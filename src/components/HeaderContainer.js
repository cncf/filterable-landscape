import React from 'react';
import landscapeLogo from '../styles/assets/cncf-landscape.svg';
import cncfLogo from '../styles/assets/cncf.svg';

const HeaderContainer = (props) => {

  return (
    <div className="header_container">
      <div className="header">
        
          {props.children}
          <span className="landscape-logo"><img src={landscapeLogo} /></span>
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer" className="cncf-logo">
          	<img src={cncfLogo} />
          </a>

      </div>
    </div>
  );
};

export default HeaderContainer;
