import React from 'react';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import StickyBox from "react-sticky-box";
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

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
            <div className="disclaimer">
                This is the interactive counterpart to CNCF&#180;s Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
                Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
                even better, open a pull request.
            </div>
            <MainContentContainer/>
          </Grid>
        </Grid>
      </div>
  );
};

export default HomePage;
