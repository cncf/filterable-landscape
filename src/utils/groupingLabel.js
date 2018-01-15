const headers = {
  oss: {
    true: 'Open Source',
    false: 'Not Open Source'
  },
  commercial: {
    true: 'Commercial',
    false: 'Not Commercial'
  },
  cncfHostedProject: {
    true: 'CNCF Hosted Project',
    false: 'CNCF Member Product'
  }
};
export default function(name, label) {
  const header = (headers[name] || {})[label];
  return header || label;
}
