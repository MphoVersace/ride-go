import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import AccountScreen from "./screens/AccountScreen";
import AccountTypeScreen from "./screens/AccountTypeScreen";
import RiderRegistrationScreen from "./screens/RiderRegistrationScreen";
import RiderHomeScreen from "./screens/RiderHomeScreen";
import DestinationSearchScreen from "./screens/DestinationSearchScreen";
import DestinationResultsScreen from "./screens/DestinationResultsScreen";
import RideOptionsScreen from "./screens/RideOptionsScreen";
import RideSearchingScreen from "./screens/RideSearchingScreen";

const Stack = createNativeStackNavigator();

function SplashOnboardingScreen({ navigation }) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();

    const splashTimer = setTimeout(() => {
      setShowOnboarding(true);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, [rotation, logoScale]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (showOnboarding) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Text style={styles.onboardingLogo}>RideGo</Text>

        <View style={styles.visualContainer}>
          <View style={styles.visualCircle}>
            <View style={styles.shield}>
              <View style={styles.shieldCheck} />
            </View>

            <View style={styles.onboardingCar}>
              <View style={styles.carBody}>
                <View style={styles.carWindow} />
                <View style={styles.wheelLeft} />
                <View style={styles.wheelRight} />
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.heading}>Ride with confidence</Text>

        <Text style={styles.description}>
          Safe, reliable rides from trusted drivers.
        </Text>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Account")}
          >
            <Text style={styles.getStartedText}>Get Started →</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.Text
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        RideGo
      </Animated.Text>

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashOnboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashOnboarding"
          component={SplashOnboardingScreen}
        />

        <Stack.Screen name="Account" component={AccountScreen} />

        <Stack.Screen name="AccountType" component={AccountTypeScreen} />

        <Stack.Screen
          name="RiderRegistration"
          component={RiderRegistrationScreen}
        />

        <Stack.Screen name="RiderHome" component={RiderHomeScreen} />

        <Stack.Screen
          name="DestinationSearch"
          component={DestinationSearchScreen}
        />

        <Stack.Screen
          name="DestinationResults"
          component={DestinationResultsScreen}
        />

        <Stack.Screen name="RideOptions" component={RideOptionsScreen} />

        <Stack.Screen name="RideSearching" component={RideSearchingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
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

  onboardingLogo: {
    position: "absolute",
    top: 70,
    fontSize: 30,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  visualContainer: {
    marginBottom: 45,
  },

  visualCircle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#102A52",
    alignItems: "center",
    justifyContent: "center",
  },

  shield: {
    position: "absolute",
    width: 75,
    height: 85,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    top: 35,
  },

  shieldCheck: {
    width: 25,
    height: 13,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#071A3D",
    transform: [{ rotate: "-45deg" }],
    marginTop: -5,
  },

  onboardingCar: {
    position: "absolute",
    bottom: 50,
    width: 85,
    height: 42,
    alignItems: "center",
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
    fontSize: 17,
    lineHeight: 25,
    color: "#C9D6E8",
    textAlign: "center",
    maxWidth: 320,
  },

  bottomSection: {
    position: "absolute",
    bottom: 55,
    width: "100%",
    alignItems: "center",
  },

  getStartedButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#5BC0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  getStartedText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#071A3D",
  },

  skipText: {
    fontSize: 16,
    color: "#C9D6E8",
  },
});
