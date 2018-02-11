import React from 'react';

const HeaderContainer = (props) => {

  return (
    <div className="header_container">
      <div className="header">
        <div className="logos">
          <div className="cncf_landscape" />
          {props.children}
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer">
            <div className="cncf_logo" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default HeaderContainer;
