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
import Footer from './Footer';

const HomePage = ({hasData}) => {
  if (!hasData) {
    return <h1>Loading data... </h1>;
  }
  return (
      <div>
        <HomePageUrlContainer />
        <ItemDialogContainer />
        <HeaderContainer/>
        <Grid container spacing={24}>
          <Grid item xs={2} sm={2} className="sidebar">
            <StickyBox className="content-sidebar">
              <ResetFiltersContainer />
              <Grouping/>
              <Sorting/>
              <div style={{width: 200, height: 30}}/>
              <Filters />
              <Presets />
            </StickyBox>

          </Grid>
          <Grid item xs={10} sm={10} className="content">
            <div className="disclaimer">
                This is the interactive counterpart to CNCF&#180;s Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
                Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
                even better, open a pull request.
            </div>
            <MainContentContainer/>
            <Footer/>
          </Grid>
        </Grid>
      </div>
  );
};

export default HomePage;
