import React from 'react';
import Grid from 'material-ui/Grid';
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import MainContentContainer from './MainContentContainer';
import LeftPanelInfoContainer from './LeftPanelInfoContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';


const HomePage = ({hasData}) => {
  if (!hasData) {
    return <h1>Loading data... </h1>;
  }
  return (
      <div className="wrapper">
        <HomePageUrlContainer />
        <ItemDialogContainer />
        <HeaderContainer/>
        <Grid container spacing={24}>
          <Grid item xs={3} sm={3} className="sidebar">
            <ResetFiltersContainer />
            <Filters />
            <Grouping/>
            <Sorting/>
            {/*<LeftPanelInfoContainer/>*/}
          </Grid>
          <Grid item xs={9} sm={9} className="content">
            {/*<h1 className='logo'> Summary Placeholder </h1>*/}
            {/*<h1> Available Presets Placeholder</h1>*/}
            <MainContentContainer/>
          </Grid>
        </Grid>
      </div>
  );
};

export default HomePage;
