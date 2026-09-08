import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AccountTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>RideGo</Text>

      <View style={styles.content}>
        <Text style={styles.heading}>How will you use RideGo?</Text>

        <Text style={styles.description}>
          Choose the option that best describes how you want to use RideGo.
        </Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("RiderRegistration")}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>🚗</Text>
            </View>

            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>I want to ride</Text>

              <Text style={styles.optionDescription}>
                Book safe and reliable rides wherever you need to go.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>🚘</Text>
            </View>

            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>I want to drive</Text>

              <Text style={styles.optionDescription}>
                Drive with RideGo and earn money on your own schedule.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>
        You can change your account type later.
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
    marginTop: 70,
  },

  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#C9D6E8",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  options: {
    width: "100%",
  },

  optionCard: {
    width: "100%",
    minHeight: 120,
    backgroundColor: "#102A52",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  icon: {
    fontSize: 28,
  },

  optionText: {
    flex: 1,
    paddingRight: 8,
  },

  optionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#C9D6E8",
  },

  arrow: {
    fontSize: 32,
    color: "#5BC0FF",
    marginLeft: 4,
  },

  footer: {
    fontSize: 12,
    color: "#8FA5C1",
    textAlign: "center",
    marginBottom: 35,
  },
});
