import React from 'react';
import { FormControlLabel  } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

const table = [{
  id: '',
  label: 'Any'
}, {
  id: '1-100',
  label: '1-100'
}, {
  id: '100-1000',
  label: '100-1000'
}, {
  id: '1000-10000',
  label: '1000-10000'
}, {
  id: '10000+',
  label: '10000+'
}];

const StarsFilter = ({value, onChange}) => {
  return  <RadioGroup name="stars"
    value={value}
    onChange={(_event, v) => onChange(v)}
  >
    { table.map( (entry) => (
    <FormControlLabel key={entry.id} value={entry.id} control={<Radio  onClick={() => onChange(entry.id)} />}label={entry.label}/>
    )) }
  </RadioGroup>
};
export default StarsFilter;
