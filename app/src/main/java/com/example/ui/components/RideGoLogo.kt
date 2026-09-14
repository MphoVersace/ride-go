package com.example.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.example.R

/**
 * Ride Go Official Brand Logo Badge.
 * Uses the official RIDEGO.png / ridego_wide.png asset.
 */
@Composable
fun RideGoLogo(
    modifier: Modifier = Modifier,
    size: Dp = 38.dp,
    useWide: Boolean = true
) {
    Box(
        modifier = modifier
            .testTag("ride_go_logo_badge"),
        contentAlignment = Alignment.Center
    ) {
        Image(
            painter = painterResource(id = if (useWide) R.drawable.ridego_wide else R.drawable.ridego),
            contentDescription = "Ride Go Official Logo",
            contentScale = ContentScale.Fit,
            modifier = if (useWide) Modifier.height(size) else Modifier.size(size)
        )
    }
}

