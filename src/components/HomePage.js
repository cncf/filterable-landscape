import React from 'react';
import Filters from './Filters';
import Grouping from './Grouping';
import Sorting from './Sorting';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


const HomePage = () => {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={6}>
          <Filters/>
          <Grouping/>
          <Sorting/>
        </Grid>
        <Grid item xs={9} sm={6}>
          <h1> Main Content </h1>
          <Button raised primary>Hello World</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
