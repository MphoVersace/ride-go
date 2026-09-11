import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SplashOnboarding: undefined;
  Account: undefined;
  AccountType: undefined;
  RiderRegistration: undefined;
  RiderHome: undefined;
  RiderProfile: undefined;
  EditProfile: undefined;
  RideHistory: undefined;
  TripDetails: { tripId?: string } | undefined;
  SavedPlaces: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  SafetyCentre: undefined;
  HelpSupport: undefined;
  Settings: undefined;
  DestinationSearch: undefined;
  DestinationResults: { destination?: string } | undefined;
  RideOptions: { destination?: string } | undefined;
  RideSearching: { rideType?: string } | undefined;
  DriverFound: { driverId?: string } | undefined;
  RideInProgress: { tripId?: string } | undefined;
  TripCompleted: { tripId?: string } | undefined;
  TripReceipt: { receiptId?: string } | undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
