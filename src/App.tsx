import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import { RideProvider } from "./services/RideContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RideProvider>
        <RootNavigator />
      </RideProvider>
    </SafeAreaProvider>
  );
}
