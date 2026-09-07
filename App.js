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
        <Animated.View
          style={[
            styles.orbit,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <View style={styles.car}>
            <View style={styles.carBody}>
              <View style={styles.carWindow} />
              <View style={styles.wheelLeft} />
              <View style={styles.wheelRight} />
            </View>
          </View>
        </Animated.View>

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
    width: 192,
    height: 192,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  car: {
    width: 42,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -14,
  },

  carBody: {
    width: 42,
    height: 20,
    backgroundColor: "#5BC0FF",
    borderRadius: 6,
    position: "relative",
  },

  carWindow: {
    position: "absolute",
    width: 20,
    height: 8,
    backgroundColor: "#071A3D",
    borderRadius: 3,
    top: 3,
    left: 11,
  },

  wheelLeft: {
    position: "absolute",
    width: 7,
    height: 7,
    backgroundColor: "#111827",
    borderRadius: 4,
    bottom: -4,
    left: 5,
  },

  wheelRight: {
    position: "absolute",
    width: 7,
    height: 7,
    backgroundColor: "#111827",
    borderRadius: 4,
    bottom: -4,
    right: 5,
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
