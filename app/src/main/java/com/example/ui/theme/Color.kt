package com.example.ui.theme

import androidx.compose.ui.graphics.Color

// Kinetic Volt Design System Colors - Strictly 60-30-10 Rule:
// 60% Dominant Background (Black)
// 30% Panel / Surface (Deep Navy Blue)
// 10% Accent / Contrast (White & Tonal Blues: Ice Blue, Medium Blue, Muted Blue-Gray)

// --- 60% Dominant Background (Black) ---
val VoltSurface = Color(0xFF000000) // Pure Black Dominant Canvas
val VoltSurfaceDim = Color(0xFF050811) // Deepest Obsidian Base
val VoltSurfaceLowest = Color(0xFF000000)
val VoltSurfaceLow = Color(0xFF080D1A) // Deep Night Shadow

// --- 30% Panel / Surface / Container (Deep Navy Blue) ---
val DeepNavyBlue = Color(0xFF0B1938) // Core Brand Deep Navy Blue (Swapping Yellow)
val DeepNavyContainer = Color(0xFF0E2454) // Primary Deep Navy Action Surface
val DeepNavySurfaceHigh = Color(0xFF132B60) // Elevated Navy Surface
val DeepNavySurfaceHighest = Color(0xFF183574) // Highest Navy Layer

val VoltSurfaceContainer = Color(0xFF0D172E) // Navy Panel Container
val VoltSurfaceHigh = Color(0xFF101F3D)
val VoltSurfaceHighest = Color(0xFF16294E)
val VoltSurfaceBright = Color(0xFF1C3463)
val VoltSurfaceContainerLowest = VoltSurfaceLowest
val VoltSurfaceContainerLow = VoltSurfaceLow
val VoltSurfaceContainerHigh = VoltSurfaceHigh
val VoltSurfaceContainerHighest = VoltSurfaceHighest
val VoltSurfaceVariant = Color(0xFF12203F)

// --- Supporting Blue Harmony Tones ---
val IceBlue = Color(0xFF7DD3FC) // Crisp Radiant Ice Blue Highlight / Telemetry Pulse
val IceBlueSoft = Color(0xFFBAE6FD) // Ambient Ice Blue Luminous Glow
val MediumBlue = Color(0xFF2563EB) // Vibrant Medium Blue Trajectory / Interactive Accent
val MediumBlueDark = Color(0xFF1D4ED8) // Deep Interactive Blue Stroke
val MutedBlueGray = Color(0xFF94A3B8) // Elegant Muted Blue-Gray Secondary Typography
val MutedBlueGrayDark = Color(0xFF64748B) // Subdued Secondary Indicator

// --- 10% Accent, High-Contrast Typography & Container Fills ---
val VoltOnSurface = Color(0xFFFFFFFF) // Crisp Pure White
val VoltOnSurfaceVariant = MutedBlueGray // Refined Muted Blue-Gray
val VoltSecondary = Color(0xFFFFFFFF) // Pure White Secondary
val VoltSecondaryContainer = DeepNavySurfaceHigh
val VoltOnSecondaryContainer = Color(0xFFFFFFFF)

// Swapping Yellow with Deep Navy Blue as Primary Container:
val VoltPrimary = IceBlueSoft // Radiant Ice Blue Primary Highlight (swaps soft canary)
val VoltPrimaryContainer = DeepNavyContainer // Deep Navy Blue replaces Yellow #FFD000
val VoltOnPrimary = Color(0xFFFFFFFF) // Crisp Pure White on Deep Navy
val VoltOnPrimaryContainer = Color(0xFFFFFFFF) // Crisp Pure White on Deep Navy
val VoltOnPrimaryFixed = Color(0xFFFFFFFF) // Pure White on Deep Navy Fixed

// All accent/success/alert states strictly within Black, Deep Navy Blue, and White
val VoltGreen = IceBlue // Ice Blue replaces green status elements
val VoltError = MediumBlue // Medium Blue replaces error red
val VoltErrorContainer = VoltSurfaceContainer // Dark navy container
val VoltOutline = Color(0xFF1E293B) // Muted blue-gray border
val VoltOutlineVariant = Color(0xFF0F172A) // Subtle deep divider
