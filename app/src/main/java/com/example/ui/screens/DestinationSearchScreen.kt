package com.example.ui.screens

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
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.BeachAccess
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Flight
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.PinDrop
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Storefront
import androidx.compose.material.icons.filled.Train
import androidx.compose.material.icons.filled.Work
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.IceBlue
import com.example.ui.theme.MediumBlue
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.viewmodel.VoltUiState

data class PlaceSearchResult(
    val id: String,
    val title: String,
    val subtitle: String,
    val distance: String,
    val eta: String,
    val icon: ImageVector,
    val category: String = "Popular"
)

private val SOUTH_AFRICA_PLACES = listOf(
    // Major Airports
    PlaceSearchResult(
        id = "or_tambo",
        title = "O.R. Tambo Int'l Airport (Terminal A)",
        subtitle = "1 Jones Rd, Kempton Park, Johannesburg",
        distance = "24 km",
        eta = "28 min",
        icon = Icons.Filled.Flight,
        category = "Airports"
    ),
    PlaceSearchResult(
        id = "cpt_airport",
        title = "Cape Town International Airport (CPT)",
        subtitle = "Matroosfontein, Cape Town, 7490",
        distance = "21 km",
        eta = "24 min",
        icon = Icons.Filled.Flight,
        category = "Airports"
    ),
    PlaceSearchResult(
        id = "dur_airport",
        title = "King Shaka International Airport (DUR)",
        subtitle = "King Shaka Dr, La Mercy, KwaZulu-Natal",
        distance = "32 km",
        eta = "26 min",
        icon = Icons.Filled.Flight,
        category = "Airports"
    ),

    // Shopping & Commercial Hubs
    PlaceSearchResult(
        id = "sandton_city",
        title = "Sandton City & Nelson Mandela Square",
        subtitle = "83 Rivonia Rd, Sandton, Johannesburg",
        distance = "0.8 km",
        eta = "4 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),
    PlaceSearchResult(
        id = "rosebank_mall",
        title = "Rosebank Mall & The Zone",
        subtitle = "50 Bath Ave, Rosebank, Johannesburg",
        distance = "6.2 km",
        eta = "12 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),
    PlaceSearchResult(
        id = "va_waterfront",
        title = "V&A Waterfront & Victoria Wharf",
        subtitle = "19 Breakwater Blvd, Cape Town",
        distance = "5.8 km",
        eta = "14 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),
    PlaceSearchResult(
        id = "mall_of_africa",
        title = "Mall of Africa",
        subtitle = "Magwa Cres, Waterfall City, Midrand",
        distance = "16.5 km",
        eta = "18 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),
    PlaceSearchResult(
        id = "canal_walk",
        title = "Canal Walk Shopping Centre",
        subtitle = "Century Blvd, Century City, Cape Town",
        distance = "14.2 km",
        eta = "18 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),
    PlaceSearchResult(
        id = "gateway_mall",
        title = "Gateway Theatre of Shopping",
        subtitle = "1 Palm Blvd, Umhlanga Ridge, Durban",
        distance = "18.0 km",
        eta = "16 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    ),

    // Transit Stations
    PlaceSearchResult(
        id = "sandton_gautrain",
        title = "Sandton Gautrain Station",
        subtitle = "West St, Sandhurst, Sandton",
        distance = "1.2 km",
        eta = "5 min",
        icon = Icons.Filled.Train,
        category = "Transit"
    ),
    PlaceSearchResult(
        id = "rosebank_gautrain",
        title = "Rosebank Gautrain Station",
        subtitle = "Oxford Rd, Rosebank, Johannesburg",
        distance = "6.0 km",
        eta = "11 min",
        icon = Icons.Filled.Train,
        category = "Transit"
    ),

    // Landmarks & Coastal Attractions
    PlaceSearchResult(
        id = "camps_bay",
        title = "Camps Bay Beach",
        subtitle = "Victoria Rd Promenade, Camps Bay, Cape Town",
        distance = "8.4 km",
        eta = "15 min",
        icon = Icons.Filled.BeachAccess,
        category = "Landmarks"
    ),
    PlaceSearchResult(
        id = "table_mountain",
        title = "Table Mountain Aerial Cableway",
        subtitle = "Tafelberg Rd, Gardens, Cape Town",
        distance = "7.1 km",
        eta = "16 min",
        icon = Icons.Filled.LocationOn,
        category = "Landmarks"
    ),
    PlaceSearchResult(
        id = "menlyn_maine",
        title = "Menlyn Maine Central Square",
        subtitle = "Amarand Ave, Waterkloof Glen, Pretoria",
        distance = "42 km",
        eta = "38 min",
        icon = Icons.Filled.Storefront,
        category = "Shopping"
    )
)

@Composable
fun DestinationSearchScreen(
    state: VoltUiState,
    onBack: () -> Unit,
    onSelectDestination: (destination: String, pickup: String) -> Unit,
    modifier: Modifier = Modifier
) {
    val focusManager = LocalFocusManager.current
    val destinationFocusRequester = remember { FocusRequester() }

    var pickupText by remember { mutableStateOf(state.pickupLocation) }
    var destinationText by remember { mutableStateOf("") }
    var isEditingPickup by remember { mutableStateOf(false) }

    // Auto-focus the destination search input on first render
    LaunchedEffect(Unit) {
        destinationFocusRequester.requestFocus()
    }

    // Filter results based on search query
    val filteredResults = remember(destinationText) {
        if (destinationText.isBlank()) {
            SOUTH_AFRICA_PLACES
        } else {
            val query = destinationText.trim().lowercase()
            SOUTH_AFRICA_PLACES.filter {
                it.title.lowercase().contains(query) ||
                    it.subtitle.lowercase().contains(query) ||
                    it.category.lowercase().contains(query)
            }
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .statusBarsPadding()
            .navigationBarsPadding()
            .imePadding()
            .testTag("destination_search_screen")
    ) {
        // ==========================================
        // Top Bar Header with Back Button
        // ==========================================
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .testTag("search_screen_back_button")
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = Color.White,
                    modifier = Modifier.size(20.dp)
                )
            }

            Text(
                text = "Plan your ride",
                color = VoltOnSurface,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold
            )

            // Balance spacer
            Spacer(modifier = Modifier.size(38.dp))
        }

        // ==========================================
        // Dual Route Input Card (Pickup & Destination)
        // ==========================================
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 6.dp)
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainerHigh)
                .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Route Visual Connector Track (Dots + Line)
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(top = 14.dp, bottom = 14.dp, end = 12.dp)
                ) {
                    // Origin Green Beacon Dot
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(VoltGreen)
                    )

                    // Connecting vertical track line
                    Box(
                        modifier = Modifier
                            .width(2.dp)
                            .height(46.dp)
                            .background(VoltSurfaceContainerHighest)
                    )

                    // Destination Deep Navy / Ice Blue Pin
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(RoundedCornerShape(2.dp))
                            .background(IceBlue)
                    )
                }

                // Input Fields Column
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // 1. Current Location (Pickup)
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(VoltSurfaceContainer)
                            .clickable { isEditingPickup = !isEditingPickup }
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "CURRENT LOCATION (PICKUP)",
                                color = VoltOnSurfaceVariant,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 0.5.sp
                            )
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = pickupText.ifBlank { "Set pickup location" },
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.SemiBold,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }

                        // Re-center on GPS Current Location
                        IconButton(
                            onClick = {
                                pickupText = "Sandton City (Rivonia Rd Entrance)"
                            },
                            modifier = Modifier.size(28.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.MyLocation,
                                contentDescription = "My location",
                                tint = IceBlue,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    // 2. Destination Search Input ("Where to?")
                    OutlinedTextField(
                        value = destinationText,
                        onValueChange = { destinationText = it },
                        placeholder = {
                            Text(
                                text = "Where to? (e.g. Airport, Camps Bay, Mall)",
                                color = VoltOnSurfaceVariant,
                                fontSize = 14.sp
                            )
                        },
                        leadingIcon = {
                            Icon(
                                imageVector = Icons.Filled.Search,
                                contentDescription = "Search",
                                tint = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        },
                        trailingIcon = {
                            if (destinationText.isNotBlank()) {
                                IconButton(onClick = { destinationText = "" }) {
                                    Icon(
                                        imageVector = Icons.Filled.Clear,
                                        contentDescription = "Clear",
                                        tint = Color.White,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                            }
                        },
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = VoltSurfaceContainer,
                            unfocusedContainerColor = VoltSurfaceContainer,
                            focusedTextColor = VoltOnSurface,
                            unfocusedTextColor = VoltOnSurface,
                            focusedBorderColor = VoltPrimaryContainer,
                            unfocusedBorderColor = VoltSurfaceContainerHighest,
                            cursorColor = VoltPrimaryContainer
                        ),
                        shape = RoundedCornerShape(12.dp),
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                        keyboardActions = KeyboardActions(
                            onSearch = {
                                if (destinationText.isNotBlank()) {
                                    focusManager.clearFocus()
                                    onSelectDestination(destinationText.trim(), pickupText)
                                }
                            }
                        ),
                        modifier = Modifier
                            .fillMaxWidth()
                            .focusRequester(destinationFocusRequester)
                            .testTag("destination_search_input")
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // ==========================================
        // Quick Actions Row (Home / Work / Saved)
        // ==========================================
        if (destinationText.isBlank()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                QuickShortcutPill(
                    icon = Icons.Filled.Home,
                    label = "Home",
                    onClick = {
                        onSelectDestination("Home (Kloof St, Gardens, Cape Town)", pickupText)
                    }
                )
                QuickShortcutPill(
                    icon = Icons.Filled.Work,
                    label = "Work",
                    onClick = {
                        onSelectDestination("Sandton Financial Hub (West St)", pickupText)
                    }
                )
                QuickShortcutPill(
                    icon = Icons.Filled.History,
                    label = "O.R. Tambo",
                    onClick = {
                        onSelectDestination("O.R. Tambo Int'l Airport (Terminal A)", pickupText)
                    }
                )
            }

            Spacer(modifier = Modifier.height(10.dp))
        }

        // ==========================================
        // Categorized Place Results List
        // ==========================================
        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Direct option to use exact typed query
            if (destinationText.isNotBlank()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(VoltPrimaryContainer.copy(alpha = 0.18f))
                            .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.4f), RoundedCornerShape(14.dp))
                            .clickable {
                                onSelectDestination(destinationText.trim(), pickupText)
                            }
                            .padding(14.dp)
                            .testTag("use_typed_destination_btn")
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.PinDrop,
                                    contentDescription = null,
                                    tint = VoltOnPrimaryFixed,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Column {
                                Text(
                                    text = "Use typed destination:",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = destinationText,
                                    color = VoltOnSurface,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }

            // Results Section Title
            item {
                Text(
                    text = if (destinationText.isBlank()) "SUGGESTED DESTINATIONS" else "MATCHING PLACES",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp,
                    modifier = Modifier.padding(vertical = 4.dp)
                )
            }

            // List of matching locations
            items(filteredResults, key = { it.id }) { place ->
                PlaceResultCard(
                    place = place,
                    onClick = {
                        onSelectDestination(place.title, pickupText)
                    }
                )
            }
        }
    }
}

@Composable
private fun QuickShortcutPill(
    icon: ImageVector,
    label: String,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .background(VoltSurfaceContainerHigh)
            .clickable(onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 8.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = Color.White,
                modifier = Modifier.size(15.dp)
            )
            Text(
                text = label,
                color = Color.White,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
private fun PlaceResultCard(
    place: PlaceSearchResult,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .clickable(onClick = onClick)
            .padding(12.dp)
            .testTag("place_item_${place.id}")
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Place Icon Box
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = place.icon,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(20.dp)
                )
            }

            // Place Details
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = place.title,
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = place.subtitle,
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }

            // Distance and ETA Pill
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = place.distance,
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = place.eta,
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }
        }
    }
}
