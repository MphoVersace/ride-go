package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
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
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AccountBalance
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CropFree
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.DocumentScanner
import androidx.compose.material.icons.filled.Done
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.material.icons.filled.Flare
import androidx.compose.material.icons.filled.Groups
import androidx.compose.material.icons.filled.HourglassTop
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.LocalPolice
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.NotificationsActive
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.QrCodeScanner
import androidx.compose.material.icons.filled.Redeem
import androidx.compose.material.icons.filled.RestartAlt
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.material.icons.filled.Videocam
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.WbSunny
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.DriverOnboardingState
import com.example.ui.theme.IceBlue
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimary
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceBright
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow
import com.example.ui.theme.VoltSurfaceContainerLowest

private const val DRIVER_AVATAR_URL =
    "https://lh3.googleusercontent.com/aida/AEtjO1VXAw8bNm11zgxl6J_ZJcmZClK6WZy2m8yCamAD0Pywbo0TpybXWRmifk7uO0LcyjwXFBiHSAa0e3gqQUCeomu0vqokffoEY1hU1gHMzQJAAzxZHPLV8LNTEr3PJvNV4uXwxuihe9E8Jw_pnHG0rNh32Qa-a8qb89oEIULV_a8w87C1_Q_M4WDi1ss9nExL7jS0FGDRiNKujBXUDtFPcTfZMJ74wCT3lghmRsD__3r5PSKcCjYvdz-7mbQmx5hwD8ZxovCmHoW5Ww"

private const val SMART_ID_IMG =
    "https://lh3.googleusercontent.com/aida/AEtjO1VXAw8bNm11zgxl6J_ZJcmZClK6WZy2m8yCamAD0Pywbo0TpybXWRmifk7uO0LcyjwXFBiHSAa0e3gqQUCeomu0vqokffoEY1hU1gHMzQJAAzxZHPLV8LNTEr3PJvNV4uXwxuihe9E8Jw_pnHG0rNh32Qa-a8qb89oEIULV_a8w87C1_Q_M4WDi1ss9nExL7jS0FGDRiNKujBXUDtFPcTfZMJ74wCT3lghmRsD__3r5PSKcCjYvdz-7mbQmx5hwD8ZxovCmHoW5Ww"

private const val CAR_FRONT_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwsJbhyGCmQbiiwadgiHBFmqPVYOtz1NU4zJy-hSnuf9Bt3ZWaOj8lpphRy9kg0bIDi6UdGc-6LAmqxtr82Gg3zDLeaUarqsfrh34My_NGKzKthNSh_y_zdA5rUoOcri1JT2YOAVjqA0xhW-a6Agn1ffh5CHxny-6jdBqLHzpKIfHFQB0Apd9i7kjxU8HvIZ5IvVDbR5mHcg84wAK_R2_s3QBU0c6Yzn_svUCsF9kMEFLgK66bBc9A"

private const val CAR_REAR_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhL3r7RPcx1-iFKjQjD24V4xJe-5KIavdleEqVyJOMGclqkJ3JenLHVJHC32eeEKSqAifwzCsV1Eh4Iya7tQ9CNpauLTAE3TWUIai0Cg68CBM-auyh0a7-FK9xT4i7B9Xhw0zj01yuHVIkc6Uw1aO3qwEYhjGnVFBnxCGFwP4Qj_jMdnASjGCSFynv7a11JtaSV8TBPyc6yrcvIMECIeyIMFUpYSZunSGC_8HzUNo31Q9aazELLQI"

private const val CAR_INTERIOR_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNhBsMlINFOk1-RbCTFP6bczDYxHPc3dWpBf9giEOhFeqamSf6-6hMtnzqDgtpUlxus-G8SlqYvfX-W93LWrMYQ3BsOZMvAWODbWuuWjU5SA7vYV7u5EnXCQqa6OP_8iNYgpdBkKPuPu0Hx0WNqy3c7ZygeGKJAnkypsQYj-Iqi5sQglz-qdwxLyMHSIKBw2mkJb87MoJHlBkIFNCbyTGyasfU3oObEDYEqx6yyOivjHIB79QXCBuc"

private const val ACADEMY_VIDEO_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCFv42qom8-nv8dkp6QL7gi-SeCC0v0FRusXbEyCxuV0eZf5k5MJmUODTdKs1Uyq7_Bphi1NgBbTs0th2tOarF_9oyhAkUI2beP_V4P3-HT41bT0_ZMfck9P8OXjGKuh7U2t08vbOvAPc9Swo4S6wychYOgocCp7pbiEnsWCcrT3O1Ef5XIW6012LCoYt0ZrC8vT4mRojnw3-ZX4EsMu0lXolmg308bTR2e8OPYz9Hi35zVFyFjozLk"

@Composable
fun DriverOnboardingScreen(
    state: DriverOnboardingState,
    onStepSelected: (Int) -> Unit,
    onSwitchToRider: () -> Unit = {},
    onClose: () -> Unit = {},
    onFullNameChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onCitySelected: (String) -> Unit,
    onLicenseCodeSelected: (String) -> Unit,
    onLicenseSerialChange: (String) -> Unit,
    onPrdpCategorySelected: (String) -> Unit,
    onPrdpExpiryChange: (String) -> Unit,
    onReferralCodeChange: (String) -> Unit,
    onTermsToggle: (Boolean) -> Unit,
    onSapsConsentToggle: () -> Unit,
    onScanBackId: () -> Unit,
    onUploadPrdp: () -> Unit,
    onTriggerBiometrics: () -> Unit,
    onUploadDekra: () -> Unit,
    onSubmitVehicleReview: () -> Unit,
    onTogglePushNotifications: () -> Unit,
    onSupportClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .testTag("driver_onboarding_screen")
    ) {
        // Step Tracker Interactive Header (matches Rider progress bar)
        DriverProgressHeader(
            currentStep = state.currentStep,
            onStepSelected = onStepSelected
        )

        Spacer(modifier = Modifier.height(14.dp))

        // Step Content Switcher
        when (state.currentStep) {
            1 -> DriverStep1Credentials(
                state = state,
                onSwitchToRider = onSwitchToRider,
                onFullNameChange = onFullNameChange,
                onPhoneChange = onPhoneChange,
                onCitySelected = onCitySelected,
                onLicenseCodeSelected = onLicenseCodeSelected,
                onLicenseSerialChange = onLicenseSerialChange,
                onPrdpCategorySelected = onPrdpCategorySelected,
                onPrdpExpiryChange = onPrdpExpiryChange,
                onReferralCodeChange = onReferralCodeChange,
                onTermsToggle = onTermsToggle,
                onContinue = { onStepSelected(2) }
            )

            2 -> DriverStep2DocCapture(
                state = state,
                onScanBackId = onScanBackId,
                onUploadPrdp = onUploadPrdp,
                onSapsConsentToggle = onSapsConsentToggle,
                onContinue = { onStepSelected(3) },
                onRetake = { onStepSelected(1) }
            )

            3 -> DriverStep3Biometrics(
                state = state,
                onTriggerBiometrics = onTriggerBiometrics,
                onContinue = { onStepSelected(4) }
            )

            4 -> DriverStep4Vehicle(
                state = state,
                onUploadDekra = onUploadDekra,
                onSubmit = onSubmitVehicleReview
            )

            5 -> DriverStep5Review(
                state = state,
                onTogglePush = onTogglePushNotifications,
                onSupportClick = onSupportClick,
                onClose = onClose
            )
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

// Progress Header Component (identically styled to RiderProgressHeader)
@Composable
private fun DriverProgressHeader(
    currentStep: Int,
    onStepSelected: (Int) -> Unit
) {
    val progressPercent = when (currentStep) {
        1 -> 20
        2 -> 40
        3 -> 60
        4 -> 80
        else -> 100
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 4.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "STEP 0$currentStep / 05",
                color = VoltPrimaryContainer,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Filled.VerifiedUser,
                    contentDescription = null,
                    tint = if (currentStep == 5) VoltGreen else VoltPrimaryContainer,
                    modifier = Modifier.size(13.dp)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "$progressPercent% COMPLETED",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        // Progress bar line
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(CircleShape)
                .background(VoltSurfaceContainerHigh)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth(progressPercent / 100f)
                    .height(6.dp)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
            )
        }
    }
}

// -------------------------------------------------------------
// STEP 1: Driver 1/5 - Sign Up & Credentials
// -------------------------------------------------------------
@Composable
fun DriverStep1Credentials(
    state: DriverOnboardingState,
    onSwitchToRider: () -> Unit = {},
    onFullNameChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onCitySelected: (String) -> Unit,
    onLicenseCodeSelected: (String) -> Unit,
    onLicenseSerialChange: (String) -> Unit,
    onPrdpCategorySelected: (String) -> Unit,
    onPrdpExpiryChange: (String) -> Unit,
    onReferralCodeChange: (String) -> Unit,
    onTermsToggle: (Boolean) -> Unit,
    onContinue: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Role Selector Segmented Pill (Switch to Rider Sign-Up vs Driver)
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(CircleShape)
                    .background(VoltSurfaceContainer)
                    .padding(4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Rider button (Clickable -> Switches to Rider Sign-up)
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .clickable(onClick = onSwitchToRider)
                        .padding(vertical = 9.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.Person,
                            contentDescription = null,
                            tint = VoltOnSurfaceVariant,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Rider (Passenger)",
                            color = VoltOnSurfaceVariant,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }

                // Driver button (Active)
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .padding(vertical = 9.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.DirectionsCar,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Driver Partner",
                            color = VoltOnPrimaryFixed,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(4.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Drive with Ride",
                    color = VoltOnSurface,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Go",
                    color = VoltPrimaryContainer,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Earn on your schedule across South Africa with instant payouts and partner perks.",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp,
                lineHeight = 18.sp
            )

        // Hero Earnings Accent Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(18.dp))
                .background(VoltSurfaceContainerLow)
                .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.25f), RoundedCornerShape(18.dp))
                .padding(14.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(46.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Bolt,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(26.dp)
                    )
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = "R14,500+ Avg. Weekly Earnings",
                        color = VoltOnSurface,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Top urban drivers in Gauteng & Western Cape",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp
                    )
                }
            }
        }

        // Full Legal Name
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Full Legal Name",
                    color = VoltOnSurface,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Matches SA Smart ID / Book",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }
            OutlinedTextField(
                value = state.fullName,
                onValueChange = onFullNameChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("driver_name_input"),
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = VoltSurfaceContainer,
                    unfocusedContainerColor = VoltSurfaceContainer,
                    focusedBorderColor = VoltPrimaryContainer,
                    unfocusedBorderColor = VoltSurfaceContainerHigh,
                    focusedTextColor = VoltOnSurface,
                    unfocusedTextColor = VoltOnSurface
                ),
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Filled.Person,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant
                    )
                },
                singleLine = true
            )
        }

        // Phone Number (+27 SA)
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "South African Mobile Number",
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .height(56.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                        .padding(horizontal = 12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "+27",
                        color = VoltOnSurface,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                OutlinedTextField(
                    value = state.phoneNumber,
                    onValueChange = onPhoneChange,
                    modifier = Modifier
                        .weight(1f)
                        .testTag("driver_phone_input"),
                    shape = RoundedCornerShape(12.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = VoltSurfaceContainer,
                        unfocusedContainerColor = VoltSurfaceContainer,
                        focusedBorderColor = VoltPrimaryContainer,
                        unfocusedBorderColor = VoltSurfaceContainerHigh,
                        focusedTextColor = VoltOnSurface,
                        unfocusedTextColor = VoltOnSurface
                    ),
                    singleLine = true
                )
            }
        }

        // Primary Operating Metro (4 cities)
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(
                text = "Primary Operating Metro",
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
            val cities = listOf(
                "cpt" to "Cape Town",
                "jhb" to "Johannesburg",
                "dbn" to "Durban",
                "pta" to "Pretoria"
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                cities.take(2).forEach { (id, name) ->
                    val selected = state.selectedCity == id
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (selected) VoltPrimaryContainer else VoltSurfaceContainer)
                            .clickable { onCitySelected(id) }
                            .padding(horizontal = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.LocationOn,
                                    contentDescription = null,
                                    tint = if (selected) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = name,
                                    color = if (selected) VoltOnPrimaryFixed else VoltOnSurface,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                            if (selected) {
                                Icon(
                                    imageVector = Icons.Filled.CheckCircle,
                                    contentDescription = null,
                                    tint = VoltOnPrimaryFixed,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                    }
                }
            }
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                cities.drop(2).forEach { (id, name) ->
                    val selected = state.selectedCity == id
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (selected) VoltPrimaryContainer else VoltSurfaceContainer)
                            .clickable { onCitySelected(id) }
                            .padding(horizontal = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.LocationOn,
                                    contentDescription = null,
                                    tint = if (selected) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = name,
                                    color = if (selected) VoltOnPrimaryFixed else VoltOnSurface,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                            if (selected) {
                                Icon(
                                    imageVector = Icons.Filled.CheckCircle,
                                    contentDescription = null,
                                    tint = VoltOnPrimaryFixed,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        // Driver License Number & Code
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Driver License Number & Vehicle Code",
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .height(56.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                        .padding(horizontal = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Code 08 (EB)",
                        color = VoltPrimaryContainer,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                OutlinedTextField(
                    value = state.licenseSerial,
                    onValueChange = onLicenseSerialChange,
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = VoltSurfaceContainer,
                        unfocusedContainerColor = VoltSurfaceContainer,
                        focusedBorderColor = VoltPrimaryContainer,
                        unfocusedBorderColor = VoltSurfaceContainerHigh,
                        focusedTextColor = VoltOnSurface,
                        unfocusedTextColor = VoltOnSurface
                    ),
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Filled.Badge,
                            contentDescription = null,
                            tint = VoltOnSurfaceVariant
                        )
                    },
                    singleLine = true
                )
            }
        }

        // PrDP Professional Permit Category & Expiry
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainerLow)
                .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.VerifiedUser,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "PrDP Category",
                            color = VoltOnSurface,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "Mandatory",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Segmented Toggle
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                        .padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    val isPax = state.prdpCategory == "passengers"
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(40.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(if (isPax) VoltPrimaryContainer else Color.Transparent)
                            .clickable { onPrdpCategorySelected("passengers") },
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.Groups,
                                contentDescription = null,
                                tint = if (isPax) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Passengers (P)",
                                color = if (isPax) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(40.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(if (!isPax) VoltPrimaryContainer else Color.Transparent)
                            .clickable { onPrdpCategorySelected("goods") },
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.Inventory2,
                                contentDescription = null,
                                tint = if (!isPax) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Goods (G)",
                                color = if (!isPax) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                // Expiry Date
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(
                        text = "Permit Expiration Date",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp
                    )
                    OutlinedTextField(
                        value = state.prdpExpiry,
                        onValueChange = onPrdpExpiryChange,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = VoltSurfaceContainer,
                            unfocusedContainerColor = VoltSurfaceContainer,
                            focusedBorderColor = VoltPrimaryContainer,
                            unfocusedBorderColor = VoltSurfaceContainerHigh,
                            focusedTextColor = VoltOnSurface,
                            unfocusedTextColor = VoltOnSurface
                        ),
                        leadingIcon = {
                            Icon(
                                imageVector = Icons.Filled.CalendarToday,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant
                            )
                        },
                        singleLine = true
                    )
                }
            }
        }

        // Referral Code
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Referral Code",
                    color = VoltOnSurface,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Earn R500 Starter Bonus",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            OutlinedTextField(
                value = state.referralCode,
                onValueChange = onReferralCodeChange,
                placeholder = { Text("e.g. THABO24RIDE", color = VoltOnSurfaceVariant) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = VoltSurfaceContainer,
                    unfocusedContainerColor = VoltSurfaceContainer,
                    focusedBorderColor = VoltPrimaryContainer,
                    unfocusedBorderColor = VoltSurfaceContainerHigh,
                    focusedTextColor = VoltOnSurface,
                    unfocusedTextColor = VoltOnSurface
                ),
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Filled.Redeem,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant
                    )
                },
                singleLine = true
            )
        }

        // Consent Checkbox
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLow)
                .clickable { onTermsToggle(!state.termsAccepted) }
                .padding(12.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(22.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (state.termsAccepted) VoltPrimaryContainer else VoltSurfaceContainerHighest),
                    contentAlignment = Alignment.Center
                ) {
                    if (state.termsAccepted) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "I consent to automated criminal record verification via SAPS database and agree to Ride Go Driver Terms of Service.",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    lineHeight = 16.sp
                )
            }
        }

        // Continue CTA Button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .clip(CircleShape)
                .background(VoltPrimaryContainer)
                .clickable { onContinue() }
                .testTag("driver_step1_continue_btn"),
            contentAlignment = Alignment.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "CONTINUE TO IDENTITY CHECK",
                    color = VoltOnPrimaryFixed,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = VoltOnPrimaryFixed,
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}

// -------------------------------------------------------------
// STEP 2: Driver 2/5 - ID & PrDP Document Capture
// -------------------------------------------------------------
@Composable
fun DriverStep2DocCapture(
    state: DriverOnboardingState,
    onScanBackId: () -> Unit,
    onUploadPrdp: () -> Unit,
    onSapsConsentToggle: () -> Unit,
    onContinue: () -> Unit,
    onRetake: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Step Title
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Upload Identity Documents",
                color = VoltOnSurface,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "South African Smart ID Card & PrDP License",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp
            )
        }

        // SA Smart ID Card Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(18.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Badge,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "SA Smart ID Card",
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Republic of South Africa",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "Required",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Front ID item verified
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainerHigh)
                        .padding(10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(width = 54.dp, height = 38.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(VoltSurfaceContainerHighest)
                            ) {
                                AsyncImage(
                                    model = ImageRequest.Builder(LocalContext.current)
                                        .data(SMART_ID_IMG)
                                        .crossfade(true)
                                        .build(),
                                    contentDescription = "Smart ID Front",
                                    contentScale = ContentScale.Crop,
                                    modifier = Modifier.fillMaxSize()
                                )
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = "Smart_ID_Front.jpg",
                                    color = VoltOnSurface,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Filled.CheckCircle,
                                        contentDescription = null,
                                        tint = VoltGreen,
                                        modifier = Modifier.size(13.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "Verified • 1.4 MB",
                                        color = VoltGreen,
                                        fontSize = 11.sp
                                    )
                                }
                            }
                        }
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Visibility,
                                contentDescription = null,
                                tint = VoltOnSurface,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                }

                // Card Back Barcode Trigger
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainerLow)
                        .clickable { onScanBackId() }
                        .padding(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(38.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer.copy(alpha = 0.15f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.QrCodeScanner,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = if (state.idBackScanned) "Card Back (PDF417 Verified)" else "Card Back (Barcode)",
                                    color = if (state.idBackScanned) VoltGreen else VoltOnSurface,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = if (state.idBackScanned) "Optical barcode match valid" else "Tap to capture back PDF417 barcode",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp
                                )
                            }
                        }
                        Icon(
                            imageVector = if (state.idBackScanned) Icons.Filled.CheckCircle else Icons.Filled.AddAPhoto,
                            contentDescription = null,
                            tint = if (state.idBackScanned) VoltGreen else VoltPrimaryContainer,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }
        }

        // PrDP License Card Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(18.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.DirectionsCar,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "PrDP License Card",
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Professional Driving Permit",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = if (state.prdpUploaded) "Uploaded ✓" else "Pending Upload",
                            color = if (state.prdpUploaded) VoltGreen else VoltOnSurfaceVariant,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Dropzone Slot
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(14.dp))
                        .background(VoltSurfaceContainerLow)
                        .border(
                            1.dp,
                            if (state.prdpUploaded) VoltGreen else VoltPrimaryContainer.copy(alpha = 0.3f),
                            RoundedCornerShape(14.dp)
                        )
                        .clickable { onUploadPrdp() }
                        .padding(20.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(50.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = if (state.prdpUploaded) Icons.Filled.Done else Icons.Filled.DocumentScanner,
                                contentDescription = null,
                                tint = if (state.prdpUploaded) VoltGreen else VoltPrimaryContainer,
                                modifier = Modifier.size(26.dp)
                            )
                        }
                        Text(
                            text = if (state.prdpUploaded) "PrDP Card Captured Successfully" else "Scan Front of PrDP Card",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Ensure all 4 corners are visible without surface flash glare",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerHigh)
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Filled.CropFree,
                                        contentDescription = null,
                                        tint = VoltPrimaryContainer,
                                        modifier = Modifier.size(12.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("4 Corners", color = VoltOnSurface, fontSize = 10.sp)
                                }
                            }
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerHigh)
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Filled.WbSunny,
                                        contentDescription = null,
                                        tint = VoltPrimaryContainer,
                                        modifier = Modifier.size(12.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Daylight", color = VoltOnSurface, fontSize = 10.sp)
                                }
                            }
                        }
                    }
                }
            }
        }

        // Criminal Record Consent Toggle Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    modifier = Modifier.weight(1f),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Security,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Criminal Record Background Check",
                            color = VoltOnSurface,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Automated SAPS / Afiswitch biometric screening authorization consent",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            lineHeight = 15.sp
                        )
                    }
                }
                Spacer(modifier = Modifier.width(8.dp))
                Switch(
                    checked = state.sapsConsent,
                    onCheckedChange = { onSapsConsentToggle() },
                    colors = SwitchDefaults.colors(
                        checkedThumbColor = VoltOnPrimary,
                        checkedTrackColor = VoltPrimaryContainer,
                        uncheckedThumbColor = VoltOnSurfaceVariant,
                        uncheckedTrackColor = VoltSurfaceContainerHighest
                    )
                )
            }
        }

        // Fast Verification Tips
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainerLow)
                .padding(12.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Lightbulb,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "FAST VERIFICATION TIPS",
                        color = VoltPrimaryContainer,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(10.dp))
                            .background(VoltSurfaceContainer)
                            .padding(8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                imageVector = Icons.Filled.Flare,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                            Text("No Glare", color = VoltOnSurface, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Text("Disable flash", color = VoltOnSurfaceVariant, fontSize = 9.sp)
                        }
                    }
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(10.dp))
                            .background(VoltSurfaceContainer)
                            .padding(8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                imageVector = Icons.Filled.WbSunny,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                            Text("Good Light", color = VoltOnSurface, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Text("Shadow-free", color = VoltOnSurfaceVariant, fontSize = 9.sp)
                        }
                    }
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(10.dp))
                            .background(VoltSurfaceContainer)
                            .padding(8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                imageVector = Icons.Filled.CalendarToday,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                            Text("Valid Date", color = VoltOnSurface, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Text("Not expired", color = VoltOnSurfaceVariant, fontSize = 9.sp)
                        }
                    }
                }
            }
        }

        // Action CTAs
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
                    .clickable { onContinue() }
                    .testTag("driver_step2_continue_btn"),
                contentAlignment = Alignment.Center
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = "CONTINUE TO FACIAL VERIFICATION",
                        color = VoltOnPrimaryFixed,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = null,
                        tint = VoltOnPrimaryFixed,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .clickable { onRetake() },
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.RestartAlt,
                        contentDescription = null,
                        tint = VoltOnSurface,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Retake Front ID",
                        color = VoltOnSurface,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------
// STEP 3: Driver 3/5 - Biometric Facial Liveness
// -------------------------------------------------------------
@Composable
fun DriverStep3Biometrics(
    state: DriverOnboardingState,
    onTriggerBiometrics: () -> Unit,
    onContinue: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "laser_sweep")
    val laserY by infiniteTransition.animateFloat(
        initialValue = 0.15f,
        targetValue = 0.85f,
        animationSpec = infiniteRepeatable(
            animation = tween(2200, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "laser_pos"
    )

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Step Title
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Driver Biometric Check",
                color = VoltOnSurface,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Real-time 3D facial liveness match against your official driver credential.",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp
            )
        }

        // Active Liveness Pill
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .padding(horizontal = 14.dp, vertical = 5.dp)
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
                        text = "AI Liveness Active",
                        color = VoltPrimaryContainer,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = " • ISO/IEC 30107-3",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp
                    )
                }
            }
        }

        // Circular Biometric Scanning Viewport
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(260.dp),
            contentAlignment = Alignment.Center
        ) {
            // Outer circular guide track
            Canvas(modifier = Modifier.size(240.dp)) {
                val strokeW = 3.dp.toPx()
                drawCircle(
                    color = Color(0xFF343537),
                    style = Stroke(width = strokeW)
                )
                // Progress arc
                drawArc(
                    color = IceBlue,
                    startAngle = -90f,
                    sweepAngle = if (state.biometricsVerified) 360f else 220f,
                    useCenter = false,
                    style = Stroke(width = strokeW, cap = StrokeCap.Round)
                )
            }

            // Inner dark aperture with face reticle
            Box(
                modifier = Modifier
                    .size(210.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerLowest),
                contentAlignment = Alignment.Center
            ) {
                // Stylized Head Silhouette Outline
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val w = size.width
                    val h = size.height
                    // Head ellipse
                    drawCircle(
                        color = Color(0xFF44474F).copy(alpha = 0.35f),
                        radius = w * 0.28f,
                        center = Offset(w * 0.5f, h * 0.42f)
                    )
                    // Shoulders arc
                    drawArc(
                        color = Color(0xFF44474F).copy(alpha = 0.35f),
                        startAngle = 0f,
                        sweepAngle = 180f,
                        useCenter = true,
                        topLeft = Offset(w * 0.15f, h * 0.65f),
                        size = androidx.compose.ui.geometry.Size(w * 0.70f, h * 0.60f)
                    )
                    // Target crosshairs
                    val dashEffect = PathEffect.dashPathEffect(floatArrayOf(12f, 16f), 0f)
                    drawCircle(
                        color = IceBlue.copy(alpha = 0.35f),
                        radius = w * 0.44f,
                        style = Stroke(width = 1.5f, pathEffect = dashEffect)
                    )
                }

                // Animated Sweeping Laser Beam
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(2.dp)
                        .offset(y = (210.dp * (laserY - 0.5f)))
                        .background(
                            Brush.horizontalGradient(
                                listOf(
                                    Color.Transparent,
                                    IceBlue,
                                    Color.White,
                                    IceBlue,
                                    Color.Transparent
                                )
                            )
                        )
                )

                // REC pill
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(top = 16.dp, end = 16.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainer.copy(alpha = 0.8f))
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.Videocam,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(12.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("REC", color = VoltPrimaryContainer, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }

                // 3D Depth Ready Pill
                Box(
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(bottom = 12.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest.copy(alpha = 0.9f))
                        .padding(horizontal = 10.dp, vertical = 3.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.Face,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(13.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("3D Depth Ready", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Liveness Checklist Card (Check 2 of 3)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "LIVENESS CHECK 2 OF 3",
                        color = VoltOnSurfaceVariant,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.CheckCircle,
                            contentDescription = null,
                            tint = VoltGreen,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "Blinked ✓",
                            color = VoltPrimaryContainer,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Current Directive Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainerHigh)
                        .padding(12.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = "Turn head to right",
                                color = VoltOnSurface,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Hold natural gaze while pivoting",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }
                }

                // 3 Mini-Steps
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    // Step 1: Blink (Done)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(VoltSurfaceContainerLow)
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("1. Blink", color = VoltOnSurfaceVariant, fontSize = 10.sp)
                            Icon(
                                imageVector = Icons.Filled.Done,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }

                    // Step 2: Turn Right (Active)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(VoltSurfaceContainerHighest)
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("2. Turn Right", color = VoltPrimaryContainer, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                            Icon(
                                imageVector = Icons.Filled.Sync,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }

                    // Step 3: Smile (Locked)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(VoltSurfaceContainerLow.copy(alpha = 0.4f))
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("3. Smile", color = VoltOnSurfaceVariant.copy(alpha = 0.5f), fontSize = 10.sp)
                            Icon(
                                imageVector = Icons.Filled.Lock,
                                contentDescription = null,
                                tint = VoltOnSurfaceVariant.copy(alpha = 0.5f),
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }
                }
            }
        }

        // Lighting & Position Status Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLow)
                .padding(vertical = 8.dp, horizontal = 14.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text("Lighting: Optimal", color = VoltOnSurface, fontSize = 11.sp)
            }
            Text("|", color = VoltSurfaceContainerHighest, fontSize = 12.sp)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text("Position: Centered", color = VoltOnSurface, fontSize = 11.sp)
            }
        }

        // Security Notice
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerHighest.copy(alpha = 0.5f))
                .padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Filled.VerifiedUser,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Your biometric data is encrypted end-to-end and used exclusively for driver identity authentication and rider safety compliance.",
                color = VoltOnSurfaceVariant,
                fontSize = 10.sp,
                lineHeight = 14.sp
            )
        }

        // Action CTA
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .clip(CircleShape)
                .background(if (state.biometricsVerified) VoltSurfaceBright else VoltPrimaryContainer)
                .clickable {
                    if (state.biometricsVerified) {
                        onContinue()
                    } else {
                        onTriggerBiometrics()
                    }
                }
                .testTag("driver_step3_scan_btn"),
            contentAlignment = Alignment.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                if (state.isScanningBiometrics) {
                    CircularProgressIndicator(
                        color = VoltOnPrimaryFixed,
                        modifier = Modifier.size(20.dp),
                        strokeWidth = 2.dp
                    )
                    Text(
                        text = "Verifying Biometrics...",
                        color = VoltOnPrimaryFixed,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                } else if (state.biometricsVerified) {
                    Icon(
                        imageVector = Icons.Filled.CheckCircle,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(20.dp)
                    )
                    Text(
                        text = "Liveness Confirmed ✓ Continue to Step 4",
                        color = VoltPrimaryContainer,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                } else {
                    Icon(
                        imageVector = Icons.Filled.Fingerprint,
                        contentDescription = null,
                        tint = VoltOnPrimaryFixed,
                        modifier = Modifier.size(20.dp)
                    )
                    Text(
                        text = "Confirm & Proceed Scan",
                        color = VoltOnPrimaryFixed,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------
// STEP 4: Driver 4/5 - Vehicle & Disc Inspection
// -------------------------------------------------------------
@Composable
fun DriverStep4Vehicle(
    state: DriverOnboardingState,
    onUploadDekra: () -> Unit,
    onSubmit: () -> Unit
) {
    var isScanningDisc by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Step Title
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Register Your Vehicle",
                color = VoltOnSurface,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Add car details and scan your South African license disc",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp
            )
        }

        // Section 1: License Disc Scanner & Extracted Metadata
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(18.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.DocumentScanner,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "SA License Disc Scan",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh)
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    ) {
                        Text(
                            text = "Auto-Verified",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Scanner Simulation Graphic
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(140.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainerLowest),
                    contentAlignment = Alignment.Center
                ) {
                    // Circular Disc Hologram
                    Box(
                        modifier = Modifier
                            .size(108.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHigh.copy(alpha = 0.7f))
                            .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.35f), CircleShape)
                            .padding(6.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.LocalPolice,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = "RSA MVL DISC",
                                color = VoltOnSurface,
                                fontSize = 8.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "CA 812-490",
                                color = VoltPrimaryContainer,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "EXP: 31/12/2025",
                                color = VoltOnSurfaceVariant,
                                fontSize = 7.sp
                            )
                        }
                    }

                    // Re-scan Button Overlay
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomEnd)
                            .padding(8.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest.copy(alpha = 0.9f))
                            .clickable { isScanningDisc = !isScanningDisc }
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.Sync,
                                contentDescription = null,
                                tint = VoltOnSurface,
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Re-scan", color = VoltOnSurface, fontSize = 10.sp)
                        }
                    }
                }

                // Extracted Metadata Card
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainerLow)
                        .padding(12.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = "Toyota Corolla Quest",
                                    color = VoltOnSurface,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "2022 Sedan • Glacier White",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp
                                )
                            }
                            Box(
                                modifier = Modifier
                                    .size(28.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer.copy(alpha = 0.15f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Verified,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(VoltSurfaceContainer)
                                    .padding(8.dp)
                            ) {
                                Column {
                                    Text("REGISTRATION", color = VoltOnSurfaceVariant, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                                    Text("CA 812-490", color = VoltOnSurface, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(VoltSurfaceContainer)
                                    .padding(8.dp)
                            ) {
                                Column {
                                    Text("DISC EXPIRY", color = VoltOnSurfaceVariant, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                                    Text("31 / 12 / 2025", color = VoltPrimaryContainer, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        }

                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(VoltSurfaceContainer)
                                .padding(8.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("VIN NUMBER", color = VoltOnSurfaceVariant, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                                Text("AHT512K00...5910", color = VoltOnSurface, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }
                }
            }
        }

        // Section 2: Tier Qualification Pill Box
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.AutoAwesome,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Tier Qualification",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Go Comfort & Go Saver",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer.copy(alpha = 0.2f))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "Approved",
                        color = VoltPrimaryContainer,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Section 3: 4-Point Vehicle Condition Photos
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "Vehicle Inspection",
                        color = VoltOnSurface,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (state.dekraUploaded) "(4/4 Ready)" else "(3/4 Ready)",
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp
                    )
                }
                Text(
                    text = "DEKRA Partnered",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // 2x2 Photos Grid
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Photo 1: Exterior Front
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(115.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(CAR_FRONT_IMG)
                            .crossfade(true)
                            .build(),
                        contentDescription = "Exterior Front",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(6.dp)
                            .size(20.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth()
                            .background(VoltSurfaceContainerHigh.copy(alpha = 0.9f))
                            .padding(vertical = 4.dp, horizontal = 6.dp)
                    ) {
                        Text("Exterior Front ✓", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }

                // Photo 2: Rear & Plate
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(115.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(CAR_REAR_IMG)
                            .crossfade(true)
                            .build(),
                        contentDescription = "Rear & Plate",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(6.dp)
                            .size(20.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth()
                            .background(VoltSurfaceContainerHigh.copy(alpha = 0.9f))
                            .padding(vertical = 4.dp, horizontal = 6.dp)
                    ) {
                        Text("Rear & Plate ✓", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Photo 3: Interior Seats
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(115.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(VoltSurfaceContainer)
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(CAR_INTERIOR_IMG)
                            .crossfade(true)
                            .build(),
                        contentDescription = "Interior Seats",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(6.dp)
                            .size(20.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth()
                            .background(VoltSurfaceContainerHigh.copy(alpha = 0.9f))
                            .padding(vertical = 4.dp, horizontal = 6.dp)
                    ) {
                        Text("Interior Seats ✓", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }

                // Slot 4: DEKRA Certificate Upload Slot
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(115.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (state.dekraUploaded) VoltSurfaceContainerHigh else VoltSurfaceContainerLow)
                        .border(
                            1.dp,
                            if (state.dekraUploaded) VoltGreen else VoltPrimaryContainer.copy(alpha = 0.3f),
                            RoundedCornerShape(12.dp)
                        )
                        .clickable { onUploadDekra() }
                        .padding(8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = if (state.dekraUploaded) Icons.Filled.CheckCircle else Icons.Filled.AddAPhoto,
                                contentDescription = null,
                                tint = if (state.dekraUploaded) VoltGreen else VoltPrimaryContainer,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = if (state.dekraUploaded) "DEKRA Validated" else "DEKRA Certificate",
                            color = VoltOnSurface,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = if (state.dekraUploaded) "Uploaded ✓" else "Tap to upload",
                            color = if (state.dekraUploaded) VoltGreen else VoltPrimaryContainer,
                            fontSize = 10.sp
                        )
                    }
                }
            }
        }

        // Section 4: Comprehensive Commercial Insurance Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHigh),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.VerifiedUser,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Column {
                            Text(
                                text = "Passenger Liability",
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Commercial Rideshare Policy",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp
                            )
                        }
                    }
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "Active",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(VoltSurfaceContainerLow)
                        .padding(10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(30.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(VoltSurfaceContainerHighest),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.PictureAsPdf,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = "Santam_Rideshare_Policy.pdf",
                                    color = VoltOnSurface,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "2.4 MB • Verified Commercial",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 10.sp
                                )
                            }
                        }
                        Icon(
                            imageVector = Icons.Filled.Visibility,
                            contentDescription = null,
                            tint = VoltOnSurfaceVariant,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }
            }
        }

        // Submit Button CTA
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .clip(CircleShape)
                .background(VoltPrimaryContainer)
                .clickable { onSubmit() }
                .testTag("driver_step4_submit_btn"),
            contentAlignment = Alignment.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "SUBMIT VEHICLE FOR REVIEW",
                    color = VoltOnPrimaryFixed,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = VoltOnPrimaryFixed,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

        Text(
            text = "Instant verification via SA Natis & DEKRA databases",
            color = VoltOnSurfaceVariant,
            fontSize = 11.sp,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
    }
}

// -------------------------------------------------------------
// STEP 5: Driver 5/5 - Verification Status & Review
// -------------------------------------------------------------
@Composable
fun DriverStep5Review(
    state: DriverOnboardingState,
    onTogglePush: () -> Unit,
    onSupportClick: () -> Unit,
    onClose: () -> Unit = {}
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Step Title
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Application in Review",
                color = VoltOnSurface,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Welcome Thulane, your Ride Go driver profile is being verified.",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp
            )
        }

        // Hero Review Status Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainerLow)
                .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.25f), RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.VerifiedUser,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(30.dp)
                        )
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 8.dp, vertical = 2.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.Bolt,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(12.dp)
                                )
                                Spacer(modifier = Modifier.width(3.dp))
                                Text(
                                    text = "FAST-TRACK QUEUE",
                                    color = VoltPrimaryContainer,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Compliance Audit Active",
                            color = VoltOnSurface,
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Average turn-around: 2–4 hours. Next system refresh scheduled momentarily.",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            lineHeight = 16.sp
                        )
                    }
                }

                // Live Queue Micro-Bar
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(VoltSurfaceContainer.copy(alpha = 0.7f))
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.Schedule,
                                contentDescription = null,
                                tint = VoltPrimaryContainer,
                                modifier = Modifier.size(15.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Queue Position: #4 in Cape Town Central",
                                color = VoltOnSurface,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 8.dp, vertical = 2.dp)
                        ) {
                            Text("Live", color = VoltPrimaryContainer, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }

        // Credential Verification Stream (4 of 5 Complete)
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "CREDENTIAL VERIFICATION STREAM",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
                Text(
                    text = "4 of 5 Complete",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // 1. Personal ID & SAPS
            VerificationStreamItem(
                icon = Icons.Filled.Badge,
                title = "Personal ID & Criminal Background",
                subtitle = "National Registry Cross-Reference",
                statusLabel = "SAPS Cleared",
                isCompleted = true
            )

            // 2. PrDP Driving Permit
            VerificationStreamItem(
                icon = Icons.Filled.DirectionsCar,
                title = "PrDP Driving Permit",
                subtitle = "Code EB Endorsement",
                statusLabel = "Validated",
                isCompleted = true
            )

            // 3. Facial Liveness
            VerificationStreamItem(
                icon = Icons.Filled.Face,
                title = "3D Facial Biometrics",
                subtitle = "Anti-spoofing scan",
                statusLabel = "99.8% Match",
                isCompleted = true
            )

            // 4. Vehicle Roadworthy (Queued with active spinner)
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh)
                    .padding(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(VoltSurfaceContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(18.dp),
                                color = VoltPrimaryContainer,
                                strokeWidth = 2.dp
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "Vehicle Roadworthy & Disc",
                                color = VoltOnSurface,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Assigned to Field Inspector",
                                color = VoltPrimaryContainer,
                                fontSize = 11.sp
                            )
                        }
                    }
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.HourglassTop,
                                contentDescription = null,
                                tint = VoltOnPrimaryFixed,
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Queued", color = VoltOnPrimaryFixed, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            // 5. Banking Details
            VerificationStreamItem(
                icon = Icons.Filled.AccountBalance,
                title = "Capitec Bank",
                subtitle = "Acc ending •••• 4021",
                statusLabel = "Verified",
                isCompleted = true
            )
        }

        // Earn While You Wait Section
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "EARN WHILE YOU WAIT",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
                Text(
                    text = "Pre-Launch Prep",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // Starting Bonus Bento Card
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltSurfaceContainer)
                    .padding(14.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(34.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer),
                                contentAlignment = Alignment.Center
                            ) {
                                Text("R", color = VoltOnPrimaryFixed, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = "RIDER ONBOARDING KICK-OFF",
                                    color = VoltPrimaryContainer,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "Earn an extra R1,500",
                                    color = VoltOnSurface,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltSurfaceContainerHighest)
                                .padding(horizontal = 8.dp, vertical = 2.dp)
                        ) {
                            Text("30 Trips", color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }

                    Text(
                        text = "Complete 30 journeys in your first 14 days post-approval. The guaranteed R1,500 unlock deposits directly into your Capitec account.",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp,
                        lineHeight = 16.sp
                    )

                    // Progress bar
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp))
                            .background(VoltSurfaceContainerLowest)
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth(0.12f)
                                .fillMaxHeight()
                                .clip(RoundedCornerShape(3.dp))
                                .background(VoltPrimaryContainer)
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Progress: Ready to trigger", color = VoltOnSurfaceVariant, fontSize = 10.sp)
                        Text("Starts Day 1", color = VoltPrimaryContainer, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Driver Academy Video Tile
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltSurfaceContainer)
                    .clickable { }
            ) {
                Column {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(130.dp)
                            .background(VoltSurfaceContainerHighest)
                    ) {
                        AsyncImage(
                            model = ImageRequest.Builder(LocalContext.current)
                                .data(ACADEMY_VIDEO_IMG)
                                .crossfade(true)
                                .build(),
                            contentDescription = "Driver Academy",
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize()
                        )
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(Color.Black.copy(alpha = 0.35f))
                        )
                        Box(
                            modifier = Modifier
                                .align(Alignment.Center)
                                .size(44.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Filled.PlayArrow,
                                contentDescription = "Play",
                                tint = VoltOnPrimaryFixed,
                                modifier = Modifier.size(24.dp)
                            )
                        }

                        Row(
                            modifier = Modifier
                                .align(Alignment.BottomStart)
                                .padding(8.dp),
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerLowest.copy(alpha = 0.85f))
                                    .padding(horizontal = 8.dp, vertical = 2.dp)
                            ) {
                                Text("4 min video", color = VoltOnSurface, fontSize = 10.sp)
                            }
                            Box(
                                modifier = Modifier
                                    .clip(CircleShape)
                                    .background(VoltSurfaceContainerLowest.copy(alpha = 0.85f))
                                    .padding(horizontal = 8.dp, vertical = 2.dp)
                            ) {
                                Text("+5 Star Badge", color = VoltPrimaryContainer, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = "Top Driver Ratings & Route Mastery",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "Learn urban route efficiency tips and how five-star etiquette secures Cape Town's highest tipping corporate routes.",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            lineHeight = 15.sp
                        )
                    }
                }
            }
        }

        // Notification Banner Widget
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(VoltSurfaceContainerLowest)
                .padding(12.dp)
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
                        imageVector = Icons.Filled.NotificationsActive,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Zero delay approval",
                        color = VoltOnSurface,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "We ping immediately when the disc inspection confirms.",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp
                    )
                }
            }
        }

        // Primary Action: Push Permission Trigger
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .clip(CircleShape)
                .background(VoltPrimaryContainer)
                .clickable { onTogglePush() }
                .testTag("push_notification_btn"),
            contentAlignment = Alignment.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    imageVector = Icons.Filled.Notifications,
                    contentDescription = null,
                    tint = VoltOnPrimaryFixed,
                    modifier = Modifier.size(20.dp)
                )
                Text(
                    text = if (state.pushNotificationsEnabled) "Notifications Activated ✓" else "Enable Push Notifications for Instant Approval",
                    color = VoltOnPrimaryFixed,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Support Buttons: WhatsApp Ops & 24/7 Hotline
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainer)
                    .clickable { onSupportClick() },
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Chat,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("WhatsApp Ops", color = VoltOnSurface, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                }
            }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainer)
                    .clickable { onSupportClick() },
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.SupportAgent,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("24/7 Hotline", color = VoltOnSurface, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                }
            }
        }

        // Return / Done Button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .clip(CircleShape)
                .background(VoltSurfaceContainer)
                .clickable { onClose() }
                .testTag("driver_return_to_app_btn"),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "RETURN TO RIDE GO APP",
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
        }


    }
}

@Composable
private fun VerificationStreamItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    subtitle: String,
    statusLabel: String,
    isCompleted: Boolean
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(VoltSurfaceContainer)
            .padding(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                modifier = Modifier.weight(1f),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = title,
                        color = VoltOnSurface,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        maxLines = 1
                    )
                    Text(
                        text = subtitle,
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp,
                        maxLines = 1
                    )
                }
            }
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHighest)
                    .padding(horizontal = 8.dp, vertical = 3.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    if (isCompleted) {
                        Icon(
                            imageVector = Icons.Filled.CheckCircle,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(13.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                    }
                    Text(statusLabel, color = VoltOnSurface, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
