import React from 'react';

const HeaderContainer = () => {

  return (
    <div className="header_container">
      <div className="header">
        <div className="logos">
            <div className="cncf_landscape" />
          <div className="info"><p>
              This is the interactive counterpart to CNCF's Cloud Native
              <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
              Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
              even better, open a pull request.
          </p></div>
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer">
            <div className="cncf_logo" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default HeaderContainer;
