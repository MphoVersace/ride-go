package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.IceBlue
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltPrimary
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurfaceLowest
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

@Composable
fun SlideToConfirm(
    price: String,
    onConfirmed: () -> Unit,
    modifier: Modifier = Modifier
) {
    val coroutineScope = rememberCoroutineScope()
    var isConfirmed by remember { mutableStateOf(false) }
    val offsetX = remember { Animatable(0f) }

    // Shimmer effect animation
    val infiniteTransition = rememberInfiniteTransition(label = "shimmer")
    val shimmerAlpha by infiniteTransition.animateFloat(
        initialValue = 0.6f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "shimmer_alpha"
    )

    val thumbSize = 48.dp
    val density = LocalDensity.current
    val thumbPx = with(density) { thumbSize.toPx() }
    val trackPaddingPx = with(density) { 4.dp.toPx() }

    BoxWithConstraints(
        modifier = modifier
            .fillMaxWidth()
            .height(58.dp)
            .clip(CircleShape)
            .background(VoltSurfaceLowest)
            .border(1.dp, IceBlue.copy(alpha = 0.35f), CircleShape)
            .testTag("slide_to_confirm_slider")
    ) {
        val totalWidthPx = with(density) { maxWidth.toPx() }
        val maxDragPx = (totalWidthPx - thumbPx - trackPaddingPx * 2).coerceAtLeast(0f)

        // Trail Fill
        val currentOffset = offsetX.value
        val fillWidth = with(density) { (currentOffset + thumbPx).toDp() }
        Box(
            modifier = Modifier
                .fillMaxSize()
        ) {
            Box(
                modifier = Modifier
                    .height(58.dp)
                    .fillMaxWidth(if (maxDragPx > 0) ((currentOffset + thumbPx) / totalWidthPx).coerceIn(0f, 1f) else 0f)
                    .clip(CircleShape)
                    .background(
                        Brush.horizontalGradient(
                            colors = listOf(
                                VoltPrimaryContainer,
                                IceBlue.copy(alpha = 0.3f),
                                Color.Transparent
                            )
                        )
                    )
            )
        }

        // Center Hint Text
        val dragProgress = if (maxDragPx > 0) (currentOffset / maxDragPx).coerceIn(0f, 1f) else 0f
        val textAlpha = (1f - dragProgress * 1.6f).coerceIn(0f, 1f)

        if (!isConfirmed) {
            Row(
                modifier = Modifier
                    .align(Alignment.Center)
                    .padding(horizontal = 48.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "SLIDE TO CONFIRM • $price",
                    color = VoltPrimary.copy(alpha = textAlpha * shimmerAlpha),
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
                Row(modifier = Modifier.offset(x = 4.dp)) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                        contentDescription = null,
                        tint = Color.White.copy(alpha = textAlpha * 0.9f),
                        modifier = Modifier.size(16.dp)
                    )
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                        contentDescription = null,
                        tint = Color.White.copy(alpha = textAlpha * 0.5f),
                        modifier = Modifier
                            .size(16.dp)
                            .offset(x = (-8).dp)
                    )
                }
            }
        }

        // Draggable Thumb
        Box(
            modifier = Modifier
                .align(Alignment.CenterStart)
                .padding(start = 4.dp)
                .offset { IntOffset(offsetX.value.roundToInt(), 0) }
                .size(thumbSize)
                .shadow(elevation = 8.dp, shape = CircleShape, spotColor = IceBlue)
                .clip(CircleShape)
                .background(VoltPrimaryContainer)
                .border(1.5.dp, IceBlue, CircleShape)
                .pointerInput(isConfirmed) {
                    if (isConfirmed) return@pointerInput
                    detectHorizontalDragGestures(
                        onDragEnd = {
                            coroutineScope.launch {
                                if (offsetX.value >= maxDragPx * 0.75f) {
                                    // Threshold reached
                                    isConfirmed = true
                                    offsetX.animateTo(maxDragPx, tween(150, easing = FastOutSlowInEasing))
                                    delay(400)
                                    onConfirmed()
                                } else {
                                    // Snap back
                                    offsetX.animateTo(0f, tween(250, easing = FastOutSlowInEasing))
                                }
                            }
                        },
                        onDragCancel = {
                            coroutineScope.launch {
                                offsetX.animateTo(0f, tween(200))
                            }
                        },
                        onHorizontalDrag = { _, dragAmount ->
                            coroutineScope.launch {
                                val newTarget = (offsetX.value + dragAmount).coerceIn(0f, maxDragPx)
                                offsetX.snapTo(newTarget)
                            }
                        }
                    )
                }
                .testTag("slider_thumb"),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Filled.Bolt,
                contentDescription = "Confirm Ride",
                tint = VoltOnPrimaryFixed,
                modifier = Modifier
                    .size(26.dp)
                    .rotate(dragProgress * 90f)
            )
        }

        // Confirmed state overlay
        AnimatedVisibility(
            visible = isConfirmed,
            enter = fadeIn(tween(200)),
            exit = fadeOut(tween(200)),
            modifier = Modifier.fillMaxSize()
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(24.dp)
                            .clip(CircleShape)
                            .background(VoltOnPrimaryFixed),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                    Text(
                        text = "  DRIVER DISPATCHED!",
                        color = VoltOnPrimaryFixed,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        letterSpacing = 1.sp
                    )
                }
            }
        }
    }
}
