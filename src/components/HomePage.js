import React from 'react';
import Grid from 'material-ui/Grid';
import StickyBox from "react-sticky-box";
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Presets from './Presets';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';

const HomePage = ({hasData}) => {
  if (!hasData) {
    return <h1>Loading data... </h1>;
  }
  return (
      <div>
        <HomePageUrlContainer />
        <ItemDialogContainer />
        <HeaderContainer/>
      
          <div className="sidebar content-sidebar">
            <ResetFiltersContainer />
            <Grouping/>
            <Sorting/>
            <div style={{width: 200, height: 30}}/>
            <Filters />
            <Presets />
          </div>

          <div className="content">
            <div className="disclaimer">
                This is the interactive counterpart to CNCF&#180;s Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
                Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
                even better, open a pull request.
            </div>
            <MainContentContainer/>
          </div>
      </div>
  );
};

export default HomePage;
