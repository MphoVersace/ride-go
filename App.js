import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>RideGo</Text>

      <View style={styles.road}>
        <Text style={styles.car}>🚗</Text>
        <View style={styles.innerCircle} />
      </View>

      <Text style={styles.tagline}>Fast. Safe. Reliable.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#5BC0FF",
    marginBottom: 35,
  },

  road: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 28,
    borderColor: "#1D3557",
    alignItems: "center",
    justifyContent: "center",
  },

  car: {
    position: "absolute",
    top: -32,
    fontSize: 32,
  },

  innerCircle: {
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: "#071A3D",
  },

  tagline: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 35,
  },
});
