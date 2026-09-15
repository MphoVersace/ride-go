package com.example.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
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
import androidx.compose.material.icons.filled.PinDrop
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Storefront
import androidx.compose.material.icons.filled.Train
import androidx.compose.material.icons.filled.Work
import androidx.compose.material3.CircularProgressIndicator
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.NominatimSuggestion
import com.example.ui.theme.IceBlue
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
import com.example.viewmodel.VoltViewModel

// ---------------------------------------------------------------------------
// Static quick-destination shortcuts (shown when search box is blank)
// ---------------------------------------------------------------------------
private data class QuickDestination(
    val label: String,
    val address: String,
    val icon: ImageVector
)

private val QUICK_DESTINATIONS = listOf(
    QuickDestination("Home", "Home (Kloof St, Gardens, Cape Town)", Icons.Filled.Home),
    QuickDestination("Work", "Sandton Financial Hub (West St)", Icons.Filled.Work),
    QuickDestination("Airport", "O.R. Tambo Int'l Airport (Terminal A)", Icons.Filled.Flight)
)

// Suggested highlights shown below quick-actions when blank
private data class SuggestedPlace(
    val title: String,
    val subtitle: String,
    val icon: ImageVector,
    val address: String
)

private val SUGGESTED_PLACES = listOf(
    SuggestedPlace(
        "O.R. Tambo Int'l Airport",
        "Jones Rd, Kempton Park, Johannesburg",
        Icons.Filled.Flight,
        "O.R. Tambo International Airport, Kempton Park"
    ),
    SuggestedPlace(
        "Sandton City",
        "83 Rivonia Rd, Sandton, Johannesburg",
        Icons.Filled.Storefront,
        "Sandton City, Rivonia Road, Sandton"
    ),
    SuggestedPlace(
        "V&A Waterfront",
        "Breakwater Blvd, Cape Town",
        Icons.Filled.Storefront,
        "V&A Waterfront, Breakwater Boulevard, Cape Town"
    ),
    SuggestedPlace(
        "Sandton Gautrain Station",
        "West St, Sandhurst, Sandton",
        Icons.Filled.Train,
        "Sandton Gautrain Station, West Street, Sandton"
    ),
    SuggestedPlace(
        "Camps Bay Beach",
        "Victoria Rd Promenade, Cape Town",
        Icons.Filled.BeachAccess,
        "Camps Bay Beach, Victoria Road, Cape Town"
    ),
    SuggestedPlace(
        "Mall of Africa",
        "Magwa Cres, Waterfall City, Midrand",
        Icons.Filled.Storefront,
        "Mall of Africa, Waterfall City, Midrand"
    ),
    SuggestedPlace(
        "Table Mountain Cableway",
        "Tafelberg Rd, Gardens, Cape Town",
        Icons.Filled.LocationOn,
        "Table Mountain Aerial Cableway, Cape Town"
    ),
    SuggestedPlace(
        "King Shaka Int'l Airport",
        "King Shaka Dr, La Mercy, KwaZulu-Natal",
        Icons.Filled.Flight,
        "King Shaka International Airport, La Mercy"
    )
)

// ---------------------------------------------------------------------------
// Main Composable
// ---------------------------------------------------------------------------
@Composable
fun DestinationSearchScreen(
    state: VoltUiState,
    viewModel: VoltViewModel,
    onBack: () -> Unit,
    onSelectDestination: (destination: String, pickup: String) -> Unit,
    modifier: Modifier = Modifier
) {
    val focusManager = LocalFocusManager.current
    val destinationFocusRequester = remember { FocusRequester() }

    var pickupText by remember { mutableStateOf(state.pickupLocation) }
    var destinationText by remember { mutableStateOf("") }

    // Auto-focus destination field on first render
    LaunchedEffect(Unit) {
        destinationFocusRequester.requestFocus()
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
        // ========================================================
        // Top Bar
        // ========================================================
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

            Spacer(modifier = Modifier.size(38.dp))
        }

        // ========================================================
        // Dual Route Input Card
        // ========================================================
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
                // Route visual connector (dots + line)
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(top = 14.dp, bottom = 14.dp, end = 12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(VoltGreen)
                    )
                    Box(
                        modifier = Modifier
                            .width(2.dp)
                            .height(46.dp)
                            .background(VoltSurfaceContainerHighest)
                    )
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(RoundedCornerShape(2.dp))
                            .background(IceBlue)
                    )
                }

                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Pickup row
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(VoltSurfaceContainer)
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "PICKUP",
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
                        IconButton(
                            onClick = { pickupText = state.pickupLocation },
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

                    // Destination search field
                    OutlinedTextField(
                        value = destinationText,
                        onValueChange = { query ->
                            destinationText = query
                            viewModel.searchAddresses(query)
                        },
                        placeholder = {
                            Text(
                                text = "Search any address, suburb or place...",
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
                            when {
                                state.isSuggestionsLoading -> {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(18.dp),
                                        color = IceBlue,
                                        strokeWidth = 2.dp
                                    )
                                }
                                destinationText.isNotBlank() -> {
                                    IconButton(onClick = {
                                        destinationText = ""
                                        viewModel.clearAddressSuggestions()
                                    }) {
                                        Icon(
                                            imageVector = Icons.Filled.Clear,
                                            contentDescription = "Clear",
                                            tint = Color.White,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }
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

        // ========================================================
        // Content: Quick Pills + Suggestions OR Live Results
        // ========================================================
        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val isBlankQuery = destinationText.isBlank()
            val hasLiveResults = state.addressSuggestions.isNotEmpty()
            val isLoading = state.isSuggestionsLoading
            val hasNoResults = !isBlankQuery && !isLoading && state.addressSuggestions.isEmpty()

            // ---- Blank query: Quick shortcut pills + suggested places ----
            if (isBlankQuery) {
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        QUICK_DESTINATIONS.forEach { dest ->
                            QuickShortcutPill(
                                icon = dest.icon,
                                label = dest.label,
                                onClick = { onSelectDestination(dest.address, pickupText) }
                            )
                        }
                    }
                }

                item { Spacer(modifier = Modifier.height(8.dp)) }

                item {
                    Text(
                        text = "SUGGESTED DESTINATIONS",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp,
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }

                items(SUGGESTED_PLACES, key = { it.title }) { place ->
                    SuggestedPlaceCard(
                        title = place.title,
                        subtitle = place.subtitle,
                        icon = place.icon,
                        onClick = { onSelectDestination(place.address, pickupText) }
                    )
                }
            } else {
                // ---- Non-blank query: Direct confirm card ----
                item {
                    DirectConfirmCard(
                        query = destinationText,
                        onClick = {
                            focusManager.clearFocus()
                            onSelectDestination(destinationText.trim(), pickupText)
                        }
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                }

                // ---- Section header ----
                item {
                    AnimatedContent(
                        targetState = when {
                            isLoading -> "Searching..."
                            hasLiveResults -> "LIVE RESULTS FROM OPENSTREETMAP"
                            hasNoResults -> "NO RESULTS FOUND"
                            else -> "MATCHING PLACES"
                        },
                        transitionSpec = {
                            fadeIn(tween(200)) togetherWith fadeOut(tween(150))
                        },
                        label = "search_header"
                    ) { label ->
                        Text(
                            text = label,
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp,
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }
                }

                // ---- No results empty state ----
                if (hasNoResults) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 24.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(
                                    imageVector = Icons.Filled.LocationOn,
                                    contentDescription = null,
                                    tint = VoltOnSurfaceVariant,
                                    modifier = Modifier.size(40.dp)
                                )
                                Spacer(modifier = Modifier.height(12.dp))
                                Text(
                                    text = "No places found for",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 14.sp
                                )
                                Text(
                                    text = "\"$destinationText\"",
                                    color = VoltOnSurface,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold,
                                    textAlign = TextAlign.Center
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                    text = "Try a street name, suburb, city or landmark.",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 12.sp,
                                    textAlign = TextAlign.Center
                                )
                            }
                        }
                    }
                }

                // ---- Live Nominatim result cards ----
                if (hasLiveResults) {
                    items(state.addressSuggestions, key = { it.placeId }) { suggestion ->
                        LiveResultCard(
                            suggestion = suggestion,
                            onClick = {
                                focusManager.clearFocus()
                                viewModel.selectSuggestion(suggestion, pickup = pickupText)
                            }
                        )
                    }
                }
            }

            // OSM attribution footer (required by Nominatim usage policy)
            item {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Address data © OpenStreetMap contributors",
                    color = VoltOnSurfaceVariant.copy(alpha = 0.55f),
                    fontSize = 10.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 8.dp)
                )
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Quick shortcut pill
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Static suggested place card (shown when query is blank)
// ---------------------------------------------------------------------------
@Composable
private fun SuggestedPlaceCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .clickable(onClick = onClick)
            .padding(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(20.dp)
                )
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = subtitle,
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
            Icon(
                imageVector = Icons.Filled.History,
                contentDescription = null,
                tint = VoltOnSurfaceVariant,
                modifier = Modifier.size(16.dp)
            )
        }
    }
}

// ---------------------------------------------------------------------------
// Direct confirm card (use exactly what was typed)
// ---------------------------------------------------------------------------
@Composable
private fun DirectConfirmCard(
    query: String,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(VoltPrimaryContainer.copy(alpha = 0.18f))
            .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.4f), RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
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
                    text = "GO TO THIS ADDRESS",
                    color = VoltOnSurfaceVariant,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Text(
                    text = query,
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Live Nominatim result card
// ---------------------------------------------------------------------------
@Composable
private fun LiveResultCard(
    suggestion: NominatimSuggestion,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(VoltSurfaceContainer)
            .clickable(onClick = onClick)
            .padding(12.dp)
            .testTag("live_result_${suggestion.placeId}")
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Pin icon box
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = when (suggestion.type) {
                        "aerodrome", "airport" -> Icons.Filled.Flight
                        "station", "halt", "tram_stop" -> Icons.Filled.Train
                        "beach" -> Icons.Filled.BeachAccess
                        "mall", "supermarket", "shop", "marketplace" -> Icons.Filled.Storefront
                        else -> Icons.Filled.LocationOn
                    },
                    contentDescription = null,
                    tint = IceBlue,
                    modifier = Modifier.size(20.dp)
                )
            }

            // Address details
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = suggestion.shortLabel.ifBlank { suggestion.displayName.take(50) },
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                if (suggestion.subLabel.isNotBlank()) {
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = suggestion.subLabel,
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // OSM verified marker
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(VoltSurfaceContainerHigh)
                    .padding(horizontal = 6.dp, vertical = 3.dp)
            ) {
                Text(
                    text = "OSM",
                    color = IceBlue,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
            }
        }
    }
}
