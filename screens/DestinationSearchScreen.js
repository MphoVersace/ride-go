import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Pressable, Text, View } from 'react-native';
import { Action, Field, FormError } from '../ui/AuthLayout';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';
import { TripLayout, tripStyles } from '../rides/TripLayout';
import { currentPickup, demoPlaces, findPlaces } from '../rides/trip';

const labels = { pickup: 'Pickup', destination: 'Destination' };

export default function DestinationSearchScreen({ navigation, route }) {
  const initial = route.params;
  const [places, setPlaces] = useState({ pickup: initial?.pickup, destination: initial?.destination });
  const [fields, setFields] = useState({ pickup: initial?.pickup?.label || '', destination: initial?.destination?.label || '' });
  const [active, setActive] = useState(places.pickup ? 'destination' : 'pickup');
  const [results, setResults] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const destinationField = useRef(null);
  const request = useRef(null);

  useEffect(() => () => request.current?.abort(), []);

  function cancelSearch() {
    request.current?.abort();
    request.current = null;
    setBusy(false);
    setResults(null);
    setMessage('');
  }

  function focus(field) {
    if (field === active) return;
    cancelSearch();
    setActive(field);
  }

  function change(field, value) {
    cancelSearch();
    setActive(field);
    setFields(current => ({ ...current, [field]: value }));
    setPlaces(current => ({ ...current, [field]: undefined }));
  }

  function select(place, field = active) {
    cancelSearch();
    setFields(current => ({ ...current, [field]: place.label }));
    setPlaces(current => ({ ...current, [field]: place }));
    if (field === 'pickup') {
      setActive('destination');
      destinationField.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }

  async function runSearch(useGps = false) {
    const term = fields[active].trim();
    if (!useGps && term.length < 3) {
      setMessage('Enter at least three characters to search.');
      return;
    }
    cancelSearch();
    const pending = new AbortController();
    request.current = pending;
    setBusy(true);
    try {
      if (useGps) {
        const pickup = await currentPickup();
        if (!pending.signal.aborted) select(pickup, 'pickup');
      } else {
        const matches = await findPlaces(term, pending.signal);
        if (!pending.signal.aborted) setResults(matches);
      }
    } catch (error) {
      if (!pending.signal.aborted) setMessage(error.message || 'Couldn’t resolve this location. Try a suggested place.');
    } finally {
      if (request.current === pending) {
        setBusy(false);
        request.current = null;
      }
    }
  }

  const samePlace = places.pickup && places.destination &&
    places.pickup.coordinate.every((value, axis) => value === places.destination.coordinate[axis]);
  const ready = places.pickup && places.destination && !samePlace;
  const submit = () => {
    Keyboard.dismiss();
    if (initial?.editRide) navigation.popTo('RideOptions', { ...places, selectedRideId: initial.selectedRideId, paymentMethod: initial.paymentMethod });
    else navigation.navigate('RideOptions', places);
  };

  return (
    <TripLayout title="Plan your ride" description="Choose where the driver should collect you and where you’re headed." back={() => navigation.goBack()}>
      <Field label="Pickup" icon="compass" value={fields.pickup} placeholder="Enter your pickup address"
        onFocus={() => focus('pickup')} onChangeText={text => change('pickup', text)}
        onSubmitEditing={() => runSearch()} returnKeyType="search" />
      <Pressable style={tripStyles.row} onPress={() => runSearch(true)} disabled={busy} accessibilityRole="button">
        <Icon name="pin" size={19} color={colors.blueInk} />
        <Text style={tripStyles.blue}>Use current location</Text>
      </Pressable>
      <Field ref={destinationField} label="Destination" icon="pin" value={fields.destination} placeholder="Search suburb, address or place"
        onFocus={() => focus('destination')} onChangeText={text => change('destination', text)}
        onSubmitEditing={() => runSearch()} returnKeyType="search" />
      <Action title={'Search ' + labels[active].toLowerCase()} secondary icon="search" disabled={busy} onPress={() => runSearch()} />
      {busy && <ActivityIndicator color={colors.blueInk} accessibilityLabel="Looking up location" />}
      {message ? <FormError>{message}</FormError> : null}
      {samePlace ? <FormError>Choose a destination different from your pickup.</FormError> : null}
      <View style={tripStyles.card}>
        <Text style={tripStyles.heading}>{results ? 'Search results' : 'Suggested places'} · {labels[active]}</Text>
        {results?.length === 0 && <Text style={tripStyles.muted}>No matches. Try a different query or choose a suggested place below.</Text>}
        {(results?.length ? results : demoPlaces).map(place => (
          <Pressable key={place.coordinate.join(',') + place.label} style={[tripStyles.row, { minHeight: 50 }]} accessibilityRole="button" onPress={() => select(place)}>
            <Icon name="pin" size={20} color={colors.blueInk} />
            <View style={tripStyles.flex}>
              <Text style={tripStyles.text}>{place.label}</Text>
              <Text style={tripStyles.muted}>{place.detail}</Text>
            </View>
            <Icon name="right" size={18} />
          </Pressable>
        ))}
      </View>
      <Action title="Choose a ride" disabled={!ready} onPress={submit} />
    </TripLayout>
  );
}
