import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import classNames from 'classnames'
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Presets from './Presets';
import Note from './Note';
import MainContentContainer from './MainContentContainer';
import HomePageUrlContainer from './HomePageUrlContainer';
import ResetFiltersContainer from './ResetFiltersContainer';
import ItemDialogContainer from './ItemDialogContainer';
import HeaderContainer from './HeaderContainer';
import Footer from './Footer';


const HomePage = ({ready, filtersVisible, hideFilters, showFilters}) => {
  if (!ready) {
    return (
      <div>
        <HomePageUrlContainer />
      </div>
    )
  }

  return (
    <div className={classNames('app',{'filters-opened' : filtersVisible})}>

      <HeaderContainer/>
      <IconButton className="sidebar-show" onClick={showFilters}><Icon>menu</Icon></IconButton>

      <div className="sidebar">
        <IconButton className="sidebar-collapse" onClick={hideFilters}><Icon>close</Icon></IconButton>
        <ResetFiltersContainer />
        <Grouping/>
        <Sorting/>
        <Filters />
        <Presets />
        <Note />
      </div>

      <div className="app-overlay" onClick={hideFilters}></div>

      <HomePageUrlContainer />
      <ItemDialogContainer />

      <div className="main">
        <div className="disclaimer">
          <h1>CNCF Cloud Native Interactive Landscape</h1>
          This is the interactive counterpart to CNCF's Cloud Native <a href="https://github.com/cncf/landscape#current-version">Landscape</a>.
          Please <a href="https://github.com/cncf/filterable-landscape/issues/new/">report</a> any issues or,
          even better, open a pull request.
        </div>

        <MainContentContainer/>
        <Footer/>
      </div>


    </div>
  );
};

export default HomePage;
