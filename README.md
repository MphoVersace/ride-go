# RideGo — On-Demand Mobility Mobile Application

RideGo is an on-demand ride-hailing and mobility application built with **React Native** and **Expo** (managed workflow) in **TypeScript**, engineered with a high-performance modular architecture and targeted for Android and iOS devices.

---

## 1. Architectural Architecture & Tech Stack

- **Framework**: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) (Managed Workflow)
- **Core Runtime**: [React Native 0.86](https://reactnative.dev/) with [React 19](https://react.dev/)
- **Language**: TypeScript (Strict Mode)
- **Navigation**: React Navigation 7 (Native Stack)
- **Safe Area**: `react-native-safe-area-context`
- **Vector Graphics**: `react-native-svg`
- **3D Hardware Acceleration**: `react-native-webview` with Google `<model-viewer>` for real-time 360° orbital touch rotation and studio PBR lighting
- **3D Asset Pipeline**: Metro bundler configured via `metro.config.js` for `.glb`, `.gltf`, `.obj`, and `.usdz` assets
- **Orchestration**: `concurrently` (multi-process terminal runner with ungarbled QR display)

---

## 2. 60-30-10 Design System

RideGo adheres strictly to the **60-30-10 visual hierarchy rule** with a maximum of 3 primary color roles across the entire application:

| Distribution | Role | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **60%** | **Dominant Background** | `#000000` / `#0A0A0C` | True black base applied to all screens and container views |
| **30%** | **Panel & Surface** | `#16161A` / `#202026` | Deep carbon cards, elevated sheets, route cards, borders (`#2E2E36`) |
| **10%** | **Accent & Action** | `#FFD100` / `#FFB800` | High-contrast electric yellow primary buttons, active route telemetry, pins, highlights |
| **Text** | **Typography** | `#FFFFFF` / `#D1D1D6` | Crisp white primary headlines, secondary silver labels, muted grey metadata (`#8E8E93`) |

**Strict Policy**: Ad-hoc rainbow status tags, badges (e.g. 'READ ONLY', 'DEMO ONLY', 'OK'), hover glow animations, and badges carrying '5-star' or safety guarantee claims (e.g. 'Verified 5-Star Drivers', 'SAPS 10111 Integrated') or floating shield trust icons are strictly forbidden (Rule 16 & Rule 17).

---

## 3. Platform & Layout Specifications

All screen layouts adhere to standard multi-platform mobile specifications:

### Android Specifications
- **Status Bar**: 24px
- **App Bar**: 56px
- **Navigation Bar**: 56px + 48px gesture bar (104px total)
- **Screen Base**: 360 × 640 dp
- **Grid Layout**: 4 columns, 16px margins, 16px gutters

### iOS Specifications
- **Status Bar**: 54px
- **Navigation Bar**: 96px
- **Tab Bar**: 56px
- **Home Indicator**: 34px (90px total tab chrome)
- **Screen Base**: 393 × 852 pt
- **Grid Layout**: 4 columns, 16px margins, 16px gutters

### Spacing System
All margins, paddings, and dimensional gaps strictly use multiples of **8px**:
`8px (xs) | 16px (sm) | 24px (md) | 32px (lg) | 48px (xl) | 56px (xxl) | 64px (xxxl)`

---

## 4. Project Directory Structure

```
ride-go/
├── .expo/                        # Expo cache & dev metadata
├── assets/                       # Application branding & vehicle assets
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   ├── android-icon-monochrome.png
│   ├── favicon.png
│   ├── icon.png
│   ├── splash-icon.png
│   ├── models/                   # Master 3D vehicle assets
│   │   ├── base.glb              # Binary GLTF with PBR metallic-roughness material (4.18MB)
│   │   ├── base.obj              # 60,014-vertex Wavefront OBJ mesh (11.75MB)
│   │   └── base.usdz             # Universal Scene Description for iOS AR (8.18MB)
│   └── vehicles/                 # Vehicle references & source blueprint assets
│       ├── car_perspective.jpg   # Reference 3D perspective sedan render
│       ├── car_top_down.jpg      # Reference top-down vehicle render
│       ├── prius_blueprint.png   # Multi-angle technical automotive blueprint
│       └── prius_blueprint.svg   # Scalable vector blueprint master
├── src/                          # Application source code
│   ├── assets/
│   │   ├── icons/                # SVG vector assets
│   │   └── .gitkeep
│   ├── components/
│   │   ├── common/               # Reusable UI primitives
│   │   │   ├── BottomTabBar.tsx  # Floating 4-tab navigation bar (locked UI geometry with configurable tab labels)
│   │   │   ├── DarkRouteMap.tsx  # Vector dark map with GPS waypoint tracking beacon & ETA bubble
│   │   │   ├── DriverChatModal.tsx # In-app driver chat sheet with quick replies
│   │   │   ├── MobilityTelemetryVectors.tsx # Pure geometric mobility vectors (Standard velocity, Comfort wave, Luxury diamond, Express parcel, Cargo crate, Freight pallet, SA Radar)
│   │   │   ├── RouteTelemetryGraphic.tsx # Pure vector mobility graphics (Network Matrix, Guaranteed Rand Fares, Satellite Dispatch)
│   │   │   ├── SlideToConfirm.tsx # Interactive PanResponder swipe gesture slider with electric yellow thumb
│   │   │   ├── SvgIcons.tsx      # Vector SVG library (pins, steer, chat, layers, crosshairs, download)
│   │   │   ├── TelemetryPulseLoader.tsx # High-tech geometric GPS radar pulse loader with coordinate locks
│   │   │   ├── Vehicle3DViewer.tsx # Interactive 3D WebGL viewer (360° orbit, camera transitions, SVG fallback)
│   │   │   ├── VehicleLoader.tsx # Animated highway and circuit vehicle loading telemetry component
│   │   │   ├── VehicleSvgs.tsx   # 3D shaded vector suite (3D Side, 3D Front, 3D Rear, Top-Down, Courier, Bakkie, Truck)
│   │   │   ├── index.ts          # Common components barrel export
│   │   │   └── .gitkeep
│   ├── constants/
│   │   ├── colors.ts             # 60-30-10 color palette tokens
│   │   ├── metrics.ts            # 8px spacing grid & platform specs (Android & iOS)
│   │   ├── vehicleFinishes.ts    # Curated automotive paint finishes
│   │   ├── vehicleModelData.ts   # Embedded binary data URI for 3D model
│   │   └── index.ts              # Constants barrel export
│   ├── navigation/
│   │   ├── types.ts              # Strongly-typed RootStackParamList & navigation props
│   │   ├── RootNavigator.tsx     # Centralized NativeStackNavigator registration
│   │   └── index.ts              # Navigation barrel export
│   ├── screens/                  # Modular domain screen components
│   │   ├── auth/                 # Authentication & onboarding flow
│   │   │   ├── AccountScreen.tsx        # Rider Gateway (Route: AccountGateway): Step 01/05 progress, Rider/Driver role switcher, Express Sign In (Apple, Google, Capitec), SA inputs (+27), POPIA footer, and direct transit launch
│   │   │   ├── AccountTypeScreen.tsx    # Role selection (Rider vs Driver partner)
│   │   │   └── RiderRegistrationScreen.tsx # Rider signup form with profile sync
│   │   ├── home/                 # Main home experience (Core Tab 1: Explore)
│   │   │   └── RiderHomeScreen.tsx      # Core Tab 1 (Route: Explore): High-fidelity urban geo-grid map, Cape Town City Bowl focal halo, '24 Ride-Go Cars Nearby' live counter, 'Where to?' discovery console with 'Schedule: Now', quick service carousel (Go Ride, Go Comfort, Go 4x4, Package Courier), MZANSI30 promo card, Fast Bookings presets with travel times, Active Driver HUD, and persistent BottomTabBar
│   │   ├── onboarding/           # Animated splash & introduction
│   │   │   └── SplashOnboardingScreen.tsx # Ultra-sleek car-free route telemetry carousel & GPS radar loader
│   │   ├── profile/              # Profile, settings, and support (Core Tab 4: Account)
│   │   │   ├── EditProfileScreen.tsx    # Live name/email/phone editing with avatar generation
│   │   │   ├── HelpSupportScreen.tsx    # Interactive FAQ accordion & ticket submission
│   │   │   ├── NotificationsScreen.tsx  # Unread filter tabs & trip/wallet alerts
│   │   │   ├── PaymentMethodsScreen.tsx # RideGo Wallet in Rands, top-up chips, card selection
│   │   │   ├── RiderProfileScreen.tsx   # Core Tab 4 (Route: Account): Step 5 of 5 100% Ready progress banner, Tier 1 Verified Rider identity card (Nomvula Zungu, SmartID: 9403••••084), RIDEGOFIRST promo card, Capitec Pay Open Banking selector, 3 Active Urban Safety Safeguards (PIN, Live WhatsApp Share, Emergency Link), and 'Start Riding' CTA
│   │   │   ├── SafetyCentreScreen.tsx   # Emergency dispatch & trusted contacts
│   │   │   ├── SavedPlacesScreen.tsx    # Home, Work & favorite destination presets
│   │   │   └── SettingsScreen.tsx       # Push/SMS toggles, biometrics & South Africa region
│   │   ├── rides/                # Interactive ride booking, tracking, and receipts (Core Tabs 2 & 3: Rides & Activity)
│   │   │   ├── DestinationResultsScreen.tsx # Geocoded results & distance tags
│   │   │   ├── DestinationSearchScreen.tsx  # Stacked pill inputs & SA suggestions
│   │   │   ├── DriverFoundScreen.tsx        # Live driver tracking HUD, floating ETA pill, safety PIN security banner, driver console
│   │   │   ├── RideHistoryScreen.tsx        # Core Tab 3 (Route: Activity): Category tabs (Past, Upcoming, Business), Bento metrics (Trips: 28, Saved: R380, Rating: 4.98), filter chips, month header ('October 2024' + statement download), 3 featured trips (Volt Comfort EV, Volt Black Exec, Volt Eco Zero CO2), Environmental Impact card (114 kg CO2 Saved), and Enterprise shortcuts
│   │   │   ├── RideInProgressScreen.tsx     # Real-time animated vector map tracking, floating ETA HUD, safety PIN verification, live route progress scrubber
│   │   │   ├── RideOptionsScreen.tsx        # Core Tab 2 (Route: Rides): Top trajectory HUD ('22 mins • 14.2 km'), pickup/destination pills, Surge 1.0x badge, 4 tiers (Go Eco R75, Go Comfort R125, Go XL R195, Go Black R280) with strikethrough fares, Capitec Pay selector with -R20 promo chip, and PanResponder SlideToConfirm slider
│   │   │   ├── RideSearchingScreen.tsx      # Tactical dark geo-grid radar, expanding sonar waves, rotating scanner beam, nearby driver telemetry pings
│   │   │   ├── TripCompletedScreen.tsx      # Numerical transit feedback score (1–5), Rand tip chips (R10–R100)
│   │   │   ├── TripDetailsScreen.tsx        # Deep-dive trip summary, rebook CTA
│   │   │   └── TripReceiptScreen.tsx        # Itemized Rand invoice, wallet verification
│   │   └── index.ts              # Screen registry re-export
│   ├── services/                 # Remote API services & state management
│   │   ├── RideContext.tsx       # Global ride state machine, driver chat & Rand fares
│   │   └── .gitkeep
│   ├── types/                    # Domain models & TypeScript interfaces
│   │   ├── index.ts
│   │   └── .gitkeep
│   ├── utils/                    # Utility helpers and formatters
│   │   └── .gitkeep
│   ├── declarations.d.ts         # TypeScript asset module declarations (glb, obj, usdz, etc.)
│   ├── metro.config.js           # Metro bundler config extending asset extensions
│   ├── App.tsx                   # Root React Native component
│   ├── app.json                  # Expo application manifest
│   ├── index.js                  # Expo entry point
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript compiler configuration
│   └── README.md                 # Architecture & developer documentation
```

---

## 5. Screen Inventory & Flow Hierarchy

| Module | Screen Name | Description |
| :--- | :--- | :--- |
| **Onboarding** | `SplashOnboarding` | Ultra-sleek car-free route telemetry carousel with fluid native-driven sliding active indicator and geometric GPS sonar pulse loading sequence |
| **Auth** | `Account` | Stitch Gateway: Step 01/05 progress, Rider/Driver role switcher, Express Sign Up (Apple, Google, Capitec), SA inputs (+27), POPIA footer, and direct transit launch |
| **Auth** | `AccountType` | Role selection (Rider vs Driver) |
| **Auth** | `RiderRegistration` | Rider signup form with phone / credentials |
| **Home** | `RiderHome` | Core Tab 1 (Explore): Urban geo-grid map, Cape Town City Bowl focal halo, '24 Ride-Go Cars Nearby' live counter, 'Where to?' discovery console with 'Schedule: Now', quick service carousel (Go Ride, Go Comfort, Go 4x4, Package Courier), MZANSI30 promo card, Fast Bookings presets, Active Driver HUD, and locked BottomTabBar |
| **Rides** | `DestinationSearch` | Destination query input and suggested places |
| **Rides** | `DestinationResults` | Geocoded destination results and pin selection |
| **Rides** | `RideOptions` | Core Tab 2 (Rides): Top trajectory HUD ('22 mins • 14.2 km'), route pills, Surge 1.0x badge, 4 tiers (Go Eco R75, Go Comfort R125, Go XL R195, Go Black R280) with strikethrough fares, Capitec Pay selector with -R20 promo chip, and PanResponder SlideToConfirm slider |
| **Rides** | `RideSearching` | Tactical dark geo-grid radar, expanding sonar waves, rotating scanner beam, nearby driver telemetry pings, and cycling dispatch status |
| **Rides** | `DriverFound` | Live driver tracking HUD, floating ETA pill, safety PIN security banner, driver profile console, and upfront Rand fare |
| **Rides** | `RideInProgress` | Real-time animated vector map tracking, floating ETA HUD, safety PIN verification, and live route progress scrubber |
| **Rides** | `TripCompleted` | Destination reached summary and numerical transit score feedback (1–5) |
| **Rides** | `TripReceipt` | Itemized invoice breakdown, payment verification |
| **Rides** | `RideHistory` | Core Tab 3 (Activity): Category tabs (Past, Upcoming, Business), Bento metrics (Trips: 28, Saved: R380, Rating: 4.98), filter chips, month header ('October 2024' + statement download), 3 featured trips (Volt Comfort EV, Volt Black Exec, Volt Eco Zero CO2), Environmental Impact card (114 kg CO2 Saved), and Enterprise shortcuts |
| **Rides** | `TripDetails` | Deep-dive trip summary, route map, driver details |
| **Profile** | `RiderProfile` | Core Tab 4 (Account): Step 5 of 5 100% Ready progress banner, Tier 1 Verified Rider identity card (Nomvula Zungu, SmartID: 9403••••084), RIDEGOFIRST promo card, Capitec Pay Open Banking selector, 3 Active Urban Safety Safeguards (PIN, Live WhatsApp Share, Emergency Link), and 'Start Riding' CTA |
| **Profile** | `EditProfile` | Form to edit personal info, avatar, email, phone |
| **Profile** | `SavedPlaces` | Bookmark management for Home, Work, and Favorites |
| **Profile** | `PaymentMethods` | Card, digital wallet, and cash payment management |
| **Profile** | `Notifications` | Ride updates, safety alerts, and promotions |
| **Profile** | `SafetyCentre` | Emergency contacts, 24/7 helpline, safety tools |
| **Profile** | `HelpSupport` | Support articles, ticket creation, FAQ |
| **Profile** | `Settings` | App preferences, privacy, notification toggles |

---

## 6. Development & Running

### Start Dev Server (Pinned Port 8082)
```bash
npm start
```
*Uses `concurrently --kill-others-on-fail --raw` to ensure the Expo QR code renders properly without prefix garbling.*

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

### Run Type Checker
```bash
npm run type-check
```

---

## 7. Collaborator Contribution & Branching Strategy

This repository is maintained collaboratively under strict workflow constraints:

1. **Never push directly to `main`**: All commits are made on dedicated feature branches (`feature/<task-name>`).
2. **Target Secondary Collaboration Branch (`dev`)**: Pull requests must target and merge into `dev`, never directly into `main`.
3. **Issue Tracking**: Every unit of work opens and resolves 3 to 4 tracked GitHub issues.

---

## 8. Primary 4-Tab Navigation Architecture

RideGo features a persistent, floating 4-tab bottom navigation bar (`BottomTabBar.tsx`) adhering strictly to the 60-30-10 palette with frozen geometry (height 62px, pill radius 31px, carbon background `#16161A`, border `#2E2E36`, electric yellow active highlights `#FFD100`, and pure SVGs):

| Tab | Screen Component | Route Name | Description |
| :--- | :--- | :--- | :--- |
| **Explore** | `RiderHomeScreen.tsx` | `Explore` / `RiderHome` | **Initial landing screen**; interactive Cape Town/Sandton geo-grid map, live fleet counter (24 cars nearby), 'Where to?' discovery console, quick presets (V&A Waterfront, Camps Bay, Sandton City), parcel courier toggle, and locked bottom tab bar. |
| **Rides** | `RideOptionsScreen.tsx` | `Rides` / `RideOptions` | Ride selection console; top trip trajectory HUD (22 min / 14.2 km), pickup/dropoff overlay pills, Volt Eco / Go Comfort / Go Exec tier cards, and PanResponder `SlideToConfirm` slider. |
| **Activity** | `RideHistoryScreen.tsx` | `Activity` / `RideHistory` | Ride activity and history console; category tabs (Past, Upcoming, Business), 3-stat Bento grid metrics (28 Trips, R380 Saved, 4.98 Transit Score), month-grouped feed, and statement download. |
| **Account** | `RiderProfileScreen.tsx` | `Account` / `RiderProfile` | Rider account and profile console; 60-30-10 user card, avatar monogram, trip count, and direct shortcuts to Wallet, Saved Places, Safety Centre, Preferences & Settings, and Help & Support. |

---

## 9. Vehicle Graphics & Asset Attribution

RideGo employs a **hybrid vehicle visualization pipeline**:
- **Photorealistic 3D Renders**: Hero vehicle showcase cards in `assets/vehicles/` generated for inspection views and driver matching.
- **Scalable Vector SVGs (`VehicleSvgs.tsx`)**: High-performance vector vehicle components (`VehicleTopDownSvg` and `VehicleSideSvg`) used for realtime route tracking on `DarkRouteMap` and ride tier selection cards.
- **Attribution**: Vector vehicle blueprints derived and adapted from Vecteezy (*Toyota Prius illustration collection via Vecteezy.com* under standard attribution license).

---

## 10. Interactive Ride Engine & State Transitions

RideGo features an end-to-end interactive mobility workflow driven by `RideContext`:

1. **South African Rand Fare Engine**:
   - Standard: `R45.00`
   - Comfort: `R75.00`
   - Luxury: `R140.00`
   - Driver tips: `R10`, `R20`, `R50`, `R100` chips
2. **Lifecycle State Machine**:
   - `idle`: Pickups and destinations selected via search with live distance calculation.
   - `searching`: Dynamic radar pulse scanning nearby drivers in real-time.
   - `driver_found`: Matched driver card with license plate, rating, 3-minute ETA countdown, and in-app chat trigger.
   - `in_progress`: Turn-by-turn route tracking, destination arrival ticker, and instant SOS trigger.
   - `completed`: 5-star feedback rating, tipping, and itemized invoice receipt generation.
3. **In-App Driver Messaging**:
   - `DriverChatModal.tsx` provides instant two-way chat with preset quick-reply chips and simulated automated driver responses.
4. **Persistent Ride History**:
   - Completed rides are automatically logged to `rideHistory`, allowing riders to re-inspect full route receipts or re-book past routes with one tap.

---

## 11. Wallet, Saved Places & Rider Profile Hub

1. **RideGo Wallet & Payments ([PaymentMethodsScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/PaymentMethodsScreen.tsx))**:
   - Live South African Rand balance with auto-deduction upon ride completion.
   - Quick Top-Up chips (`+R50`, `+R100`, `+R200`, `+R500`) with instant balance refresh.
   - Payment method selector: RideGo Wallet (Default), Visa Debit, Mastercard, Cash to Driver.
2. **Saved Places ([SavedPlacesScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/SavedPlacesScreen.tsx))**:
   - Home, Work, and Airport preset destinations with one-tap route configuration.
   - Custom favorite places with instant address addition and distance indicators.
3. **Rider Profile & Editing ([RiderProfileScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/RiderProfileScreen.tsx) & [EditProfileScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/EditProfileScreen.tsx))**:
   - Dark 60-30-10 user card displaying rating (`4.95★`), trips count, and member longevity.
   - Dynamic avatar initials updating automatically upon name changes.
   - Central navigation hub providing direct access to Trip History, Wallet, Saved Places, and Safety Centre.

---

## 12. Safety Centre, Notifications & App Preferences

1. **Safety Centre & Emergency Dispatch ([SafetyCentreScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/SafetyCentreScreen.tsx))**:
   - South African Police Service (SAPS 10111) and National Cellular Emergency (112) quick-dial integration.
   - Toll-free RideGo 24/7 incident response hotline (`0800 902 435`).
   - Trusted emergency contacts and toggleable live telemetry trip sharing.
2. **Notifications & Trip Alerts ([NotificationsScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/NotificationsScreen.tsx))**:
   - Filter tabs for All vs Unread notifications with mark-all-read action.
   - Real-time alerts for driver matching, trip completion, and wallet credit confirmations.
3. **Settings & Legal Governance ([SettingsScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/SettingsScreen.tsx))**:
   - Interactive toggles for push alerts, SMS receipts, and biometric security.
   - South African POPIA privacy compliance documentation and Terms of Service.
4. **Help & Support Knowledge Base ([HelpSupportScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/profile/HelpSupportScreen.tsx))**:
   - Expandable FAQ accordion addressing Rand pricing, lost property, and safety.
   - Direct support ticket creation and agent callback triggers.

---

## 13. Authentication & Role Selection Flow

1. **Welcome Portal ([AccountScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/AccountScreen.tsx))**:
   - Clean 60-30-10 splash branding and vehicle silhouette hero.
   - Direct entry points for account creation and instant login.
2. **Account Role Selection ([AccountTypeScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/AccountTypeScreen.tsx))**:
   - Interactive role selection between Passenger (*"I want to ride"*) and Driver Partner (*"I want to drive"*).
3. **Rider Registration & Onboarding ([RiderRegistrationScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/RiderRegistrationScreen.tsx))**:
   - Registration form with first/last name, South African mobile (+27), email, and secure password.
   - Automatically initializes and synchronizes the rider profile within `RideContext` before routing to the main home dashboard.

---

## 14. 3D Model Asset Pipeline & Interactive 3D Viewer

1. **Master 3D Vehicle Models (`assets/models/`)**:
   - **`base.glb`** (4.18 MB): Binary GLTF 2.0 asset containing the complete vehicle geometry and PBR metallic-roughness material for hardware-accelerated WebGL rendering.
   - **`base.obj`** (11.75 MB): 60,014-vertex / 120,000-face Wavefront polygonal mesh providing precise physical vehicle dimensions: 0.89m width × 0.65m height × 1.90m length.
   - **`base.usdz`** (8.18 MB): Universal Scene Description package tailored for Apple QuickLook AR on iOS devices.
2. **Metro Asset Resolver Configuration ([metro.config.js](file:///d:/deployment_2026/ride-go/metro.config.js))**:
   - Extended `config.resolver.assetExts` to recognize `glb`, `gltf`, `obj`, and `usdz` extensions, allowing direct `require()` asset imports into React Native bundles.
3. **Hardware-Accelerated 3D Component ([Vehicle3DViewer.tsx](file:///d:/deployment_2026/ride-go/src/components/common/Vehicle3DViewer.tsx))**:
   - Embeds a high-performance WebGL canvas via `react-native-webview` utilizing Google `<model-viewer>`.
   - **Full 360° Interaction**: Touch-based orbital rotation with natural inertia and auto-rotate toggling.
   - **Camera Orbit Presets**: Programmatic camera transitions between Front (`0deg 75deg 2.4m`), 3/4 Perspective (`45deg 72deg 2.5m`), Side (`90deg 75deg 2.4m`), and Rear (`180deg 75deg 2.4m`).
   - **Instant SVG Fallback**: Zero-latency rendering using `VehicleSvgs.tsx` (`Vehicle3DFrontSvg`, `Vehicle3DShadedSideSvg`, `Vehicle3DRearSvg`) while WebGL initializes or when offline.
   - **Strict Compliance**: Adheres to the 60-30-10 palette (`#071A3D`, `#102A52`, `#5BC0FF`) with zero Rule 16 / Rule 17 forbidden badges.
4. **Embedded Data URI Architecture ([vehicleModelData.ts](file:///d:/deployment_2026/ride-go/src/constants/vehicleModelData.ts))**:
   - Encodes `base.glb` into an in-memory `data:model/gltf-binary;base64,...` constant.
   - Completely bypasses Metro bundler startup cache latency, eliminating `Cannot find module ... base.glb` errors when running across pre-existing Expo processes without requiring a server reboot (`npx expo start -c`).
5. **Real-Time Automotive Paint Customization**:
   - **Dynamic PBR Material Tuning**: Injected WebGL script calls `setBaseColorFactor`, `setMetallicFactor`, and `setRoughnessFactor` across model materials in real time.
   - **Curated Finishes**: Cyber Cyan (`#5BC0FF`), Deep Sapphire (`#1D3557`), Platinum Silver (`#C9D6E8`), Obsidian Navy (`#102A52`), Pure Pearl (`#FFFFFF`), and Matte Charcoal (`#334155`).
   - **Interactive Paint Swatches**: Floating top-right paint chips with active indicator ring allowing users to customize car paint on the fly during onboarding and vehicle inspection.
   - **SVG Fallback Synchronization**: Seamlessly propagates selected paint finish to vector SVG fallbacks (`primaryColor={selectedColor.hex}`).

