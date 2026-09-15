package com.example.ui.screens.driver

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
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
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.PowerSettingsNew
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.DriverStatus
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
import org.osmdroid.util.GeoPoint

@Composable
fun DriverDashboardScreen(
    state: VoltUiState,
    onToggleOnline: () -> Unit,
    onSimulateOffer: () -> Unit,
    onNavigateToTrip: () -> Unit,
    onNavigateToEarnings: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    val isOnline = state.driverStatus != DriverStatus.OFFLINE

    val driverLocation = remember(state.pickupLocation) {
        val (lat, lon) = RouteRepository.resolveCoordinates(
            state.pickupLocation,
            defaultLat = -26.1076,
            defaultLon = 28.0567
        )
        GeoPoint(lat, lon)
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .statusBarsPadding()
            .testTag("driver_dashboard_screen")
    ) {
        // Top Sticky Driver HUD Bar
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
                        text = "Driver Console",
                        color = VoltOnSurface,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = if (isOnline) "ONLINE • Receiving Trips" else "OFFLINE • Tap Go Online",
                        color = if (isOnline) Color.White else VoltSecondary,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            // Quick Status Pill
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(if (isOnline) VoltPrimaryContainer else VoltSurfaceContainerHigh)
                    .border(1.dp, VoltSurfaceContainerHighest, CircleShape)
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isOnline) "ACTIVE" else "STANDBY",
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                }
            }
        }

        // Scrollable Body
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(scrollState)
        ) {
            // Map Viewport (Shows driver location & nearby zone)
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(280.dp)
                    .background(Color.Black)
            ) {
                OsmMapView(
                    latitude = driverLocation.latitude,
                    longitude = driverLocation.longitude,
                    modifier = Modifier.fillMaxSize(),
                    zoomLevel = 14.0,
                    isDarkMode = true,
                    showUserLocationMarker = true,
                    driverPoint = driverLocation
                )

                // Today's Quick Earnings Float Bar (Over Map)
                Box(
                    modifier = Modifier
                        .align(Alignment.TopCenter)
                        .padding(top = 16.dp)
                        .clip(RoundedCornerShape(24.dp))
                        .background(VoltSurface.copy(alpha = 0.94f))
                        .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(24.dp))
                        .clickable(onClick = onNavigateToEarnings)
                        .padding(horizontal = 16.dp, vertical = 8.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = "Today: R${state.todayDriverEarnings}.00",
                            color = Color.White,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "•",
                            color = VoltSecondary,
                            fontSize = 12.sp
                        )
                        Text(
                            text = "${state.driverCompletedTripsToday} trips",
                            color = VoltSecondary,
                            fontSize = 12.sp
                        )
                        Text(
                            text = "•",
                            color = VoltSecondary,
                            fontSize = 12.sp
                        )
                        Text(
                            text = "${state.driverOnlineHours}h",
                            color = VoltSecondary,
                            fontSize = 12.sp
                        )
                    }
                }
            }

            // Driver Console Controls Section
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                    .background(VoltSurface)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Primary GO ONLINE / GO OFFLINE Action Button
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(if (isOnline) VoltSurfaceContainerLow else VoltPrimaryContainer)
                        .border(1.dp, if (isOnline) Color.White.copy(alpha = 0.4f) else VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                        .clickable(onClick = onToggleOnline)
                        .padding(vertical = 16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.PowerSettingsNew,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = if (isOnline) "GO OFFLINE" else "GO ONLINE TO RECEIVE TRIPS",
                            color = Color.White,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                    }
                }

                // If Online: Quick Simulate Trip Button
                if (isOnline) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(VoltSurfaceContainerHigh)
                            .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(12.dp))
                            .clickable(onClick = onSimulateOffer)
                            .padding(vertical = 12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.Bolt,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "SIMULATE INCOMING RIDE REQUEST",
                                color = Color.White,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                // Performance Bento Grid
                Text(
                    text = "DRIVER PERFORMANCE",
                    color = VoltSecondary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    DriverMetricCard(
                        title = "Acceptance",
                        value = "${state.driverAcceptanceRate}%",
                        subtitle = "Target: 85%+",
                        modifier = Modifier.weight(1f)
                    )
                    DriverMetricCard(
                        title = "Rating",
                        value = "${state.driverRating} ★",
                        subtitle = "Top Rated",
                        modifier = Modifier.weight(1f)
                    )
                    DriverMetricCard(
                        title = "Cancellation",
                        value = "${state.driverCancellationRate}%",
                        subtitle = "Excellent",
                        modifier = Modifier.weight(1f)
                    )
                }

                // High Demand South African Hotspots & Surge
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.TrendingUp,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Surge Demand Hotspots",
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Text(
                            text = "Live Gauteng",
                            color = VoltSecondary,
                            fontSize = 11.sp
                        )
                    }

                    HotspotRow(
                        location = "Sandton City & Gautrain Station",
                        surgeBonus = "+R35 Surge",
                        demand = "High Request Volume"
                    )
                    HotspotRow(
                        location = "O.R. Tambo Int'l Airport (Terminals)",
                        surgeBonus = "+R50 Surge",
                        demand = "International Flight Arrivals"
                    )
                    HotspotRow(
                        location = "Rosebank Oxford Parks Precinct",
                        surgeBonus = "+R25 Surge",
                        demand = "Peak Business Departures"
                    )
                }

                // Active Vehicle Specs
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(VoltSurfaceContainerLow)
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.DirectionsCar,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = state.matchedVehicle,
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "${state.driverLicensePlate} • ${state.driverVehicleColor}",
                                color = VoltSecondary,
                                fontSize = 11.sp
                            )
                        }
                    }

                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(VoltSurfaceContainerHigh)
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = "INSPECTED ✓",
                            color = Color.White,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Spacer(modifier = Modifier.height(64.dp))
            }
        }
    }
}

@Composable
private fun DriverMetricCard(
    title: String,
    value: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(VoltSurfaceContainerLow)
            .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(12.dp))
            .padding(12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = title,
            color = VoltSecondary,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            color = Color.White,
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = subtitle,
            color = VoltSecondary,
            fontSize = 10.sp
        )
    }
}

@Composable
private fun HotspotRow(
    location: String,
    surgeBonus: String,
    demand: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = location,
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
            Text(
                text = demand,
                color = VoltSecondary,
                fontSize = 10.sp
            )
        }

        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(6.dp))
                .background(VoltPrimaryContainer)
                .padding(horizontal = 8.dp, vertical = 4.dp)
        ) {
            Text(
                text = surgeBonus,
                color = Color.White,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
