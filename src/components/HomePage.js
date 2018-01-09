import React from 'react';
import Button from 'material-ui/Button';
import { FormGroup, FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Input  from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

const HomePage = () => {
  return (
    <div>
      <Button raised primary>Hello World</Button>
      <br/>
      <br/>
      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter Kind 1</FormLabel>
          <FormGroup>
            <FormControlLabel control={ <Checkbox /> } label="CNCF Member" />
            <FormControlLabel control={ <Checkbox /> } label="CNCF Hosted Project" />
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
          <FormLabel component="legend">License</FormLabel>
          <Select value="" input={<Input name="age" id="age-simple" />} >
            <MenuItem value=""> Proprietary </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">VC Funders</FormLabel>
          <Select value={[]} multiple input={<Input name="age" id="age-simple" />} >
            <MenuItem value=""> Funder 1 </MenuItem>
            <MenuItem value={10}>Funder 2</MenuItem>
            <MenuItem value={20}>Funder 3</MenuItem>
            <MenuItem value={30}>Funder 4</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Company</FormLabel>
          <Select value={[]} multiple input={<Input name="age" id="age-simple" />} >
            <MenuItem value="">Apple</MenuItem>
            <MenuItem value={10}>M$</MenuItem>
            <MenuItem value={20}>Linux Foundation</MenuItem>
            <MenuItem value={30}>IBM</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Headquaters Location</FormLabel>
          <Select value="" input={<Input name="age" id="age-simple" />} >
            <MenuItem value="">NY</MenuItem>
            <MenuItem value={10}>San FranciscoM$</MenuItem>
            <MenuItem value={20}>Chicago</MenuItem>
            <MenuItem value={30}>Denver</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Landscape Section</FormLabel>
            <RadioGroup name="stars" >
              <FormControlLabel value="any" control={<Radio />} label="any" />
              <FormControlLabel value="male" control={<Radio />} label="logging" />
              <FormControlLabel value="female" control={<Radio />} label="monitoring" />
            </RadioGroup>
        </FormControl>
      </FormGroup>




    </div>
  );
};

export default HomePage;
