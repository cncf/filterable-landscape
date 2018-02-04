import React from 'react';

const HeaderContainer = () => {

  return (
    <div className="header_container">
      <div className="header">
        <div className="logos">
          <a href="" target="_blank" rel="noopener noreferrer">
            <div className="cncf_landscape" />
          </a>
          <div className="info"><h4>
              This is the interactive counterpart to <a href="https://github.com/cncf/landscape#current-version">CNCF's Cloud Native Landscape</a>. Please report any issues or, even better, open a pull request.
          </h4></div>
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer">
            <div className="cncf_logo" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default HeaderContainer;
