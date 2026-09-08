import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RiderRegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>RideGo</Text>

      <View style={styles.content}>
        <Text style={styles.heading}>Create your RideGo account</Text>

        <Text style={styles.description}>
          Enter your details to get started with safe and reliable rides.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="#8FA5C1"
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor="#8FA5C1"
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#8FA5C1"
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#8FA5C1"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8FA5C1"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#8FA5C1"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RiderHome")}
          >
            <Text style={styles.createButtonText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.terms}>
        By creating an account, you agree to RideGo's{" "}
        <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5BC0FF",
    marginTop: 55,
  },

  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#C9D6E8",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 8,
  },

  form: {
    width: "100%",
  },

  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 14,
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 12,
  },

  createButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#5BC0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  createButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#071A3D",
  },

  terms: {
    fontSize: 11,
    lineHeight: 17,
    color: "#8FA5C1",
    textAlign: "center",
    marginBottom: 25,
  },

  termsLink: {
    color: "#5BC0FF",
  },
});
