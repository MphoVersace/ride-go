package com.example.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import com.example.R
import com.example.ui.theme.VoltSurface
import kotlinx.coroutines.delay

/**
 * Ride GO Splash / Loading Screen.
 * Displays the official brand logo (R.drawable.ridego_wide) statically without bouncing,
 * then smoothly transitions to the Sign Up / Login page.
 */
@Composable
fun SplashScreen(
    onSplashComplete: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Transition to Sign Up / Login after 2 seconds
    LaunchedEffect(Unit) {
        delay(2000)
        onSplashComplete()
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null,
                onClick = onSplashComplete
            )
            .testTag("splash_screen"),
        contentAlignment = Alignment.Center
    ) {
        // Official wide Logo centered statically on the screen (no bounce/pulse)
        Box(
            modifier = Modifier
                .fillMaxWidth(0.72f)
                .testTag("splash_logo_container"),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.ridego_wide),
                contentDescription = "Ride Go Official Brand Logo",
                contentScale = ContentScale.Fit,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}
