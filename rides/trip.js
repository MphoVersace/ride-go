import { Platform } from 'react-native';
import * as Location from 'expo-location';

export const defaultMapCenter = [-26.1064, 28.0548];
export const demoPlaces = [
  { label: 'Sandton City', detail: 'Sandton, Johannesburg', coordinate: [-26.1076, 28.0535] },
  { label: 'Rosebank Mall', detail: 'Rosebank, Johannesburg', coordinate: [-26.1456, 28.0418] },
  { label: 'Melrose Arch', detail: 'Melrose, Johannesburg', coordinate: [-26.1328, 28.0684] },
  { label: 'Woodmead Retail Park', detail: 'Woodmead, Johannesburg', coordinate: [-26.0527, 28.0925] },
];

export const rideTiers = [
  { id: 'saver', name: 'Go Saver', capacity: 4, price: 'R75', eta: '3 min away', description: 'Affordable everyday ride', icon: 'car' },
  { id: 'comfort', name: 'Go Comfort', capacity: 4, price: 'R125', eta: '5 min away', description: 'Extra legroom', icon: 'car' },
  { id: 'xl', name: 'Go XL', capacity: 6, price: 'R195', eta: '7 min away', description: 'Luggage and groups', icon: 'car' },
  { id: 'black', name: 'Go Black', capacity: 4, price: 'R280', eta: '8 min away', description: 'Comfortable sedan with extra space', icon: 'car' },
];

export const demoDriver = {
  name: 'Thabo M.', initials: 'TM', rating: '4.9', vehicle: 'Silver Toyota Corolla', plate: 'JM 42 KL GP',
};

export async function currentPickup() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) throw new Error('Location access is off. Enter your pickup address instead.');
  const fix = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  return { label: 'Current location', detail: 'Device location', coordinate: [fix.coords.latitude, fix.coords.longitude] };
}

function coordinateIsValid(coordinate) {
  return coordinate.every(Number.isFinite) && Math.abs(coordinate[0]) <= 90 && Math.abs(coordinate[1]) <= 180;
}

export async function findPlaces(query, signal) {
  const term = query.trim();
  const local = demoPlaces.filter(place => (place.label + ' ' + place.detail).toLowerCase().includes(term.toLowerCase()));
  const endpoint = process.env.EXPO_PUBLIC_RIDEGO_GEOCODER_URL;
  if (local.length) return local;

  if (endpoint) {
    const url = new URL(endpoint);
    url.searchParams.set('q', term);
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('countrycodes', 'za');
    url.searchParams.set('limit', '5');
    const response = await fetch(url.toString(), { signal });
    if (!response.ok) throw new Error('Address search is temporarily unavailable.');
    const results = await response.json();
    return results.map(item => ({
      label: item.name || item.display_name,
      detail: item.display_name,
      coordinate: [parseFloat(item.lat), parseFloat(item.lon)],
    })).filter(place => place.label && coordinateIsValid(place.coordinate));
  }

  if (Platform.OS === 'web') return [];
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) throw new Error('Allow location to search for a new address, or select a suggested place.');
  const matches = await Location.geocodeAsync(term + ', South Africa');
  return matches.filter(item => coordinateIsValid([item.latitude, item.longitude])).slice(0, 1).map(item => ({
    label: term, detail: 'South Africa', coordinate: [item.latitude, item.longitude],
  }));
}

export async function loadRoadRoute(start, end, signal) {
  const configuredRouter = process.env.EXPO_PUBLIC_RIDEGO_ROUTER_URL;
  // Keep device locations off the public demo endpoint.
  const isSample = point => demoPlaces.some(place => place.coordinate[0] === point[0] && place.coordinate[1] === point[1]);
  if (!configuredRouter && !(isSample(start) && isSample(end))) return null;
  const base = (configuredRouter || 'https://router.project-osrm.org').replace(/\/$/, '');
  const endpoints = [start, end].map(([lat, lon]) => lon + ',' + lat).join(';');
  const response = await fetch(base + '/route/v1/driving/' + endpoints + '?overview=full&geometries=geojson', { signal });
  if (!response.ok) return null;
  const result = (await response.json()).routes?.[0];
  if (!result?.geometry?.coordinates?.length) return null;
  return {
    points: result.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
    km: result.distance / 1000,
    minutes: Math.max(1, Math.round(result.duration / 60)),
  };
}

export function positionOnRoute(points, progress) {
  const segmentLengths = points.slice(1).map(([lat, lon], index) => {
    const [previousLat, previousLon] = points[index];
    return Math.hypot(lat - previousLat, (lon - previousLon) * Math.cos(lat * Math.PI / 180));
  });
  let distance = segmentLengths.reduce((total, segment) => total + segment, 0) * progress;
  for (let index = 0; index < segmentLengths.length; index += 1) {
    const length = segmentLengths[index];
    if (length && distance <= length) {
      return points[index].map((start, axis) => start + (points[index + 1][axis] - start) * distance / length);
    }
    distance -= length;
  }
  return points[points.length - 1];
}
