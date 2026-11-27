import { StackActions } from '@react-navigation/native';

export const riderTabs = [
  ['RiderHome', 'Home', 'home'],
  ['RideHistory', 'Trips', 'route'],
  ['SavedPlaces', 'Places', 'pin'],
  ['SafetyCentre', 'Safety', 'shield'],
  ['RiderProfile', 'Profile', 'user'],
];

export const driverTabs = [
  ['DriverHome', 'Home', 'home'],
  ['DriverTrips', 'Trips', 'route'],
  ['DriverEarnings', 'Earnings', 'wallet'],
  ['DriverNotifications', 'Alerts', 'bell'],
  ['DriverProfile', 'Profile', 'user'],
];

const tabGroups = Object.fromEntries([
  ...riderTabs.map(([name]) => [name, 'RiderTabs']),
  ...driverTabs.map(([name]) => [name, 'DriverTabs']),
]);

export function openScreen(navigation, name, params) {
  const group = tabGroups[name];
  if (group && !navigation.getState().routeNames.includes(name)) {
    navigation.dispatch(StackActions.popTo(group, { screen: name, params, initial: false }));
  } else {
    navigation.navigate(name, params);
  }
}

export function enterApp(navigation, role) {
  navigation.reset({ index: 0, routes: [{ name: role === 'driver' ? 'DriverTabs' : 'RiderTabs' }] });
}

export function leaveApp(navigation) {
  let root = navigation;
  while (root.getParent()) root = root.getParent();
  root.reset({ index: 0, routes: [{ name: 'Account' }] });
}
