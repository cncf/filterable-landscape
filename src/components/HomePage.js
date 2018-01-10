import React from 'react';
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Button from 'material-ui/Button';

const HomePage = () => {
  return (
    <div>
      <Button raised primary>Hello World</Button>
      <br/>
      <Filters/>
      <Grouping/>
      <Sorting/>
    </div>
  );
};

export default HomePage;
