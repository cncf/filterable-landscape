import React from 'react';
import { FormGroup, FormControlLabel  } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const KindFilter = ({value, onChange}) => {
  console.info('value', value);
  const valueOf = function(checkbox) {
    return value.indexOf(checkbox) !== -1;
  };
  const handleCheckboxChange = function(checkbox, checked) {
    console.info(checkbox, checked);
    if (checked) {
      onChange(value.concat([checkbox]));
    } else {
      onChange(value.filter(function(x) { return x !== checkbox; }))
    }
  };
  const table = [{
    id: 'cncfMember',
    label: 'CNCF Member'
  }, {
    id: 'cncfHostedProject',
    label: 'CNCF Hosted Project'
  }, {
    id: 'commercial',
    label: 'Commercial Product'
  }, {
    id: 'opensource',
    label: 'Open Source'
  }];

  return <FormGroup>
    { table.map( (el) => (
      <FormControlLabel key={el.id} control={
        <Checkbox onClick={function() {
            handleCheckboxChange(el.id, !valueOf(el.id));
        }}
          checked={valueOf(el.id)}
        />
      } label={el.label}
      />
    )) }
  </FormGroup>
};
export default KindFilter;
