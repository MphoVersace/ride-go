import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Action, Wordmark } from '../ui/AuthLayout';
import { colors } from '../ui/theme';

const slides = [
  { title: 'Your ride.', accent: 'Your way.', description: 'Choose where you’re going and find a ride that suits you.' },
  { title: 'Follow', accent: 'every turn.', description: 'See where your driver is and follow the trip from pickup to drop-off.' },
  { title: 'Ride with', accent: 'confidence.', description: 'Find your driver details and reach the Safety Centre from the app.' },
];

function OnboardingDecorations() {
  return (
    <View
      pointerEvents="none"
      aria-hidden
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.decorations}
    >
      <View style={[styles.guide, styles.guideLeft]} />
      <View style={[styles.guide, styles.guideRight]} />
      <View style={[styles.orbit, styles.orbitOuter]} />
      <View style={[styles.orbit, styles.orbitInner]} />
      <View style={styles.cross}>
        <View style={styles.crossHorizontal} />
        <View style={styles.crossVertical} />
      </View>
      <View style={styles.orbitPoint} />
    </View>
  );
}

export default function SplashOnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const { title, accent, description } = slides[index];
  const last = index === slides.length - 1;
  const continueToAccount = () => navigation.navigate('Account');

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Wordmark />
          <Pressable style={styles.skip} onPress={continueToAccount} accessibilityRole="button">
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>
        <View style={styles.hero}>
          <OnboardingDecorations />
          <View style={styles.copy}>
            <Text accessibilityRole="header" style={[styles.title, width < 360 && styles.compactTitle]}>
              {title}{'\n'}<Text style={styles.accent}>{accent}</Text>
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.pagination} accessible accessibilityLabel={`Page ${index + 1} of ${slides.length}`}>
            {slides.map((slide, page) => (
              <View key={slide.title} style={[styles.dot, page === index && styles.activeDot]} />
            ))}
          </View>
          <Action title={last ? 'Get started' : 'Next'} onPress={last ? continueToAccount : () => setIndex(index + 1)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { flexGrow: 1, width: '100%', maxWidth: 560, alignSelf: 'center', padding: 24, gap: 24 },
  top: { minHeight: 44, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skip: { minHeight: 44, minWidth: 48, justifyContent: 'center', alignItems: 'center' },
  skipText: { color: colors.blueInk, fontSize: 15, fontWeight: '800' },
  hero: { flexGrow: 1, minHeight: 360, justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 52 },
  decorations: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  guide: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.blueTint },
  guideLeft: { left: '25%' },
  guideRight: { right: '25%' },
  orbit: { position: 'absolute', aspectRatio: 1, borderRadius: 999, borderWidth: 1 },
  orbitOuter: { width: '128%', right: '-43%', bottom: '-20%', borderColor: colors.blueTint },
  orbitInner: { width: '103%', right: '-30.5%', bottom: '-10%', borderColor: colors.blueLine, backgroundColor: '#EAF6FF66' },
  cross: { position: 'absolute', top: '17%', left: '13%', width: 22, height: 22, transform: [{ rotate: '-12deg' }] },
  crossHorizontal: { position: 'absolute', top: 10, width: 22, height: 2, backgroundColor: colors.blue, borderRadius: 1 },
  crossVertical: { position: 'absolute', left: 10, width: 2, height: 22, backgroundColor: colors.blue, borderRadius: 1 },
  orbitPoint: { position: 'absolute', right: '11%', bottom: '19%', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.blue },
  copy: { alignItems: 'center', gap: 22 },
  title: { fontSize: 48, letterSpacing: -2.2, lineHeight: 52, color: colors.black, fontWeight: '900', textAlign: 'center' },
  compactTitle: { fontSize: 39, lineHeight: 44, letterSpacing: -1.6 },
  accent: { color: colors.blueInk },
  description: { color: colors.muted, fontSize: 16, lineHeight: 24, maxWidth: 294, textAlign: 'center' },
  footer: { gap: 17 },
  pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.blueLine },
  activeDot: { width: 24, backgroundColor: colors.blueInk },
});
