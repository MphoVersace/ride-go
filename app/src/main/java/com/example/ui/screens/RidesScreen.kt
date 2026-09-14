package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
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
import androidx.compose.material.icons.filled.AccountBalance
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.Money
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
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
import com.example.ui.theme.VoltSurfaceBright
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.ui.theme.VoltSurfaceLowest
import com.example.viewmodel.VoltUiState

private const val MAP_BACKGROUND_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGued8VaMeFw6WvxZJYfTf3e3_l9fOaamy9lojZQ0D0u28esCYORqJFtwZbitWd6u-VH-Eg0T3eWeS63fyEulVaQLEXQCqbWkGg08czSSQEMRBWz7_s4M_BQN-rKZD4hofYBDZBwXRdkyU_YlC10FOFV1pPL_x4Ymmr4MWAjtdRgKXidyMpZ3-UqARzs_bLhcvA6003g_P7yD8FyIYMhJwiFzchuZ1l8hrj7IGM9DYehBlVUt3wjNd"

private data class PaymentMethodItem(
    val id: String,
    val title: String,
    val subtitle: String,
    val icon: ImageVector,
    val isRecommended: Boolean = false
)

@Composable
fun RidesScreen(
    state: VoltUiState,
    onTierSelected: (RideTierType) -> Unit,
    onConfirmDispatch: () -> Unit,
    onPromoClick: () -> Unit,
    onPaymentSelected: (String) -> Unit = {},
    onEditPickup: () -> Unit = {},
    onEditDestination: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    var isPaymentMenuOpen by remember { mutableStateOf(false) }

    val hasDestination = state.destinationLocation.isNotBlank()
    val (routeDistance, routeDuration) = remember(state.pickupLocation, state.destinationLocation) {
        if (!hasDestination) {
            Pair("", "")
        } else {
            val d = state.destinationLocation.lowercase()
            when {
                d.contains("or tambo") || d.contains("o.r. tambo") -> Pair("24.0 km", "28 mins")
                d.contains("cape town international") || d.contains("cpt") -> Pair("21.4 km", "24 mins")
                d.contains("king shaka") || d.contains("dur") -> Pair("32.1 km", "26 mins")
                d.contains("camps bay") -> Pair("8.4 km", "15 mins")
                d.contains("v&a") || d.contains("waterfront") -> Pair("5.8 km", "14 mins")
                d.contains("rosebank") -> Pair("6.2 km", "12 mins")
                d.contains("sandton") -> Pair("1.2 km", "5 mins")
                d.contains("mall of africa") -> Pair("16.5 km", "18 mins")
                d.contains("canal walk") || d.contains("century city") -> Pair("14.2 km", "18 mins")
                d.contains("menlyn") -> Pair("42.0 km", "38 mins")
                d.contains("table mountain") -> Pair("7.1 km", "16 mins")
                else -> {
                    val dist = (8 + (state.pickupLocation.length + state.destinationLocation.length) % 18)
                    val time = (10 + dist * 1.3).toInt()
                    Pair("$dist.2 km", "$time mins")
                }
            }
        }
    }

    val paymentOptions = remember {
        listOf(
            PaymentMethodItem(
                id = "capitec",
                title = "Capitec Pay •••• 4282",
                subtitle = "Instant biometric EFT • 0% fee",
                icon = Icons.Filled.AccountBalance,
                isRecommended = true
            ),
            PaymentMethodItem(
                id = "visa",
                title = "Standard Bank Visa •••• 9104",
                subtitle = "Credit Card • Instant charge",
                icon = Icons.Filled.CreditCard
            ),
            PaymentMethodItem(
                id = "fnb",
                title = "FNB Cheque Card •••• 3381",
                subtitle = "FNB Gold • Linked account",
                icon = Icons.Filled.CreditCard
            ),
            PaymentMethodItem(
                id = "absa",
                title = "Absa Debit •••• 7120",
                subtitle = "Absa Flexi • Linked account",
                icon = Icons.Filled.CreditCard
            ),
            PaymentMethodItem(
                id = "wallet",
                title = "Ride Go Wallet",
                subtitle = "Balance: R 420.00",
                icon = Icons.Filled.AccountBalanceWallet
            ),
            PaymentMethodItem(
                id = "cash",
                title = "Cash to Driver",
                subtitle = "Pay directly in ZAR cash on arrival",
                icon = Icons.Filled.Money
            )
        )
    }

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

    var recenterTrigger by remember { mutableStateOf(0) }

    Box(modifier = modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .testTag("rides_screen")
        ) {
        // Top Map Viewport Section with OpenStreetMap (osmdroid)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(230.dp)
                .background(VoltSurfaceLowest)
        ) {
            // Live OpenStreetMap with 60-30-10 Dark Mode ColorMatrix
            com.example.ui.components.OsmMapView(
                latitude = -33.9249,
                longitude = 18.4241,
                zoomLevel = 14.5,
                isDarkMode = true,
                recenterTrigger = recenterTrigger,
                modifier = Modifier.fillMaxSize()
            )

            // Dark subtle gradient overlay
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Black.copy(alpha = 0.35f),
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

            // Floating Trip Trajectory HUD (Top Left) - shown only when destination selected
            if (hasDestination) {
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
                            text = "$routeDuration ",
                            color = VoltOnSurface,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                        Text(
                            text = "• $routeDistance",
                            color = VoltOnSurfaceVariant,
                            fontSize = 12.sp
                        )
                    }
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
                    onClick = { recenterTrigger++ },
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
                        tint = VoltOnSurface,
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
                // Pickup Pill (Clickable to edit pickup)
                Row(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                        .clickable(onClick = onEditPickup)
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(VoltOnSurface)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = state.pickupLocation.ifBlank { "Current Location" },
                        color = VoltOnSurface,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
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

                // Destination Pill (Clickable to edit destination)
                Row(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                        .clickable(onClick = onEditDestination)
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(RoundedCornerShape(1.dp))
                            .background(if (hasDestination) VoltOnSurface else VoltOnSurfaceVariant)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (hasDestination) state.destinationLocation else "Select destination",
                        color = if (hasDestination) VoltOnSurface else VoltOnSurfaceVariant,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
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
                            text = "Affordable, reliable rides across South Africa",
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
                            imageVector = Icons.Filled.LocalOffer,
                            contentDescription = null,
                            tint = VoltOnSurfaceVariant,
                            modifier = Modifier.size(13.dp)
                        )
                        Text(
                            text = "SURGE 1.0X",
                            color = VoltOnSurfaceVariant,
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
                            .clickable { isPaymentMenuOpen = true }
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
                                imageVector = when {
                                    state.selectedPaymentMethod.contains("Wallet", ignoreCase = true) -> Icons.Filled.AccountBalanceWallet
                                    state.selectedPaymentMethod.contains("Cash", ignoreCase = true) -> Icons.Filled.Money
                                    state.selectedPaymentMethod.contains("Capitec", ignoreCase = true) -> Icons.Filled.AccountBalance
                                    else -> Icons.Filled.CreditCard
                                },
                                contentDescription = null,
                                tint = VoltOnSurface,
                                modifier = Modifier.size(12.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = state.selectedPaymentMethod,
                            color = VoltOnSurface,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Icon(
                            imageVector = Icons.Filled.ExpandMore,
                            contentDescription = "Select payment method",
                            tint = VoltOnSurfaceVariant,
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    Row(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(if (state.riderPromoApplied) VoltSurfaceBright else VoltSurfaceContainerHighest)
                            .clickable(onClick = onPromoClick)
                            .padding(horizontal = 10.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Filled.LocalOffer,
                            contentDescription = null,
                            tint = VoltOnSurface,
                            modifier = Modifier.size(13.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = if (state.riderPromoApplied) "-R50 RIDEGOFIRST" else "-R20 PROMO",
                            color = VoltOnSurface,
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

        // Scrim Overlay: darkened backdrop when payment bottom sheet is open
        AnimatedVisibility(
            visible = isPaymentMenuOpen,
            enter = fadeIn(animationSpec = tween(200)),
            exit = fadeOut(animationSpec = tween(180))
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.Black.copy(alpha = 0.65f))
                    .clickable { isPaymentMenuOpen = false }
            )
        }

        // Slide-Up Payment Methods Bottom Sheet
        AnimatedVisibility(
            visible = isPaymentMenuOpen,
            enter = slideInVertically(
                initialOffsetY = { fullHeight -> fullHeight },
                animationSpec = tween(durationMillis = 280)
            ),
            exit = slideOutVertically(
                targetOffsetY = { fullHeight -> fullHeight },
                animationSpec = tween(durationMillis = 240)
            ),
            modifier = Modifier.align(Alignment.BottomCenter)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                    .background(VoltSurfaceContainer)
                    .border(1.dp, Color(0x20FFFFFF), RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                    .padding(horizontal = 20.dp, vertical = 16.dp)
            ) {
                // Drag handle bar
                Box(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .size(width = 36.dp, height = 4.dp)
                        .clip(CircleShape)
                        .background(VoltOnSurfaceVariant.copy(alpha = 0.4f))
                )

                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Payment Method",
                        color = VoltOnSurface,
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp
                    )
                    Text(
                        text = "Done",
                        color = VoltOnSurface,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 13.sp,
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .clickable { isPaymentMenuOpen = false }
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                paymentOptions.forEach { method ->
                    val isSelected = method.title == state.selectedPaymentMethod
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(if (isSelected) VoltSurfaceContainerHigh else Color.Transparent)
                            .border(
                                1.dp,
                                if (isSelected) VoltOnSurface.copy(alpha = 0.35f) else Color.Transparent,
                                RoundedCornerShape(14.dp)
                            )
                            .clickable {
                                onPaymentSelected(method.title)
                                isPaymentMenuOpen = false
                            }
                            .padding(horizontal = 14.dp, vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.weight(1f)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(if (isSelected) VoltSurfaceBright else VoltSurfaceContainerHighest),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = method.icon,
                                    contentDescription = null,
                                    tint = VoltOnSurface,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = method.title,
                                        color = VoltOnSurface,
                                        fontSize = 14.sp,
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                                    )
                                    if (method.isRecommended) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(CircleShape)
                                                .background(VoltSurfaceBright)
                                                .padding(horizontal = 6.dp, vertical = 2.dp)
                                        ) {
                                            Text(
                                                text = "DEFAULT",
                                                color = VoltOnSurfaceVariant,
                                                fontSize = 9.sp,
                                                fontWeight = FontWeight.Bold
                                            )
                                        }
                                    }
                                }
                                Text(
                                    text = method.subtitle,
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp
                                )
                            }
                        }

                        if (isSelected) {
                            Box(
                                modifier = Modifier
                                    .size(20.dp)
                                    .clip(CircleShape)
                                    .background(VoltOnSurface),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Check,
                                    contentDescription = "Selected",
                                    tint = VoltSurfaceLowest,
                                    modifier = Modifier.size(14.dp)
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))
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
        targetValue = if (isSelected) VoltOnSurface.copy(alpha = 0.45f) else Color.Transparent,
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
                        Text(
                            text = tier.feature,
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
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
                        color = VoltOnSurface,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    if (isSelected) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .size(16.dp)
                                .clip(CircleShape)
                                .background(VoltOnSurface),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Check,
                                contentDescription = "Selected",
                                tint = VoltSurfaceLowest,
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
