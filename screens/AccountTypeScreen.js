import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '../ui/AuthLayout';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';

const options = [
  { title: 'I want to ride', description: 'Book a ride, track your trip and save your favourite places.', icon: 'car', screen: 'RiderRegistration' },
  { title: 'I want to drive', description: 'Set up your vehicle and accept trips on your schedule.', icon: 'compass', screen: 'DriverWelcome' },
];

export default function AccountTypeScreen({ navigation }) {
  return (
    <AuthLayout back={() => navigation.goBack()} title="How will you use RideGo?" description="Choose an account type to get started.">
      {options.map(({ title, description, icon, screen }) => (
        <Pressable
          key={screen}
          accessibilityRole="button"
          onPress={() => navigation.navigate(screen)}
          style={({ pressed }) => [styles.option, pressed && styles.pressed]}
        >
          <Icon name={icon} size={28} color={colors.blueInk} />
          <View style={styles.optionCopy}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Icon name="right" size={20} />
        </Pressable>
      ))}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  option: { backgroundColor: colors.blueTint, flexDirection: 'row', alignItems: 'center', gap: 15, borderRadius: 19, padding: 18, borderWidth: 1, borderColor: colors.blueLine },
  optionCopy: { flex: 1, gap: 5 },
  optionTitle: { color: colors.black, fontSize: 18, fontWeight: '800' },
  description: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  pressed: { opacity: 0.65 },
});
