import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { KeyboardFormScroll } from '../ui/KeyboardForm';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';

export function TripLayout({ title, description, back, children, footer }) {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="dark" />
      <KeyboardFormScroll contentContainerStyle={styles.content}>
        {back && (
          <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" style={styles.back}>
            <Icon name="back" size={21} />
          </Pressable>
        )}
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {children}
      </KeyboardFormScroll>
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
}

export function TripStops({ pickup, destination, onEdit }) {
  return (
    <View style={styles.stops}>
      <View style={styles.timeline} aria-hidden>
        <View style={styles.start} />
        <View style={styles.line} />
        <View style={styles.end} />
      </View>
      <View style={styles.stopText}>
        <View style={styles.stop}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.value}>{pickup.label}</Text>
        </View>
        <View style={styles.stop}>
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.value}>{destination.label}</Text>
        </View>
      </View>
      {onEdit && (
        <Pressable onPress={onEdit} style={styles.edit} accessibilityRole="button" accessibilityLabel="Edit pickup or destination">
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      )}
    </View>
  );
}

export const tripStyles = StyleSheet.create({
  card: { padding: 16, borderRadius: 17, borderColor: colors.line, borderWidth: 1, gap: 12 },
  heading: { color: colors.navy, fontSize: 20, fontWeight: '800' },
  text: { color: colors.black, fontSize: 15, fontWeight: '700' },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flex: { flex: 1 },
  blue: { color: colors.blueInk, fontWeight: '800' },
});

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 22, gap: 16 },
  back: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  header: { gap: 6, marginBottom: 2 },
  title: { color: colors.black, fontSize: 34, letterSpacing: -1.3, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  footer: { width: '100%', maxWidth: 640, alignSelf: 'center', paddingHorizontal: 22, paddingVertical: 12, gap: 8 },
  stops: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 14, backgroundColor: colors.blueTint, borderRadius: 16 },
  timeline: { alignSelf: 'stretch', alignItems: 'center', width: 14, marginVertical: 12 },
  start: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: colors.blueInk },
  line: { flex: 1, width: 1, backgroundColor: colors.blueLine },
  end: { width: 9, height: 9, borderRadius: 2, backgroundColor: colors.navy },
  stopText: { flex: 1, gap: 12 },
  stop: { gap: 3 },
  label: { color: colors.blueInk, fontSize: 12, fontWeight: '800' },
  value: { color: colors.navy, fontWeight: '700', fontSize: 15 },
  edit: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 9 },
  editText: { color: colors.blueInk, fontWeight: '800' },
});
