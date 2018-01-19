export default function(s) {
  return s.split('').filter(function(x) {
    return x.match(/[a-zA-Z0-9]/);
  }).join('');
}
