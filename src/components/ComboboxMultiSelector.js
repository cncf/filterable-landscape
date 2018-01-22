import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';


const idToValue = (id) => id !== null ? id : 'any';
const valueToId = (value) => value === 'any' ? null : value;

const ComboboxSelector = ({value, options, onChange}) => {
  const renderValue = function(selected) {
    console.info(selected);
    if (selected.length === 0) {
      return 'Any';
    }
    return selected.join(', ');
  }

  return <Select
    multiple
    style={{width:200}}
    value={idToValue(value)}
    onChange={(e) => onChange(valueToId(e.target.value))}
    renderValue={renderValue }
    displayEmpty
  >
    { options.map( (el) => (
      <MenuItem key={idToValue(el.id)} value={idToValue(el.id)}>
        <Checkbox checked={value.indexOf(el.id) !== -1} />
        <ListItemText primary={el.label} />
      </MenuItem>
    )) }
  </Select>
};
export default ComboboxSelector;
