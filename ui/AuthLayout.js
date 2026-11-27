import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from './Icon';
import { KeyboardField, KeyboardFormScroll } from './KeyboardForm';
import { colors } from './theme';

export function Wordmark() {
  return (
    <View style={styles.brand} accessible accessibilityLabel="RideGo">
      <View style={styles.brandMark}><Icon name="route" size={19} color={colors.navy} /></View>
      <Text style={styles.brandText}>Ride<Text style={styles.brandAccent}>Go</Text></Text>
    </View>
  );
}

export function AuthLayout({ back, title, description, step, children }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardFormScroll contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {back && (
            <Pressable onPress={back} style={styles.back} accessibilityRole="button" accessibilityLabel="Go back">
              <Icon name="back" size={22} />
            </Pressable>
          )}
          <Wordmark />
        </View>
        {step != null && (
          <View style={styles.progress} accessible accessibilityLabel={`Step ${step + 1} of 3`}>
            <View style={styles.progressTracks}>
              {[0, 1, 2].map((index) => (
                <View key={index} style={[styles.progressTrack, index <= step && styles.progressFill]} />
              ))}
            </View>
            <Text style={styles.progressLabel}>Step {step + 1} of 3</Text>
          </View>
        )}
        <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {children}
      </KeyboardFormScroll>
    </SafeAreaView>
  );
}

export function Action({ title, onPress, secondary, disabled, icon = 'arrow' }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.action, secondary && styles.secondary, (pressed || disabled) && styles.faded]}
    >
      <Text style={[styles.actionText, !secondary && styles.actionTextPrimary]}>{title}</Text>
      {icon && <Icon name={icon} size={19} color={secondary ? colors.navy : colors.white} />}
    </Pressable>
  );
}

export function Field({ label, icon, error, password, visible, toggleVisibility, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.fieldRow, focused && styles.fieldFocused, error && styles.fieldError]}>
        <Icon name={icon} size={19} color={colors.blueInk} />
        <KeyboardField
          accessibilityLabel={label}
          style={styles.input}
          placeholderTextColor={colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={password && !visible}
          {...props}
        />
        {password && (
          <Pressable
            style={styles.visibility}
            onPress={toggleVisibility}
            accessibilityRole="button"
            accessibilityLabel={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          >
            <Icon name={visible ? 'eyeOff' : 'eye'} size={20} />
          </Pressable>
        )}
      </View>
      {error && <FormError>{error}</FormError>}
    </View>
  );
}

export function FormError({ children }) {
  return <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{children}</Text>;
}

export function AuthLink({ children, onPress }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} style={styles.link}>
      <Text style={styles.linkText}>{children}</Text>
    </Pressable>
  );
}

export function PreviewNotice({ children }) {
  return (
    <View style={styles.notice}>
      <Icon name="info" size={19} color={colors.blueInk} />
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { width: '100%', maxWidth: 560, alignSelf: 'center', padding: 24, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  back: { width: 44, height: 44, borderWidth: 1, borderColor: colors.line, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandMark: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  brandText: { color: colors.navy, fontSize: 25, fontWeight: '900', letterSpacing: -1.2 },
  brandAccent: { color: colors.blueInk },
  title: { color: colors.black, fontWeight: '900', fontSize: 36, letterSpacing: -1.65 },
  description: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 14 },
  progress: { gap: 8, marginBottom: 4 },
  progressTracks: { flexDirection: 'row', gap: 6 },
  progressTrack: { height: 5, borderRadius: 4, flex: 1, backgroundColor: colors.blueTint },
  progressFill: { backgroundColor: colors.blue },
  progressLabel: { color: colors.blueInk, fontWeight: '700', fontSize: 13 },
  action: { minHeight: 56, borderRadius: 17, backgroundColor: colors.navy, paddingHorizontal: 18, paddingVertical: 11, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
  secondary: { backgroundColor: colors.blueTint, borderWidth: 1, borderColor: colors.blueLine },
  faded: { opacity: 0.65 },
  actionText: { color: colors.navy, fontWeight: '800', fontSize: 16, flexShrink: 1 },
  actionTextPrimary: { color: colors.white },
  field: { gap: 7 },
  label: { color: colors.black, fontSize: 15, fontWeight: '700' },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 11, borderWidth: 1, borderColor: colors.line, borderRadius: 14, backgroundColor: colors.blueTint, paddingLeft: 14, paddingRight: 4 },
  fieldFocused: { borderColor: colors.blueInk },
  fieldError: { borderColor: colors.danger },
  input: { flex: 1, minHeight: 53, paddingVertical: 10, paddingRight: 8, color: colors.black, fontSize: 16, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  visibility: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  error: { color: colors.danger, lineHeight: 19, fontSize: 14, fontWeight: '600' },
  link: { minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  linkText: { color: colors.blueInk, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, padding: 13, backgroundColor: colors.blueTint, borderRadius: 12 },
  noticeText: { flex: 1, color: colors.muted, fontSize: 13, lineHeight: 19 },
});
