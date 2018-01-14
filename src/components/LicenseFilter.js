import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const table = [{
  id: 'any',
  label: 'Any'
}, {
  id: 'gpl-v2',
  label: 'GPL V2'
}, {
  id: 'gpl-v3',
  label: 'GPL V3'
}, {
  id: 'mit',
  label: 'MIT'
}, {
  id: 'apache',
  label: 'APACHE 2'
}, {
  id: 'commercial',
  label: 'Commercial'
}];

const idToValue = (id) => id !== null ? id : 'any';
const valueToId = (value) => value === 'any' ? null : value;

const LicenseFilter = ({value, onChange}) => {

  return <Select style={{width:200}} value={idToValue(value)} onChange={(e) => onChange(valueToId(e.target.value))} >
    { table.map( (el) => (
      <MenuItem key={el.id} value={idToValue(el.id)}>{el.label}</MenuItem>
    )) }
  </Select>
};
export default LicenseFilter;
