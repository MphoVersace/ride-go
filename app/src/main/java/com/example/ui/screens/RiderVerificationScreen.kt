package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
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
import androidx.compose.material.icons.filled.AlternateEmail
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.DoneAll
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.FlashOn
import androidx.compose.material.icons.filled.LocalActivity
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.MarkEmailRead
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Sms
import androidx.compose.material.icons.filled.Stars
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.TravelExplore
import androidx.compose.material.icons.filled.UploadFile
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.RiderIdDocType
import com.example.model.RiderVerificationState
import com.example.ui.theme.IceBlue
import com.example.ui.theme.IceBlueSoft
import com.example.ui.theme.MediumBlue
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimary
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow

private const val SMART_ID_PORTRAIT_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ6f4s3Xqu9YzEPIQiTAkMSL91jvdHTldfrNmDfp6bub28Pt9RjC0d9GenmCUFkJ1nN2XddXZIw36HVgHXI6MC6Ea3hC2bqxGidq8lkmz7DIssp7jtbDaSvguDSr671T5cJ5zzEGI3NbTBvrjzcRSgZL8pXoJrTCSiiejG2nd3NTTFuo-P1WpSveF2V4DkYyE2l_hvK3PGBWHfacZBdTHe7IiI5AZ6ahdZaBGk_GRpR6Bk7h5FY5t"

private const val VERIFIED_PROFILE_PORTRAIT_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC_hpmAR41urfWSsqQ0q9ZrrwqgF3IiflmE4tJXavqqQIDHmsyg-m8MiqtGYHVze0nn9me6GCM9BU75yHkQWPAEkQe44T4nbQxG1t-gVI9FOle31mF_FmrOm_ioB_j5vFwL8u52NAs5E5sBISruz-LFkgC1zekdsDkCDjQ3w0ErNfCfhrFJvWQ7ndYaoEKvnZzzhaCdP-PN7xQnVs5TeDtP-u-ByaLnJ4Q0nNyqur_BRyWN5Llw73Hg"

@Composable
fun RiderVerificationScreen(
    state: RiderVerificationState,
    onStepSelected: (Int) -> Unit,
    onSwitchToDriver: () -> Unit,
    onFullNameChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onEmailChange: (String) -> Unit,
    onTosToggle: (Boolean) -> Unit,
    onPromoToggle: (Boolean) -> Unit,
    onSendCodes: () -> Unit,
    onResendOtp: () -> Unit,
    onDocTypeSelected: (RiderIdDocType) -> Unit,
    onTriggerIdCapture: () -> Unit,
    onTriggerLiveness: () -> Unit,
    onPaymentSelected: (String) -> Unit,
    onStartRiding: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 10.dp)
            .testTag("rider_verification_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Step progress header (Common to all 5 steps)
        RiderProgressHeader(
            currentStep = state.currentStep,
            onStepSelected = onStepSelected
        )

        when (state.currentStep) {
            1 -> {
                RiderStep1SignUp(
                    state = state,
                    onSwitchToDriver = onSwitchToDriver,
                    onFullNameChange = onFullNameChange,
                    onPhoneChange = onPhoneChange,
                    onEmailChange = onEmailChange,
                    onTosToggle = onTosToggle,
                    onPromoToggle = onPromoToggle,
                    onSendCodes = onSendCodes
                )
            }
            2 -> {
                RiderStep2ContactsVerification(
                    state = state,
                    onEditPhone = { onStepSelected(1) },
                    onResendOtp = onResendOtp,
                    onProceed = { onStepSelected(3) }
                )
            }
            3 -> {
                RiderStep3SmartIdCapture(
                    state = state,
                    onDocTypeSelected = onDocTypeSelected,
                    onTriggerCapture = {
                        onTriggerIdCapture()
                        onStepSelected(4)
                    }
                )
            }
            4 -> {
                RiderStep4FacialLiveness(
                    state = state,
                    onTriggerLiveness = {
                        onTriggerLiveness()
                        onStepSelected(5)
                    }
                )
            }
            5 -> {
                RiderStep5VerifiedProfile(
                    state = state,
                    onPaymentSelected = onPaymentSelected,
                    onStartRiding = onStartRiding
                )
            }
        }
    }
}

// ==========================================
// Progress Header Component
// ==========================================
@Composable
private fun RiderProgressHeader(
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

// ==========================================
// Step 1: Sign Up & Gateway ("Welcome to Ride Go")
// ==========================================
@Composable
private fun RiderStep1SignUp(
    state: RiderVerificationState,
    onSwitchToDriver: () -> Unit,
    onFullNameChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onEmailChange: (String) -> Unit,
    onTosToggle: (Boolean) -> Unit,
    onPromoToggle: (Boolean) -> Unit,
    onSendCodes: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Welcome Header
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
                imageVector = Icons.Filled.NearMe,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(22.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Welcome to Ride Go",
                color = VoltOnSurface,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = (-0.5).sp
            )
        }
        Text(
            text = "Fast, secure & verified rides across South Africa",
            color = VoltOnSurfaceVariant,
            fontSize = 14.sp
        )

        // Passenger vs Driver Role Selector
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(CircleShape)
                .background(VoltSurfaceContainerLow)
                .padding(4.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            // Rider button (Active)
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(CircleShape)
                    .background(VoltPrimaryContainer)
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Person,
                        contentDescription = null,
                        tint = VoltOnPrimaryFixed,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Rider (Passenger)",
                        color = VoltOnPrimaryFixed,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // Driver button (Clickable -> Switches to Driver Onboarding)
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(CircleShape)
                    .clickable(onClick = onSwitchToDriver)
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.DirectionsCar,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Driver",
                        color = VoltOnSurfaceVariant,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        // Form Fields
        // 1. Full Legal Name
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "FULL LEGAL NAME",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Text(
                    text = "Verified ID",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            OutlinedTextField(
                value = state.fullName,
                onValueChange = onFullNameChange,
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Filled.Badge,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = VoltPrimaryContainer,
                    unfocusedBorderColor = VoltSurfaceContainerHighest,
                    focusedContainerColor = VoltSurfaceContainer,
                    unfocusedContainerColor = VoltSurfaceContainer,
                    focusedTextColor = VoltOnSurface,
                    unfocusedTextColor = VoltOnSurface
                ),
                shape = RoundedCornerShape(12.dp),
                singleLine = true
            )
        }

        // 2. South African Mobile Number
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "SOUTH AFRICAN MOBILE NUMBER",
                color = VoltOnSurfaceVariant,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
            OutlinedTextField(
                value = state.phone,
                onValueChange = onPhoneChange,
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(start = 12.dp, end = 6.dp)
                    ) {
                        Text(
                            text = "+27",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .width(1.dp)
                                .height(18.dp)
                                .background(VoltSurfaceContainerHighest)
                        )
                    }
                },
                trailingIcon = {
                    Icon(
                        imageVector = Icons.Filled.Sms,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(18.dp)
                    )
                },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = VoltPrimaryContainer,
                    unfocusedBorderColor = VoltSurfaceContainerHighest,
                    focusedContainerColor = VoltSurfaceContainer,
                    unfocusedContainerColor = VoltSurfaceContainer,
                    focusedTextColor = VoltOnSurface,
                    unfocusedTextColor = VoltOnSurface
                ),
                shape = RoundedCornerShape(12.dp),
                singleLine = true
            )
        }

        // 3. Email Address
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "EMAIL ADDRESS",
                color = VoltOnSurfaceVariant,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
            OutlinedTextField(
                value = state.email,
                onValueChange = onEmailChange,
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Filled.AlternateEmail,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = VoltPrimaryContainer,
                    unfocusedBorderColor = VoltSurfaceContainerHighest,
                    focusedContainerColor = VoltSurfaceContainer,
                    unfocusedContainerColor = VoltSurfaceContainer,
                    focusedTextColor = VoltOnSurface,
                    unfocusedTextColor = VoltOnSurface
                ),
                shape = RoundedCornerShape(12.dp),
                singleLine = true
            )
        }

        // Checkboxes
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onTosToggle(!state.tosAccepted) },
                verticalAlignment = Alignment.Top
            ) {
                Box(
                    modifier = Modifier
                        .size(20.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (state.tosAccepted) VoltPrimaryContainer else VoltSurfaceContainer)
                        .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(4.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    if (state.tosAccepted) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "I accept the Terms of Service & Privacy Policy",
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp,
                    lineHeight = 16.sp
                )
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onPromoToggle(!state.promoAccepted) },
                verticalAlignment = Alignment.Top
            ) {
                Box(
                    modifier = Modifier
                        .size(20.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (state.promoAccepted) VoltPrimaryContainer else VoltSurfaceContainer)
                        .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(4.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    if (state.promoAccepted) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(14.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "Receive trip receipts, safety alerts & exclusive South African promo codes",
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp,
                    lineHeight = 16.sp
                )
            }
        }

        // CTA Button
        Button(
            onClick = onSendCodes,
            enabled = !state.isSendingOtp && state.tosAccepted,
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("send_codes_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = VoltPrimaryContainer,
                contentColor = VoltOnPrimaryFixed
            ),
            shape = CircleShape
        ) {
            if (state.isSendingOtp) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    color = VoltOnPrimaryFixed,
                    strokeWidth = 2.dp
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(text = "Generating OTP Codes...", fontWeight = FontWeight.Bold)
            } else {
                Text(
                    text = "Send 2-Step Verification Codes",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.width(8.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

    }
}

// ==========================================
// Step 2: Phone & Email Verification ("Verify Your Contacts")
// ==========================================
@Composable
private fun RiderStep2ContactsVerification(
    state: RiderVerificationState,
    onEditPhone: () -> Unit,
    onResendOtp: () -> Unit,
    onProceed: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Framing
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "DUAL VERIFICATION",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
            }
            Text(
                text = "Verify Your Contacts",
                color = VoltOnSurface,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "We sent security codes to your phone and email",
                color = VoltOnSurfaceVariant,
                fontSize = 14.sp
            )
        }

        // Phone Verification Block
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainerLow)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
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
                            imageVector = Icons.Filled.Sms,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "MOBILE NUMBER",
                            color = VoltOnSurfaceVariant,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "+27 71 839 2041",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHighest)
                        .clickable(onClick = onEditPhone)
                        .padding(horizontal = 12.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "Edit",
                        color = VoltPrimaryContainer,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // 6-digit entered cells: 5 9 2 4 1 8
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                listOf("5", "9", "2", "4", "1", "8").forEach { digit ->
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(VoltSurfaceContainerHigh),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = digit,
                            color = VoltOnSurface,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // Verified Badge Indicator
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .padding(horizontal = 10.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(VoltGreen)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "✓ Phone Verified",
                        color = VoltGreen,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Lock,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(12.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Carrier verified",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp
                    )
                }
            }
        }

        // Email Verification Block
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainerLow)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
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
                            imageVector = Icons.Filled.MarkEmailRead,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "EMAIL ADDRESS",
                            color = VoltOnSurfaceVariant,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "nomvula.zungu@icloud.com",
                            color = VoltOnSurface,
                            fontSize = 13.sp,
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
                        text = "Pending",
                        color = VoltPrimaryContainer,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // 6-digit active blocks: 7 3 0 • • • with active cursor
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                val digits = listOf("7", "3", "0", "•", "•", "•")
                digits.forEachIndexed { idx, d ->
                    val isActive = idx == 2
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (isActive) VoltPrimaryContainer.copy(alpha = 0.15f) else VoltSurfaceContainerHigh)
                            .border(
                                width = if (isActive) 1.5.dp else 0.dp,
                                color = if (isActive) VoltPrimaryContainer else Color.Transparent,
                                shape = RoundedCornerShape(8.dp)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = d,
                            color = if (isActive) VoltPrimaryContainer else VoltOnSurface,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // Countdown & Resend
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Resend code in 00:42",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
                Text(
                    text = "Resend",
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable(onClick = onResendOtp)
                )
            }
        }

        // Security Protocol Card
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(14.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp),
            verticalAlignment = Alignment.Top
        ) {
            Icon(
                imageVector = Icons.Filled.Security,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(
                    text = "SECURITY PROTOCOL",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "Ride Go will never ask for your verification PIN via call or SMS. Keep your credentials private to safeguard your account.",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    lineHeight = 15.sp
                )
            }
        }

        // CTA Button
        Button(
            onClick = onProceed,
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("verify_and_proceed_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = VoltPrimaryContainer,
                contentColor = VoltOnPrimaryFixed
            ),
            shape = CircleShape
        ) {
            Text(
                text = "Verify & Proceed to ID Check",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.width(8.dp))
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
        }


    }
}

// ==========================================
// Step 3: SA Smart ID Verification ("Verify Your Identity")
// ==========================================
@Composable
private fun RiderStep3SmartIdCapture(
    state: RiderVerificationState,
    onDocTypeSelected: (RiderIdDocType) -> Unit,
    onTriggerCapture: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Header
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Verify Your Identity",
                color = VoltOnSurface,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Mandatory rider safety & community trust verification",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp
            )
        }

        // Document Type Selector Pills
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            RiderDocPill(
                type = RiderIdDocType.SMART_ID,
                icon = Icons.Filled.Badge,
                selected = state.selectedDocType == RiderIdDocType.SMART_ID,
                onClick = { onDocTypeSelected(RiderIdDocType.SMART_ID) },
                modifier = Modifier.weight(1f)
            )
            RiderDocPill(
                type = RiderIdDocType.GREEN_BOOK,
                icon = Icons.Filled.MenuBook,
                selected = state.selectedDocType == RiderIdDocType.GREEN_BOOK,
                onClick = { onDocTypeSelected(RiderIdDocType.GREEN_BOOK) },
                modifier = Modifier.weight(1f)
            )
            RiderDocPill(
                type = RiderIdDocType.PASSPORT,
                icon = Icons.Filled.TravelExplore,
                selected = state.selectedDocType == RiderIdDocType.PASSPORT,
                onClick = { onDocTypeSelected(RiderIdDocType.PASSPORT) },
                modifier = Modifier.weight(1f)
            )
        }

        // Viewfinder Scanner Card Container with Live Scan Line Animation
        val infiniteTransition = rememberInfiniteTransition(label = "scanLine")
        val scanProgress by infiniteTransition.animateFloat(
            initialValue = 0.15f,
            targetValue = 0.85f,
            animationSpec = infiniteRepeatable(
                animation = tween(2400, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "scanOffset"
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(4f / 3f)
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainerLow)
                .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(20.dp))
                .padding(12.dp),
            contentAlignment = Alignment.Center
        ) {
            // Background scanning reticle canvas
            Canvas(modifier = Modifier.fillMaxSize()) {
                val cornerLen = 28.dp.toPx()
                val strokeW = 3.dp.toPx()
                val cornerColor = IceBlue

                // Top-Left
                drawLine(cornerColor, Offset(0f, 0f), Offset(cornerLen, 0f), strokeW)
                drawLine(cornerColor, Offset(0f, 0f), Offset(0f, cornerLen), strokeW)

                // Top-Right
                drawLine(cornerColor, Offset(size.width, 0f), Offset(size.width - cornerLen, 0f), strokeW)
                drawLine(cornerColor, Offset(size.width, 0f), Offset(size.width, cornerLen), strokeW)

                // Bottom-Left
                drawLine(cornerColor, Offset(0f, size.height), Offset(cornerLen, size.height), strokeW)
                drawLine(cornerColor, Offset(0f, size.height), Offset(0f, size.height - cornerLen), strokeW)

                // Bottom-Right
                drawLine(cornerColor, Offset(size.width, size.height), Offset(size.width - cornerLen, size.height), strokeW)
                drawLine(cornerColor, Offset(size.width, size.height), Offset(size.width, size.height - cornerLen), strokeW)

                // Laser Scan Line
                val yPos = size.height * scanProgress
                drawLine(
                    color = IceBlue,
                    start = Offset(10.dp.toPx(), yPos),
                    end = Offset(size.width - 10.dp.toPx(), yPos),
                    strokeWidth = 2.5.dp.toPx()
                )
            }

            // Realistic South African Smart ID Card Graphic inside Viewfinder
            Box(
                modifier = Modifier
                    .fillMaxWidth(0.92f)
                    .aspectRatio(1.586f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh)
                    .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.4f), RoundedCornerShape(12.dp))
                    .padding(10.dp)
            ) {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Card Top Header
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(20.dp)
                                    .clip(CircleShape)
                                    .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Shield,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer,
                                    modifier = Modifier.size(12.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(6.dp))
                            Column {
                                Text(
                                    text = "REPUBLIC OF SOUTH AFRICA",
                                    color = VoltPrimary,
                                    fontSize = 8.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.5.sp
                                )
                                Text(
                                    text = "National Identity Card",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 7.sp
                                )
                            }
                        }

                        // Smart Chip Graphic
                        Box(
                            modifier = Modifier
                                .size(width = 26.dp, height = 18.dp)
                                .clip(RoundedCornerShape(3.dp))
                                .background(
                                    Brush.linearGradient(
                                        listOf(IceBlueSoft, IceBlue)
                                    )
                                )
                                .border(1.dp, IceBlue.copy(alpha = 0.5f), RoundedCornerShape(3.dp))
                        )
                    }

                    // Middle: Passenger Portrait + Credentials
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Portrait
                        Box(
                            modifier = Modifier
                                .size(width = 46.dp, height = 58.dp)
                                .clip(RoundedCornerShape(4.dp))
                                .background(VoltSurfaceContainerHighest)
                        ) {
                            AsyncImage(
                                model = ImageRequest.Builder(LocalContext.current)
                                    .data(SMART_ID_PORTRAIT_URL)
                                    .crossfade(true)
                                    .build(),
                                contentDescription = "ID Portrait",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize()
                            )
                        }

                        Spacer(modifier = Modifier.width(10.dp))

                        // Credentials
                        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(
                                text = "SURNAME / NOM",
                                color = VoltOnSurfaceVariant,
                                fontSize = 7.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "DLAMINI",
                                color = VoltOnSurface,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "NAMES / PRÉNOMS",
                                color = VoltOnSurfaceVariant,
                                fontSize = 7.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "THANDIWE NOKUTHULA",
                                color = VoltOnSurface,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "ID NUMBER",
                                color = VoltOnSurfaceVariant,
                                fontSize = 7.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "960412 0241 08 3",
                                color = VoltPrimaryContainer,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }

                    // Bottom MRZ Machine Readable Line
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .border(width = 0.5.dp, color = VoltSurfaceContainerHighest, shape = RoundedCornerShape(2.dp))
                            .padding(top = 2.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "IDZAF9604128F3209282RSA<<<<<<<<<",
                            color = VoltOnSurfaceVariant.copy(alpha = 0.8f),
                            fontSize = 7.sp,
                            fontFamily = FontFamily.Monospace
                        )
                        Icon(
                            imageVector = Icons.Filled.Lock,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(10.dp)
                        )
                    }
                }
            }

            // Floating detection pill at bottom
            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 6.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh.copy(alpha = 0.95f))
                    .padding(horizontal = 12.dp, vertical = 4.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "ID Card Detected • Hold steady",
                        color = VoltOnSurface,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }

        // Scanner Readiness Checklist (3/3 checks met)
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "SCANNER READINESS",
                    color = VoltOnSurfaceVariant,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
                Text(
                    text = "3/3 Checks Met",
                    color = VoltPrimaryContainer,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            ReadinessCheckItem(text = "All 4 corners aligned inside viewfinder frame")
            ReadinessCheckItem(text = "Glare-free lighting & crisp readable text")
            ReadinessCheckItem(text = "Valid, non-expired governmental document")
        }

        // Manual Upload Fallback
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { }
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Filled.UploadFile,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = "Having camera trouble? Upload front & back photo",
                color = VoltOnSurfaceVariant,
                fontSize = 12.sp
            )
        }

        // CTA Button
        Button(
            onClick = onTriggerCapture,
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("capture_id_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = VoltPrimaryContainer,
                contentColor = VoltOnPrimaryFixed
            ),
            shape = CircleShape
        ) {
            Icon(
                imageVector = Icons.Filled.PhotoCamera,
                contentDescription = null,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Capture & Verify ID",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
        }


    }
}

@Composable
private fun RiderDocPill(
    type: RiderIdDocType,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(CircleShape)
            .background(if (selected) VoltPrimaryContainer else VoltSurfaceContainerHigh)
            .clickable(onClick = onClick)
            .padding(vertical = 10.dp, horizontal = 8.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = if (selected) VoltOnPrimaryFixed else VoltOnSurface,
                modifier = Modifier.size(15.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = when (type) {
                    RiderIdDocType.SMART_ID -> "Smart ID"
                    RiderIdDocType.GREEN_BOOK -> "Green Book"
                    RiderIdDocType.PASSPORT -> "Passport"
                },
                color = if (selected) VoltOnPrimaryFixed else VoltOnSurface,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
private fun ReadinessCheckItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(16.dp)
                .clip(CircleShape)
                .background(VoltPrimaryContainer.copy(alpha = 0.2f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Filled.Check,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(11.dp)
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = text,
            color = VoltOnSurface,
            fontSize = 12.sp
        )
    }
}

// ==========================================
// Step 4: Biometric Facial Match ("Facial Liveness Check")
// ==========================================
@Composable
private fun RiderStep4FacialLiveness(
    state: RiderVerificationState,
    onTriggerLiveness: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Headline
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = "Facial Liveness Check",
                color = VoltOnSurface,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Ensure you are the legitimate owner of your South African ID",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp,
                textAlign = TextAlign.Center
            )
        }

        // Biometric Concentric Viewfinder
        val infiniteTransition = rememberInfiniteTransition(label = "radar")
        val radarAngle by infiniteTransition.animateFloat(
            initialValue = 0f,
            targetValue = 360f,
            animationSpec = infiniteRepeatable(
                animation = tween(4000, easing = LinearEasing),
                repeatMode = RepeatMode.Restart
            ),
            label = "radarAngle"
        )

        Box(
            modifier = Modifier
                .size(240.dp)
                .padding(8.dp),
            contentAlignment = Alignment.Center
        ) {
            // Circular progress & tick mark canvas
            Canvas(modifier = Modifier.fillMaxSize()) {
                val center = Offset(size.width / 2f, size.height / 2f)
                val radius = size.minDimension / 2f - 4.dp.toPx()

                // Outer decorative tick marks
                drawCircle(
                    color = IceBlue.copy(alpha = 0.2f),
                    radius = radius,
                    style = Stroke(
                        width = 1.5.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(4f, 12f))
                    )
                )

                // Outer progress arc (80%)
                drawArc(
                    color = IceBlue,
                    startAngle = -90f,
                    sweepAngle = 288f,
                    useCenter = false,
                    style = Stroke(width = 3.5.dp.toPx())
                )
            }

            // Inner Camera Viewport
            Box(
                modifier = Modifier
                    .size(190.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerLow)
                    .border(2.dp, VoltSurfaceContainerHighest, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                // Facial silhouette mask outline
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val center = Offset(size.width / 2f, size.height / 2f)

                    // Head oval outline
                    drawOval(
                        color = IceBlueSoft.copy(alpha = 0.4f),
                        topLeft = Offset(center.x - 44.dp.toPx(), center.y - 62.dp.toPx()),
                        size = androidx.compose.ui.geometry.Size(88.dp.toPx(), 118.dp.toPx()),
                        style = Stroke(width = 2.dp.toPx())
                    )

                    // Eye alignment dots
                    drawCircle(
                        color = IceBlue,
                        radius = 4.dp.toPx(),
                        center = Offset(center.x - 20.dp.toPx(), center.y - 12.dp.toPx())
                    )
                    drawCircle(
                        color = IceBlue,
                        radius = 4.dp.toPx(),
                        center = Offset(center.x + 20.dp.toPx(), center.y - 12.dp.toPx())
                    )

                    // Mouth guide line
                    drawLine(
                        color = Color(0xFFD1C6AB).copy(alpha = 0.6f),
                        start = Offset(center.x - 14.dp.toPx(), center.y + 28.dp.toPx()),
                        end = Offset(center.x + 14.dp.toPx(), center.y + 28.dp.toPx()),
                        strokeWidth = 2.5.dp.toPx()
                    )
                }

                // Instruction pill attached below
            }

            // Floating Active Instruction Pill
            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .padding(horizontal = 14.dp, vertical = 6.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(18.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Visibility,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Blink twice now",
                        color = VoltOnSurface,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Environmental Status Badges
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainer)
                    .padding(12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "LIGHTING",
                            color = VoltOnSurfaceVariant,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "Good • Clear",
                            color = VoltOnSurface,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainer)
                    .padding(12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "DISTANCE",
                            color = VoltOnSurfaceVariant,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "Perfect (45cm)",
                            color = VoltOnSurface,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // Real-Time Micro Checklist
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(14.dp))
                .background(VoltSurfaceContainerLow)
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
                            .size(18.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Check,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = "Centered in oval", color = VoltOnSurface, fontSize = 13.sp)
                }
                Text(
                    text = "COMPLETE",
                    color = VoltPrimaryContainer,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(18.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Sync,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = "Blink detection", color = VoltOnSurface, fontSize = 13.sp)
                }
                Text(
                    text = "IN PROGRESS...",
                    color = VoltPrimaryContainer,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(18.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest),
                        contentAlignment = Alignment.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(5.dp)
                                .clip(CircleShape)
                                .background(VoltOnSurfaceVariant)
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = "Neutral expression", color = VoltOnSurface.copy(alpha = 0.6f), fontSize = 13.sp)
                }
                Text(
                    text = "PENDING",
                    color = VoltOnSurfaceVariant,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Safety Disclosure Box
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(14.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp),
            verticalAlignment = Alignment.Top
        ) {
            Icon(
                imageVector = Icons.Filled.VerifiedUser,
                contentDescription = null,
                tint = VoltPrimaryContainer,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(
                    text = "OFFICIAL VERIFICATION",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "Your selfie is compared once against the Home Affairs / Smart ID chip registry to protect drivers and riders. Never shared publicly.",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp,
                    lineHeight = 15.sp
                )
            }
        }

        // CTA Button
        Button(
            onClick = onTriggerLiveness,
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("complete_facial_scan_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = VoltPrimaryContainer,
                contentColor = VoltOnPrimaryFixed
            ),
            shape = CircleShape
        ) {
            Icon(
                imageVector = Icons.Filled.Face,
                contentDescription = null,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Complete Facial Scan",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

// ==========================================
// Step 5: Verified & Profile Ready ("Verification Complete!")
// ==========================================
@Composable
private fun RiderStep5VerifiedProfile(
    state: RiderVerificationState,
    onPaymentSelected: (String) -> Unit,
    onStartRiding: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Hero Celebration Icon with Confetti particles
        Box(
            modifier = Modifier
                .size(110.dp)
                .padding(top = 8.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val center = Offset(size.width / 2f, size.height / 2f)
                val colors = listOf(
                    IceBlue,
                    Color(0xFFFFFFFF),
                    IceBlueSoft,
                    MediumBlue
                )

                // Burst confetti specks
                for (i in 0 until 12) {
                    val angle = (i * 30) * (Math.PI / 180.0)
                    val dist = 48.dp.toPx()
                    val x = center.x + (dist * Math.cos(angle)).toFloat()
                    val y = center.y + (dist * Math.sin(angle)).toFloat()
                    drawCircle(
                        color = colors[i % colors.size],
                        radius = 3.dp.toPx(),
                        center = Offset(x, y)
                    )
                }
            }

            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh)
                    .border(2.dp, VoltPrimaryContainer, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Filled.Verified,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(46.dp)
                )

                Box(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .size(24.dp)
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.DoneAll,
                        contentDescription = null,
                        tint = VoltOnPrimaryFixed,
                        modifier = Modifier.size(14.dp)
                    )
                }
            }
        }

        // Badge Pill
        Box(
            modifier = Modifier
                .clip(CircleShape)
                .background(VoltSurfaceContainerHigh)
                .padding(horizontal = 14.dp, vertical = 6.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .clip(CircleShape)
                        .background(VoltGreen)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "Identity Verified Badge • Tier 1 Verified Rider",
                    color = VoltOnSurface,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        // Titles
        Text(
            text = "Verification Complete!",
            color = VoltOnSurface,
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = (-0.5).sp
        )
        Text(
            text = "Welcome Nomvula, your verified Ride Go account is fully active and cleared for urban dispatch.",
            color = VoltOnSurfaceVariant,
            fontSize = 13.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        // Verified Profile Summary Card
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .clip(CircleShape)
                    .border(2.dp, VoltPrimaryContainer, CircleShape)
            ) {
                AsyncImage(
                    model = ImageRequest.Builder(LocalContext.current)
                        .data(VERIFIED_PROFILE_PORTRAIT_URL)
                        .crossfade(true)
                        .build(),
                    contentDescription = "Profile Photo",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "Nomvula Zungu",
                        color = VoltOnSurface,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(
                        imageVector = Icons.Filled.Stars,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Text(
                    text = "SA ID verified • Phone & Email authenticated",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "SmartID: 9403••••084",
                            color = VoltPrimaryContainer,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "Tier 1",
                            color = VoltOnSurface,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // Voucher Card (R50 Off First 3 Rides)
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        listOf(VoltSurfaceContainerHigh, VoltSurfaceContainer)
                    )
                )
                .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.LocalOffer,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "R50 Off First 3 Rides",
                            color = VoltOnSurface,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Applied automatically at checkout",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                    }
                }
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "ACTIVATED",
                        color = VoltOnPrimaryFixed,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(VoltSurfaceContainerLow)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.LocalActivity,
                        contentDescription = null,
                        tint = VoltPrimaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "RIDEGOFIRST",
                        color = VoltOnSurface,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                }
                Text(
                    text = "Saves up to R150",
                    color = VoltOnSurfaceVariant,
                    fontSize = 11.sp
                )
            }
        }

        // Preferred Payment Method Card
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
                    Icon(
                        imageVector = Icons.Filled.AccountBalanceWallet,
                        contentDescription = null,
                        tint = VoltOnSurfaceVariant,
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "PREFERRED PAYMENT METHOD",
                        color = VoltOnSurfaceVariant,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.CheckCircle,
                        contentDescription = null,
                        tint = VoltGreen,
                        modifier = Modifier.size(13.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Active",
                        color = VoltGreen,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // Capitec Pay main row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh)
                    .padding(12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(VoltSurfaceContainerHighest),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.AccountBalance,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Capitec Pay",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Linked via Open Banking • Auto-approval",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                    }
                }
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer.copy(alpha = 0.2f))
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Text(
                        text = "R20 Bonus",
                        color = VoltPrimaryContainer,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            // Alternate options: Ozow Instant EFT, Visa / Mastercard
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(VoltSurfaceContainerLow)
                        .clickable { onPaymentSelected("Ozow Instant EFT") }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.FlashOn,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "Ozow Instant EFT",
                            color = VoltOnSurface,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }

                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(VoltSurfaceContainerLow)
                        .clickable { onPaymentSelected("Visa / Mastercard") }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Filled.CreditCard,
                            contentDescription = null,
                            tint = VoltPrimaryContainer,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "Visa / Mastercard",
                            color = VoltOnSurface,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }

        // 3 Active Urban Safety Safeguards
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Filled.Shield,
                    contentDescription = null,
                    tint = VoltPrimaryContainer,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "3 Active Urban Safety Safeguards",
                    color = VoltOnSurface,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            SafetyCheckItem(
                title = "4-Digit Ride PIN Security",
                desc = "Car will not start trip until driver enters your dynamic code."
            )
            SafetyCheckItem(
                title = "Live Trip Share Enabled",
                desc = "Automatic WhatsApp route mirroring to 2 trusted contacts."
            )
            SafetyCheckItem(
                title = "24/7 Armed Response & Medical Link",
                desc = "Integrated with SA National Emergency Dispatch infrastructure."
            )
        }

        // Action CTA
        Button(
            onClick = onStartRiding,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .testTag("start_riding_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = VoltPrimaryContainer,
                contentColor = VoltOnPrimaryFixed
            ),
            shape = CircleShape
        ) {
            Text(
                text = "Start Riding with Ride Go",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.width(8.dp))
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
        }

        Text(
            text = "Tap to browse drivers near Johannesburg Metro • Fast pickup",
            color = VoltOnSurfaceVariant,
            fontSize = 11.sp,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun SafetyCheckItem(title: String, desc: String) {
    Row(verticalAlignment = Alignment.Top) {
        Box(
            modifier = Modifier
                .size(18.dp)
                .clip(CircleShape)
                .background(VoltGreen.copy(alpha = 0.2f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Filled.Check,
                contentDescription = null,
                tint = VoltGreen,
                modifier = Modifier.size(12.dp)
            )
        }
        Spacer(modifier = Modifier.width(10.dp))
        Column {
            Text(
                text = title,
                color = VoltOnSurface,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = desc,
                color = VoltOnSurfaceVariant,
                fontSize = 11.sp,
                lineHeight = 15.sp
            )
        }
    }
}
