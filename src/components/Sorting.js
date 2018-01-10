import React from 'react';
import { FormGroup, FormControl, FormLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
const Sorting = () => {
  return <FormGroup>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort Order</FormLabel>
              <FormGroup row>
                <FormControl>
                  <InputLabel>Order By</InputLabel>
                  <Select style={{width: 200 }} value={10} input={<Input name="age" id="age-simple" />} >
                    <MenuItem value="">Kind</MenuItem>
                    <MenuItem value={10}>Number of stars</MenuItem>
                    <MenuItem value={20}>Kubernetes Certified Service Provider</MenuItem>
                    <MenuItem value={30}>License</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Direction</InputLabel>
                  <Select style={{width: 100}} value={10}>
                    <MenuItem value={10}>Asc</MenuItem>
                    <MenuItem value={20}>Desc</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
        </FormControl>
      </FormGroup>;
};
export default Sorting;
