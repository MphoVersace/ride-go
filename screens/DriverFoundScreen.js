import { useEffect, useMemo, useState } from 'react';
import { openScreen } from '../navigation/routes';
import { TripLayout } from '../rides/TripLayout';
import { TrackingTrip, useDemoProgress } from '../rides/TrackingTrip';
import { demoPlaces, loadRoadRoute } from '../rides/trip';
import { Action } from '../ui/AuthLayout';

export default function DriverFoundScreen({ navigation, route }) {
  const trip = route.params;
  const pickup = trip?.pickup?.coordinate;
  const [approachRoute, setApproachRoute] = useState(undefined);
  const origin = useMemo(() => {
    if (!pickup) return null;
    const nearby = demoPlaces.find(place => place.coordinate.every((value, axis) => value === pickup[axis]));
    if (!nearby) return [pickup[0] + 0.014, pickup[1] + 0.011];
    return demoPlaces.find(place => place.label === (nearby === demoPlaces[3] ? 'Sandton City' : 'Woodmead Retail Park')).coordinate;
  }, [pickup]);

  useEffect(() => {
    if (!pickup || !origin) return;
    const pending = new AbortController();
    let active = true;
    const timeout = setTimeout(() => pending.abort(), 3500);
    loadRoadRoute(origin, pickup, pending.signal)
      .then(road => { if (active) setApproachRoute(road); })
      .catch(() => { if (active) setApproachRoute(null); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); pending.abort(); };
  }, [origin, pickup]);

  const progress = useDemoProgress(13000, approachRoute !== undefined);
  const path = useMemo(() => approachRoute?.points || [origin, pickup], [approachRoute, origin, pickup]);

  if (!pickup || !trip?.destination || !trip?.driver) {
    return <TripLayout title="No active ride" footer={<Action title="Return home" onPress={() => openScreen(navigation, 'RiderHome')} />} />;
  }

  const arrived = progress === 1;
  return (
    <TripLayout title={arrived ? 'Your driver has arrived' : 'Driver on the way'}
      description={arrived ? 'Meet your demo driver at the pickup point.' : 'Driver found. Follow the demo vehicle as it approaches your pickup.'}
      footer={arrived ? (
        <Action title="Start ride" onPress={() => navigation.replace('RideInProgress', trip)} />
      ) : (
        <Action title="Cancel ride" secondary icon="close" onPress={() => openScreen(navigation, 'RiderHome')} />
      )}>
      <TrackingTrip trip={trip} path={path} road={approachRoute} progress={progress} approach />
    </TripLayout>
  );
}
