package com.example.ui.screens.driver

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
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.StarBorder
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.DriverStatus
import com.example.model.DriverTripOffer
import com.example.ui.components.OsmMapView
import com.example.ui.components.RideGoLogo
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.util.RouteRepository
import com.example.viewmodel.VoltUiState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.osmdroid.util.GeoPoint

@Composable
fun DriverActiveTripScreen(
    state: VoltUiState,
    onArrivedAtPickup: () -> Unit,
    onStartTrip: (String) -> Unit,
    onCompleteTrip: () -> Unit,
    onFinishSummary: (Int) -> Unit,
    onCallRider: () -> Unit = {},
    onChatRider: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val offer = state.currentTripOffer ?: DriverTripOffer()
    val scrollState = rememberScrollState()
    var enteredPin by remember { mutableStateOf(offer.securityPin) }
    var passengerRating by remember { mutableIntStateOf(5) }

    val pickupPoint = remember(offer.pickupAddress) {
        val (lat, lon) = RouteRepository.resolveCoordinates(offer.pickupAddress, defaultLat = -26.1076, defaultLon = 28.0567)
        GeoPoint(lat, lon)
    }

    val destinationPoint = remember(offer.destinationAddress) {
        val (lat, lon) = RouteRepository.resolveCoordinates(offer.destinationAddress, defaultLat = -26.1367, defaultLon = 28.2411)
        GeoPoint(lat, lon)
    }

    var routePoints by remember { mutableStateOf(emptyList<GeoPoint>()) }

    LaunchedEffect(state.driverStatus) {
        val pts = withContext(Dispatchers.IO) {
            if (state.driverStatus == DriverStatus.IN_TRANSIT) {
                RouteRepository.fetchRoute(
                    pickupPoint.latitude, pickupPoint.longitude,
                    destinationPoint.latitude, destinationPoint.longitude
                )
            } else {
                RouteRepository.fetchRoute(
                    -26.0550, 28.1033, // Woodmead starting location
                    pickupPoint.latitude, pickupPoint.longitude
                )
            }
        }
        routePoints = pts
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .statusBarsPadding()
            .testTag("driver_active_trip_screen")
    ) {
        // Sticky Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(VoltSurface.copy(alpha = 0.95f))
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RideGoLogo(size = 28.dp)
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = when (state.driverStatus) {
                            DriverStatus.EN_ROUTE_PICKUP -> "Heading to Pickup"
                            DriverStatus.WAITING_AT_PICKUP -> "Arrived at Pickup"
                            DriverStatus.IN_TRANSIT -> "Driving to Destination"
                            DriverStatus.TRIP_SUMMARY -> "Trip Complete"
                            else -> "Active Dispatch"
                        },
                        color = VoltOnSurface,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Trip #${offer.id} • ${offer.tier.title}",
                        color = VoltSecondary,
                        fontSize = 11.sp
                    )
                }
            }

            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Text(
                    text = "R${offer.driverPayout}.00",
                    color = Color.White,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        if (state.driverStatus == DriverStatus.TRIP_SUMMARY) {
            // Full Screen Trip Summary & Passenger Rating
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(scrollState)
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .border(2.dp, Color.White, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Check,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(32.dp)
                    )
                }

                Text(
                    text = "Trip Completed!",
                    color = Color.White,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    text = "You earned R${offer.driverPayout}.00",
                    color = VoltOnSurface,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Black
                )

                Text(
                    text = "Credited directly to your Ride Go Driver Wallet",
                    color = VoltSecondary,
                    fontSize = 12.sp
                )

                // Itemized Driver Statement
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Text(
                        text = "FARE BREAKDOWN",
                        color = VoltSecondary,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )

                    SummaryItemRow(label = "Gross Rider Fare", value = "R150.00")
                    SummaryItemRow(label = "Platform Commission (-15%)", value = "-R22.00")
                    SummaryItemRow(label = "Safety & Insurance", value = "Included")

                    HorizontalDivider(color = VoltSurfaceContainerHighest, thickness = 1.dp)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Net Payout",
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "R${offer.driverPayout}.00",
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Rate Passenger Card
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        text = "Rate Passenger (${offer.riderName})",
                        color = VoltOnSurface,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.SemiBold
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        for (i in 1..5) {
                            val isSelected = i <= passengerRating
                            Box(
                                modifier = Modifier
                                    .size(38.dp)
                                    .clip(CircleShape)
                                    .background(if (isSelected) VoltPrimaryContainer else VoltSurfaceContainerHigh)
                                    .clickable { passengerRating = i },
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = if (isSelected) Icons.Filled.Star else Icons.Outlined.StarBorder,
                                    contentDescription = null,
                                    tint = if (isSelected) Color.White else VoltSecondary,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                    }
                }

                // Ready For Next Ride Action
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltPrimaryContainer)
                        .clickable { onFinishSummary(passengerRating) }
                        .padding(vertical = 16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "READY FOR NEXT RIDE",
                        color = Color.White,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                }

                Spacer(modifier = Modifier.height(32.dp))
            }
        } else {
            // Live Navigation Viewport & Bottom Console
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(scrollState)
            ) {
                // Map
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(300.dp)
                        .background(Color.Black)
                ) {
                    val targetPoint = if (state.driverStatus == DriverStatus.IN_TRANSIT) destinationPoint else pickupPoint

                    OsmMapView(
                        latitude = targetPoint.latitude,
                        longitude = targetPoint.longitude,
                        modifier = Modifier.fillMaxSize(),
                        zoomLevel = 13.5,
                        isDarkMode = true,
                        showUserLocationMarker = true,
                        destinationPoint = targetPoint,
                        routePoints = routePoints,
                        driverPoint = if (state.driverStatus == DriverStatus.IN_TRANSIT) pickupPoint else GeoPoint(-26.0550, 28.1033)
                    )

                    // Navigation HUD Pill
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopCenter)
                            .padding(top = 16.dp)
                            .clip(CircleShape)
                            .background(VoltSurface.copy(alpha = 0.94f))
                            .border(1.dp, VoltSurfaceContainerHighest, CircleShape)
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = when (state.driverStatus) {
                                DriverStatus.EN_ROUTE_PICKUP -> "4 mins to pickup (${offer.pickupDistanceKm} km)"
                                DriverStatus.WAITING_AT_PICKUP -> "Waiting at pickup curb"
                                DriverStatus.IN_TRANSIT -> "${offer.estimatedMinutes} mins to destination (${offer.distanceKm} km)"
                                else -> ""
                            },
                            color = Color.White,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Dispatch Console Controls
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                        .background(VoltSurface)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Rider Details & Communications
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(16.dp))
                            .background(VoltSurfaceContainerLow)
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(44.dp)
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerHigh),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Person,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(22.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = offer.riderName,
                                    color = VoltOnSurface,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "Passenger • ${offer.riderRating} ★",
                                    color = VoltSecondary,
                                    fontSize = 12.sp
                                )
                            }
                        }

                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            IconButton(
                                onClick = onCallRider,
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerHigh)
                            ) {
                                Icon(imageVector = Icons.Filled.Call, contentDescription = "Call", tint = Color.White, modifier = Modifier.size(18.dp))
                            }
                            IconButton(
                                onClick = onChatRider,
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerHigh)
                            ) {
                                Icon(imageVector = Icons.Filled.Chat, contentDescription = "Message", tint = Color.White, modifier = Modifier.size(18.dp))
                            }
                        }
                    }

                    // Route Target Address
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(16.dp))
                            .background(VoltSurfaceContainerLow)
                            .padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Text(
                            text = if (state.driverStatus == DriverStatus.IN_TRANSIT) "DESTINATION ADDRESS" else "PICKUP ADDRESS",
                            color = VoltSecondary,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 1.sp
                        )
                        Text(
                            text = if (state.driverStatus == DriverStatus.IN_TRANSIT) offer.destinationAddress else offer.pickupAddress,
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }

                    // Phase-Specific Primary Action
                    when (state.driverStatus) {
                        DriverStatus.EN_ROUTE_PICKUP -> {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(VoltPrimaryContainer)
                                    .clickable(onClick = onArrivedAtPickup)
                                    .padding(vertical = 16.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "I HAVE ARRIVED AT PICKUP",
                                    color = Color.White,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                            }
                        }

                        DriverStatus.WAITING_AT_PICKUP -> {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(16.dp))
                                    .background(VoltSurfaceContainerLow)
                                    .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                                    .padding(16.dp),
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(imageVector = Icons.Filled.Lock, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = "Ask rider for 4-digit Ride Security PIN",
                                        color = VoltOnSurface,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.SemiBold
                                    )
                                }

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "PIN: ${offer.securityPin}",
                                        color = Color.White,
                                        fontSize = 18.sp,
                                        fontWeight = FontWeight.Bold,
                                        letterSpacing = 2.sp
                                    )

                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(8.dp))
                                            .background(VoltPrimaryContainer)
                                            .clickable { onStartTrip(offer.securityPin) }
                                            .padding(horizontal = 16.dp, vertical = 10.dp)
                                    ) {
                                        Text(
                                            text = "VERIFY & START TRIP",
                                            color = Color.White,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }
                            }
                        }

                        DriverStatus.IN_TRANSIT -> {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(VoltPrimaryContainer)
                                    .clickable(onClick = onCompleteTrip)
                                    .padding(vertical = 16.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "COMPLETE TRIP & COLLECT R${offer.driverPayout}.00",
                                    color = Color.White,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                            }
                        }

                        else -> {}
                    }

                    Spacer(modifier = Modifier.height(64.dp))
                }
            }
        }
    }
}

@Composable
private fun SummaryItemRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = label, color = VoltSecondary, fontSize = 12.sp)
        Text(text = value, color = VoltOnSurface, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
    }
}
