export default function formatCity(name) {
  if (!name) {
    return;
  }
  const [city, state, country] = name.split(', ');
  if (!country) {
    return `${city}, ${state}`;
  }
  if (country === 'United States') {
    return `${city}, ${state}`;
  }
  return `${city}, ${country}`;
}
