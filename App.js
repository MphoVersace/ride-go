import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>RideGo</Text>

      <View style={styles.road}>
        {/* Orbit */}
        <Animated.View
          style={[
            styles.orbit,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <Text style={styles.car}>🚗</Text>
        </Animated.View>

        {/* Centre of the road */}
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

  orbit: {
    position: "absolute",
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  car: {
    fontSize: 32,
    marginTop: -16,
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
