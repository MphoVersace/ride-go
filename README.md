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
│   │   │   ├── DarkRouteMap.tsx  # Vector dark map with glowing cyan route polyline
│   │   │   ├── SvgIcons.tsx      # Vector SVG library (pins, steer, chat, stars, seats)
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
│   │   │   ├── AccountScreen.js
│   │   │   ├── AccountTypeScreen.js
│   │   │   └── RiderRegistrationScreen.js
│   │   ├── home/                 # Main home experience
│   │   │   └── RiderHomeScreen.tsx # Dark map, pill inputs, service tabs, Rand tiers
│   │   ├── onboarding/           # Animated splash & introduction
│   │   │   └── SplashOnboardingScreen.tsx
│   │   ├── profile/              # Profile, settings, and support
│   │   │   ├── EditProfileScreen.js
│   │   │   ├── HelpSupportScreen.js
│   │   │   ├── NotificationsScreen.js
│   │   │   ├── PaymentMethodsScreen.js
│   │   │   ├── RiderProfileScreen.js
│   │   │   ├── SafetyCentreScreen.js
│   │   │   ├── SavedPlacesScreen.js
│   │   │   └── SettingsScreen.js
│   │   ├── rides/                # Ride booking, search, live tracking, receipts
│   │   │   ├── DestinationResultsScreen.js
│   │   │   ├── DestinationSearchScreen.tsx # Stacked pill inputs & Cape Town suggestions
│   │   │   ├── DriverFoundScreen.tsx     # ETA banner, top-down 3D vehicle card, chat CTA
│   │   │   ├── RideHistoryScreen.js
│   │   │   ├── RideInProgressScreen.tsx  # Live route ticker & emergency trigger
│   │   │   ├── RideOptionsScreen.js
│   │   │   ├── RideSearchingScreen.js
│   │   │   ├── TripCompletedScreen.tsx   # 5-star rating, Rand tip chips (R10, R20, R50)
│   │   │   ├── TripDetailsScreen.js
│   │   │   └── TripReceiptScreen.js
│   │   └── index.ts              # Screen registry re-export
│   ├── services/                 # Remote API services & storage
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
| **Home** | `RiderHome` | Main dashboard with map view, current location, quick actions |
| **Rides** | `DestinationSearch` | Destination query input and suggested places |
| **Rides** | `DestinationResults` | Geocoded destination results and pin selection |
| **Rides** | `RideOptions` | Ride tier selection (Standard, Comfort, XL) with fare quotes |
| **Rides** | `RideSearching` | Dynamic radar/searching state locating nearby drivers |
| **Rides** | `DriverFound` | Matched driver info, vehicle details, ETA, plate number |
| **Rides** | `RideInProgress` | Live route tracking, turn-by-turn simulation, SOS trigger |
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
