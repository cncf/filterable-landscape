import React from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';

import StickyBox from "react-sticky-box";
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';

const filters=(
  <div>
      <ResetFiltersContainer />
      <Grouping/>
      <Sorting/>
      <div style={{width: 200, height: 30}}/>
      <Filters />
  </div>
);

const fakeState = {
  drawer: false,
  burgerIcon: false
};

const HomePage = ({hasData}) => {
  if (!hasData) {
    return <h1>Loading data... </h1>;
  }
  return (
    <div >
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open={fakeState.drawer}
          >
            <div className="sidebar">
              <div className="content-sidebar-mobile">
                <div className="cncf_landscape_mobile" />
                {filters}
              </div>
            </div>
          </Drawer>
        </Hidden>
      
      <HomePageUrlContainer />
      <ItemDialogContainer />
      <HeaderContainer>
        <Hidden smDown implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>
      </HeaderContainer>

      <div className="columns">
        <div className="sidebar">
          <StickyBox className="content-sidebar">
            {filters}
          </StickyBox>

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
      
     
    </div>
  );
};

export default HomePage;
