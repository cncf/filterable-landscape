export default function groupFn(field) {
  if (field === 'cncfHostedProject') {
    return function(x) {
      return [true, false].indexOf(JSON.parse(x));
    }
  }
  if (field === 'oss') {
    return function(x) {
      return [true, false].indexOf(JSON.parse(x));
    }
  }
  if (field === 'commercial') {
    return function(x) {
      return [true, false].indexOf(JSON.parse(x));
    }
  }
  return function(x) {
    return x;
  }
}
