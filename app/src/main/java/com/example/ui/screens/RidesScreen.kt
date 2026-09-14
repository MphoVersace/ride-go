package com.example.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.RideTierType
import com.example.ui.components.SlideToConfirm
import com.example.ui.components.VehicleSilhouette
import com.example.ui.theme.IceBlue
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltOutlineVariant
import com.example.ui.theme.VoltPrimary
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.ui.theme.VoltSurfaceLowest
import com.example.viewmodel.VoltUiState

private const val MAP_BACKGROUND_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGued8VaMeFw6WvxZJYfTf3e3_l9fOaamy9lojZQ0D0u28esCYORqJFtwZbitWd6u-VH-Eg0T3eWeS63fyEulVaQLEXQCqbWkGg08czSSQEMRBWz7_s4M_BQN-rKZD4hofYBDZBwXRdkyU_YlC10FOFV1pPL_x4Ymmr4MWAjtdRgKXidyMpZ3-UqARzs_bLhcvA6003g_P7yD8FyIYMhJwiFzchuZ1l8hrj7IGM9DYehBlVUt3wjNd"

@Composable
fun RidesScreen(
    state: VoltUiState,
    onTierSelected: (RideTierType) -> Unit,
    onConfirmDispatch: () -> Unit,
    onPromoClick: () -> Unit,
    onPaymentClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()

    // Route dash pulse animation
    val infiniteTransition = rememberInfiniteTransition(label = "route_pulse")
    val dashOffset by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 40f,
        animationSpec = infiniteRepeatable(
            animation = tween(1500, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "dash_offset"
    )

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .testTag("rides_screen")
    ) {
        // Top Map Viewport Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(230.dp)
                .background(VoltSurfaceLowest)
        ) {
            // Map Satellite / Terrain background
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(MAP_BACKGROUND_URL)
                    .crossfade(true)
                    .build(),
                contentDescription = "Ride Map View",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxSize()
                    .background(VoltSurfaceLowest)
            )

            // Dark subtle gradient overlay
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Black.copy(alpha = 0.45f),
                                Color.Transparent,
                                Color.Black.copy(alpha = 0.7f)
                            )
                        )
                    )
            )

            // Animated Glowing Route Polyline Layer
            Canvas(modifier = Modifier.fillMaxSize()) {
                val path = Path().apply {
                    moveTo(size.width * 0.16f, size.height * 0.75f)
                    cubicTo(
                        size.width * 0.35f, size.height * 0.65f,
                        size.width * 0.42f, size.height * 0.85f,
                        size.width * 0.62f, size.height * 0.45f
                    )
                    cubicTo(
                        size.width * 0.72f, size.height * 0.22f,
                        size.width * 0.82f, size.height * 0.35f,
                        size.width * 0.88f, size.height * 0.18f
                    )
                }

                // Dark backing road stroke
                drawPath(
                    path = path,
                    color = Color(0xFF1F2022),
                    style = Stroke(
                        width = 16f,
                        cap = StrokeCap.Round,
                        join = StrokeJoin.Round
                    )
                )

                // Outer canary glow stroke
                drawPath(
                    path = path,
                    color = VoltPrimaryContainer.copy(alpha = 0.4f),
                    style = Stroke(
                        width = 10f,
                        cap = StrokeCap.Round,
                        join = StrokeJoin.Round
                    )
                )

                // Pulsing dashed canary trajectory
                drawPath(
                    path = path,
                    color = VoltPrimaryContainer,
                    style = Stroke(
                        width = 6f,
                        cap = StrokeCap.Round,
                        join = StrokeJoin.Round,
                        pathEffect = PathEffect.dashPathEffect(
                            floatArrayOf(18f, 14f),
                            dashOffset
                        )
                    )
                )

                // Start Station Node (Downtown Plaza)
                drawCircle(
                    color = VoltPrimaryContainer,
                    radius = 9f,
                    center = Offset(size.width * 0.16f, size.height * 0.75f)
                )
                drawCircle(
                    color = Color.White,
                    radius = 4f,
                    center = Offset(size.width * 0.16f, size.height * 0.75f)
                )

                // Destination Node (Terminal 2)
                drawCircle(
                    color = Color.White,
                    radius = 9f,
                    center = Offset(size.width * 0.88f, size.height * 0.18f)
                )
                drawCircle(
                    color = Color.Black,
                    radius = 4f,
                    center = Offset(size.width * 0.88f, size.height * 0.18f)
                )
            }

            // Floating Trip Trajectory HUD (Top Left)
            Box(
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .padding(12.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh.copy(alpha = 0.92f))
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "22 mins ",
                        color = VoltOnSurface,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                    Text(
                        text = "• 14.2 km",
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp
                    )
                }
            }

            // Floating Map Controls (Top Right)
            Column(
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(
                    onClick = { /* Recenter */ },
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.92f))
                ) {
                    Icon(
                        imageVector = Icons.Filled.MyLocation,
                        contentDescription = "Re-center map",
                        tint = VoltOnSurface,
                        modifier = Modifier.size(18.dp)
                    )
                }
                IconButton(
                    onClick = { /* Layers */ },
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.92f))
                ) {
                    Icon(
                        imageVector = Icons.Filled.Layers,
                        contentDescription = "Map layers",
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }

            // Pickup & Destination Overlay Pills (Bottom of map)
            Row(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Pickup Pill
                Row(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Downtown Plaza",
                        color = VoltOnSurface,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 1
                    )
                }

                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = VoltOnSurfaceVariant,
                    modifier = Modifier
                        .padding(horizontal = 8.dp)
                        .size(14.dp)
                )

                // Destination Pill
                Row(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(RoundedCornerShape(1.dp))
                            .background(VoltOnSurface)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Terminal 2, Airport",
                        color = VoltOnSurface,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 1
                    )
                }
            }
        }

        // Bottom Sheet: Ride Selection Console
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp))
                .background(VoltSurfaceContainerLow)
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Drag handle
                Box(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .size(width = 38.dp, height = 4.dp)
                        .clip(CircleShape)
                        .background(VoltOutlineVariant)
                )

                // Sheet Header with Surge badge
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Select Ride Tier",
                            color = VoltOnSurface,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "All rides electric & carbon-neutral offset",
                            color = VoltOnSurfaceVariant,
                            fontSize = 12.sp
                        )
                    }

                    Row(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 10.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Bolt,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(13.dp)
                        )
                        Text(
                            text = "SURGE 1.0X",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                    }
                }

                // Vehicle Tier Cards List
                RideTierType.values().forEach { tier ->
                    val isSelected = tier == state.selectedTier
                    RideTierCard(
                        tier = tier,
                        isSelected = isSelected,
                        onClick = { onTierSelected(tier) }
                    )
                }

                // Payment Method & Voucher Strip
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainer)
                        .padding(10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh)
                            .clickable(onClick = onPaymentClick)
                            .padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(20.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceLowest),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.CreditCard,
                                contentDescription = null,
                                tint = VoltOnSurface,
                                modifier = Modifier.size(12.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Capitec Pay •••• 4282",
                            color = VoltOnSurface,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Icon(
                            imageVector = Icons.Filled.ExpandMore,
                            contentDescription = null,
                            tint = VoltOnSurfaceVariant,
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    Row(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(if (state.riderPromoApplied) VoltGreen.copy(alpha = 0.2f) else VoltPrimaryContainer.copy(alpha = 0.15f))
                            .clickable(onClick = onPromoClick)
                            .padding(horizontal = 10.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Filled.LocalOffer,
                            contentDescription = null,
                            tint = if (state.riderPromoApplied) VoltGreen else VoltPrimaryContainer,
                            modifier = Modifier.size(13.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = if (state.riderPromoApplied) "-R50 RIDEGOFIRST" else "-R20 PROMO",
                            color = if (state.riderPromoApplied) VoltGreen else VoltPrimaryContainer,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                    }
                }

                // Interactive Slide to Confirm Slider
                val basePrice = state.selectedTier.price
                val discount = if (state.riderPromoApplied) 50 else 20
                val finalPrice = (basePrice - discount).coerceAtLeast(10)
                SlideToConfirm(
                    price = "R$finalPrice",
                    onConfirmed = onConfirmDispatch,
                    modifier = Modifier.padding(top = 4.dp, bottom = 8.dp)
                )
            }
        }
    }
}

@Composable
private fun RideTierCard(
    tier: RideTierType,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val borderColor by animateColorAsState(
        targetValue = if (isSelected) VoltPrimaryContainer else Color.Transparent,
        label = "border_color"
    )
    val cardBackground by animateColorAsState(
        targetValue = if (isSelected) VoltSurfaceContainerHigh else VoltSurfaceContainer,
        label = "bg_color"
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(cardBackground)
            .border(if (isSelected) 2.dp else 1.dp, if (isSelected) borderColor else Color(0x10FFFFFF), RoundedCornerShape(16.dp))
            .clickable(onClick = onClick)
            .padding(12.dp)
            .testTag("tier_card_${tier.id}")
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Vehicle Visual & Details
            Row(
                modifier = Modifier.weight(1f),
                verticalAlignment = Alignment.CenterVertically
            ) {
                VehicleSilhouette(
                    tier = tier,
                    width = 72.dp,
                    height = 42.dp
                )

                Spacer(modifier = Modifier.width(12.dp))

                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = tier.title,
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        // Passenger capacity
                        Row(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 6.dp, vertical = 2.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Person,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant,
                                modifier = Modifier.size(11.dp)
                            )
                            Text(
                                text = "${tier.capacity}",
                                color = VoltOnSurfaceVariant,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        // Badge if applicable (FASTEST / VIP LUXURY)
                        tier.badge?.let { badgeText ->
                            Spacer(modifier = Modifier.width(6.dp))
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(if (tier.badgeIsYellow) VoltPrimaryContainer else VoltSurfaceContainerHighest)
                                    .border(0.5.dp, if (tier.badgeIsYellow) IceBlue.copy(alpha = 0.35f) else Color.Transparent, CircleShape)
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    text = badgeText,
                                    color = if (tier.badgeIsYellow) VoltOnPrimaryFixed else IceBlue,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(2.dp))

                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = tier.eta,
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                        Box(
                            modifier = Modifier
                                .padding(horizontal = 5.dp)
                                .size(3.dp)
                                .clip(CircleShape)
                                .background(VoltSecondary)
                        )
                        if (tier == RideTierType.ECO) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.Eco,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(11.dp)
                                )
                                Spacer(modifier = Modifier.width(2.dp))
                                Text(
                                    text = tier.feature,
                                    color = VoltPrimaryContainer,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                        } else {
                            Text(
                                text = tier.feature,
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }
                }
            }

            // Pricing & Selected checkmark
            Column(
                horizontalAlignment = Alignment.End
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "R${tier.price}",
                        color = if (isSelected) VoltPrimaryContainer else VoltOnSurface,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    if (isSelected) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .size(16.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Check,
                                contentDescription = "Selected",
                                tint = VoltOnPrimaryFixed,
                                modifier = Modifier.size(12.dp)
                            )
                        }
                    }
                }
                Text(
                    text = "R${tier.originalPrice}",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    textDecoration = TextDecoration.LineThrough
                )
            }
        }
    }
}
