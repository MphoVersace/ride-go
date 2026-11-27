import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';
import { driverTabs, riderTabs } from './routes';
import RiderHomeScreen from '../screens/RiderHomeScreen';
import RideHistoryScreen from '../screens/RideHistoryScreen';
import SavedPlacesScreen from '../screens/SavedPlacesScreen';
import SafetyCentreScreen from '../screens/SafetyCentreScreen';
import RiderProfileScreen from '../screens/RiderProfileScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import DriverTripsScreen from '../screens/DriverTripsScreen';
import DriverEarningsScreen from '../screens/DriverEarningsScreen';
import DriverNotificationsScreen from '../screens/DriverNotificationsScreen';
import DriverProfileScreen from '../screens/DriverProfileScreen';
import { useReduceMotion } from '../ui/useReduceMotion';

const Tabs = createBottomTabNavigator();
const screens = {
  RiderHome: RiderHomeScreen,
  RideHistory: RideHistoryScreen,
  SavedPlaces: SavedPlacesScreen,
  SafetyCentre: SafetyCentreScreen,
  RiderProfile: RiderProfileScreen,
  DriverHome: DriverHomeScreen,
  DriverTrips: DriverTripsScreen,
  DriverEarnings: DriverEarningsScreen,
  DriverNotifications: DriverNotificationsScreen,
  DriverProfile: DriverProfileScreen,
};
const meta = Object.fromEntries([...riderTabs, ...driverTabs].map(([name, label, icon]) => [name, { label, icon }]));

function FloatingTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReduceMotion();
  const [width, setWidth] = useState(0);
  const position = useRef(new Animated.Value(state.index)).current;
  const tabWidth = width / state.routes.length;

  useEffect(() => {
    if (reduceMotion) {
      position.setValue(state.index);
      return;
    }
    const slide = Animated.spring(position, { toValue: state.index, useNativeDriver: Platform.OS !== 'web', damping: 19, stiffness: 225, mass: 0.8 });
    slide.start();
    return () => slide.stop();
  }, [state.index, position, reduceMotion]);

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 10), paddingLeft: Math.max(insets.left, 12), paddingRight: Math.max(insets.right, 12) }]}>
      <View style={styles.bar} accessibilityRole="tablist">
        <View style={styles.track} onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}>
          {tabWidth > 0 && (
            <Animated.View pointerEvents="none" style={[styles.activeIndicator, { width: tabWidth - 4, transform: [{ translateX: Animated.multiply(position, tabWidth) }] }]} />
          )}
          {state.routes.map((route, index) => {
            const { label, icon } = meta[route.name];
            const active = index === state.index;
            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                aria-selected={active}
                accessibilityLabel={label}
                onPress={() => {
                  const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                  if (!active && !event.defaultPrevented) navigation.navigate(route.name, route.params);
                }}
                onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
                style={styles.tab}
              >
                <Icon name={icon} size={22} color={active ? colors.blueInk : colors.muted} />
                <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function renderTabBar(props) {
  return <FloatingTabBar {...props} />;
}

function RideTabs({ routes }) {
  return (
    <Tabs.Navigator backBehavior="history" screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      {routes.map(([name, title]) => <Tabs.Screen key={name} name={name} component={screens[name]} options={{ title }} />)}
    </Tabs.Navigator>
  );
}

export function RiderTabs() { return <RideTabs routes={riderTabs} />; }
export function DriverTabs() { return <RideTabs routes={driverTabs} />; }

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.white, alignItems: 'center', paddingTop: 6 },
  bar: { width: '100%', maxWidth: 480, backgroundColor: colors.white, borderRadius: 23, padding: 5, borderWidth: 1, borderColor: colors.blueLine, shadowColor: colors.navy, shadowOpacity: 0.13, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  track: { flexDirection: 'row' },
  activeIndicator: { position: 'absolute', top: 2, bottom: 2, left: 2, backgroundColor: colors.blueTint, borderRadius: 17 },
  tab: { flex: 1, minHeight: 54, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', gap: 3 },
  label: { fontSize: 11, fontWeight: '600', color: colors.muted, textAlign: 'center' },
  activeLabel: { fontWeight: '800', color: colors.blueInk },
});
