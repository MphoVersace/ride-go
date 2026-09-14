# Ride Go - Intelligent Ride-Hailing Application

[![Platform](https://img.shields.io/badge/Platform-Android_Native-0B1938?style=for-the-badge&logo=android&logoColor=7DD3FC&labelColor=000000)](https://developer.android.com/)
[![Language](https://img.shields.io/badge/Language-Kotlin_1.9-0B1938?style=for-the-badge&logo=kotlin&logoColor=7DD3FC&labelColor=000000)](https://kotlinlang.org/)
[![UI Toolkit](https://img.shields.io/badge/UI-Jetpack_Compose-0B1938?style=for-the-badge&logo=jetpackcompose&logoColor=7DD3FC&labelColor=000000)](https://developer.android.com/jetpack/compose)
[![Architecture](https://img.shields.io/badge/Architecture-MVVM_%2B_Flow-0B1938?style=for-the-badge&logo=androidstudio&logoColor=7DD3FC&labelColor=000000)](https://developer.android.com/topic/architecture)
[![Design System](https://img.shields.io/badge/Design_System-60--30--10_Navy_Palette-0E2454?style=for-the-badge&logo=materialdesign&logoColor=7DD3FC&labelColor=000000)](#design-architecture)
[![Region](https://img.shields.io/badge/Region-South_Africa-0B1938?style=for-the-badge&logo=googlemaps&logoColor=7DD3FC&labelColor=000000)](#key-features)
[![License](https://img.shields.io/badge/License-Proprietary-0B1938?style=for-the-badge&logo=shield&logoColor=7DD3FC&labelColor=000000)](#)

Ride Go is a state-of-the-art native Android ride-hailing and mobility application crafted for South Africa. Featuring real-time driver dispatch radar telemetry, dynamic ride tier selection with interactive confirmation slider, passenger trip history bento grids, and comprehensive rider verification and driver onboarding workflows.

---

## Design Architecture

[![Design System](https://img.shields.io/badge/Design_Standard-60--30--10_Rule-0E2454?style=flat-square&logo=materialdesign&logoColor=7DD3FC&labelColor=0B1938)](#)
[![Primary Palette](https://img.shields.io/badge/Primary_Palette-Deep_Navy_%230B1938-0B1938?style=flat-square&logoColor=7DD3FC&labelColor=000000)](#)
[![Accent](https://img.shields.io/badge/Accent-Ice_Blue_%237DD3FC-7DD3FC?style=flat-square&logoColor=0B1938&labelColor=0B1938)](#)

Ride Go strictly adheres to the **60-30-10 rule** with a refined, cohesive color palette designed for night-mode visual comfort, telemetry clarity, and accessible contrast:

```
┌─────────────────────────────────────────────────────────────┐
│ 60% Dominant Canvas: Pure Black (#000000 / Obsidian Base)   │
├─────────────────────────────────────────────────────────────┤
│ 30% Panels & Action Surfaces: Deep Navy Blue (#0B1938,      │
│     #0E2454) - Replaces yellow primary containers           │
├─────────────────────────────────────────────────────────────┤
│ 10% High-Contrast Typography: Crisp Pure White (#FFFFFF)   │
│     + Blue Harmony Scale:                                   │
│     • Ice Blue (#7DD3FC, #BAE6FD) - Telemetry & Radar      │
│     • Medium Blue (#2563EB) - Navigation Polylines         │
│     • Muted Blue-Gray (#94A3B8, #1E293B) - Secondary Labels│
└─────────────────────────────────────────────────────────────┘
```

### Color Token Mapping

| Role | Token Name | Hex Code | Visual Application |
|---|---|---|---|
| **60% Canvas** | `VoltSurface` | `#000000` | Scaffolds, background surfaces, map backdrops |
| **60% Base** | `VoltSurfaceDim` | `#050811` | Deep obsidian shadow gradients |
| **30% Panel** | `VoltSurfaceContainer` | `#0D172E` | Card containers, modal sheets, bento blocks |
| **30% Action** | `VoltPrimaryContainer` | `#0E2454` | Primary brand containers, buttons, squircle pills |
| **10% Contrast** | `VoltOnSurface` | `#FFFFFF` | Primary headers, body text, high-contrast labels |
| **10% Contrast** | `VoltOnPrimaryContainer` | `#FFFFFF` | Text/icons on Deep Navy primary containers |
| **Highlight** | `IceBlue` / `IceBlueSoft` | `#7DD3FC` / `#BAE6FD` | Radar pulses, GPS waypoint halo, laser reticles |
| **Trajectory** | `MediumBlue` | `#2563EB` | Active route vector polyline, selected indicator borders |
| **Secondary** | `MutedBlueGray` | `#94A3B8` | Secondary labels, ETA subtitles, inactive icons |
| **Border** | `VoltOutline` | `#1E293B` | Structural divider strokes, container outlines |

---

## Project Architecture & Directory Structure

[![Architecture](https://img.shields.io/badge/Pattern-Clean_Architecture_%2F_MVVM-0E2454?style=flat-square&logo=androidstudio&logoColor=7DD3FC&labelColor=0B1938)](#)
[![Concurrency](https://img.shields.io/badge/Async-Kotlin_Coroutines_%26_Flow-0E2454?style=flat-square&logo=kotlin&logoColor=7DD3FC&labelColor=0B1938)](#)

Built using modern **Android Jetpack Compose**, **Kotlin Coroutines / Flow**, and **MVVM architecture**:

```
ride-go/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/example/
│   │   │   │   ├── MainActivity.kt               # Main navigation host & state coordinator
│   │   │   │   ├── model/
│   │   │   │   │   └── RideModels.kt             # Data classes, tiers, states, ride telemetry
│   │   │   │   ├── viewmodel/
│   │   │   │   │   └── VoltViewModel.kt          # UI state, ride dispatch, auth, and trip flow
│   │   │   │   └── ui/
│   │   │   │       ├── theme/
│   │   │   │       │   ├── Color.kt              # 60-30-10 Design tokens (Black, Deep Navy, White)
│   │   │   │       │   ├── Theme.kt              # MaterialTheme colorScheme and configurations
│   │   │   │       │   └── Type.kt               # Modern typography scale
│   │   │   │       ├── components/
│   │   │   │       │   ├── RideGoLogo.kt         # Official Deep Navy squircle logo with white "GO"
│   │   │   │       │   ├── RadarViewport.kt      # Real-time driver radar sweep canvas
│   │   │   │       │   ├── SlideToConfirm.kt     # Interactive physics-based booking confirmation slider
│   │   │   │       │   ├── VehicleSilhouette.kt  # Vector vehicle graphics with Ice Blue underglow
│   │   │   │       │   ├── VoltBottomNav.kt      # 4-core screen bottom navigation bar
│   │   │   │       │   └── VoltTopBar.kt         # Sticky header with telemetry indicators
│   │   │   │       └── screens/
│   │   │   │           ├── SplashScreen.kt       # Kinetic brand loader
│   │   │   │           ├── AuthScreen.kt         # Sign-in & sign-up segmented flow
│   │   │   │           ├── ExploreScreen.kt      # Vector map with Medium Blue route trajectory
│   │   │   │           ├── RidesScreen.kt        # Ride tier selection (Saver, Comfort, XL, Black)
│   │   │   │           ├── DispatchScreen.kt     # Live driver radar search & dispatch status
│   │   │   │           ├── ActivityScreen.kt     # Multi-tab activity hub: Past Trips, Upcoming reservations & Business expensing
│   │   │   │           ├── AccountScreen.kt      # User profile, wallet, security, South Africa SOS
│   │   │   │           ├── RiderVerificationScreen.kt # Biometric selfie & SA Smart ID card scan
│   │   │   │           └── DriverOnboardingScreen.kt  # Driver PDP, license, vehicle inspection
│   │   │   └── res/                              # Android app icons, drawables, and strings
│   │   └── test/                                 # Unit tests and automated assertions
│   └── build.gradle.kts                          # Module dependencies and Android SDK config
├── gradle/                                       # Gradle wrapper and version catalog
├── build.gradle.kts                              # Project-level build script
├── settings.gradle.kts                           # Module and plugin management
├── metadata.json                                 # App metadata descriptor
└── README.md                                     # Project architecture and documentation
```

---

## Key Features

[![Core Features](https://img.shields.io/badge/Capabilities-Driver_Radar_%7C_ID_Verification_%7C_Dynamic_Tiers-0E2454?style=flat-square&logo=googlemaps&logoColor=7DD3FC&labelColor=0B1938)](#)

1. **Vector Radar & Dynamic Map Canvas**: Live animated driver telemetry with Medium Blue trajectory lines and pulsating Ice Blue GPS waypoint halos.
2. **Interactive Slide-To-Confirm**: Physical drag gesture slider with Deep Navy thumb, Ice Blue trail fill, and haptic feedback.
3. **South African Verification Suite**:
   - Biometric facial scan with Ice Blue alignment reticles.
   - Smart ID Card OCR viewport with corner boundary detection.
4. **Driver Onboarding Flow**: Multi-step document verification, vehicle inspection, and PDP clearance.
5. **Multi-Tab Activity Hub & Corporate Expensing**:
   - **Past Trips**: Historical rides, digital receipts, rebooking, and stat bento metrics.
   - **Upcoming Reservations**: Advance booking tracking, flight arrival integration, locked fares, and flexible cancellation.
   - **Business Mobility**: Enterprise corporate profiles, automated SAP Concur / Expensify sync, SARS 15% VAT itemized invoicing, and cost center management.

---

## Getting Started & Local Development

[![Environment](https://img.shields.io/badge/Build_Tool-Gradle_Kotlin_DSL-0E2454?style=flat-square&logo=gradle&logoColor=7DD3FC&labelColor=0B1938)](#)
[![Min SDK](https://img.shields.io/badge/Min_SDK-API_26-0B1938?style=flat-square&labelColor=000000)](#)
[![Target SDK](https://img.shields.io/badge/Target_SDK-API_34-0B1938?style=flat-square&labelColor=000000)](#)

### Prerequisites
- **Android Studio** (Koala / Ladybug or newer)
- **JDK 17+**
- **Android SDK** (API 34 / Android 14+)

### Steps to Run
1. Open Android Studio.
2. Select **Open** and choose the `ride-go` root directory.
3. Allow Gradle to synchronize dependencies.
4. Copy `.env.example` to `.env` and provide your optional `GEMINI_API_KEY`.
5. Select an Android Emulator or physical device (API 26+) and click **Run**.
