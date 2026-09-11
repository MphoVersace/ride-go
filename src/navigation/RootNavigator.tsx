import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import {
  SplashOnboardingScreen,
  AccountScreen,
  AccountTypeScreen,
  RiderRegistrationScreen,
  RiderHomeScreen,
  RiderProfileScreen,
  EditProfileScreen,
  RideHistoryScreen,
  TripDetailsScreen,
  SavedPlacesScreen,
  PaymentMethodsScreen,
  NotificationsScreen,
  SafetyCentreScreen,
  HelpSupportScreen,
  SettingsScreen,
  DestinationSearchScreen,
  DestinationResultsScreen,
  RideOptionsScreen,
  RideSearchingScreen,
  DriverFoundScreen,
  RideInProgressScreen,
  TripCompletedScreen,
  TripReceiptScreen,
} from "../screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashOnboarding"
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="SplashOnboarding"
          component={SplashOnboardingScreen}
        />

        {/* Auth Flow */}
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AccountType" component={AccountTypeScreen} />
        <Stack.Screen
          name="RiderRegistration"
          component={RiderRegistrationScreen}
        />

        {/* Main Experience */}
        <Stack.Screen name="RiderHome" component={RiderHomeScreen} />
        <Stack.Screen name="RiderProfile" component={RiderProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
        <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="SafetyCentre" component={SafetyCentreScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* Ride Flow */}
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
        <Stack.Screen name="DriverFound" component={DriverFoundScreen} />
        <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />
        <Stack.Screen name="TripCompleted" component={TripCompletedScreen} />
        <Stack.Screen name="TripReceipt" component={TripReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
