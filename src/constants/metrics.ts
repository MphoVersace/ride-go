import { Dimensions, Platform } from "react-native";

/**
 * RideGo Platform Metrics & Design Specifications (Rule 15)
 *
 * Spacing must strictly adhere to multiples of 8px.
 * Multi-platform chrome dimensions for Android and iOS.
 */

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 56,
  xxxl: 64,
} as const;

export const androidSpecs = {
  statusBarHeight: 24,
  appBarHeight: 56,
  navBarHeight: 56,
  gestureBarHeight: 48,
  totalNavBarHeight: 104, // 56px + 48px
  screenBase: {
    width: 360,
    height: 640,
  },
  grid: {
    columns: 4,
    margin: 16,
    gutter: 16,
  },
} as const;

export const iosSpecs = {
  statusBarHeight: 54,
  navigationBarHeight: 96,
  tabBarHeight: 56,
  homeIndicatorHeight: 34,
  totalTabBarHeight: 90, // 56px + 34px
  screenBase: {
    width: 393,
    height: 852,
  },
  grid: {
    columns: 4,
    margin: 16,
    gutter: 16,
  },
} as const;

export type AndroidSpecs = typeof androidSpecs;
export type IosSpecs = typeof iosSpecs;
export type PlatformSpecs = AndroidSpecs | IosSpecs;

export const platformSpecs: PlatformSpecs =
  Platform.OS === "ios" ? iosSpecs : androidSpecs;

export const metrics = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  spacing,
  android: androidSpecs,
  ios: iosSpecs,
  current: platformSpecs,
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    full: 9999,
  },
} as const;

export default metrics;
