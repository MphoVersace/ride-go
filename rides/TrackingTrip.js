import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RideMap from './RideMap';
import { TripStops, tripStyles } from './TripLayout';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';
import { positionOnRoute } from './trip';

export function useDemoProgress(duration, ready = true) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!ready) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const next = Math.min(1, (Date.now() - start) / duration);
      setProgress(next);
      if (next === 1) clearInterval(timer);
    }, 160);
    return () => clearInterval(timer);
  }, [duration, ready]);
  return progress;
}

export function TrackingTrip({ trip, path, road, progress, approach }) {
  const driver = useMemo(() => positionOnRoute(path, progress), [path, progress]);
  const { pickup, destination, selectedRide, paymentMethod } = trip;
  return (
    <>
      <RideMap pickup={pickup.coordinate} destination={approach ? undefined : destination.coordinate}
        driver={driver} points={path} preview={!road} height={285} />
      <Text style={tripStyles.muted}>{road ? 'Road route · Simulated driver position' : 'Direct line preview · Simulated driver position'}</Text>
      <View style={tripStyles.card}>
        <View style={tripStyles.row}>
          <View style={styles.avatar}><Text style={tripStyles.blue}>{trip.driver.initials}</Text></View>
          <View style={tripStyles.flex}>
            <Text style={tripStyles.heading}>{trip.driver.name}</Text>
            <Text style={tripStyles.muted}>{trip.driver.vehicle}</Text>
          </View>
          <Icon name="star" size={16} color={colors.blueInk} />
          <Text style={tripStyles.text}>{trip.driver.rating}</Text>
        </View>
        <View style={[tripStyles.row, styles.details]}>
          <Text style={tripStyles.text}>{trip.driver.plate}</Text>
          <Text style={tripStyles.blue}>{selectedRide.name}</Text>
        </View>
      </View>
      <TripStops pickup={pickup} destination={destination} />
      <View style={[tripStyles.card, tripStyles.row, styles.details]}>
        <Text style={tripStyles.muted}>{paymentMethod} · Demo fare</Text>
        <Text style={tripStyles.blue}>{selectedRide.price}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 44, height: 44, backgroundColor: colors.blueTint, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  details: { justifyContent: 'space-between' },
});
