import React from 'react';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';

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


const filters=(
  <div>
    <div className="cncf_landscape" />
    <ResetFiltersContainer />
    <Grouping/>
    <Sorting/>
    <div style={{width: 200, height: 30}}/>
    <Filters />
    <Presets />
  </div>
  );
  
const fakeState = {
    drawer: false,
    burgerIcon: false
  };
  
const HomePage = ({ready}) => {
  if (!ready) {
    return (
      <div>
        <HomePageUrlContainer />
      </div>
    )
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
      
      <div className="columns">
        <div className="sidebar">
          <StickyBox className="content-sidebar">
            {filters}
          </StickyBox>
        </div>
        <div className="content">
          <HeaderContainer/>
          <Hidden smDown implementation="css">
            <div className="disclaimer">
              <strong>CNCF Cloud Native Interactive Landscape</strong>
              <br/>
              This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
              Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
              even better, open a pull request.
            </div>
          </Hidden>
          <MainContentContainer/>
          <Footer/>
        </div>
      </div>
     
    </div>
  );
};

export default HomePage;
