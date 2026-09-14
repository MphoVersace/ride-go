package com.example.ui.screens

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
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
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Cached
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.DomainAdd
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.LocalTaxi
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.TripHistoryItem
import com.example.ui.theme.IceBlue
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimary
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.ui.theme.VoltSurfaceVariant
import com.example.viewmodel.VoltUiState

private const val DRIVER_MARCUS_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBFxyFub9GqL0mV38n2lHCZnraw-mkm5fHCGrsSx68k-rPtVo5G_a5AjDi-0wf_D36Lnxa3A9v-7alIFwlQY-IYvNlDXNRpQx-3ZXFSAsAX-DDVBwhXa_umaQu_5OwUQ_KwzvEGJACRtCqjL9Tjpq_IkuCdKlqmefA_cEQQZ_6pDrx_u0xOU-oETQfjJoyB7JEasChf5gf-N1dAoR7QZKYuELQr6wH1wkXm-wTU2QpR1aT61EmD-nWn"

@Composable
fun ActivityScreen(
    state: VoltUiState,
    onTabSelected: (String) -> Unit,
    onFilterSelected: (String) -> Unit,
    onReceiptClick: (TripHistoryItem) -> Unit,
    onRebookClick: (String) -> Unit,
    onDismissReceipt: () -> Unit,
    onDownloadStatement: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    val filterScrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .testTag("activity_screen")
    ) {
        // Interactive Header Tabs with smooth sliding indicator
        val activityTabs = listOf("Past Trips", "Upcoming (1)", "Business")
        val activeTabIndex = activityTabs.indexOf(state.activeActivityTab).let { if (it >= 0) it else 0 }
        val animatedTabIndex by animateFloatAsState(
            targetValue = activeTabIndex.toFloat(),
            animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
            label = "activity_tab_slider_anim"
        )

        BoxWithConstraints(
            modifier = Modifier
                .fillMaxWidth()
                .clip(CircleShape)
                .background(VoltSurfaceContainerLow)
                .padding(4.dp)
        ) {
            val tabWidth = maxWidth / 3

            // Sliding Deep Navy Capsule Indicator
            Box(
                modifier = Modifier
                    .offset(x = tabWidth * animatedTabIndex)
                    .width(tabWidth)
                    .height(34.dp)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
                    .border(1.dp, IceBlue.copy(alpha = 0.25f), CircleShape)
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                activityTabs.forEach { tabName ->
                    val isActive = tabName == state.activeActivityTab
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(34.dp)
                            .clip(CircleShape)
                            .clickable { onTabSelected(tabName) },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = tabName,
                            color = if (isActive) VoltOnPrimaryFixed else VoltSecondary,
                            fontSize = 12.sp,
                            fontWeight = if (isActive) FontWeight.Bold else FontWeight.Medium
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Stat Metrics Bento Grid
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Trips Bento
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltSurfaceContainer)
                    .padding(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "TRIPS",
                        color = VoltSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                    Icon(
                        imageVector = Icons.Filled.LocalTaxi,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "28",
                    color = VoltOnSurface,
                    fontSize = 26.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "All-time",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }

            // Saved Bento
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltSurfaceContainer)
                    .padding(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "SAVED",
                        color = VoltPrimaryContainer,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                    Icon(
                        imageVector = Icons.Filled.Bolt,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "R380",
                    color = VoltPrimaryContainer,
                    fontSize = 26.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Ride Pass",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }

            // Rating Bento
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltSurfaceContainer)
                    .padding(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "RATING",
                        color = VoltSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                    Icon(
                        imageVector = Icons.Filled.Star,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "4.98",
                    color = VoltOnSurface,
                    fontSize = 26.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Top Rider",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Active Filter Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(filterScrollState),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .padding(horizontal = 10.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Filled.Tune,
                    contentDescription = null,
                    tint = VoltOnSurface,
                    modifier = Modifier.size(13.dp)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "Filter by",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            listOf("Last 30 Days", "Personal Rides", "Business Rides").forEach { filterText ->
                val isSelected = filterText == state.activeFilter
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(if (isSelected) VoltSurfaceContainerHighest else VoltSurfaceContainer)
                        .clickable { onFilterSelected(filterText) }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = filterText,
                        color = if (isSelected) VoltPrimaryContainer else VoltSecondary,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(18.dp))

        // Section Title: OCTOBER 2024 + Download Statement
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "OCTOBER 2024",
                color = VoltSecondary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )

            Row(
                modifier = Modifier
                    .clickable(onClick = onDownloadStatement)
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Download Statement",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.width(4.dp))
                Icon(
                    imageVector = Icons.Filled.Download,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(14.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Trip 1: Ride Go Comfort
        Trip1Card(
            item = state.trips.getOrNull(0) ?: TripHistoryItem(
                id = "1",
                title = "Ride Go Comfort",
                tierTag = "COMFORT",
                timestamp = "Yesterday • 8:15 PM",
                fareFormatted = "R125.00",
                pickupLocation = "V&A Waterfront (Breakwater Blvd, Cape Town)",
                dropoffLocation = "Camps Bay Promenade (Victoria Rd)",
                driverName = "Marcus",
                driverCar = "Toyota Corolla",
                paymentMethod = "Capitec Pay (•••• 4282)",
                receiptId = "RCPT-98214",
                tripDistanceKm = 8.5
            ),
            onReceiptClick = { onReceiptClick(it) },
            onRebookClick = { onRebookClick("Camps Bay Promenade") }
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Trip 2: Ride Go Black
        Trip2Card(
            item = state.trips.getOrNull(1) ?: TripHistoryItem(
                id = "2",
                title = "Ride Go Black",
                tierTag = "BLACK",
                timestamp = "Oct 12 • 11:30 AM",
                fareFormatted = "R280.00",
                pickupLocation = "Cape Town Int'l Airport (CPT Terminal 2)",
                dropoffLocation = "Century City (Bridgeway Precinct, Cape Town)",
                userRating = 5,
                paymentMethod = "Capitec Pay (•••• 4282)",
                receiptId = "RCPT-97812",
                tripDistanceKm = 21.3
            ),
            onReceiptClick = { onReceiptClick(it) }
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Trip 3: Ride Go Saver
        Trip3Card(
            item = state.trips.getOrNull(2) ?: TripHistoryItem(
                id = "3",
                title = "Ride Go Saver",
                tierTag = "SAVER",
                timestamp = "Oct 9 • 6:45 PM",
                fareFormatted = "R75.00",
                pickupLocation = "Green Point (Somerset Road, Cape Town)",
                dropoffLocation = "Kloof Street (Gardens, Cape Town)",
                paymentMethod = "Bank Card (•••• 4019)",
                receiptId = "RCPT-97103",
                tripDistanceKm = 4.7
            ),
            onRebookClick = { onRebookClick("Kloof Street") }
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Activity Settings Group
        Text(
            text = "ACTIVITY SETTINGS",
            color = VoltSecondary,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.sp
        )

        Spacer(modifier = Modifier.height(8.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
        ) {
            SettingRow(
                icon = Icons.Filled.DomainAdd,
                title = "Add Business Profile",
                subtitle = "Automate expensing to Concur or Expensify",
                onClick = { /* Business profile */ }
            )
            HorizontalDivider(color = VoltSurfaceContainerHigh, thickness = 1.dp, modifier = Modifier.padding(horizontal = 16.dp))
            SettingRow(
                icon = Icons.Filled.AccountBalanceWallet,
                title = "Payment Methods & Wallets",
                subtitle = "Ride Go Cash (R150.00), Apple Pay, Visa",
                onClick = { /* Wallet settings */ }
            )
            HorizontalDivider(color = VoltSurfaceContainerHigh, thickness = 1.dp, modifier = Modifier.padding(horizontal = 16.dp))
            SettingRow(
                icon = Icons.Filled.SupportAgent,
                title = "Help with a Past Trip",
                subtitle = "Find lost items, report route issues",
                onClick = { /* Help */ }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Rider Milestone Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainerLow)
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Filled.Star,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(24.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "12 Completed Trips This Month",
                    color = VoltOnSurface,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "You're on track for Gold Rider status. Enjoy priority pickups and verified local drivers across South Africa.",
                    color = VoltSecondary,
                    fontSize = 11.sp,
                    lineHeight = 16.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))
    }

    // Receipt Detail Modal Dialog
    state.selectedReceipt?.let { receipt ->
        AlertDialog(
            onDismissRequest = onDismissReceipt,
            title = {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Receipt #${receipt.receiptId}",
                        color = VoltOnSurface,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                    Text(
                        text = receipt.fareFormatted,
                        color = VoltPrimaryContainer,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                }
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(text = "Date: ${receipt.timestamp}", color = VoltSecondary, fontSize = 12.sp)
                    Text(text = "Vehicle: ${receipt.title} (${receipt.tierTag})", color = VoltOnSurface, fontSize = 13.sp)
                    receipt.driverName?.let {
                        Text(text = "Driver: $it (${receipt.driverCar})", color = VoltOnSurfaceVariant, fontSize = 12.sp)
                    }
                    HorizontalDivider(color = VoltSurfaceContainerHighest)
                    Text(text = "Pickup: ${receipt.pickupLocation}", color = VoltOnSurface, fontSize = 12.sp)
                    Text(text = "Dropoff: ${receipt.dropoffLocation}", color = VoltOnSurface, fontSize = 12.sp)
                    HorizontalDivider(color = VoltSurfaceContainerHighest)
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Payment:", color = VoltSecondary, fontSize = 12.sp)
                        Text(text = receipt.paymentMethod, color = VoltOnSurface, fontSize = 12.sp)
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Trip Distance:", color = VoltSecondary, fontSize = 12.sp)
                        Text(text = "${receipt.tripDistanceKm} km (Completed)", color = VoltGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = onDismissReceipt) {
                    Text("Close", color = VoltPrimaryContainer, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = VoltSurfaceContainerHigh
        )
    }
}

@Composable
private fun Trip1Card(
    item: TripHistoryItem,
    onReceiptClick: (TripHistoryItem) -> Unit,
    onRebookClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
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
                        imageVector = Icons.Filled.DirectionsCar,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(24.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = item.title,
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = item.tierTag,
                                color = VoltPrimaryContainer,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    Text(
                        text = item.timestamp,
                        color = VoltSecondary,
                        fontSize = 11.sp
                    )
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = item.fareFormatted,
                    color = VoltOnSurface,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Row(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest)
                        .padding(horizontal = 6.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(VoltGreen)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Completed",
                        color = VoltOnSurface,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Route Diagram
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLow)
                .padding(10.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(modifier = Modifier.size(8.dp).clip(CircleShape).background(VoltGreen))
                    Box(modifier = Modifier.width(2.dp).height(24.dp).background(VoltSurfaceVariant))
                    Box(modifier = Modifier.size(8.dp).clip(RoundedCornerShape(1.dp)).background(VoltPrimaryContainer))
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(text = "PICKUP", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.pickupLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "DROPOFF", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.dropoffLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                }
            }
        }

        // Driver Quick Snapshot
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(28.dp)
                        .clip(CircleShape)
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(DRIVER_MARCUS_AVATAR)
                            .crossfade(true)
                            .build(),
                        contentDescription = "Driver Avatar",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Driven by ${item.driverName} (${item.driverCar})",
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp
                )
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Filled.Star,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(15.dp)
                )
                Spacer(modifier = Modifier.width(2.dp))
                Text(
                    text = "5.0",
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Action Pills
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier
                    .weight(1f)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .clickable { onReceiptClick(item) }
                    .padding(vertical = 10.dp),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Filled.ReceiptLong,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "Receipt",
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Row(
                modifier = Modifier
                    .weight(1f)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
                    .clickable(onClick = onRebookClick)
                    .padding(vertical = 10.dp),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Filled.Cached,
                    contentDescription = null,
                    tint = VoltOnPrimaryFixed,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "Rebook Ride",
                    color = VoltOnPrimaryFixed,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@Composable
private fun Trip2Card(
    item: TripHistoryItem,
    onReceiptClick: (TripHistoryItem) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
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
                        imageVector = Icons.Filled.DirectionsCar,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(24.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = item.title,
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = item.tierTag,
                                color = VoltSecondary,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    Text(
                        text = item.timestamp,
                        color = VoltSecondary,
                        fontSize = 11.sp
                    )
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = item.fareFormatted,
                    color = VoltOnSurface,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Row(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest)
                        .padding(horizontal = 6.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(modifier = Modifier.size(6.dp).clip(CircleShape).background(VoltGreen))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = "Completed", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }
            }
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLow)
                .padding(10.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(modifier = Modifier.size(8.dp).clip(CircleShape).background(VoltGreen))
                    Box(modifier = Modifier.width(2.dp).height(24.dp).background(VoltSurfaceVariant))
                    Box(modifier = Modifier.size(8.dp).clip(RoundedCornerShape(1.dp)).background(VoltPrimaryContainer))
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(text = "PICKUP", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.pickupLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "DROPOFF", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.dropoffLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                }
            }
        }

        // Feedback Rating Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(CircleShape)
                .background(VoltSurfaceContainerHigh)
                .padding(horizontal = 12.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "You rated: ", color = VoltSecondary, fontSize = 11.sp)
                repeat(5) {
                    Icon(
                        imageVector = Icons.Filled.Star,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(14.dp)
                    )
                }
            }
            Text(
                text = "View Receipt",
                color = VoltPrimaryContainer,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.clickable { onReceiptClick(item) }
            )
        }
    }
}

@Composable
private fun Trip3Card(
    item: TripHistoryItem,
    onRebookClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
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
                        imageVector = Icons.Filled.LocalTaxi,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(24.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = item.title,
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = item.tierTag,
                                color = VoltPrimaryContainer,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    Text(
                        text = item.timestamp,
                        color = VoltSecondary,
                        fontSize = 11.sp
                    )
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = item.fareFormatted,
                    color = VoltOnSurface,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Row(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest)
                        .padding(horizontal = 6.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(modifier = Modifier.size(6.dp).clip(CircleShape).background(VoltGreen))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = "Completed", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }
            }
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLow)
                .padding(10.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(modifier = Modifier.size(8.dp).clip(CircleShape).background(VoltGreen))
                    Box(modifier = Modifier.width(2.dp).height(24.dp).background(VoltSurfaceVariant))
                    Box(modifier = Modifier.size(8.dp).clip(RoundedCornerShape(1.dp)).background(VoltPrimaryContainer))
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(text = "PICKUP", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.pickupLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = "DROPOFF", color = VoltSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    Text(text = item.dropoffLocation, color = VoltOnSurface, fontSize = 12.sp, maxLines = 1)
                }
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Paid with ${item.paymentMethod}",
                color = VoltSecondary,
                fontSize = 11.sp
            )

            Row(
                modifier = Modifier
                    .clickable(onClick = onRebookClick)
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Rebook",
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.width(2.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(14.dp)
                )
            }
        }
    }
}

@Composable
private fun SettingRow(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(14.dp),
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
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(20.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = title,
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = subtitle,
                    color = VoltSecondary,
                    fontSize = 11.sp
                )
            }
        }

        Icon(
            imageVector = Icons.Filled.ChevronRight,
            contentDescription = null,
            tint = VoltSecondary,
            modifier = Modifier.size(20.dp)
        )
    }
}
