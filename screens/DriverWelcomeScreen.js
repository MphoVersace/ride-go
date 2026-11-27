import { StyleSheet, Text, View } from 'react-native';
import { Action, AuthLayout } from '../ui/AuthLayout';
import Icon from '../ui/Icon';
import RouteArtwork from '../ui/RouteArtwork';
import { colors } from '../ui/theme';

const steps = [
  ['user', 'Create your driver account'],
  ['car', 'Add your vehicle details'],
  ['shield', 'Review the driver document requirements'],
];

export default function DriverWelcomeScreen({ navigation }) {
  return (
    <AuthLayout
      back={() => navigation.goBack()}
      title="Drive with RideGo"
      description="Set up your profile and explore the driver dashboard."
    >
      <RouteArtwork variant={1} />
      <View style={styles.steps}>
        {steps.map(([icon, label]) => (
          <View key={icon} style={styles.step}>
            <Icon name={icon} size={21} color={colors.blueInk} />
            <Text style={styles.label}>{label}</Text>
          </View>
        ))}
      </View>
      <Action title="Start driver sign-up" onPress={() => navigation.navigate('DriverProfileSetup')} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  steps: { gap: 12, marginVertical: 6 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 11, minHeight: 28 },
  label: { fontSize: 15, color: colors.black, fontWeight: '700', flex: 1 },
});
