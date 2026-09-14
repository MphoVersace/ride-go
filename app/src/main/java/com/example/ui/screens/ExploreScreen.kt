package com.example.ui.screens

import androidx.compose.animation.core.FastOutSlowInEasing
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
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.AirlineSeatReclineExtra
import androidx.compose.material.icons.filled.BeachAccess
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Flight
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.LocalTaxi
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Storefront
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
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.RideTierType
import com.example.ui.theme.IceBlue
import com.example.ui.theme.MediumBlue
import com.example.ui.theme.MutedBlueGray
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest

private const val DRIVER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDVJixUQtBYgGO1TXvYbqQT_kvmicOQcycCcK3lRVuiMSfocST8EcBQALwxjdozIJp15xKrKMJvEpIy2DfpeW76Mzc0fcaEzp_YorBPmdjtf0_jwY68yR_a9AsIOMlcekpqIIuXbLy18pDmheIlIXolL4KQu30bZpbtY0PxYsKCS8n91BQYwjVURYJjMLy5poU5Ossm351ma6bprlTvcC4eW4NOqLTu-Cbn2MD4enuI2nG1RIne0dzsMRMwBp1deH29xhNNpuGFLGO5rA"

private data class QuickCategoryItem(
    val id: String,
    val title: String,
    val subtitle: String,
    val badge: String,
    val icon: ImageVector,
    val tier: RideTierType
)

private data class FastBookingItem(
    val id: String,
    val title: String,
    val pillTag: String,
    val address: String,
    val eta: String,
    val icon: ImageVector,
    val tier: RideTierType
)

@Composable
fun ExploreScreen(
    onBookToLocation: (String) -> Unit = {},
    onBookFastRide: (destination: String, tier: RideTierType) -> Unit = { dest, _ -> onBookToLocation(dest) },
    onClaimPromo: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    var selectedCategory by remember { mutableStateOf("GO RIDE") }
    var trafficEnabled by remember { mutableStateOf(false) }

    val categories = remember {
        listOf(
            QuickCategoryItem(
                id = "GO RIDE",
                title = "GO RIDE",
                subtitle = "3 min",
                badge = "FASTEST",
                icon = Icons.Filled.LocalTaxi,
                tier = RideTierType.SAVER
            ),
            QuickCategoryItem(
                id = "COMFORT",
                title = "COMFORT",
                subtitle = "Spacious",
                badge = "PREMIUM",
                icon = Icons.Filled.AirlineSeatReclineExtra,
                tier = RideTierType.COMFORT
            ),
            QuickCategoryItem(
                id = "GO 4x4",
                title = "GO 4x4",
                subtitle = "6 Seats",
                badge = "SUV",
                icon = Icons.Filled.DirectionsCar,
                tier = RideTierType.XL
            ),
            QuickCategoryItem(
                id = "PACKAGE",
                title = "PACKAGE",
                subtitle = "Courier",
                badge = "EXPRESS",
                icon = Icons.Filled.LocalShipping,
                tier = RideTierType.SAVER
            )
        )
    }

    val fastBookings = remember {
        listOf(
            FastBookingItem(
                id = "home",
                title = "Home",
                pillTag = "GARDENS",
                address = "Kloof Street, Gardens, Cape Town",
                eta = "12 min",
                icon = Icons.Filled.Home,
                tier = RideTierType.SAVER
            ),
            FastBookingItem(
                id = "waterfront",
                title = "V&A Waterfront",
                pillTag = "HARBOUR",
                address = "Victoria Wharf, Breakwater Blvd",
                eta = "18 min",
                icon = Icons.Filled.Storefront,
                tier = RideTierType.COMFORT
            ),
            FastBookingItem(
                id = "airport",
                title = "Cape Town Int'l Airport",
                pillTag = "CPT",
                address = "Departures Terminal, Matroosfontein",
                eta = "26 min",
                icon = Icons.Filled.Flight,
                tier = RideTierType.XL
            ),
            FastBookingItem(
                id = "camps_bay",
                title = "Camps Bay Beach",
                pillTag = "COAST",
                address = "Victoria Road Promenade",
                eta = "15 min",
                icon = Icons.Filled.BeachAccess,
                tier = RideTierType.SAVER
            )
        )
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .verticalScroll(scrollState)
            .testTag("explore_hub_screen")
    ) {
        // ==========================================
        // 1. Interactive Map Viewport Layer (340dp)
        // ==========================================
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(340.dp)
                .background(Color(0xFF0D0E10))
                .testTag("map_viewport_layer")
        ) {
            // Live Pulsing Halo Animation
            val infiniteTransition = rememberInfiniteTransition(label = "pulse_anim")
            val pulseScale by infiniteTransition.animateFloat(
                initialValue = 0.8f,
                targetValue = 1.45f,
                animationSpec = infiniteRepeatable(
                    animation = tween(2200, easing = FastOutSlowInEasing),
                    repeatMode = RepeatMode.Restart
                ),
                label = "pulseScale"
            )
            val pulseAlpha by infiniteTransition.animateFloat(
                initialValue = 0.45f,
                targetValue = 0f,
                animationSpec = infiniteRepeatable(
                    animation = tween(2200, easing = FastOutSlowInEasing),
                    repeatMode = RepeatMode.Restart
                ),
                label = "pulseAlpha"
            )

            // Vector Map Canvas: Grid, Roads & Medium Blue Trajectory
            Canvas(modifier = Modifier.fillMaxSize()) {
                val w = size.width
                val h = size.height

                // Dark grid lines
                val gridStep = 48.dp.toPx()
                var x = 0f
                while (x <= w) {
                    drawLine(
                        color = Color(0xFF343537).copy(alpha = 0.25f),
                        start = Offset(x, 0f),
                        end = Offset(x, h),
                        strokeWidth = 0.8f
                    )
                    x += gridStep
                }
                var y = 0f
                while (y <= h) {
                    drawLine(
                        color = Color(0xFF343537).copy(alpha = 0.25f),
                        start = Offset(0f, y),
                        end = Offset(w, y),
                        strokeWidth = 0.8f
                    )
                    y += gridStep
                }

                // Ambient Secondary Road Arteries
                drawLine(
                    color = Color(0xFF292A2C).copy(alpha = 0.7f),
                    start = Offset(-20f, h * 0.35f),
                    end = Offset(w + 20f, h * 0.45f),
                    strokeWidth = 6.dp.toPx()
                )
                drawLine(
                    color = Color(0xFF292A2C).copy(alpha = 0.7f),
                    start = Offset(w * 0.25f, -10f),
                    end = Offset(w * 0.75f, h + 10f),
                    strokeWidth = 5.dp.toPx()
                )
                drawLine(
                    color = Color(0xFF292A2C).copy(alpha = 0.5f),
                    start = Offset(-10f, h * 0.8f),
                    end = Offset(w + 10f, h * 0.2f),
                    strokeWidth = 4.dp.toPx()
                )

                // Active Route Polyline (Curved Dashed Medium Blue Line with Ice Blue Glow)
                val routePath = Path().apply {
                    moveTo(-20f, h * 0.58f)
                    cubicTo(
                        w * 0.25f, h * 0.72f,
                        w * 0.42f, h * 0.52f,
                        w * 0.50f, h * 0.48f // Pin waypoint location
                    )
                    cubicTo(
                        w * 0.65f, h * 0.42f,
                        w * 0.85f, h * 0.32f,
                        w + 30f, h * 0.25f
                    )
                }

                // Route background glow stroke
                drawPath(
                    path = routePath,
                    color = IceBlue.copy(alpha = 0.35f),
                    style = Stroke(
                        width = 8.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(24f, 16f), 0f)
                    )
                )

                // Active crisp medium blue dashed trajectory
                drawPath(
                    path = routePath,
                    color = MediumBlue,
                    style = Stroke(
                        width = 4.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(24f, 16f), 0f)
                    )
                )
            }

            // Map Ambience Vignette Gradients (Top & Bottom seamless fade)
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                VoltSurface.copy(alpha = 0.85f),
                                Color.Transparent,
                                Color.Transparent,
                                VoltSurface
                            )
                        )
                    )
            )

            // Live Position Halo & Pin (Centered at waypoint)
            Box(
                modifier = Modifier
                    .align(Alignment.Center)
                    .offset(y = (-10).dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Pulsing animated pin halo
                    Box(
                        modifier = Modifier.size(56.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        // Expanding wave
                        Box(
                            modifier = Modifier
                                .size(54.dp * pulseScale)
                                .clip(CircleShape)
                                .background(IceBlue.copy(alpha = pulseAlpha))
                        )
                        // Ambient ring
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .clip(CircleShape)
                                .background(MediumBlue.copy(alpha = 0.30f))
                        )
                        // Core Ice Blue beacon
                        Box(
                            modifier = Modifier
                                .size(20.dp)
                                .shadow(12.dp, CircleShape, spotColor = IceBlue)
                                .clip(CircleShape)
                                .background(IceBlue),
                            contentAlignment = Alignment.Center
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(8.dp)
                                    .clip(CircleShape)
                                    .background(VoltSurface)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    // Current Pick-up Pill Tag
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                            .border(1.dp, Color.White.copy(alpha = 0.08f), CircleShape)
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                            .shadow(8.dp, CircleShape)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(6.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer)
                            )
                            Text(
                                text = "Cape Town City Bowl",
                                color = VoltOnSurface,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            // Live Fleet Status Pill (Top-Left)
            Box(
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .padding(start = 16.dp, top = 16.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh.copy(alpha = 0.92f))
                    .border(1.dp, Color.White.copy(alpha = 0.08f), CircleShape)
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(7.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Text(
                        text = "24 RIDE-GO CARS NEARBY (CAPE TOWN)",
                        color = VoltOnSurface,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.6.sp
                    )
                }
            }

            // Floating Map Quick Control Buttons (Top-Right)
            Column(
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(end = 16.dp, top = 14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Re-center Location
                IconButton(
                    onClick = { /* Recenters map */ },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
                        .shadow(8.dp, CircleShape)
                        .testTag("map_recenter_btn")
                ) {
                    Icon(
                        imageVector = Icons.Filled.MyLocation,
                        contentDescription = "Re-center location",
                        tint = VoltOnSurface,
                        modifier = Modifier.size(20.dp)
                    )
                }

                // Traffic Layer Toggle
                IconButton(
                    onClick = { trafficEnabled = !trafficEnabled },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(if (trafficEnabled) VoltPrimaryContainer else VoltSurfaceContainerHigh)
                        .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
                        .shadow(8.dp, CircleShape)
                        .testTag("map_traffic_toggle_btn")
                ) {
                    Icon(
                        imageVector = Icons.Filled.Layers,
                        contentDescription = "Traffic layer",
                        tint = if (trafficEnabled) VoltOnPrimaryFixed else VoltOnSurface,
                        modifier = Modifier.size(20.dp)
                    )
                }

                // Safety Toolkit
                IconButton(
                    onClick = { /* Open safety toolkit */ },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .border(1.dp, Color.White.copy(alpha = 0.1f), CircleShape)
                        .shadow(8.dp, CircleShape)
                        .testTag("map_safety_btn")
                ) {
                    Icon(
                        imageVector = Icons.Filled.Shield,
                        contentDescription = "Safety toolkit",
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        }

        // ==============================================================
        // 2. Primary Discovery & Ride Selector Console (Overlapping Map)
        // ==============================================================
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .offset(y = (-28).dp)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Hero "Where to?" Search Bar
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .shadow(16.dp, RoundedCornerShape(20.dp), spotColor = Color.Black)
                    .background(VoltSurfaceContainerHigh)
                    .clickable { onBookToLocation("Camps Bay, Cape Town") }
                    .padding(12.dp)
                    .testTag("hero_where_to_search_bar")
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Deep Navy Search Icon Box
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(VoltPrimaryContainer)
                            .border(1.dp, IceBlue.copy(alpha = 0.3f), RoundedCornerShape(14.dp))
                            .shadow(6.dp, RoundedCornerShape(14.dp), spotColor = Color.Black),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Search,
                            contentDescription = "Search",
                            tint = Color.White,
                            modifier = Modifier.size(26.dp)
                        )
                    }

                    // Text Query Placeholders
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Where to?",
                            color = VoltOnSurface,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = (-0.3).sp
                        )
                        Text(
                            text = "Search destination or Camps Bay, Stellenbosch, V&A...",
                            color = VoltOnSurfaceVariant,
                            fontSize = 12.sp,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }

                    // Schedule "Now" Action Button
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainer)
                            .padding(horizontal = 12.dp, vertical = 8.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Schedule,
                                contentDescription = "Now",
                                tint = VoltOnSurface,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = "Now",
                                color = VoltOnSurface,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            // Quick Action Category Grid (4 Columns)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                categories.forEach { category ->
                    val isSelected = selectedCategory == category.id
                    val cardBg = if (isSelected) VoltPrimaryContainer else VoltSurfaceContainer
                    val cardBorder = if (isSelected) VoltPrimaryContainer else VoltSurfaceContainerHighest

                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(18.dp))
                            .background(cardBg)
                            .border(
                                width = if (isSelected) 2.dp else 1.dp,
                                color = cardBorder,
                                shape = RoundedCornerShape(18.dp)
                            )
                            .clickable {
                                selectedCategory = category.id
                                onBookFastRide("Cape Town City Bowl", category.tier)
                            }
                            .padding(horizontal = 4.dp, vertical = 10.dp)
                            .testTag("category_${category.id.lowercase()}"),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            // Top Badge (FASTEST, PREMIUM, SUV, EXPRESS)
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(
                                        if (isSelected) VoltOnPrimaryFixed else VoltSurfaceContainerHighest
                                    )
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    text = category.badge,
                                    color = if (isSelected) VoltPrimaryContainer else VoltOnSurfaceVariant,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.4.sp
                                )
                            }

                            Spacer(modifier = Modifier.height(6.dp))

                            // Category Icon
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(
                                        if (isSelected) VoltOnPrimaryFixed.copy(alpha = 0.12f)
                                        else VoltSurfaceContainerHigh
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = category.icon,
                                    contentDescription = category.title,
                                    tint = if (isSelected) VoltOnPrimaryFixed else VoltPrimaryContainer,
                                    modifier = Modifier.size(22.dp)
                                )
                            }

                            Spacer(modifier = Modifier.height(6.dp))

                            // Title & Subtitle
                            Text(
                                text = category.title,
                                color = if (isSelected) VoltOnPrimaryFixed else VoltOnSurface,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 0.5.sp,
                                maxLines = 1
                            )
                            Text(
                                text = category.subtitle,
                                color = if (isSelected) VoltOnPrimaryFixed.copy(alpha = 0.8f) else VoltOnSurfaceVariant,
                                fontSize = 10.sp,
                                fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal,
                                maxLines = 1
                            )
                        }
                    }
                }
            }

            // Promo Card: High Voltage Electrification Banner
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(VoltSurfaceContainerHigh)
                    .border(1.dp, Color.White.copy(alpha = 0.06f), RoundedCornerShape(20.dp))
                    .padding(16.dp)
                    .testTag("ride_go_mzansi_special_promo")
            ) {
                Column(modifier = Modifier.fillMaxWidth()) {
                    // Header row: RIDE-GO PROMO badge + MZANSI30 + lightning bolt
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer)
                                    .padding(horizontal = 9.dp, vertical = 3.dp)
                            ) {
                                Text(
                                    text = "RIDE-GO PROMO",
                                    color = VoltOnPrimaryFixed,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                            }
                            Text(
                                text = "MZANSI30",
                                color = VoltPrimaryContainer,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 0.5.sp
                            )
                        }

                        Icon(
                            imageVector = Icons.Filled.Bolt,
                            contentDescription = "Promo Bolt",
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Promo Title & Description
                    Text(
                        text = "Ride-Go Mzansi Special",
                        color = VoltOnSurface,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "30% off your first 5 trips across Western Cape.",
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    // Bottom Row: Coverage & Claim Offer CTA Button
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "Cape Town Metro & Winelands",
                                color = VoltOnSurface,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Instant dispatch • VW & Toyota",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }

                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer)
                                .clickable { onClaimPromo() }
                                .padding(horizontal = 16.dp, vertical = 10.dp)
                                .shadow(6.dp, CircleShape, spotColor = VoltPrimaryContainer)
                                .testTag("claim_promo_btn")
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Text(
                                    text = "CLAIM OFFER",
                                    color = VoltOnPrimaryFixed,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                                Icon(
                                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                    contentDescription = "Claim",
                                    tint = VoltOnPrimaryFixed,
                                    modifier = Modifier.size(15.dp)
                                )
                            }
                        }
                    }
                }
            }

            // Frequent Destinations: Fast Bookings Section
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Section Header Row with Edit Button
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "FAST BOOKINGS",
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )

                    Row(
                        modifier = Modifier
                            .clickable { /* Toggle fast bookings editor */ }
                            .padding(4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Edit,
                            contentDescription = "Edit Fast Bookings",
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(16.dp)
                        )
                        Text(
                            text = "Edit",
                            color = VoltPrimaryContainer,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // List of 4 Fast Bookings Cards
                fastBookings.forEach { booking ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(18.dp))
                            .background(VoltSurfaceContainer)
                            .border(1.dp, VoltSurfaceContainerHighest.copy(alpha = 0.5f), RoundedCornerShape(18.dp))
                            .clickable { onBookFastRide(booking.address, booking.tier) }
                            .padding(14.dp)
                            .testTag("fast_booking_${booking.id}")
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                // Square Icon Container
                                Box(
                                    modifier = Modifier
                                        .size(44.dp)
                                        .clip(RoundedCornerShape(12.dp))
                                        .background(VoltSurfaceContainerHigh),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = booking.icon,
                                        contentDescription = booking.title,
                                        tint = VoltPrimaryContainer,
                                        modifier = Modifier.size(22.dp)
                                    )
                                }

                                Column(modifier = Modifier.weight(1f)) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                                    ) {
                                        Text(
                                            text = booking.title,
                                            color = VoltOnSurface,
                                            fontSize = 15.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                        Box(
                                            modifier = Modifier
                                                .clip(CircleShape)
                                                .background(VoltSurfaceContainerHighest)
                                                .padding(horizontal = 7.dp, vertical = 2.dp)
                                        ) {
                                            Text(
                                                text = booking.pillTag,
                                                color = VoltOnSurfaceVariant,
                                                fontSize = 9.sp,
                                                fontWeight = FontWeight.Bold,
                                                letterSpacing = 0.5.sp
                                            )
                                        }
                                    }
                                    Spacer(modifier = Modifier.height(2.dp))
                                    Text(
                                        text = booking.address,
                                        color = VoltOnSurfaceVariant,
                                        fontSize = 12.sp,
                                        maxLines = 1,
                                        overflow = TextOverflow.Ellipsis
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.width(8.dp))

                            // ETA & Arrow
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Text(
                                    text = booking.eta,
                                    color = VoltPrimaryContainer,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Icon(
                                    imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                    contentDescription = "Navigate to ${booking.title}",
                                    tint = VoltOnSurfaceVariant,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                    }
                }
            }

            // Active City Driver Pulse Section
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(VoltSurfaceContainer)
                    .border(1.dp, Color.White.copy(alpha = 0.05f), RoundedCornerShape(20.dp))
                    .padding(14.dp)
                    .testTag("driver_pulse_card")
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        // Driver Photo Avatar with Online Badge
                        Box(
                            modifier = Modifier.size(48.dp),
                            contentAlignment = Alignment.BottomEnd
                        ) {
                            AsyncImage(
                                model = ImageRequest.Builder(LocalContext.current)
                                    .data(DRIVER_AVATAR_URL)
                                    .crossfade(true)
                                    .build(),
                                contentDescription = "Driver Thulane J.",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier
                                    .size(48.dp)
                                    .clip(CircleShape)
                            )
                            // Online indicator dot
                            Box(
                                modifier = Modifier
                                    .size(13.dp)
                                    .clip(CircleShape)
                                    .background(VoltSurface)
                                    .padding(2.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .clip(CircleShape)
                                        .background(VoltPrimaryContainer)
                                )
                            }
                        }

                        // Driver Details & Status
                        Column(modifier = Modifier.weight(1f)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Text(
                                    text = "Thulane J.",
                                    color = VoltOnSurface,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Box(
                                    modifier = Modifier
                                        .clip(CircleShape)
                                        .background(VoltPrimaryContainer.copy(alpha = 0.2f))
                                        .padding(horizontal = 6.dp, vertical = 2.dp)
                                ) {
                                    Text(
                                        text = "4.98 ★",
                                        color = VoltPrimaryContainer,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = "Driver en route • VW Polo Vivo (3 min away)",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    // Call Driver Button
                    IconButton(
                        onClick = { /* Call driver */ },
                        modifier = Modifier
                            .size(42.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh)
                            .testTag("call_driver_btn")
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Phone,
                            contentDescription = "Call Driver",
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}
