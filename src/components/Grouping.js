import React from 'react';
import { FormGroup, FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
const Grouping = () => {
  return <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Grouping</FormLabel>
            <RadioGroup name="grouping" >
              <FormControlLabel value="kind" control={<Radio />} label="Kind" />
              <FormControlLabel value="stars" control={<Radio />} label="Number of stars" />
              <FormControlLabel value="kubernetes" control={<Radio />} label="Kubernetes Certified Service Provider" />
              <FormControlLabel value="license" control={<Radio />} label="License" />
              <FormControlLabel value="marketCap"  control={<Radio />} label="Market cap of company" />
              <FormControlLabel value="vcFunders"  control={<Radio />} label="VC funders" />
              <FormControlLabel value="company"  control={<Radio />} label="Company" />
              <FormControlLabel value="location"  control={<Radio />} label="Headquaters location" />
              <FormControlLabel value="landscape"  control={<Radio />} label="Landscape section" />
            </RadioGroup>
        </FormControl>
      </FormGroup>;
};
export default Grouping;
