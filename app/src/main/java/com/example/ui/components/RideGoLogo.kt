package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Ride Go Official Brand Logo Badge.
 * Recreates the exact brand logo uploaded by the user:
 * Deep Navy Blue rounded squircle container with bold condensed crisp white "GO"
 * and the crisp white circular registered trademark symbol (®) at the upper right.
 */
@Composable
fun RideGoLogo(
    modifier: Modifier = Modifier,
    size: Dp = 38.dp
) {
    Box(
        modifier = modifier
            .size(size)
            .testTag("ride_go_logo_badge"),
        contentAlignment = Alignment.Center
    ) {
        // Deep Navy Blue Rounded Squircle Box
        Box(
            modifier = Modifier
                .fillMaxSize()
                .clip(RoundedCornerShape(size * 0.22f))
                .background(com.example.ui.theme.VoltPrimaryContainer)
                .border(1.dp, com.example.ui.theme.IceBlue.copy(alpha = 0.25f), RoundedCornerShape(size * 0.22f)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "GO",
                color = Color.White,
                fontSize = (size.value * 0.54f).sp,
                fontWeight = FontWeight.Black,
                fontFamily = FontFamily.SansSerif,
                letterSpacing = (-0.5).sp,
                textAlign = TextAlign.Center,
                lineHeight = (size.value * 0.54f).sp
            )
        }

        // Top-Right Registered Trademark Circle (®)
        Box(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .offset(x = (-1.5).dp, y = 1.5.dp)
                .size(size * 0.23f)
                .border(width = 0.9.dp, color = Color.White, shape = CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "R",
                color = Color.White,
                fontSize = (size.value * 0.12f).sp,
                fontWeight = FontWeight.ExtraBold,
                fontFamily = FontFamily.SansSerif,
                textAlign = TextAlign.Center,
                lineHeight = (size.value * 0.12f).sp
            )
        }
    }
}
