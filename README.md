# Ride Go - Intelligent Ride-Hailing Application

[![Platform](https://img.shields.io/badge/Platform-Android_Native-0B1938?style=for-the-badge&logo=android&logoColor=FFFFFF&labelColor=000000)](https://developer.android.com/)
[![Language](https://img.shields.io/badge/Language-Kotlin_1.9-0B1938?style=for-the-badge&logo=kotlin&logoColor=FFFFFF&labelColor=000000)](https://kotlinlang.org/)
[![UI Toolkit](https://img.shields.io/badge/UI-Jetpack_Compose-0B1938?style=for-the-badge&logo=jetpackcompose&logoColor=FFFFFF&labelColor=000000)](https://developer.android.com/jetpack/compose)
[![Architecture](https://img.shields.io/badge/Architecture-MVVM_%2B_Flow-0B1938?style=for-the-badge&logo=androidstudio&logoColor=FFFFFF&labelColor=000000)](https://developer.android.com/topic/architecture)
[![Design System](https://img.shields.io/badge/Design_System-Strict_60--30--10_Black_Navy_White-0E2454?style=for-the-badge&logo=materialdesign&logoColor=FFFFFF&labelColor=000000)](#design-architecture)
[![Region](https://img.shields.io/badge/Region-South_Africa-0B1938?style=for-the-badge&logo=googlemaps&logoColor=FFFFFF&labelColor=000000)](#key-features)
[![License](https://img.shields.io/badge/License-Proprietary-0B1938?style=for-the-badge&logo=shield&logoColor=FFFFFF&labelColor=000000)](#)

Ride Go is a state-of-the-art native Android ride-hailing and mobility application crafted for South Africa. Featuring real-time driver dispatch radar telemetry, dynamic ride tier selection with interactive confirmation slider, passenger trip history bento grids, and comprehensive rider verification and driver onboarding workflows.

---

## Design Architecture

[![Design System](https://img.shields.io/badge/Design_Standard-Strict_60--30--10_Rule-0E2454?style=flat-square&logo=materialdesign&logoColor=FFFFFF&labelColor=0B1938)](#)
[![Dominant Background](https://img.shields.io/badge/60%25_Background-Black_%23000000-000000?style=flat-square&logoColor=FFFFFF&labelColor=050811)](#)
[![Panel Surface](https://img.shields.io/badge/30%25_Surface-Deep_Navy_%230B1938-0B1938?style=flat-square&logoColor=FFFFFF&labelColor=0E2454)](#)
[![High Contrast Accent](https://img.shields.io/badge/10%25_Accent-Pure_White_%23FFFFFF-FFFFFF?style=flat-square&logoColor=000000&labelColor=0E2454)](#)

Ride Go strictly adheres to the **60-30-10 rule** with a maximum of 3 core primary color families across the entire design system, eliminating saturated cyan, royal blue, or rainbow status badges to ensure AAA readability and sleek executive aesthetics:

```
┌─────────────────────────────────────────────────────────────┐
│ 60% Dominant Canvas: Pure Black (#000000 / Obsidian Base)   │
├─────────────────────────────────────────────────────────────┤
│ 30% Panels & Action Surfaces: Deep Navy Blue (#0B1938,      │
│     #0E2454, #132B60) - Cards, sheets, nav, containers      │
├─────────────────────────────────────────────────────────────┤
│ 10% High-Contrast Typography & Accent: Crisp Pure White     │
│     (#FFFFFF) - Razor-sharp text headers, primary labels,   │
│     radar pins, and telemetry (+ #94A3B8 secondary white)   │
└─────────────────────────────────────────────────────────────┘
```

### Color Token Mapping

| Role | Token Name | Hex Code | Visual Application |
|---|---|---|---|
| **60% Canvas** | `VoltSurface` | `#000000` | Scaffolds, background surfaces, map backdrops |
| **60% Base** | `VoltSurfaceDim` | `#050811` | Deep obsidian shadow gradients |
| **30% Panel** | `VoltSurfaceContainer` | `#0D172E` | Card containers, modal sheets, bento blocks |
| **30% Action** | `VoltPrimaryContainer` | `#0E2454` | Primary brand containers, buttons, squircle pills |
| **30% Elevated** | `DeepNavySurfaceHigh` | `#132B60` | Elevated surfaces, timeline base vectors |
| **10% Contrast** | `VoltOnSurface` | `#FFFFFF` | Primary headers, body text, high-contrast labels |
| **10% Accent** | `VoltPrimary` | `#FFFFFF` | Radiant pure white highlight and interactive accents |
| **10% Contrast** | `VoltOnPrimaryContainer` | `#FFFFFF` | Text and icons on Deep Navy primary containers |
| **Highlight** | `IceBlue` (Mapped) | `#FFFFFF` | Pure white telemetry pulses, GPS waypoint halo, reticles |
| **Trajectory** | `MediumBlue` (Mapped) | `#FFFFFF` | Crisp white active route polyline on dark navy base |
| **Secondary** | `VoltOnSurfaceVariant` | `#94A3B8` | Secondary labels, ETA subtitles, inactive icons |
| **Border** | `VoltOutline` | `#1E293B` | Structural divider strokes, subtle container outlines |

---

## Project Architecture & Directory Structure

[![Architecture](https://img.shields.io/badge/Pattern-Clean_Architecture_%2F_MVVM-0E2454?style=flat-square&logo=androidstudio&logoColor=7DD3FC&labelColor=0B1938)](#)
[![Concurrency](https://img.shields.io/badge/Async-Kotlin_Coroutines_%26_Flow-0E2454?style=flat-square&logo=kotlin&logoColor=7DD3FC&labelColor=0B1938)](#)

Built using modern **Android Jetpack Compose**, **Kotlin Coroutines / Flow**, and **MVVM architecture**:

```
ride-go/
├── .github/
│   └── workflows/
│       └── build-apk.yml                         # Automated cloud APK compilation, packaging & latest GitHub release
├── app/
│   ├── debug.keystore                            # Fixed debug signing keystore for continuous in-place updates
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml               # REQUEST_INSTALL_PACKAGES and FileProvider declarations
│   │   │   ├── java/com/example/
│   │   │   │   ├── MainActivity.kt               # Main navigation host, update banner & state coordinator
│   │   │   │   ├── model/
│   │   │   │   │   └── RideModels.kt             # Data classes, tiers, states, ride telemetry
│   │   │   │   ├── util/
│   │   │   │   │   └── UpdateManager.kt          # GitHub Releases API consumer, APK downloader & package installer
│   │   │   │   ├── viewmodel/
│   │   │   │   │   └── VoltViewModel.kt          # UI state, destination search, payment methods & update manager
│   │   │   │   └── ui/
│   │   │   │       ├── theme/
│   │   │   │       │   ├── Color.kt              # 60-30-10 Design tokens (Black, Deep Navy, White)
│   │   │   │       │   ├── Theme.kt              # MaterialTheme colorScheme and configurations
│   │   │   │       │   └── Type.kt               # Modern typography scale
│   │   │   │       ├── components/
│   │   │   │       │   ├── RideGoLogo.kt         # Official Ride Go brand logo component utilizing RIDEGO.png assets
│   │   │   │       │   ├── RadarViewport.kt      # Real-time driver radar sweep canvas
│   │   │   │       │   ├── SlideToConfirm.kt     # Interactive physics-based booking confirmation slider
│   │   │   │       │   ├── VehicleSilhouette.kt  # Vector vehicle graphics with Deep Navy shadow
│   │   │   │       │   ├── VoltBottomNav.kt      # 4-core screen bottom navigation bar
│   │   │   │       │   └── VoltTopBar.kt         # Sticky header with official Ride GO brand mark and telemetry
│   │   │   │       └── screens/
│   │   │   │           ├── SplashScreen.kt       # Kinetic brand loader with centered Ride Go logo
│   │   │   │           ├── AuthScreen.kt         # Direct Rider & Driver sign-up and authentication
│   │   │   │           ├── DestinationSearchScreen.kt # Real-time South African place search & dual route console
│   │   │   │           ├── ExploreScreen.kt      # Vector map anchored to current location with quick destination launch
│   │   │   │           ├── RidesScreen.kt        # Ride tier selection, dynamic distance/duration & slide-up payment sheet
│   │   │   │           ├── DispatchScreen.kt     # Live driver radar search & dispatch status
│   │   │   │           ├── LiveTrackingScreen.kt # Real-time trip tracking with driver marker, ETA & security PIN
│   │   │   │           ├── ActivityScreen.kt     # Multi-tab activity hub: Past Trips, Upcoming reservations & Business expensing
│   │   │   │           ├── AccountScreen.kt      # User profile, wallet, security, South Africa SOS
│   │   │   │           ├── RiderVerificationScreen.kt # Biometric selfie & SA Smart ID card scan
│   │   │   │           └── DriverOnboardingScreen.kt  # Driver PDP, license, vehicle inspection & streamlined progress
│   │   │   └── res/
│   │   │       ├── xml/
│   │   │       │   └── file_paths.xml            # FileProvider cache paths for secure APK installation
│   │   │       └── ...                           # Android launcher mipmaps, official RIDEGO assets, and strings
│   │   └── test/                                 # Robolectric unit tests and automated state assertions
│   └── build.gradle.kts                          # Module dependencies, signingConfigs and Android SDK config
├── debug.keystore                                # Root fixed debug signing keystore
├── gradle/
│   ├── wrapper/
│   │   ├── gradle-wrapper.jar                    # Gradle wrapper bootstrap jar
│   │   └── gradle-wrapper.properties             # Gradle distribution definition
│   └── libs.versions.toml                        # Version catalog
├── gradlew                                       # Gradle wrapper executable script (Linux/macOS)
├── gradlew.bat                                   # Gradle wrapper batch script (Windows)
├── build.gradle.kts                              # Project-level build script
├── settings.gradle.kts                           # Module and plugin management
├── metadata.json                                 # App metadata descriptor
└── README.md                                     # Project architecture and documentation
```

---

## Key Features

[![Core Features](https://img.shields.io/badge/Capabilities-Driver_Radar_%7C_In--App_Updater_%7C_Destination_Search-0E2454?style=flat-square&logo=googlemaps&logoColor=7DD3FC&labelColor=0B1938)](#)

1. **Native In-App Self-Updater (GitHub Releases Integration)**:
   - **Fixed Keystore Security**: Committed `debug.keystore` guarantees persistent cryptographic signature consistency across all automated CI builds, preventing Android "App not installed: signature mismatch" errors.
   - **Automated Continuous Releases**: GitHub Actions automatically updates the `latest` tag release with fresh `ride-go-debug.apk` binaries on every successful build.
   - **In-App Notification & One-Tap Install**: Checks `https://api.github.com/repos/MphoVersace/ride-go/releases/latest` at startup, displays a floating update banner, downloads the APK with download progress, and triggers native Android package installer via `FileProvider`.
2. **Current Location Map & Hub Telemetry**:
   - Interactive vector map centered on the rider's actual current location (`uiState.pickupLocation`).
   - Real-time GPS calibration button and localized active vehicle fleet telemetry.
3. **South African Destination & Dual Route Search Screen**:
   - Full-screen search console with dual text inputs for editing pickup and destination.
   - Real-time instant filtering across South African international airports (O.R. Tambo, CPT, King Shaka), business hubs (Sandton, Rosebank, Foreshore), and shopping landmarks (Mall of Africa, Canal Walk, Menlyn Maine, Gateway Theatre of Shopping).
   - Direct one-tap transition into the Rides screen with route metrics pre-loaded.
4. **Dynamic Route Metrics & Interactive Location Editing in Rides Tab**:
   - Contextual distance and duration calculation (e.g. `24.0 km • 28 mins`) between current location and destination.
   - Conceals route metrics until destination is explicitly configured.
   - Fully clickable pickup and destination pills enabling immediate modification without losing trip context.
5. **Slide-Up Payment Methods Sheet**:
   - Tapping the payment pill triggers an animated slide-up bottom sheet with darkened scrim backdrop overlay.
   - Authentic South African payment options (Capitec Pay, Standard Bank Visa, FNB Cheque Card, Absa Debit, Ride Go Wallet, and Cash).
   - Dismissible via tap-outside scrim, "Done" action, or payment selection.
6. **Vector Radar & Dynamic Map Canvas**: Live animated driver telemetry with crisp white trajectory lines and pulsating waypoint halos on deep navy road grids.
7. **Interactive Slide-To-Confirm**: Physical drag gesture slider with Deep Navy thumb, pure white trail fill, and haptic feedback.
8. **Live Driver Tracking & Approach Telemetry (Post-Confirmation)**:
   - **Dynamic Vector Approach from Random Distance**: When ride request is confirmed, driver is initialized at a realistic randomized starting distance (1.6 km to 3.8 km) away from rider's current or selected pickup location.
   - **Real-Time Heading & Directional Rotation**: Vector map canvas continuously steers driver vehicle puck towards the rider's pickup coordinate with forward headlights beam, pulsing radar ring, and directional tangent angle orientation.
   - **Live Distance & ETA Countdown**: Live ETA HUD dynamically calculates remaining distance and arrival countdown in real-time as the driver advances towards the user.
   - **Pickup Location Waypoint Marker**: Pulsing concentric GPS beacon and destination overlay pill anchoring the driver's heading target directly to the rider's current or selected pickup spot.
   - **4-Digit Ride Security PIN Banner**: Pre-departure identity verification code before vehicle departure.
   - **Verified Driver Profile Card**: Authentic South African number plate (`JM 42 KL • GP`), vehicle specs, rating, and quick communications suite (Call, In-App Message, Trip Share, Safety Center).
9. **South African Verification Suite**:
   - Biometric facial scan with high-contrast alignment reticles.
   - Smart ID Card OCR viewport with corner boundary detection.
10. **Driver Onboarding Flow**: Multi-step document verification, vehicle inspection, and PDP clearance.
11. **Streamlined Auth & Reliable Back Navigation**: Direct sign-in and sign-up pathways with robust BackHandler and top-bar back button routing returning directly to the authentication screen without role loop traps.
12. **Multi-Tab Activity Hub & Corporate Expensing**:
    - **Past Trips**: Historical rides, digital receipts, rebooking, and stat bento metrics.
    - **Upcoming Reservations**: Advance booking tracking, flight arrival integration, locked fares, and flexible cancellation.
    - **Business Mobility**: Enterprise corporate profiles, automated SAP Concur / Expensify sync, SARS 15% VAT itemized invoicing, and cost center management.

---

## Cloud CI/CD & Device Installation (No Android Studio Required)

[![CI Build](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-0E2454?style=for-the-badge&logo=githubactions&logoColor=7DD3FC&labelColor=000000)](#)
[![Artifact](https://img.shields.io/badge/Build_Artifact-ride--go--debug--apk-0B1938?style=for-the-badge&logo=android&logoColor=7DD3FC&labelColor=000000)](#)
[![Workflow](https://img.shields.io/badge/Workflow-build--apk.yml-0E2454?style=for-the-badge&logo=yaml&logoColor=7DD3FC&labelColor=000000)](#)

For lightweight development machines or rapid on-device testing without running heavy local Android Studio emulators and Gradle daemons, Ride Go provides automated cloud compilation via GitHub Actions:

### How to Download & Install on Your Physical Android Device
1. Navigate to the **Actions** tab in the GitHub repository: [`MphoVersace/ride-go/actions`](https://github.com/MphoVersace/ride-go/actions).
2. Select the latest workflow run under **Build Android APK** (triggered on every push to `dev`, pull request, or manually via **Run workflow**).
3. Scroll down to the **Artifacts** section at the bottom of the summary page.
4. Download the `ride-go-debug-apk` archive (contains `app-debug.apk`).
5. Transfer `app-debug.apk` to your phone (via USB cable, Google Drive, WhatsApp, or browser download directly on your phone).
6. Tap `app-debug.apk` on your phone, permit "Install from unknown sources" if prompted, and launch Ride Go directly.

---

## Local Development (Optional)

[![Environment](https://img.shields.io/badge/Build_Tool-Gradle_Kotlin_DSL-0E2454?style=flat-square&logo=gradle&logoColor=7DD3FC&labelColor=0B1938)](#)
[![Min SDK](https://img.shields.io/badge/Min_SDK-API_26-0B1938?style=flat-square&labelColor=000000)](#)
[![Target SDK](https://img.shields.io/badge/Target_SDK-API_34-0B1938?style=flat-square&labelColor=000000)](#)

### Prerequisites
- **Android Studio** (Ladybug / Koala or newer)
- **JDK 17+**
- **Android SDK** (API 34 / Android 14+)

### Steps to Run Locally
1. Open Android Studio.
2. Select **Open** and choose the `ride-go` root directory.
3. Allow Gradle to synchronize dependencies.
4. Copy `.env.example` to `.env` and provide your optional `GEMINI_API_KEY`.
5. Select an Android Emulator or physical device (API 26+) and click **Run**.
