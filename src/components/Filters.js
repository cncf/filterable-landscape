import React from 'react';
import { FormGroup, FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Input  from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

import KindFilterContainer from './KindFilterContainer';
import StarsFilterContainer from './StarsFilterContainer';
import CertifiedKubernetesFilterContainer from './CertifiedKubernetesFilterContainer'
import LicenseFilterContainer from './LicenseFilterContainer';
import MarketCapFilterContainer from './MarketCapFilterContainer';
import VCFunderFilterContainer from './VCFunderFilterContainer';
import CompanyFilterContainer from './CompanyFilterContainer';
const Filters = () => {
  return <div>
      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter Kind 1</FormLabel>
          <KindFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Stars</FormLabel>
          <StarsFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Certified Kubernetes</FormLabel>
          <CertifiedKubernetesFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">License</FormLabel>
          <LicenseFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Market Cap of company</FormLabel>
          <MarketCapFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">VC Funders</FormLabel>
          <VCFunderFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Company</FormLabel>
          <CompanyFilterContainer />
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
    </div>;
}
export default Filters;
