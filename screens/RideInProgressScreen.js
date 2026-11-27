import { useMemo } from 'react';
import { openScreen } from '../navigation/routes';
import { TripLayout } from '../rides/TripLayout';
import { TrackingTrip, useDemoProgress } from '../rides/TrackingTrip';
import { Action } from '../ui/AuthLayout';

export default function RideInProgressScreen({ navigation, route }) {
  const trip = route.params;
  const progress = useDemoProgress(20000, Boolean(trip?.driver));
  const path = useMemo(() => trip?.road?.points || [trip?.pickup?.coordinate, trip?.destination?.coordinate], [trip]);

  if (!trip?.pickup || !trip?.destination || !trip?.driver) {
    return <TripLayout title="No active ride" footer={<Action title="Return home" onPress={() => openScreen(navigation, 'RiderHome')} />} />;
  }

  return (
    <TripLayout title={progress === 1 ? 'You’ve reached your destination' : 'On the way to your destination'}
      description="Follow the vehicle and review your trip details as you go."
      footer={<Action title={progress === 1 ? 'View trip summary' : 'Finish demo trip'} onPress={() => navigation.replace('TripCompleted', { ...trip, completedAt: Date.now() })} />}>
      <TrackingTrip trip={trip} path={path} road={trip.road} progress={progress} />
    </TripLayout>
  );
}
