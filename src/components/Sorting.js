import React from 'react';
import { FormGroup, FormControl, FormLabel } from 'material-ui/Form';
import SortFieldContainer from './SortFieldContainer';
import SortDirectionContainer from './SortDirectionContainer';
import { InputLabel } from 'material-ui/Input';
const Sorting = () => {
  return <FormGroup>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort Order</FormLabel>
              <FormGroup row>
                <FormControl>
                  <InputLabel>Order By</InputLabel>
                  <SortFieldContainer />
                </FormControl>
                <FormControl>
                  <InputLabel>Direction</InputLabel>
                  <SortDirectionContainer />
                </FormControl>
              </FormGroup>
        </FormControl>
      </FormGroup>;
};
export default Sorting;
