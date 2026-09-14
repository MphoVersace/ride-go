package com.example.ui.screens

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
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AirlineSeatReclineExtra
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.HealthAndSafety
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.ui.components.RideGoLogo
import com.example.ui.theme.IceBlue
import com.example.ui.theme.IceBlueSoft
import com.example.ui.theme.MediumBlue
import com.example.ui.theme.MutedBlueGray
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.ui.theme.VoltSurfaceContainerLowest
import com.example.ui.theme.VoltSurfaceVariant
import com.example.viewmodel.VoltUiState

private const val RIDER_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBL7X1YVUs996Wkj8TC5HJay5Q4FgzBiMoJuv_Kd97lyXZwUI-uAn4oTW_rrp6JyjElTrY6jZ3_Llcu9eraNUyAcIZbVbR3brMF8XYqoq6Bq64BfmlZzHzHb8kHfDyjRg5oln4cOLvkoBUyzei25ZxK2AY4fpA4lNhShiWaTePK339EpMnsp-8N5s5rC2TbBg_PmsyH3ZbL3bskMHYyhmoz4JAEbdFO-duM_LKDDr96dEX9n12KaKZPSD6tz55RHWSPEQ"

@Composable
fun LiveTrackingScreen(
    state: VoltUiState,
    onBack: () -> Unit,
    onCancelRide: () -> Unit,
    onCallDriver: () -> Unit = {},
    onMessageDriver: () -> Unit = {},
    onShareRide: () -> Unit = {},
    onSafetyCenterClick: () -> Unit = {},
    onTripDetailsClick: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var showCancelDialog by remember { mutableStateOf(false) }
    var showSafetyDialog by remember { mutableStateOf(false) }
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .statusBarsPadding()
            .testTag("live_tracking_screen")
    ) {
        // Top Sticky Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(VoltSurface.copy(alpha = 0.92f))
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .testTag("tracking_back_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = VoltOnSurface,
                        modifier = Modifier.size(20.dp)
                    )
                }

                Spacer(modifier = Modifier.width(8.dp))

                RideGoLogo(size = 28.dp)

                Spacer(modifier = Modifier.width(8.dp))

                Text(
                    text = "Trip Tracking",
                    color = VoltOnSurface,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(
                    onClick = { showSafetyDialog = true },
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Shield,
                        contentDescription = "Safety Center",
                        tint = IceBlue,
                        modifier = Modifier.size(20.dp)
                    )
                }

                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .border(1.dp, IceBlue.copy(alpha = 0.4f), CircleShape)
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(RIDER_AVATAR)
                            .crossfade(true)
                            .build(),
                        contentDescription = "Rider Avatar",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
            }
        }

        // Scrollable Body (Map Viewport + Bottom Sheet Console)
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(scrollState)
        ) {
            // Map Viewport Container
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(340.dp)
                    .background(VoltSurfaceContainerLowest)
            ) {
                // Interactive Vector Route Canvas
                TrackingMapCanvas(modifier = Modifier.fillMaxSize())

                // Floating Top Live ETA Status Pill
                Box(
                    modifier = Modifier
                        .align(Alignment.TopCenter)
                        .padding(top = 16.dp)
                        .clip(CircleShape)
                        .background(VoltSurface.copy(alpha = 0.94f))
                        .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.4f), CircleShape)
                        .padding(horizontal = 16.dp, vertical = 8.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(IceBlue)
                        )
                        Text(
                            text = "${state.matchedDriverName.split(" ").firstOrNull() ?: "Driver"} is ${state.driverEtaMinutes} mins away",
                            color = VoltOnSurface,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = state.driverEtaTimeFormatted,
                            color = IceBlue,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }

                // Floating Right Map Controls Dock
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(end = 16.dp, bottom = 16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    IconButton(
                        onClick = { /* Recenter */ },
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(VoltSurface.copy(alpha = 0.90f))
                            .border(1.dp, VoltSurfaceContainerHighest, CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Filled.MyLocation,
                            contentDescription = "Recenter Map",
                            tint = IceBlue,
                            modifier = Modifier.size(20.dp)
                        )
                    }

                    IconButton(
                        onClick = { /* Map Layers */ },
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(VoltSurface.copy(alpha = 0.90f))
                            .border(1.dp, VoltSurfaceContainerHighest, CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Layers,
                            contentDescription = "Map Layers",
                            tint = VoltOnSurface,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }

            // Primary Bottom Sheet Console
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                    .background(VoltSurface)
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Interactive Sheet Handle
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Box(
                        modifier = Modifier
                            .width(36.dp)
                            .height(4.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest)
                    )
                }

                // Safety Code PIN Banner
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.35f), RoundedCornerShape(16.dp))
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer.copy(alpha = 0.25f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Lock,
                                contentDescription = null,
                                tint = IceBlue,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(16.dp))
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "RIDE SECURITY PIN",
                                    color = VoltSecondary,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 1.sp
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Icon(
                                    imageVector = Icons.Filled.Shield,
                                    contentDescription = null,
                                    tint = IceBlue,
                                    modifier = Modifier.size(12.dp)
                                )
                            }
                            Text(
                                text = "Share with Marcus before departure",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }

                    // 4 Distinct PIN Digits
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        state.rideSecurityPin.take(4).forEach { char ->
                            Box(
                                modifier = Modifier
                                    .size(width = 30.dp, height = 38.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(VoltSurfaceContainerHighest)
                                    .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.5f), RoundedCornerShape(6.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = char.toString(),
                                    color = VoltOnSurface,
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }

                // Driver & Vehicle Showcase Card
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Driver Profile Row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(modifier = Modifier.size(54.dp)) {
                                AsyncImage(
                                    model = ImageRequest.Builder(LocalContext.current)
                                        .data(state.driverPhotoUrl)
                                        .crossfade(true)
                                        .build(),
                                    contentDescription = "Driver Photo",
                                    contentScale = ContentScale.Crop,
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .clip(CircleShape)
                                )
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.BottomEnd)
                                        .size(18.dp)
                                        .clip(CircleShape)
                                        .background(VoltPrimaryContainer),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Filled.Verified,
                                        contentDescription = "Verified Driver",
                                        tint = IceBlue,
                                        modifier = Modifier.size(12.dp)
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.width(16.dp))
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = state.matchedDriverName,
                                        color = VoltOnSurface,
                                        fontSize = 16.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Icon(
                                        imageVector = Icons.Filled.Verified,
                                        contentDescription = null,
                                        tint = IceBlue,
                                        modifier = Modifier.size(14.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.height(2.dp))
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Filled.Star,
                                        contentDescription = null,
                                        tint = IceBlue,
                                        modifier = Modifier.size(14.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = state.driverRating,
                                        color = VoltOnSurface,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Text(
                                        text = " • ${state.driverTripsCount}",
                                        color = VoltSecondary,
                                        fontSize = 12.sp
                                    )
                                }
                            }
                        }
                    }

                    // Vehicle Model Specs & South African Plate Box
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(VoltSurfaceContainer)
                            .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(12.dp))
                            .padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Go Comfort",
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.AirlineSeatReclineExtra,
                                    contentDescription = null,
                                    tint = IceBlue,
                                    modifier = Modifier.size(14.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "Extra legroom",
                                    color = VoltSecondary,
                                    fontSize = 11.sp
                                )
                            }
                        }

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = state.matchedVehicle,
                                    color = VoltOnSurface,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                                Text(
                                    text = state.driverVehicleColor,
                                    color = VoltSecondary,
                                    fontSize = 11.sp
                                )
                            }

                            // South African Plate Box
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(4.dp))
                                    .background(Color(0xFFE2E8F0))
                                    .border(1.dp, Color(0xFF94A3B8), RoundedCornerShape(4.dp))
                                    .padding(horizontal = 10.dp, vertical = 4.dp)
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = state.driverProvince.uppercase(),
                                        color = Color(0xFF475569),
                                        fontSize = 8.sp,
                                        fontWeight = FontWeight.Bold,
                                        letterSpacing = 1.sp
                                    )
                                    Text(
                                        text = state.driverLicensePlate,
                                        color = Color(0xFF0F172A),
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold,
                                        letterSpacing = 0.8.sp
                                    )
                                }
                            }
                        }
                    }
                }

                // Quick Action Communications Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    QuickActionButton(
                        icon = Icons.Filled.Phone,
                        label = "Call",
                        onClick = onCallDriver,
                        tint = IceBlue,
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionButton(
                        icon = Icons.Filled.Chat,
                        label = "Message",
                        onClick = onMessageDriver,
                        tint = IceBlue,
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionButton(
                        icon = Icons.Filled.Share,
                        label = "Share",
                        onClick = onShareRide,
                        tint = VoltOnSurface,
                        modifier = Modifier.weight(1f)
                    )
                    QuickActionButton(
                        icon = Icons.Filled.HealthAndSafety,
                        label = "Safety",
                        onClick = onSafetyCenterClick,
                        tint = IceBlue,
                        modifier = Modifier.weight(1f)
                    )
                }

                // Route Waypoints Timeline
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Row(verticalAlignment = Alignment.Top) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(top = 4.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(10.dp)
                                    .clip(CircleShape)
                                    .background(IceBlue)
                            )
                            Box(
                                modifier = Modifier
                                    .width(2.dp)
                                    .height(36.dp)
                                    .background(VoltSurfaceVariant)
                            )
                            Box(
                                modifier = Modifier
                                    .size(10.dp)
                                    .clip(RoundedCornerShape(2.dp))
                                    .background(VoltOnSurface)
                            )
                        }

                        Spacer(modifier = Modifier.width(16.dp))

                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "PICKUP SPOT",
                                color = IceBlue,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.sp
                            )
                            Text(
                                text = state.pickupLocation,
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                            Text(
                                text = "Wait near curb for Marcus",
                                color = VoltSecondary,
                                fontSize = 11.sp
                            )

                            Spacer(modifier = Modifier.height(16.dp))

                            Text(
                                text = "DESTINATION",
                                color = VoltSecondary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.sp
                            )
                            Text(
                                text = state.destinationLocation,
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                            Text(
                                text = "Terminal A • Departures Level",
                                color = VoltSecondary,
                                fontSize = 11.sp
                            )
                        }
                    }
                }

                // Payment Fare & Fixed Price Row
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainer)
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.CreditCard,
                                contentDescription = null,
                                tint = VoltOnSurface,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(16.dp))
                        Column {
                            Text(
                                text = "Capitec Pay (•••• 4282)",
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                            Text(
                                text = "Comfort Tier",
                                color = VoltSecondary,
                                fontSize = 11.sp
                            )
                        }
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = "R145.00",
                            color = VoltOnSurface,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Fixed Fare",
                            color = IceBlue,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }

                // Secondary Cancellation & Help Actions
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerLow)
                            .border(1.dp, VoltSurfaceContainerHighest, CircleShape)
                            .clickable { showCancelDialog = true }
                            .padding(horizontal = 16.dp, vertical = 10.dp)
                    ) {
                        Text(
                            text = "Cancel Ride",
                            color = Color(0xFFF87171),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Row(
                        modifier = Modifier
                            .clickable(onClick = onTripDetailsClick)
                            .padding(vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Trip details & help",
                            color = VoltSecondary,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Icon(
                            imageVector = Icons.Filled.ChevronRight,
                            contentDescription = null,
                            tint = VoltSecondary,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }

    // Cancel Ride Confirmation Dialog
    if (showCancelDialog) {
        AlertDialog(
            onDismissRequest = { showCancelDialog = false },
            title = {
                Text(
                    text = "Cancel This Ride?",
                    color = VoltOnSurface,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            },
            text = {
                Text(
                    text = "Marcus Vance is already en route. Free cancellation applies within 2 minutes of booking.",
                    color = VoltOnSurfaceVariant,
                    fontSize = 13.sp
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        showCancelDialog = false
                        onCancelRide()
                    }
                ) {
                    Text("Yes, Cancel Ride", color = Color(0xFFF87171), fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showCancelDialog = false }) {
                    Text("Keep Ride", color = IceBlue, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = VoltSurfaceContainerHigh
        )
    }

    // Safety Center Dialog
    if (showSafetyDialog) {
        AlertDialog(
            onDismissRequest = { showSafetyDialog = false },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(imageVector = Icons.Filled.Shield, contentDescription = null, tint = IceBlue, modifier = Modifier.size(20.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = "Safety Center", color = VoltOnSurface, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                }
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(text = "• 24/7 South African SOS hotline: 0800 000 000", color = VoltOnSurface, fontSize = 12.sp)
                    Text(text = "• Live GPS trip sharing active with trusted contacts", color = VoltOnSurfaceVariant, fontSize = 12.sp)
                    Text(text = "• Telemetry anomaly and off-route detection enabled", color = VoltOnSurfaceVariant, fontSize = 12.sp)
                    Text(text = "• All drivers background checked and verified via SAPS & PrDP", color = VoltOnSurfaceVariant, fontSize = 12.sp)
                }
            },
            confirmButton = {
                TextButton(onClick = { showSafetyDialog = false }) {
                    Text("Got It", color = IceBlue, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = VoltSurfaceContainerHigh
        )
    }
}

@Composable
private fun QuickActionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    onClick: () -> Unit,
    tint: Color,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainerHigh)
            .clickable(onClick = onClick)
            .padding(vertical = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(CircleShape)
                .background(VoltSurfaceContainer),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = tint,
                modifier = Modifier.size(18.dp)
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = label,
            color = VoltOnSurface,
            fontSize = 11.sp,
            fontWeight = FontWeight.SemiBold
        )
    }
}

@Composable
private fun TrackingMapCanvas(
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "tracking_map_anim")
    val dashPhase by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 60f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 1800, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "dash_phase"
    )

    val carProgress by infiniteTransition.animateFloat(
        initialValue = 0.40f,
        targetValue = 0.60f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 6000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "car_progress"
    )

    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1.0f,
        targetValue = 1.8f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 1400, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "pulse_scale"
    )

    Box(modifier = modifier) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val width = size.width
            val height = size.height

            // 1. Draw subtle tactical street grid lines
            val gridColor = Color(0xFF101B33)
            val streetColor = Color(0xFF152445)

            // Horizontal grid lines
            for (y in 40..height.toInt() step 60) {
                drawLine(
                    color = gridColor,
                    start = Offset(0f, y.toFloat()),
                    end = Offset(width, y.toFloat()),
                    strokeWidth = 1f
                )
            }
            // Vertical grid lines
            for (x in 40..width.toInt() step 70) {
                drawLine(
                    color = gridColor,
                    start = Offset(x.toFloat(), 0f),
                    end = Offset(x.toFloat(), height),
                    strokeWidth = 1f
                )
            }

            // Diagonal major avenue
            drawLine(
                color = streetColor,
                start = Offset(0f, height * 0.2f),
                end = Offset(width, height * 0.7f),
                strokeWidth = 3f
            )
            drawLine(
                color = streetColor,
                start = Offset(width * 0.1f, 0f),
                end = Offset(width * 0.9f, height),
                strokeWidth = 2f
            )

            // 2. Build Bezier Planned Route Curve
            val p0 = Offset(width * 0.16f, height * 0.22f)
            val p1 = Offset(width * 0.45f, height * 0.38f)
            val p2 = Offset(width * 0.62f, height * 0.65f)
            val p3 = Offset(width * 0.82f, height * 0.82f)

            val routePath = Path().apply {
                moveTo(p0.x, p0.y)
                cubicTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
            }

            // Route Base Line (Dark Navy Surface)
            drawPath(
                path = routePath,
                color = Color(0xFF132B60),
                style = Stroke(
                    width = 8.dp.toPx(),
                    cap = StrokeCap.Round,
                    join = StrokeJoin.Round
                )
            )

            // Animated Traveling Polyline
            drawPath(
                path = routePath,
                brush = Brush.linearGradient(
                    colors = listOf(IceBlue, MediumBlue, IceBlueSoft),
                    start = p0,
                    end = p3
                ),
                style = Stroke(
                    width = 4.dp.toPx(),
                    cap = StrokeCap.Round,
                    join = StrokeJoin.Round,
                    pathEffect = PathEffect.dashPathEffect(
                        intervals = floatArrayOf(24f, 16f),
                        phase = dashPhase
                    )
                )
            )

            // 3. User Pickup Point Marker (at p3)
            drawCircle(
                color = IceBlue.copy(alpha = 0.25f),
                radius = 16.dp.toPx() * (pulseScale - 0.2f),
                center = p3
            )
            drawCircle(
                color = Color(0xFF000000),
                radius = 8.dp.toPx(),
                center = p3
            )
            drawCircle(
                color = IceBlue,
                radius = 5.dp.toPx(),
                center = p3
            )

            // 4. Calculate Vehicle Marker Position along Bezier Curve
            val t = carProgress
            val oneMinusT = 1f - t
            val carX = oneMinusT * oneMinusT * oneMinusT * p0.x +
                    3f * oneMinusT * oneMinusT * t * p1.x +
                    3f * oneMinusT * t * t * p2.x +
                    t * t * t * p3.x

            val carY = oneMinusT * oneMinusT * oneMinusT * p0.y +
                    3f * oneMinusT * oneMinusT * t * p1.y +
                    3f * oneMinusT * t * t * p2.y +
                    t * t * t * p3.y

            val carCenter = Offset(carX, carY)

            // Pulsing Ring around Car
            drawCircle(
                color = IceBlue.copy(alpha = 0.30f),
                radius = 22.dp.toPx() * pulseScale,
                center = carCenter
            )

            // Outer Car Ring Puck
            drawCircle(
                color = VoltSurface,
                radius = 18.dp.toPx(),
                center = carCenter
            )
            drawCircle(
                color = VoltPrimaryContainer,
                radius = 14.dp.toPx(),
                center = carCenter
            )
            drawCircle(
                color = IceBlue,
                radius = 4.dp.toPx(),
                center = carCenter
            )
        }

        // Vignette Ambient Gradient Overlays
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            VoltSurface.copy(alpha = 0.75f),
                            Color.Transparent,
                            VoltSurface.copy(alpha = 0.85f)
                        )
                    )
                )
        )
    }
}
