package com.example.ui.components

import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.ElectricCar
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltPrimary
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceLowest
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun RadarViewport(
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "radar_anim")

    // Continuous 360 degree rotation
    val sweepAngle by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 3600, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "sweep_angle"
    )

    // Pulsing waves 1, 2, 3
    val wave1 by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2400, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "wave1"
    )

    val wave2 by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2400, delayMillis = 800, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "wave2"
    )

    val wave3 by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2400, delayMillis = 1600, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "wave3"
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(1.15f)
            .clip(RoundedCornerShape(24.dp))
            .background(VoltSurfaceLowest)
            .border(1.dp, Color(0x22FFFFFF), RoundedCornerShape(24.dp))
            .testTag("radar_viewport"),
        contentAlignment = Alignment.Center
    ) {
        // Custom Canvas for Grid, Roads, Sonar Waves and Sweep Beam
        Canvas(modifier = Modifier.fillMaxSize()) {
            val cx = size.width / 2f
            val cy = size.height / 2f
            val maxRadius = size.minDimension * 0.44f

            // Tactical Grid lines
            val step = 32.dp.toPx()
            var gx = 0f
            while (gx < size.width) {
                drawLine(
                    color = Color(0x18D1C6AB),
                    start = Offset(gx, 0f),
                    end = Offset(gx, size.height),
                    strokeWidth = 0.75f
                )
                gx += step
            }
            var gy = 0f
            while (gy < size.height) {
                drawLine(
                    color = Color(0x18D1C6AB),
                    start = Offset(0f, gy),
                    end = Offset(size.width, gy),
                    strokeWidth = 0.75f
                )
                gy += step
            }

            // Stylized curved roads
            val road1 = Path().apply {
                moveTo(-20f, size.height * 0.52f)
                quadraticTo(size.width * 0.35f, size.height * 0.45f, size.width * 0.60f, size.height * 0.48f)
                quadraticTo(size.width * 0.85f, size.height * 0.52f, size.width + 20f, size.height * 0.42f)
            }
            drawPath(road1, color = Color(0xFF292A2C), style = Stroke(width = 6f))

            val road2 = Path().apply {
                moveTo(size.width * 0.46f, -20f)
                quadraticTo(size.width * 0.48f, size.height * 0.38f, size.width * 0.52f, size.height * 0.65f)
                quadraticTo(size.width * 0.55f, size.height * 0.85f, size.width * 0.58f, size.height + 20f)
            }
            drawPath(road2, color = Color(0xFF292A2C), style = Stroke(width = 8f))

            // Dashed transit corridor
            drawLine(
                color = Color(0xFF343537),
                start = Offset(size.width * 0.12f, size.height * 0.85f),
                end = Offset(size.width * 0.88f, size.height * 0.15f),
                strokeWidth = 3f,
                pathEffect = PathEffect.dashPathEffect(floatArrayOf(14f, 10f))
            )

            // Radial canary glow
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(
                        VoltPrimaryContainer.copy(alpha = 0.18f),
                        VoltPrimaryContainer.copy(alpha = 0.05f),
                        Color.Transparent
                    ),
                    center = Offset(cx, cy),
                    radius = maxRadius * 1.15f
                ),
                radius = maxRadius * 1.15f,
                center = Offset(cx, cy)
            )

            // Concentric range rings
            drawCircle(
                color = VoltPrimaryContainer.copy(alpha = 0.18f),
                radius = maxRadius * 0.35f,
                center = Offset(cx, cy),
                style = Stroke(width = 1f)
            )
            drawCircle(
                color = VoltPrimaryContainer.copy(alpha = 0.25f),
                radius = maxRadius * 0.65f,
                center = Offset(cx, cy),
                style = Stroke(width = 1f)
            )
            drawCircle(
                color = VoltPrimaryContainer.copy(alpha = 0.35f),
                radius = maxRadius * 0.95f,
                center = Offset(cx, cy),
                style = Stroke(width = 1.2f)
            )

            // Expanding Sonar Ping Waves
            listOf(wave1, wave2, wave3).forEach { waveProgress ->
                val waveR = maxRadius * (0.2f + 0.85f * waveProgress)
                val waveAlpha = (1f - waveProgress) * 0.65f
                drawCircle(
                    color = VoltPrimaryContainer.copy(alpha = waveAlpha),
                    radius = waveR,
                    center = Offset(cx, cy),
                    style = Stroke(width = 2.5f)
                )
            }

            // Rotating Radar Scanner Beam
            val rad = Math.toRadians(sweepAngle.toDouble())
            val sweepX = cx + (maxRadius * cos(rad)).toFloat()
            val sweepY = cy + (maxRadius * sin(rad)).toFloat()
            drawLine(
                brush = Brush.linearGradient(
                    colors = listOf(VoltPrimaryContainer, Color.Transparent),
                    start = Offset(cx, cy),
                    end = Offset(sweepX, sweepY)
                ),
                start = Offset(cx, cy),
                end = Offset(sweepX, sweepY),
                strokeWidth = 2f
            )

            // Radar Sweep Fan/Wedge Gradient
            drawArc(
                brush = Brush.sweepGradient(
                    colors = listOf(
                        Color.Transparent,
                        VoltPrimaryContainer.copy(alpha = 0.25f),
                        Color.Transparent
                    ),
                    center = Offset(cx, cy)
                ),
                startAngle = sweepAngle - 45f,
                sweepAngle = 45f,
                useCenter = true,
                topLeft = Offset(cx - maxRadius, cy - maxRadius),
                size = androidx.compose.ui.geometry.Size(maxRadius * 2, maxRadius * 2)
            )
        }

        // Driver 1 Ping (Top-Left: 3m)
        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .padding(start = 54.dp, top = 64.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.4f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.ElectricCar,
                        contentDescription = "EV Driver",
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Box(
                    modifier = Modifier
                        .offset(y = 2.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(VoltSurfaceLowest.copy(alpha = 0.9f))
                        .padding(horizontal = 4.dp, vertical = 1.dp)
                ) {
                    Text(
                        text = "3m",
                        color = VoltPrimaryContainer,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Driver 2 Ping (Bottom-Right: 4m)
        Box(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(end = 56.dp, bottom = 60.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    modifier = Modifier
                        .size(30.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .border(1.dp, VoltSecondary.copy(alpha = 0.4f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Bolt,
                        contentDescription = "Fast EV Driver",
                        tint = VoltSecondary,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Box(
                    modifier = Modifier
                        .offset(y = 2.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(VoltSurfaceLowest.copy(alpha = 0.9f))
                        .padding(horizontal = 4.dp, vertical = 1.dp)
                ) {
                    Text(
                        text = "4m",
                        color = VoltSecondary,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Driver 3 Ping (Top-Right)
        Box(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .padding(end = 76.dp, top = 82.dp),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .size(26.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Filled.DirectionsCar,
                    contentDescription = null,
                    tint = VoltSecondary.copy(alpha = 0.8f),
                    modifier = Modifier.size(14.dp)
                )
            }
        }

        // Center User Position Anchor ("Pickup Spot")
        Column(
            modifier = Modifier.align(Alignment.Center),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier.size(46.dp),
                contentAlignment = Alignment.Center
            ) {
                // Pulsing outer halo
                Box(
                    modifier = Modifier
                        .size(46.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer.copy(alpha = 0.25f))
                )
                // Center canary pin
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .border(2.dp, VoltSurfaceLowest, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.LocationOn,
                        contentDescription = "Pickup Location",
                        tint = VoltOnPrimaryFixed,
                        modifier = Modifier.size(24.dp)
                    )
                }
            }

            Box(
                modifier = Modifier
                    .offset(y = 3.dp)
                    .clip(RoundedCornerShape(99.dp))
                    .background(VoltSurfaceContainerHighest.copy(alpha = 0.95f))
                    .padding(horizontal = 8.dp, vertical = 2.dp)
            ) {
                Text(
                    text = "PICKUP SPOT",
                    color = VoltPrimaryContainer,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
            }
        }

        // Live Scanning Broadcast Badge (Bottom Left)
        Row(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(12.dp)
                .clip(RoundedCornerShape(99.dp))
                .background(VoltSurfaceContainerHigh.copy(alpha = 0.92f))
                .border(1.dp, Color(0x18FFFFFF), RoundedCornerShape(99.dp))
                .padding(horizontal = 10.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
            )
            Text(
                text = "  RADAR: 4 DRIVERS IN RANGE",
                color = VoltOnSurface,
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
        }

        // Compass Action (Top Right)
        IconButton(
            onClick = { /* re-orient radar */ },
            modifier = Modifier
                .align(Alignment.TopEnd)
                .padding(10.dp)
                .size(32.dp)
                .clip(CircleShape)
                .background(VoltSurfaceContainerHigh.copy(alpha = 0.9f))
        ) {
            Icon(
                imageVector = Icons.Filled.Explore,
                contentDescription = "Compass",
                tint = VoltSecondary,
                modifier = Modifier.size(16.dp)
            )
        }
    }
}
