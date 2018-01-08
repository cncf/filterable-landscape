import React from 'react';
import Button from 'material-ui/Button';
import { FormGroup, FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Radio, { RadioGroup } from 'material-ui/Radio';

const HomePage = () => {
  return (
    <div>
      <Button raised color="Primary">Hello World</Button>
      <br/>
      <br/>
      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter Kind 1</FormLabel>
          <FormGroup>
            <FormControlLabel control={ <Checkbox /> } label="CNCF Member" />
            <FormControlLabel control={ <Checkbox /> } label="CNCF Hosted" />
            <FormControlLabel control={ <Checkbox /> } label="Commercial Product" />
            <FormControlLabel control={ <Checkbox /> } label="Open Source" />
          </FormGroup>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Stars</FormLabel>
            <RadioGroup name="stars" >
              <FormControlLabel value="any" control={<Radio />} label="any" />
              <FormControlLabel value="male" control={<Radio />} label="1-100" />
              <FormControlLabel value="female" control={<Radio />} label="100-1000" />
              <FormControlLabel value="other" control={<Radio />} label="1000-10000" />
              <FormControlLabel value="disabled"  control={<Radio />} label="10000+" />
            </RadioGroup>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Certified Kubernetes</FormLabel>
            <RadioGroup name="stars" >
              <FormControlLabel value="any" control={<Radio />} label="platform" />
              <FormControlLabel value="male" control={<Radio />} label="distribution" />
              <FormControlLabel value="female" control={<Radio />} label="platform or distribution" />
              <FormControlLabel value="other" control={<Radio />} label="not certified" />
            </RadioGroup>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Market Cap of company</FormLabel>
            <RadioGroup name="stars" >
              <FormControlLabel value="any" control={<Radio />} label="any" />
              <FormControlLabel value="male" control={<Radio />} label="< 1M" />
              <FormControlLabel value="female" control={<Radio />} label="1M - 10M" />
              <FormControlLabel value="other" control={<Radio />} label="10M-100M" />
              <FormControlLabel value="disabled"  control={<Radio />} label="100M-1000M" />
              <FormControlLabel value="disabled"  control={<Radio />} label=" >000M" />
            </RadioGroup>
        </FormControl>
      </FormGroup>


    </div>
  );
};

export default HomePage;
