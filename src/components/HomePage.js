import React from 'react';
import Grid from 'material-ui/Grid';
import StickyBox from "react-sticky-box";
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
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
        <Grid container spacing={24}>
          <Grid item xs={2} sm={2} className="sidebar">

            <StickyBox className="content-sidebar">
              <ResetFiltersContainer />
              <Grouping/>
              <Sorting/>
              <div style={{width: 200, height: 30}}/>
              <Filters />
            </StickyBox>

          </Grid>
          <Grid item xs={10} sm={10} className="content">
            <MainContentContainer/>
          </Grid>
        </Grid>
      </div>
  );
};

export default HomePage;
