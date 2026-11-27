import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { usePreviewAccount } from '../auth/PreviewAccount';
import { isEmail, normalizeEmail, normalizePhone, passwordRules } from '../auth/validation';
import { enterApp } from '../navigation/routes';
import { Action, AuthLayout, AuthLink, Field, FormError, PreviewNotice } from '../ui/AuthLayout';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';

const steps = [
  { title: 'What’s your name?', description: 'Enter the name you want to use for your RideGo profile.' },
  { title: 'How can we reach you?', description: 'Enter your email address and mobile number.' },
  { title: 'Create a password', description: 'Choose a password for your RideGo demo account.' },
];

export function RegistrationScreen({ navigation, role }) {
  const { register } = usePreviewAccount();
  const first = useRef(null);
  const second = useRef(null);
  const busy = useRef(false);
  const focusOnNextStep = useRef(false);
  const [step, setStep] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState({ password: false, confirmation: false });
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmation: '' });
  const { firstName, lastName, email, phone, password, confirmation } = details;
  const normalizedEmail = normalizeEmail(email);
  const phoneNumber = normalizePhone(phone);
  const meetsRules = passwordRules.every(([, check]) => check(password));
  const errors = [
    [!firstName.trim() && 'Enter your first name.', !lastName.trim() && 'Enter your surname.'],
    [!isEmail(email) ? 'Enter a valid email address.' : normalizedEmail === duplicateEmail && 'This email already has a demo account.', !phoneNumber && 'Enter a South African mobile number or include your international dialling code.'],
    [!meetsRules && 'Meet all four password requirements.', !confirmation ? 'Confirm your password.' : password !== confirmation && 'The passwords do not match.'],
  ][step];

  function change(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
    setError('');
  }

  const move = useCallback((next) => {
    Keyboard.dismiss();
    setAttempted(false);
    setError('');
    setStep(next);
  }, []);

  useFocusEffect(useCallback(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (busy.current) return true;
      if (step === 0) return false;
      move(step - 1);
      return true;
    });
    return () => subscription.remove();
  }, [move, step]));

  useEffect(() => {
    if (!focusOnNextStep.current) return;
    focusOnNextStep.current = false;
    const frame = requestAnimationFrame(() => first.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [step]);

  async function submit(fromKeyboard = false) {
    if (busy.current) return;
    setAttempted(true);
    if (errors[0]) return first.current?.focus();
    if (errors[1]) return second.current?.focus();
    if (step < 2) {
      focusOnNextStep.current = fromKeyboard;
      return move(step + 1);
    }

    Keyboard.dismiss();
    busy.current = true;
    setLoading(true);
    try {
      const created = await register(role, {
        firstName: firstName.trim(), lastName: lastName.trim(), email: normalizedEmail, phone: phoneNumber,
      }, password);
      if (!created) {
        setDuplicateEmail(normalizedEmail);
        move(1);
        setAttempted(true);
        return;
      }
      if (role === 'driver') navigation.replace('DriverVehicleSetup');
      else enterApp(navigation, 'rider');
      setDetails((current) => ({ ...current, password: '', confirmation: '' }));
      setVisible({ password: false, confirmation: false });
    } catch {
      setError('Could not create the demo account. Please try again.');
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  function fieldProps(key, index) {
    return {
      ref: index === 0 ? first : second,
      nextRef: index === 0 ? second : undefined,
      returnKeyType: index === 0 || step < 2 ? 'next' : 'done',
      value: details[key],
      onChangeText: (text) => change(key, text),
      onSubmitEditing: index === 1 ? () => submit(true) : undefined,
      error: attempted ? errors[index] : undefined,
      editable: !loading,
    };
  }

  return (
    <AuthLayout
      back={() => { if (!busy.current) step > 0 ? move(step - 1) : navigation.goBack(); }}
      title={steps[step].title}
      description={steps[step].description}
      step={step}
    >
      {step === 0 && (
        <View key="name" style={styles.fields}>
          <Field {...fieldProps('firstName', 0)} label="First name" icon="user" autoCapitalize="words" autoComplete="given-name" placeholder="First name" />
          <Field {...fieldProps('lastName', 1)} label="Surname" icon="user" autoCapitalize="words" autoComplete="family-name" placeholder="Surname" />
        </View>
      )}
      {step === 1 && (
        <View key="contact" style={styles.fields}>
          <Field {...fieldProps('email', 0)} label="Email address" icon="mail" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" placeholder="you@example.com" />
          <Field {...fieldProps('phone', 1)} label="Mobile number" icon="phone" keyboardType="phone-pad" autoComplete="tel" placeholder="+27 71 234 5678" />
        </View>
      )}
      {step === 2 && (
        <View key="security" style={styles.fields}>
          <Field {...fieldProps('password', 0)} label="Password" icon="lock" password visible={visible.password} toggleVisibility={() => setVisible({ ...visible, password: !visible.password })} autoCapitalize="none" autoCorrect={false} autoComplete="new-password" maxLength={128} placeholder="Create a password" />
          <View style={styles.checklist}>
            {passwordRules.map(([label, check]) => {
              const met = check(password);
              return (
                <View key={label} style={styles.rule} accessible accessibilityLabel={`${label}, ${met ? 'met' : 'required'}`}>
                  <Icon name={met ? 'check' : 'lock'} size={15} color={met ? colors.blueInk : colors.muted} />
                  <Text style={[styles.ruleText, met && styles.ruleMet]}>{label}</Text>
                </View>
              );
            })}
          </View>
          <Field {...fieldProps('confirmation', 1)} label="Confirm password" icon="lock" password visible={visible.confirmation} toggleVisibility={() => setVisible({ ...visible, confirmation: !visible.confirmation })} autoCapitalize="none" autoCorrect={false} autoComplete="new-password" maxLength={128} placeholder="Re-enter your password" />
          <PreviewNotice>Use a test password. This demo account lasts until the app restarts.</PreviewNotice>
        </View>
      )}
      {error ? <FormError>{error}</FormError> : null}
      <Action title={loading ? 'Creating account…' : step === 2 ? 'Create demo account' : 'Continue'} onPress={() => submit()} disabled={loading} />
      <AuthLink onPress={() => { if (!busy.current) navigation.navigate('Login'); }}>Already have an account? Log in</AuthLink>
    </AuthLayout>
  );
}

export default function RiderRegistrationScreen(props) {
  return <RegistrationScreen {...props} role="rider" />;
}

const styles = StyleSheet.create({
  fields: { gap: 14 },
  checklist: { gap: 8, paddingHorizontal: 4 },
  rule: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleText: { flexShrink: 1, color: colors.muted, fontSize: 13, lineHeight: 18 },
  ruleMet: { color: colors.blueInk, fontWeight: '700' },
});
