import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RideMap from '../rides/RideMap';
import SlideToConfirm from '../rides/SlideToConfirm';
import { TripLayout, TripStops, tripStyles } from '../rides/TripLayout';
import { loadRoadRoute, rideTiers } from '../rides/trip';
import { Action } from '../ui/AuthLayout';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';

const demoPayments = ['Cash', 'Card'];

export default function RideOptionsScreen({ navigation, route }) {
  const { pickup, destination } = route.params ?? {};
  const [selectedRideId, setSelectedRideId] = useState(route.params?.selectedRideId || rideTiers[0].id);
  const [paymentMethod, setPaymentMethod] = useState(route.params?.paymentMethod || demoPayments[0]);
  const [preview, setPreview] = useState(null);
  const selectedRide = rideTiers.find(tier => tier.id === selectedRideId);

  useEffect(() => {
    if (!pickup || !destination) return;
    const pending = new AbortController();
    let active = true;
    setPreview(null);
    const timeout = setTimeout(() => pending.abort(), 8500);
    loadRoadRoute(pickup.coordinate, destination.coordinate, pending.signal)
      .then(road => { if (active) setPreview({ pickup, destination, road }); })
      .catch(() => { if (active) setPreview({ pickup, destination, road: null }); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); pending.abort(); };
  }, [pickup, destination]);

  if (!pickup || !destination) {
    return <TripLayout title="Choose a ride"><Action title="Set your pickup and destination" onPress={() => navigation.replace('DestinationSearch')} /></TripLayout>;
  }

  const current = preview?.pickup === pickup && preview?.destination === destination ? preview : null;
  const road = current?.road;
  const edit = () => navigation.navigate('DestinationSearch', { pickup, destination, selectedRideId, paymentMethod, editRide: true });
  const confirm = () => navigation.navigate('RideSearching', { pickup, destination, selectedRide, paymentMethod, road });

  return (
    <TripLayout title="Choose a ride" back={() => navigation.goBack()} footer={
      <View style={styles.footer}>
        <View style={[tripStyles.row, styles.spread]}>
          <Text style={tripStyles.text}>{selectedRide.name}</Text>
          <Text style={tripStyles.blue}>{selectedRide.price}</Text>
        </View>
        <SlideToConfirm key={selectedRide.id} label="Slide or tap to confirm" onConfirm={confirm} />
      </View>
    }>
      <RideMap pickup={pickup.coordinate} destination={destination.coordinate}
        points={road?.points || [pickup.coordinate, destination.coordinate]} preview={!road} height={225} />
      <Text style={tripStyles.muted}>
        {road ? road.minutes + ' min · ' + road.km.toFixed(1) + ' km' : current ? 'Direct line preview · Road route unavailable' : 'Looking up the road route…'}
      </Text>
      <TripStops pickup={pickup} destination={destination} onEdit={edit} />
      <Text style={tripStyles.heading}>Ride tiers</Text>
      {rideTiers.map(tier => {
        const selected = tier.id === selectedRideId;
        return (
          <Pressable key={tier.id} accessibilityRole="radio" accessibilityLabel={tier.name} accessibilityState={{ checked: selected }}
            onPress={() => setSelectedRideId(tier.id)} style={[tripStyles.card, tripStyles.row, selected && styles.selected]}>
            <View style={styles.tierIcon}><Icon name={tier.icon} size={24} color={colors.blueInk} /></View>
            <View style={tripStyles.flex}>
              <Text style={tripStyles.text}>{tier.name} · {tier.capacity} seats</Text>
              <Text style={tripStyles.muted}>{tier.eta} · {tier.description}</Text>
            </View>
            <Text style={tripStyles.blue}>{tier.price}</Text>
          </Pressable>
        );
      })}
      <View style={tripStyles.card}>
        <Text style={tripStyles.heading}>Payment preference</Text>
        <View style={tripStyles.row}>
          {demoPayments.map(method => (
            <Pressable key={method} accessibilityRole="radio" accessibilityState={{ checked: method === paymentMethod }}
              style={[styles.payment, method === paymentMethod && styles.selected]} onPress={() => setPaymentMethod(method)}>
              <Icon name={method === 'Card' ? 'card' : 'wallet'} size={17} />
              <Text style={tripStyles.text}>{method}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={tripStyles.muted}>Demo booking · No charge</Text>
      </View>
    </TripLayout>
  );
}

const styles = StyleSheet.create({
  selected: { borderColor: colors.blueInk, backgroundColor: colors.blueTint },
  spread: { justifyContent: 'space-between' },
  footer: { gap: 8 },
  tierIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.blueTint, alignItems: 'center', justifyContent: 'center' },
  payment: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.line },
});
