import { useEffect, useId, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import Icon from './Icon';
import { colors } from './theme';
import { useReduceMotion } from './useReduceMotion';

const width = 360;
const height = 228;
const road = 'M -8 207 C 84 209 141 206 161 178 C 191 136 97 144 127 114 C 153 89 271 110 294 65 C 305 44 279 35 298 15';
const waypoints = [[14, 207], [58, 207], [101, 203], [137, 195], [161, 178], [165, 166], [151, 155], [130, 146], [119, 131], [127, 114], [159, 104], [205, 100], [252, 92], [279, 80], [294, 65]];
const timeline = waypoints.map((_, index) => index / (waypoints.length - 1));
const angles = [];
waypoints.forEach(([x, y], index) => {
  const before = waypoints[Math.max(0, index - 1)];
  const after = waypoints[index + 1] ?? [x, y];
  let angle = Math.atan2(after[1] - before[1], after[0] - before[0]) * 180 / Math.PI + 90;
  const previous = angles[index - 1] ?? angle;
  while (angle - previous > 180) angle -= 360;
  while (angle - previous < -180) angle += 360;
  angles.push(angle);
});
const blockColors = [['#C7EBFF', '#9EDBFF'], ['#DAF1FF', '#B3E3FF'], ['#AFDFFF', '#8ED4FC']];

function Building({ x, y, scale = 1 }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path d="M0 35 L30 19 L64 37 L33 54Z" fill="#6B9CBA" opacity=".22" />
      <Path d="M0 13 L27 0 L53 12 L27 26Z" fill="#FFFFFF" />
      <Path d="M0 13 L27 26 L27 47 L0 34Z" fill="#BBE5FC" />
      <Path d="M27 26 L53 12 L53 34 L27 47Z" fill="#73B9E8" />
      <Path d="M7 23 L18 28 L18 34 L7 29Z M35 29 L45 23 L45 29 L35 35Z" fill="#287AB0" opacity=".8" />
    </G>
  );
}

function Pin({ x, y, fill }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Path d="M0 27 C-4 19 -13 12 -13 4 A13 13 0 1 1 13 4 C13 12 4 20 0 27Z" fill={fill} />
      <Circle cx="0" cy="4" r="4.5" fill={colors.white} />
    </G>
  );
}

function Car() {
  return (
    <Svg width={31} height={43} viewBox="0 0 31 43">
      <Rect x="4" y="5" width="24" height="34" rx="10" fill="#126291" opacity=".24" />
      <Rect x="1" y="8" width="29" height="28" rx="6" fill={colors.navy} />
      <Rect x="3.5" y="1" width="24" height="40" rx="10" fill="#168BDA" stroke="#075C96" />
      <Path d="M6 13 Q15.5 8 25 13 L23 18 H8Z M8 30 H23 L25 34 Q15.5 37 6 34Z" fill={colors.navy} />
      <Path d="M7 7 L12 5 M24 7 L19 5" stroke="#D5F4FF" strokeWidth="2.5" strokeLinecap="round" />
      <Rect x="8" y="19" width="15" height="9" rx="3" fill={colors.blue} />
    </Svg>
  );
}

export default function RouteArtwork({ variant = 0, animate = false, fast = false }) {
  const gradient = `route-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const position = useRef(new Animated.Value(1)).current;
  const [start, end] = blockColors[variant];

  const reduceMotion = useReduceMotion();

  useEffect(() => {
    position.setValue(1);
    if (!animate || reduceMotion) return;
    position.setValue(0);
    const drive = Animated.timing(position, {
      toValue: 1,
      duration: fast ? 740 : 4600,
      easing: fast ? Easing.out(Easing.cubic) : Easing.inOut(Easing.sin),
      isInteraction: false,
      useNativeDriver: Platform.OS !== 'web',
    });
    const motion = fast ? drive : Animated.loop(Animated.sequence([drive, Animated.delay(1200)]));
    motion.start();
    return () => motion.stop();
  }, [animate, fast, position, reduceMotion, variant]);

  return (
    <View style={styles.art} onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={start} /><Stop offset="1" stopColor={end} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${gradient})`} />
        <Path d="M-10 35 L178 130 L367 34 M-10 80 L174 173 L367 77 M-10 124 L179 219 L367 124 M61 0 L360 151 M151 0 L360 106 M240 0 L360 61 M25 228 L360 60 M123 228 L360 111 M221 228 L360 160" stroke="#83C4EA" strokeWidth="1" opacity=".54" fill="none" />
        <Path d="M4 150 L58 123 L113 151 L60 178Z M217 167 L268 141 L326 169 L273 197Z M142 51 L187 27 L234 52 L190 75Z" fill="#B8E6FC" stroke="#87C8ED" />
        <Path d={road} transform="translate(0 6)" stroke="#2879AA" strokeWidth="29" opacity=".18" fill="none" />
        <Path d={road} stroke={colors.white} strokeWidth="25" fill="none" />
        <Path d={road} stroke="#2E86BF" strokeWidth="1.8" strokeDasharray="6 6" fill="none" />
        <Building x={26} y={116} scale={0.82} />
        <Building x={161} y={28} scale={0.86} />
        <Building x={242} y={144} scale={1} />
        <Building x={280} y={152} scale={0.67} />
        <Circle cx="15" cy="165" r="7" fill="#4CA7DD" /><Circle cx="103" cy="80" r="5" fill="#53ABDE" />
        <Circle cx="217" cy="171" r="6" fill="#4CA7DD" /><Circle cx="315" cy="130" r="8" fill="#4CA7DD" />
        <Pin x={95} y={121} fill="#216C9F" />
        <Pin x={302} y={31} fill={colors.navy} />
      </Svg>
      {layout.width > 0 && (
        <Animated.View pointerEvents="none" style={[styles.car, { transform: [
          { translateX: position.interpolate({ inputRange: timeline, outputRange: waypoints.map(([x]) => x * layout.width / width - 15.5) }) },
          { translateY: position.interpolate({ inputRange: timeline, outputRange: waypoints.map(([, y]) => y * layout.height / height - 21.5) }) },
          { rotate: position.interpolate({ inputRange: timeline, outputRange: angles.map((angle) => `${angle}deg`) }) },
        ] }]}><Car /></Animated.View>
      )}
      {variant > 0 && (
        <View style={styles.feature}><Icon name={variant === 1 ? 'pin' : 'shield'} color={colors.navy} size={23} /></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  art: { width: '100%', aspectRatio: width / height, borderRadius: 24, overflow: 'hidden', backgroundColor: colors.blueTint },
  car: { position: 'absolute', top: 0, left: 0 },
  feature: { position: 'absolute', top: 14, left: 14, width: 45, height: 45, backgroundColor: colors.white, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});
