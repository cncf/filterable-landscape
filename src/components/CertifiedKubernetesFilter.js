import React from 'react';
import { FormControlLabel  } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

const table = [{
  id: 'platform',
  label: 'Platform'
}, {
  id: 'distribution',
  label: 'Distribution'
}, {
  id: 'platformOrDistribution',
  label: 'Platform Or Distribution'
}, {
  id: 'notCertified',
  label: 'Not Certified'
}];

const CertifiedKubernetesFilter = ({value, onChange}) => {
  return  <RadioGroup name="stars"
    value={value}
    onChange={(_event, v) => onChange(v)}
  >
    { table.map( (entry) => (
    <FormControlLabel key={entry.id} value={entry.id} control={<Radio  onClick={() => onChange(entry.id)} />}label={entry.label}/>
    )) }
  </RadioGroup>
};
export default CertifiedKubernetesFilter;
