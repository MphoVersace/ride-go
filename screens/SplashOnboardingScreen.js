import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Action, Wordmark } from '../ui/AuthLayout';
import OnboardingCarArtwork from '../ui/OnboardingCarArtwork';
import { colors } from '../ui/theme';
import { useReduceMotion } from '../ui/useReduceMotion';

const slides = [
  { title: 'Your ride.\nYour way.', description: 'Choose where you’re going and find a ride that suits you.' },
  { title: 'Follow every\nturn.', description: 'See where your driver is and follow the trip from pickup to drop-off.' },
  { title: 'Ride with\nconfidence.', description: 'Find your driver details and reach the Safety Centre from the app.' },
];

export default function SplashOnboardingScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [moving, setMoving] = useState(false);
  const busy = useRef(false);
  const travel = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReduceMotion();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850);
    return () => { clearTimeout(timer); travel.stopAnimation(); };
  }, [travel]);

  const { title, description } = slides[index];
  const last = index === slides.length - 1;
  const continueToAccount = () => navigation.navigate('Account');

  function next() {
    if (busy.current) return;
    if (last) return continueToAccount();
    if (reduceMotion) return setIndex(index + 1);

    busy.current = true;
    setMoving(true);
    const widthToCross = Math.min(width, 560);
    const drive = (toValue, duration, easing) => Animated.timing(travel, {
      toValue, duration, easing, isInteraction: false, useNativeDriver: Platform.OS !== 'web',
    });

    drive(widthToCross, 240, Easing.in(Easing.quad)).start(({ finished }) => {
      if (!finished) return;
      travel.setValue(-widthToCross);
      setIndex(index + 1);
      drive(0, 380, Easing.out(Easing.cubic)).start(({ finished: arrived }) => {
        if (!arrived) return;
        busy.current = false;
        setMoving(false);
      });
    });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Wordmark />
          {!loading && (
            <Pressable style={styles.skip} onPress={continueToAccount} disabled={moving} accessibilityRole="button">
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.hero}>
          {loading ? (
            <Text style={styles.loading} accessibilityLiveRegion="polite">Getting RideGo ready…</Text>
          ) : (
            <>
              <Text accessibilityRole="header" style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </>
          )}
          <OnboardingCarArtwork slide={index} travel={travel} />
        </View>
        {!loading && (
          <View style={styles.footer}>
            <View style={styles.pagination} accessible accessibilityLabel={`Page ${index + 1} of ${slides.length}`}>
              {slides.map((slide, page) => (
                <View key={slide.title} style={[styles.dot, page === index && styles.activeDot]} />
              ))}
            </View>
            <Action title={last ? 'Get started' : 'Next'} onPress={next} disabled={moving} />
          </View>
        )}
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
  hero: { flexGrow: 1, justifyContent: 'center', gap: 16 },
  title: { fontSize: 55, letterSpacing: -3.1, lineHeight: 56, color: colors.black, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 16, lineHeight: 24, maxWidth: 310, marginBottom: 4 },
  loading: { color: colors.blueInk, fontWeight: '700', fontSize: 15 },
  footer: { gap: 17 },
  pagination: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.blueLine },
  activeDot: { width: 24, backgroundColor: colors.blueInk },
});
