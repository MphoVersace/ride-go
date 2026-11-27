import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PreviewAccountProvider } from './auth/PreviewAccount';
import { DriverTabs, RiderTabs } from './navigation/RideTabs';
import SplashOnboardingScreen from './screens/SplashOnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import { colors } from './ui/theme';

import DriverWelcomeScreen from "./screens/DriverWelcomeScreen";
import DriverProfileSetupScreen from "./screens/DriverProfileSetupScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TripDetailsScreen from "./screens/TripDetailsScreen";
import AccountScreen from "./screens/AccountScreen";
import AccountTypeScreen from "./screens/AccountTypeScreen";
import RiderRegistrationScreen from "./screens/RiderRegistrationScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import DestinationSearchScreen from "./screens/DestinationSearchScreen";
import RideOptionsScreen from "./screens/RideOptionsScreen";
import RideSearchingScreen from "./screens/RideSearchingScreen";
import DriverFoundScreen from "./screens/DriverFoundScreen";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import TripCompletedScreen from "./screens/TripCompletedScreen";
import TripReceiptScreen from "./screens/TripReceiptScreen";
import DriverDocumentsSetupScreen from "./screens/DriverDocumentsSetupScreen";
import DriverVehicleSetupScreen from "./screens/DriverVehicleSetupScreen";
import DriverRideRequestScreen from "./screens/DriverRideRequestScreen";
import DriverNavigationScreen from "./screens/DriverNavigationScreen";
import DriverActiveTripScreen from "./screens/DriverActiveTripScreen";
import DriverTripCompletedScreen from "./screens/DriverTripCompletedScreen";
import DriverTripDetailsScreen from "./screens/DriverTripDetailsScreen";
import DriverEarningsDetailsScreen from "./screens/DriverEarningsDetailsScreen";
import DriverEditProfileScreen from "./screens/DriverEditProfileScreen";
import DriverVehicleScreen from "./screens/DriverVehicleScreen";
import DriverDocumentsScreen from "./screens/DriverDocumentsScreen";
import DriverSafetyScreen from "./screens/DriverSafetyScreen";
import DriverHelpScreen from "./screens/DriverHelpScreen";
import DriverSettingsScreen from "./screens/DriverSettingsScreen";

const Stack = createNativeStackNavigator();

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: colors.blueInk, background: colors.white, text: colors.black } };

export default function App() {
  return (
    <SafeAreaProvider>
      <PreviewAccountProvider>
        <NavigationContainer theme={theme}>
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
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RiderTabs" component={RiderTabs} />
            <Stack.Screen name="DriverTabs" component={DriverTabs} />

            <Stack.Screen name="AccountType" component={AccountTypeScreen} />

            <Stack.Screen
              name="RiderRegistration"
              component={RiderRegistrationScreen}
            />

            <Stack.Screen name="EditProfile" component={EditProfileScreen} />

            <Stack.Screen name="TripDetails" component={TripDetailsScreen} />

            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />

            <Stack.Screen name="Notifications" component={NotificationsScreen} />

            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />

            <Stack.Screen name="Settings" component={SettingsScreen} />

            <Stack.Screen
              name="DestinationSearch"
              component={DestinationSearchScreen}
            />

            <Stack.Screen name="RideOptions" component={RideOptionsScreen} />

            <Stack.Screen name="RideSearching" component={RideSearchingScreen} />

            <Stack.Screen name="DriverFound" component={DriverFoundScreen} />

            <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />

            <Stack.Screen name="TripCompleted" component={TripCompletedScreen} />

            <Stack.Screen name="TripReceipt" component={TripReceiptScreen} />

            <Stack.Screen name="DriverWelcome" component={DriverWelcomeScreen} />

            <Stack.Screen
              name="DriverProfileSetup"
              component={DriverProfileSetupScreen}
            />

            <Stack.Screen
              name="DriverVehicleSetup"
              component={DriverVehicleSetupScreen}
            />

            <Stack.Screen
              name="DriverDocumentsSetup"
              component={DriverDocumentsSetupScreen}
            />

            <Stack.Screen
              name="DriverRideRequest"
              component={DriverRideRequestScreen}
            />

            <Stack.Screen
              name="DriverNavigation"
              component={DriverNavigationScreen}
            />

            <Stack.Screen
              name="DriverActiveTrip"
              component={DriverActiveTripScreen}
            />

            <Stack.Screen
              name="DriverTripCompleted"
              component={DriverTripCompletedScreen}
            />

            <Stack.Screen
              name="DriverTripDetails"
              component={DriverTripDetailsScreen}
            />

            <Stack.Screen
              name="DriverEarningsDetails"
              component={DriverEarningsDetailsScreen}
            />

            <Stack.Screen
              name="DriverEditProfile"
              component={DriverEditProfileScreen}
            />

            <Stack.Screen name="DriverVehicle" component={DriverVehicleScreen} />

            <Stack.Screen
              name="DriverDocuments"
              component={DriverDocumentsScreen}
            />

            <Stack.Screen name="DriverSafety" component={DriverSafetyScreen} />

            <Stack.Screen name="DriverHelp" component={DriverHelpScreen} />

            <Stack.Screen name="DriverSettings" component={DriverSettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PreviewAccountProvider>
    </SafeAreaProvider>
  );
}
