import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>RideGo</Text>

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to RideGo</Text>

        <Text style={styles.description}>
          Create an account or log in to continue.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("AccountType")}
          >
            <Text style={styles.createButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.terms}>
        By continuing, you agree to RideGo's{" "}
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
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5BC0FF",
    marginTop: 70,
  },

  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 17,
    lineHeight: 25,
    color: "#C9D6E8",
    textAlign: "center",
    marginBottom: 40,
  },

  buttons: {
    width: "100%",
  },

  createButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#5BC0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  createButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#071A3D",
  },

  loginButton: {
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: "#5BC0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  terms: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8FA5C1",
    textAlign: "center",
    marginBottom: 35,
  },

  termsLink: {
    color: "#5BC0FF",
  },
});
