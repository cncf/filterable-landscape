import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import classNames from 'classnames'
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Presets from './Presets';
import Ad from './Ad';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';
import SummaryContainer from './SummaryContainer';
import Footer from './Footer';

import isIphone from '../utils/isIphone';

const state = {
  lastScrollPosition: 0
};

const HomePage = ({ready, hasSelectedItem, filtersVisible, hideFilters, showFilters, onClose}) => {
  if (!ready) {
    return (
      <div>
        <HomePageUrlContainer />
      </div>
    )
  }
  // if (isIphone) {
    // return(
      // <div className="app background">
        // <div className="iphoneScroller">
          // <HeaderContainer/>
          // <IconButton className="sidebar-show" onClick={showFilters}><Icon>menu</Icon></IconButton>
          // <div className="1shadow"/>
          // <div className="container" />
          // <div className="app-overlay" onClick={hideFilters}></div>
          // <HomePageUrlContainer />
          // <div className="main">
            // <div className="disclaimer">
              // <h1>CNCF Cloud Native Interactive Landscape</h1>
              // This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
              // Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
              // even better, open a pull request. Greyed logos are not open source.
            // </div>
            // <SummaryContainer />
            // <MainContentContainer/>
            // <Footer/>
          // </div>
        // </div>
      // </div>);
  // }

  if (isIphone && hasSelectedItem) {
    //try to get a current scroll if we are in a normal mode
    if (!document.querySelector('iphone-scroller')) {
      state.lastScrollPosition = document.scrollingElement.scrollTop;
    }
  }

  return (
    <div>
    <ItemDialogContainer/>
    <div className={classNames('app',{'filters-opened' : filtersVisible, 'background': isIphone && hasSelectedItem})}>
      <dic className={classNames({"shadow": isIphone && hasSelectedItem})} onClick={onClose} />
      <div style={{marginTop: -state.lastScrollPosition}} className={classNames({"iphone-scroller": isIphone && hasSelectedItem})} >
        <HeaderContainer/>
        <IconButton className="sidebar-show" onClick={showFilters}><Icon>menu</Icon></IconButton>
        <div className="sidebar">
          <IconButton className="sidebar-collapse" onClick={hideFilters}><Icon>close</Icon></IconButton>
          <ResetFiltersContainer />
          <Grouping/>
          <Sorting/>
          <Filters />
          <Presets />
          <Ad />
        </div>

        <div className="app-overlay" onClick={hideFilters}></div>

        <HomePageUrlContainer />
        { /*<ItemDialogContainer />*/}

        <div className="main">
          <div className="disclaimer">
            <h1>CNCF Cloud Native Interactive Landscape</h1>
            This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
            Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
            even better, open a pull request. Greyed logos are not open source.
          </div>

          <SummaryContainer />
          <MainContentContainer/>
          <Footer/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
