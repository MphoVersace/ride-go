import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { openScreen } from '../navigation/routes';
import { TripLayout, TripStops, tripStyles } from '../rides/TripLayout';
import { demoDriver } from '../rides/trip';
import { Action } from '../ui/AuthLayout';
import { colors } from '../ui/theme';

function DispatchRadar() {
  return (
    <View style={{ alignItems: 'center', padding: 16, backgroundColor: colors.blueTint, borderRadius: 20 }} aria-hidden>
      <Svg width={162} height={162} viewBox="0 0 162 162">
        {[32, 55, 77].map(radius => <Circle key={radius} cx={81} cy={81} r={radius} fill="none" stroke={colors.blueLine} />)}
        <Line x1={81} x2={81} y1={4} y2={158} stroke={colors.blueLine} />
        <Line x1={4} x2={158} y1={81} y2={81} stroke={colors.blueLine} />
        <Path d="M81 81L81 4A77 77 0 0 1 144 37Z" fill={colors.blue} opacity=".32" />
        <Circle cx={81} cy={81} r={8} fill={colors.blueInk} />
        <Circle cx={47} cy={50} r={4} fill={colors.blueInk} />
        <Circle cx={133} cy={100} r={4} fill={colors.blueInk} />
      </Svg>
    </View>
  );
}

export default function RideSearchingScreen({ navigation, route }) {
  const trip = route.params;
  const ready = Boolean(trip?.pickup && trip?.destination && trip?.selectedRide);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => navigation.replace('DriverFound', { ...trip, driver: demoDriver }), 3600);
    return () => clearTimeout(timer);
  }, [navigation, ready, trip]);

  if (!ready) return <TripLayout title="No active request" footer={<Action title="Return home" onPress={() => openScreen(navigation, 'RiderHome')} />} />;

  return (
    <TripLayout title="Finding your driver" description="Looking for a nearby driver for your demo ride." footer={
      <Action title="Cancel request" secondary icon="close" onPress={() => navigation.goBack()} />
    }>
      <DispatchRadar />
      <View style={tripStyles.row}>
        <ActivityIndicator color={colors.blueInk} accessibilityLabel="Searching for a demo driver" />
        <Text style={tripStyles.blue}>Searching nearby</Text>
      </View>
      <View style={tripStyles.card}>
        <Text style={tripStyles.heading}>{trip.selectedRide.name} · {trip.selectedRide.price}</Text>
        <Text style={tripStyles.muted}>{trip.paymentMethod}{trip.road ? ' · ' + trip.road.km.toFixed(1) + ' km · ' + trip.road.minutes + ' min' : ''}</Text>
      </View>
      <TripStops pickup={trip.pickup} destination={trip.destination} />
    </TripLayout>
  );
}
