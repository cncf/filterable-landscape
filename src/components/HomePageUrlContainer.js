import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import { parseUrl } from '../utils/syncToUrl';
import { changeParameters} from '../reducers/mainReducer';

const getParameters = createSelector(
  () => window.location.pathname.split('/').slice(-1)[0] : '',
  function(part) {
    return parseUrl(part);
  }
);

const mapStateToProps = (_state, ownProps) => ({
  info: getParameters(ownProps),
  other: _state.routing.location.pathname
});
const mapDispatchToProps = {
  changeParameters: changeParameters
};

const render = ({info, changeParameters}) => {
  // if we are here - url has changed
  // otherwise everything is cached
  changeParameters(info);
  return <div/>;
}


export default connect(mapStateToProps, mapDispatchToProps)(render);
