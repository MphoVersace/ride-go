package com.example.ui.screens

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.example.ui.components.RideGoLogo
import com.example.ui.theme.VoltSurface
import kotlinx.coroutines.delay

/**
 * Ride GO Splash / Loading Screen.
 * Strictly centers the official brand logo with a subtle breathing pulse,
 * then smoothly moves to the Sign Up / Login page.
 */
@Composable
fun SplashScreen(
    onSplashComplete: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Breathing pulse scale animation
    val infiniteTransition = rememberInfiniteTransition(label = "splash_logo_pulse")
    val scale by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 1200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "logo_scale"
    )

    // Automatically transition to Sign Up / Login after 2 seconds
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
        // Just the Logo centered on the screen
        Box(
            modifier = Modifier
                .scale(scale)
                .testTag("splash_logo_container"),
            contentAlignment = Alignment.Center
        ) {
            RideGoLogo(
                size = 120.dp
            )
        }
    }
}
