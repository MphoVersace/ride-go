import { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { usePreviewAccount } from '../auth/PreviewAccount';
import { isEmail, normalizeEmail } from '../auth/validation';
import { enterApp } from '../navigation/routes';
import { Action, AuthLayout, AuthLink, Field, FormError, PreviewNotice } from '../ui/AuthLayout';

export default function LoginScreen({ navigation }) {
  const { login } = usePreviewAccount();
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const busy = useRef(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (busy.current) return;
    setSubmitted(true);
    if (!isEmail(email)) return emailField.current?.focus();
    if (!password) return passwordField.current?.focus();
    Keyboard.dismiss();
    busy.current = true;
    setLoading(true);
    setError('');
    try {
      const account = await login(normalizeEmail(email), password);
      if (!account) return setError('That email and password do not match a demo account.');
      setPassword('');
      if (account.role === 'driver' && !account.driverSetupComplete) {
        navigation.replace('DriverVehicleSetup');
      } else {
        enterApp(navigation, account.role);
      }
    } catch {
      setError('Could not log in. Please try again.');
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  return (
    <AuthLayout back={() => navigation.goBack()} title="Welcome back" description="Log in to your RideGo demo account.">
      <PreviewNotice>Demo accounts are available until the app restarts. Use a test password.</PreviewNotice>
      <Field ref={emailField} nextRef={passwordField} label="Email address" icon="mail" value={email} onChangeText={(text) => { setEmail(text); setError(''); }} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" placeholder="you@example.com" error={submitted && !isEmail(email) ? 'Enter a valid email address.' : null} />
      <Field ref={passwordField} label="Password" icon="lock" value={password} onChangeText={(text) => { setPassword(text); setError(''); }} password visible={visible} toggleVisibility={() => setVisible(!visible)} autoCapitalize="none" autoCorrect={false} autoComplete="current-password" onSubmitEditing={submit} placeholder="Enter your password" error={submitted && !password ? 'Enter your password.' : null} />
      {error ? <FormError>{error}</FormError> : null}
      <Action title={loading ? 'Logging in…' : 'Log in'} onPress={submit} disabled={loading} />
      <AuthLink onPress={() => navigation.navigate('AccountType')}>Create an account</AuthLink>
    </AuthLayout>
  );
}
