import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';


const idToValue = (id) => id !== null ? id : 'any';
const valueToId = (value) => value === 'any' ? null : value;

const ComboboxSelector = ({value, options, onChange}) => {

  return <Select multiple style={{width:200}} value={idToValue(value)} onChange={(e) => onChange(valueToId(e.target.value))} >
    { options.map( (el) => (
      <MenuItem key={idToValue(el.id)} value={idToValue(el.id)}>{el.label}</MenuItem>
    )) }
  </Select>
};
export default ComboboxSelector;
