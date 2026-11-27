import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import Icon from './Icon';
import { colors } from './theme';

const slideIcons = ['route', 'pin', 'shield'];

export default function OnboardingCarArtwork({ slide, travel }) {
  return (
    <View style={styles.artwork} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%" viewBox="0 0 360 220" style={StyleSheet.absoluteFill}>
        <Circle cx="210" cy="119" r="91" fill={colors.blueLine} />
        <Circle cx="210" cy="119" r="103" fill="none" stroke={colors.blueLine} />
        <Path d="M 28 184 H 332" stroke={colors.blueInk} opacity="0.24" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M 46 195 H 88 M 104 195 H 130 M 302 195 H 314" stroke={colors.blueInk} opacity="0.20" strokeWidth="1.5" strokeLinecap="round" />
        <Ellipse cx="180" cy="183" rx="130" ry="5" fill={colors.blueInk} opacity="0.13" />
      </Svg>
      <View style={styles.slideIcon}>
        <Icon name={slideIcons[slide]} size={20} color={colors.blueInk} />
      </View>
      <Animated.Image
        source={require('../assets/onboarding-car.png')}
        resizeMode="contain"
        fadeDuration={0}
        style={[styles.car, { transform: [{ translateX: travel }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: { width: '100%', aspectRatio: 360 / 220, borderRadius: 24, overflow: 'hidden', backgroundColor: colors.blueTint },
  slideIcon: { position: 'absolute', top: 16, left: 16, width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  car: { position: 'absolute', left: '9%', bottom: '17%', width: '82%', height: '60%' },
});
