package com.example.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val VoltColorScheme = darkColorScheme(
    primary = VoltPrimary,
    onPrimary = VoltOnPrimary,
    primaryContainer = VoltPrimaryContainer,
    onPrimaryContainer = VoltOnPrimaryContainer,
    secondary = VoltSecondary,
    onSecondary = VoltSurface,
    secondaryContainer = VoltSecondaryContainer,
    onSecondaryContainer = VoltOnSecondaryContainer,
    background = VoltSurface,
    onBackground = VoltOnSurface,
    surface = VoltSurface,
    onSurface = VoltOnSurface,
    surfaceVariant = VoltSurfaceVariant,
    onSurfaceVariant = VoltOnSurfaceVariant,
    error = VoltError,
    onError = VoltOnPrimaryFixed,
    errorContainer = VoltErrorContainer,
    outline = VoltOutline,
    outlineVariant = VoltOutlineVariant
)

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = true, // Force Volt Dark theme as primary signature
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = VoltColorScheme,
        typography = Typography,
        content = content
    )
}
