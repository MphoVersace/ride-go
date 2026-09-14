package com.example.ui.theme

import androidx.compose.ui.graphics.Color

// Kinetic Volt Design System Colors - Strictly 60-30-10 Rule:
// 60% Dominant Background (Black: #000000 / #050811)
// 30% Panel / Surface (Deep Navy Blue: #0B1938 / #0E2454 / #132B60)
// 10% Accent / High-Contrast Typography (Crisp Pure White: #FFFFFF / #94A3B8)

// --- 60% Dominant Background (Black) ---
val VoltSurface = Color(0xFF000000) // Pure Black Dominant Canvas
val VoltSurfaceDim = Color(0xFF050811) // Deepest Obsidian Base
val VoltSurfaceLowest = Color(0xFF000000)
val VoltSurfaceLow = Color(0xFF080D1A) // Deep Night Shadow

// --- 30% Panel / Surface / Container (Deep Navy Blue) ---
val DeepNavyBlue = Color(0xFF0B1938) // Core Brand Deep Navy Blue
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

// --- 10% Accent, High-Contrast Typography & Container Fills (Crisp Pure White) ---
val VoltOnSurface = Color(0xFFFFFFFF) // Crisp Pure White
val VoltOnSurfaceVariant = Color(0xFF94A3B8) // Refined Muted Blue-Gray Secondary Typography
val VoltSecondary = Color(0xFF94A3B8) // Subtle Secondary Typography
val VoltSecondaryContainer = DeepNavySurfaceHigh
val VoltOnSecondaryContainer = Color(0xFFFFFFFF)

// Primary Highlight & Action Surface:
val VoltPrimary = Color(0xFFFFFFFF) // Radiant Pure White Primary Highlight
val VoltPrimaryContainer = DeepNavyContainer // Deep Navy Blue Primary Container
val VoltOnPrimary = Color(0xFF000000) // Contrast Black on White Primary
val VoltOnPrimaryContainer = Color(0xFFFFFFFF) // Crisp Pure White on Deep Navy
val VoltOnPrimaryFixed = Color(0xFFFFFFFF) // Pure White on Deep Navy Fixed

// Supporting Tone mappings ensuring 60-30-10 compliance across legacy references:
val IceBlue = Color(0xFFFFFFFF) // Crisp Pure White (replaces saturated cyan)
val IceBlueSoft = Color(0xFFE2E8F0) // Soft High-Contrast White / Slate
val MediumBlue = Color(0xFFFFFFFF) // Crisp Pure White (replaces royal blue)
val MediumBlueDark = DeepNavySurfaceHigh // Deep Interactive Navy Stroke
val MutedBlueGray = Color(0xFF94A3B8) // Muted Blue-Gray Secondary Typography
val MutedBlueGrayDark = Color(0xFF64748B) // Subdued Indicator

// All status and indicator states strictly within Black, Deep Navy Blue, and White
val VoltGreen = Color(0xFFFFFFFF) // Pure White replaces green status
val VoltError = Color(0xFFFFFFFF) // Pure White replaces error red
val VoltErrorContainer = VoltSurfaceContainer // Dark navy container
val VoltOutline = Color(0xFF1E293B) // Muted blue-gray border
val VoltOutlineVariant = Color(0xFF0F172A) // Subtle deep divider

