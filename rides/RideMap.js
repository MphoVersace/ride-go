import { useRef, useState } from 'react';
import { Image, Linking, PanResponder, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';
import { defaultMapCenter } from './trip';

const tileSize = 256;
const maximumLatitude = 85.051129;
const tileTemplate = process.env.EXPO_PUBLIC_RIDEGO_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileHeaders = { 'User-Agent': 'RideGo/1.0 (+https://github.com/MphoVersace/ride-go)' };
const credit = 'https://www.openstreetmap.org/copyright';

function project([latitude, longitude], zoom) {
  const latitudeRadians = Math.max(-maximumLatitude, Math.min(maximumLatitude, latitude)) * Math.PI / 180;
  const scale = tileSize * 2 ** zoom;
  return [
    (longitude + 180) / 360 * scale,
    (1 - Math.asinh(Math.tan(latitudeRadians)) / Math.PI) / 2 * scale,
  ];
}

function frameMap(points, width, height) {
  if (points.length < 2) {
    const zoom = points.length ? 15 : 13;
    return { zoom, center: project(points[0] || defaultMapCenter, zoom) };
  }
  const projected = points.map(point => project(point, 0));
  const x = projected.map(point => point[0]);
  const y = projected.map(point => point[1]);
  const bounds = [Math.min(...x), Math.min(...y), Math.max(...x), Math.max(...y)];
  const scale = Math.min(
    Math.max(1, width - 80) / Math.max(0.000001, bounds[2] - bounds[0]),
    Math.max(1, height - 80) / Math.max(0.000001, bounds[3] - bounds[1]),
  );
  const zoom = Math.max(2, Math.min(16, Math.floor(Math.log2(scale))));
  const multiplier = 2 ** zoom / 2;
  return { zoom, center: [(bounds[0] + bounds[2]) * multiplier, (bounds[1] + bounds[3]) * multiplier] };
}

function tilesInView(left, top, width, height, zoom) {
  const tiles = [];
  const limit = 2 ** zoom;
  for (let y = Math.max(0, Math.floor(top / tileSize)); y < Math.min(limit, Math.ceil((top + height) / tileSize)); y += 1) {
    for (let x = Math.floor(left / tileSize); x < Math.ceil((left + width) / tileSize); x += 1) {
      const wrappedX = ((x % limit) + limit) % limit;
      const url = tileTemplate.replace('{z}', zoom).replace('{x}', wrappedX).replace('{y}', y);
      tiles.push({ key: [zoom, x, y].join('/'), url, left: x * tileSize - left, top: y * tileSize - top });
    }
  }
  return tiles;
}

function MapMarker({ coordinate, screenPoint, kind }) {
  if (!coordinate) return null;
  const [x, y] = screenPoint(coordinate);
  return (
    <View testID={'map-marker-' + kind} style={[styles.marker, styles[kind], { left: x - 14, top: y - 14 }]}>
      <Icon name={kind === 'driver' ? 'car' : kind === 'pickup' ? 'compass' : 'pin'}
        size={17} color={kind === 'driver' ? colors.navy : colors.white} />
    </View>
  );
}

export default function RideMap({ pickup, destination, driver, points, preview = false, height = 246 }) {
  const [width, setWidth] = useState(0);
  const [manual, setManual] = useState(null);
  const [load, setLoad] = useState('loading');
  const panStart = useRef(null);
  const fit = [pickup, destination, ...(points || [])].filter(Boolean);
  const key = JSON.stringify([fit, width, height]);
  const camera = manual?.key === key ? manual : frameMap(fit, width, height);
  const { zoom, center } = camera;
  const left = center[0] - width / 2;
  const top = center[1] - height / 2;

  function screenPoint(coordinate) {
    const [x, y] = project(coordinate, zoom);
    return [x - left, y - top];
  }

  function adjustZoom(step) {
    const next = Math.max(2, Math.min(19, zoom + step));
    setManual({ key, zoom: next, center: center.map(value => value * 2 ** (next - zoom)) });
  }

  // Track movement from the last event so the camera does not reset during a drag.
  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) + Math.abs(gesture.dy) > 8,
    onPanResponderGrant: () => { panStart.current = { ...camera, key }; },
    onPanResponderMove: (_, { dx, dy }) => {
      const start = panStart.current;
      if (!start || start.key !== key) return;
      const world = tileSize * 2 ** start.zoom;
      const y = Math.max(0, Math.min(world, start.center[1] - dy));
      setManual({ key, zoom: start.zoom, center: [start.center[0] - dx, y] });
    },
  });

  return (
    <View style={[styles.map, { height }]} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <View style={StyleSheet.absoluteFill} {...responder.panHandlers}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {width > 0 && tilesInView(left, top, width, height, zoom).map(tile => (
            <Image key={tile.key} source={{ uri: tile.url, headers: Platform.OS === 'web' ? undefined : tileHeaders }}
              accessibilityIgnoresInvertColors fadeDuration={0} resizeMode="stretch" testID="street-map-tile"
              onLoad={() => setLoad('loaded')} onError={() => setLoad(current => current === 'loaded' ? current : 'error')}
              style={[styles.tile, { left: tile.left, top: tile.top }]} />
          ))}
          {points?.length > 1 && (
            <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
              <Polyline points={points.map(point => screenPoint(point).join(',')).join(' ')}
                stroke={colors.blueInk} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={preview ? '5 9' : undefined} />
            </Svg>
          )}
          <MapMarker coordinate={pickup} screenPoint={screenPoint} kind="pickup" />
          <MapMarker coordinate={destination} screenPoint={screenPoint} kind="destination" />
          <MapMarker coordinate={driver} screenPoint={screenPoint} kind="driver" />
        </View>
      </View>
      {load !== 'loaded' && (
        <Text style={styles.notice} pointerEvents="none">
          {load === 'error' ? 'Map tiles unavailable' : 'Loading map…'}
        </Text>
      )}
      <View style={styles.controls}>
        <Pressable accessibilityRole="button" accessibilityLabel="Zoom map in" onPress={() => adjustZoom(1)} style={styles.control}>
          <Icon name="plus" size={20} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Zoom map out" onPress={() => adjustZoom(-1)} style={styles.control}>
          <Text style={styles.minus}>−</Text>
        </Pressable>
        {manual?.key === key && (
          <Pressable accessibilityRole="button" accessibilityLabel="Recenter map" onPress={() => setManual(null)} style={styles.control}>
            <Icon name="compass" size={19} />
          </Pressable>
        )}
      </View>
      <Text accessibilityRole="link" onPress={() => Linking.openURL(credit)} style={styles.attribution}>© OpenStreetMap contributors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { overflow: 'hidden', borderRadius: 20, backgroundColor: colors.blueTint, borderWidth: 1, borderColor: colors.blueLine },
  tile: { position: 'absolute', width: tileSize + 0.5, height: tileSize + 0.5 },
  marker: { position: 'absolute', width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  pickup: { backgroundColor: colors.blueInk },
  destination: { backgroundColor: colors.navy },
  driver: { backgroundColor: colors.blue },
  controls: { position: 'absolute', top: 8, right: 8, gap: 4 },
  control: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  minus: { color: colors.navy, fontSize: 24, lineHeight: 26 },
  attribution: { position: 'absolute', bottom: 0, right: 0, padding: 4, fontSize: 10, backgroundColor: colors.white, color: colors.blueInk },
  notice: { position: 'absolute', top: 9, left: 9, backgroundColor: colors.white, color: colors.navy, padding: 6, borderRadius: 6, fontSize: 12 },
});
