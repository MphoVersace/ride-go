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
- **Orchestration**: `concurrently` (multi-process terminal runner with ungarbled QR display)

---

## 2. 60-30-10 Design System

RideGo adheres strictly to the **60-30-10 visual hierarchy rule** with a maximum of 3 primary color roles across the entire application:

| Distribution | Role | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **60%** | **Dominant Background** | `#071A3D` / `#051329` | Deep navy base applied to all screens and container views |
| **30%** | **Panel & Surface** | `#102A52` / `#16325C` | Cards, elevated sheets, input fields, containers, borders (`#1D3557`) |
| **10%** | **Accent & Action** | `#5BC0FF` | Primary action buttons, active navigation states, pins, highlights |

**Strict Policy**: Ad-hoc rainbow status tags, badges (e.g. 'READ ONLY', 'DEMO ONLY', 'OK'), and hover glow animations are strictly forbidden.

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
│   └── vehicles/                 # Photorealistic 3D vehicle assets
│       ├── car_perspective.jpg   # 3D perspective sedan render
│       └── car_top_down.jpg      # Top-down vehicle inspection render
├── src/                          # Application source code
│   ├── assets/
│   │   ├── icons/                # SVG vector assets
│   │   └── .gitkeep
│   ├── components/
│   │   ├── common/               # Reusable UI primitives
│   │   │   ├── BottomTabBar.tsx  # Floating 4-tab navigation bar (Home, Trips, Wallet, Profile)
│   │   │   ├── DarkRouteMap.tsx  # Vector dark map with interpolated vehicle motion along path & ETA bubble
│   │   │   ├── DriverChatModal.tsx # In-app driver chat sheet with quick replies
│   │   │   ├── SvgIcons.tsx      # Vector SVG library (pins, steer, chat, stars, check)
│   │   │   ├── VehicleSvgs.tsx   # Top-down & side vector vehicle SVGs (Sedan, Bike, Bakkie, Truck)
│   │   │   └── .gitkeep
│   ├── constants/
│   │   ├── colors.ts             # 60-30-10 color palette tokens
│   │   ├── metrics.ts            # 8px spacing grid & platform specs (Android & iOS)
│   │   └── index.ts              # Constants barrel export
│   ├── navigation/
│   │   ├── types.ts              # Strongly-typed RootStackParamList & navigation props
│   │   ├── RootNavigator.tsx     # Centralized NativeStackNavigator registration
│   │   └── index.ts              # Navigation barrel export
│   ├── screens/                  # Modular domain screen components
│   │   ├── auth/                 # Authentication & onboarding flow
│   │   │   ├── AccountScreen.tsx        # Welcome screen with login & account creation CTAs
│   │   │   ├── AccountTypeScreen.tsx    # Role selection (Rider vs Driver partner)
│   │   │   └── RiderRegistrationScreen.tsx # Rider signup form with profile sync
│   │   ├── home/                 # Main home experience
│   │   │   └── RiderHomeScreen.tsx # Dark map, pill inputs, service tabs, Rand tiers
│   │   ├── onboarding/           # Animated splash & introduction
│   │   │   └── SplashOnboardingScreen.tsx
│   │   ├── profile/              # Profile, settings, and support
│   │   │   ├── EditProfileScreen.tsx    # Live name/email/phone editing with avatar generation
│   │   │   ├── HelpSupportScreen.tsx    # Interactive FAQ accordion & ticket submission
│   │   │   ├── NotificationsScreen.tsx  # Unread filter tabs & trip/wallet alerts
│   │   │   ├── PaymentMethodsScreen.tsx # RideGo Wallet in Rands, top-up chips, card selection
│   │   │   ├── RiderProfileScreen.tsx   # Dark 60-30-10 user card, trip stats, account shortcuts
│   │   │   ├── SafetyCentreScreen.tsx   # SAPS 10111 / 112 dispatch & trusted contacts
│   │   │   ├── SavedPlacesScreen.tsx    # Home, Work & favorite destination presets
│   │   │   └── SettingsScreen.tsx       # Push/SMS toggles, biometrics & South Africa region
│   │   ├── rides/                # Interactive ride booking, tracking, and receipts
│   │   │   ├── DestinationResultsScreen.tsx # Geocoded results & distance tags
│   │   │   ├── DestinationSearchScreen.tsx  # Stacked pill inputs & SA suggestions
│   │   │   ├── DriverFoundScreen.tsx        # Driver match, 3D card, live chat trigger
│   │   │   ├── RideHistoryScreen.tsx        # Trip activity list in Rands
│   │   │   ├── RideInProgressScreen.tsx     # Live route ticker & SOS trigger
│   │   │   ├── RideOptionsScreen.tsx        # Vehicle tier picker (Standard, Comfort, Luxury)
│   │   │   ├── RideSearchingScreen.tsx      # Animated radar pulse & driver search
│   │   │   ├── TripCompletedScreen.tsx      # 5-star rating, Rand tip chips (R10–R100)
│   │   │   ├── TripDetailsScreen.tsx        # Deep-dive trip summary, rebook CTA
│   │   │   └── TripReceiptScreen.tsx        # Itemized Rand invoice, wallet verification
│   │   └── index.ts              # Screen registry re-export
│   ├── services/                 # Remote API services & state management
│   │   ├── RideContext.tsx       # Global ride state machine, driver chat & Rand fares
│   │   └── .gitkeep
│   ├── types/                    # Domain models & TypeScript interfaces
│   │   ├── index.ts
│   │   └── .gitkeep
│   └── utils/                    # Utility helpers and formatters
│       └── .gitkeep
├── App.tsx                       # Root React Native component
├── app.json                      # Expo application manifest
├── index.js                      # Expo entry point
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md                     # Architecture & developer documentation
```

---

## 5. Screen Inventory & Flow Hierarchy

| Module | Screen Name | Description |
| :--- | :--- | :--- |
| **Onboarding** | `SplashOnboarding` | Animated vehicle & branding intro with splash sequence |
| **Auth** | `Account` | Welcome screen with Log in / Register CTAs |
| **Auth** | `AccountType` | Role selection (Rider vs Driver) |
| **Auth** | `RiderRegistration` | Rider signup form with phone / credentials |
| **Home** | `RiderHome` | Dual mode (Rides & Parcel Delivery), moving hero promo, map, and floating bottom tab bar |
| **Rides** | `DestinationSearch` | Destination query input and suggested places |
| **Rides** | `DestinationResults` | Geocoded destination results and pin selection |
| **Rides** | `RideOptions` | Ride tier selection (Standard, Comfort, Luxury) with fare quotes |
| **Rides** | `RideSearching` | Dynamic radar/searching state locating nearby drivers |
| **Rides** | `DriverFound` | Matched driver info, vehicle details, ETA, plate number |
| **Rides** | `RideInProgress` | Real-time animated vector map tracking, countdown bubble, route scrubber, distance ticker |
| **Rides** | `TripCompleted` | Destination reached summary and star rating submission |
| **Rides** | `TripReceipt` | Itemized invoice breakdown, payment verification |
| **Rides** | `RideHistory` | List of past trips with dates, routes, and amounts |
| **Rides** | `TripDetails` | Deep-dive trip summary, route map, driver details |
| **Profile** | `RiderProfile` | User profile overview, rating, shortcuts to settings |
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

## 8. Vehicle Graphics & Asset Attribution

RideGo employs a **hybrid vehicle visualization pipeline**:
- **Photorealistic 3D Renders**: Hero vehicle showcase cards in `assets/vehicles/` generated for inspection views and driver matching.
- **Scalable Vector SVGs (`VehicleSvgs.tsx`)**: High-performance vector vehicle components (`VehicleTopDownSvg` and `VehicleSideSvg`) used for realtime route tracking on `DarkRouteMap` and ride tier selection cards.
- **Attribution**: Vector vehicle blueprints derived and adapted from Vecteezy (*Toyota Prius illustration collection via Vecteezy.com* under standard attribution license).

---

## 9. Interactive Ride Engine & State Transitions

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

## 10. Wallet, Saved Places & Rider Profile Hub

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

## 11. Safety Centre, Notifications & App Preferences

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

## 12. Authentication & Role Selection Flow

1. **Welcome Portal ([AccountScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/AccountScreen.tsx))**:
   - Clean 60-30-10 splash branding and vehicle silhouette hero.
   - Direct entry points for account creation and instant login.
2. **Account Role Selection ([AccountTypeScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/AccountTypeScreen.tsx))**:
   - Interactive role selection between Passenger (*"I want to ride"*) and Driver Partner (*"I want to drive"*).
3. **Rider Registration & Onboarding ([RiderRegistrationScreen.tsx](file:///d:/deployment_2026/ride-go/src/screens/auth/RiderRegistrationScreen.tsx))**:
   - Registration form with first/last name, South African mobile (+27), email, and secure password.
   - Automatically initializes and synchronizes the rider profile within `RideContext` before routing to the main home dashboard.




