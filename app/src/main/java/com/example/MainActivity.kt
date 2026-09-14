package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.SizeTransform
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.slideOutVertically
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.model.RideTierType
import com.example.model.VoltScreenTab
import com.example.ui.components.VoltBottomNav
import com.example.ui.components.VoltTopBar
import com.example.ui.screens.AccountScreen
import com.example.ui.screens.ActivityScreen
import com.example.ui.screens.AuthScreen
import com.example.ui.screens.DispatchScreen
import com.example.ui.screens.DriverOnboardingScreen
import com.example.ui.screens.ExploreScreen
import com.example.ui.screens.LiveTrackingScreen
import com.example.ui.screens.RiderVerificationScreen
import com.example.ui.screens.RidesScreen
import com.example.ui.screens.SplashScreen
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.SystemUpdate
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.IconButton
import androidx.compose.ui.platform.LocalContext
import com.example.ui.screens.DestinationSearchScreen
import com.example.ui.theme.IceBlue
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.viewmodel.VoltViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                VoltAppRoot()
            }
        }
    }
}

@Composable
fun VoltAppRoot(
    viewModel: VoltViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    // Automatically check for GitHub Actions updates on app start
    LaunchedEffect(Unit) {
        viewModel.checkForAppUpdates()
    }

    // Handle back button when in Destination Search, Dispatch screen, Rider Verification, or Driver Onboarding
    BackHandler(
        enabled = uiState.isSearchDestinationActive ||
            uiState.isDispatchActive ||
            uiState.isRiderVerificationActive ||
            uiState.isDriverOnboardingActive
    ) {
        if (uiState.isSearchDestinationActive) {
            viewModel.closeDestinationSearch()
        } else if (uiState.isDispatchActive) {
            viewModel.cancelDispatch()
        } else if (uiState.isRiderVerificationActive) {
            if (uiState.riderState.currentStep > 1) {
                viewModel.setRiderStep(uiState.riderState.currentStep - 1)
            } else {
                viewModel.closeRiderVerification()
            }
        } else if (uiState.isDriverOnboardingActive) {
            if (uiState.driverState.currentStep > 1) {
                viewModel.setDriverStep(uiState.driverState.currentStep - 1)
            } else {
                viewModel.closeDriverOnboarding()
            }
        }
    }

    Box(modifier = Modifier.fillMaxSize().background(VoltSurface)) {
    if (uiState.isSplashActive) {
        // Loading / Splash Screen showing just the brand logo
        SplashScreen(
            onSplashComplete = { viewModel.finishSplash() }
        )
    } else if (!uiState.isAuthenticated && !uiState.isRiderVerificationActive && !uiState.isDriverOnboardingActive) {
        // Sign Up / Login Screen with direct pathways to Rider & Driver onboarding
        AuthScreen(
            onSignInSuccess = { emailOrPhone -> viewModel.login(emailOrPhone) },
            onStartRiderSignUp = { name, email, phone ->
                viewModel.startRiderSignUpFromAuth(name, email, phone)
            },
            onStartDriverSignUp = { name, phone ->
                viewModel.startDriverSignUpFromAuth(name, phone)
            },
            onContinueAsGuest = { viewModel.continueAsGuest() }
        )
    } else if (uiState.isSearchDestinationActive) {
        // Destination Search screen with current location and South Africa place filtering
        DestinationSearchScreen(
            state = uiState,
            onBack = { viewModel.closeDestinationSearch() },
            onSelectDestination = { destination, pickup ->
                viewModel.selectDestination(destination, pickup)
            }
        )
    } else {
        Scaffold(
            modifier = Modifier
                .fillMaxSize()
                .background(VoltSurface),
            topBar = {
            if (!uiState.isDispatchActive) {
                VoltTopBar(
                    currentTab = uiState.currentTab,
                    driverStep = uiState.driverState.currentStep,
                    isDriverOnboarding = uiState.isDriverOnboardingActive,
                    isRiderVerification = uiState.isRiderVerificationActive,
                    riderStep = uiState.riderState.currentStep,
                    onBackClick = if (uiState.isRiderVerificationActive) {
                        {
                            if (uiState.riderState.currentStep > 1) {
                                viewModel.setRiderStep(uiState.riderState.currentStep - 1)
                            } else {
                                viewModel.closeRiderVerification()
                            }
                        }
                    } else if (uiState.isDriverOnboardingActive) {
                        {
                            if (uiState.driverState.currentStep > 1) {
                                viewModel.setDriverStep(uiState.driverState.currentStep - 1)
                            } else {
                                viewModel.closeDriverOnboarding()
                            }
                        }
                    } else null,
                    onNotificationsClick = { viewModel.showToast("No new notifications") },
                    onSupportClick = { viewModel.showToast("Ride Go 24/7 Priority Support: Contacting operations...") },
                    onProfileClick = { viewModel.openRiderVerification() }
                )
            }
        },
        bottomBar = {
            if (!uiState.isDispatchActive && !uiState.isRiderVerificationActive && !uiState.isDriverOnboardingActive) {
                VoltBottomNav(
                    currentTab = uiState.currentTab,
                    onTabSelected = { viewModel.selectTab(it) }
                )
            }
        },
        containerColor = VoltSurface
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Main Screen content switcher
            if (uiState.isDispatchActive) {
                if (uiState.isDriverMatched) {
                    LiveTrackingScreen(
                        state = uiState,
                        onBack = { viewModel.cancelDispatch() },
                        onCancelRide = { viewModel.cancelDispatch() },
                        onCallDriver = { viewModel.showToast("Calling Marcus Vance (+27 82 555 0192)...") },
                        onMessageDriver = { viewModel.showToast("Opening in-app chat with Marcus Vance...") },
                        onShareRide = { viewModel.showToast("Live trip tracking link copied to clipboard!") },
                        onSafetyCenterClick = { viewModel.showToast("Ride Go Safety Hotline: 0800 000 000") },
                        onTripDetailsClick = { viewModel.showToast("Trip Ref: #RG-LIVE-9920 • Fixed Fare R145.00") }
                    )
                } else {
                    DispatchScreen(
                        state = uiState,
                        onCancelRequest = { viewModel.cancelDispatch() },
                        onBack = { viewModel.cancelDispatch() },
                        onConfirmNow = { viewModel.confirmDriverNow() }
                    )
                }
            } else if (uiState.isRiderVerificationActive) {
                RiderVerificationScreen(
                    state = uiState.riderState,
                    onStepSelected = { viewModel.setRiderStep(it) },
                    onSwitchToDriver = {
                        viewModel.openDriverOnboarding()
                    },
                    onFullNameChange = { viewModel.updateRiderFullName(it) },
                    onPhoneChange = { viewModel.updateRiderPhone(it) },
                    onEmailChange = { viewModel.updateRiderEmail(it) },
                    onTosToggle = { viewModel.toggleRiderTos(it) },
                    onPromoToggle = { viewModel.toggleRiderPromo(it) },
                    onSendCodes = { viewModel.sendRiderVerificationCodes() },
                    onResendOtp = { viewModel.resendRiderOtp() },
                    onDocTypeSelected = { viewModel.selectRiderDocType(it) },
                    onTriggerIdCapture = { viewModel.triggerRiderIdCapture() },
                    onTriggerLiveness = { viewModel.triggerRiderFacialScan() },
                    onPaymentSelected = { viewModel.selectRiderPayment(it) },
                    onStartRiding = { viewModel.completeRiderVerificationAndRide() }
                )
            } else if (uiState.isDriverOnboardingActive) {
                DriverOnboardingScreen(
                    state = uiState.driverState,
                    onStepSelected = { viewModel.setDriverStep(it) },
                    onSwitchToRider = { viewModel.openRiderVerification() },
                    onClose = {
                        if (uiState.driverState.currentStep == 5) {
                            viewModel.completeDriverOnboarding()
                        } else {
                            viewModel.closeDriverOnboarding()
                        }
                    },
                    onFullNameChange = { viewModel.updateDriverFullName(it) },
                    onPhoneChange = { viewModel.updateDriverPhone(it) },
                    onCitySelected = { viewModel.selectDriverCity(it) },
                    onLicenseCodeSelected = { viewModel.selectDriverLicenseCode(it) },
                    onLicenseSerialChange = { viewModel.updateDriverLicenseSerial(it) },
                    onPrdpCategorySelected = { viewModel.selectDriverPrdpCategory(it) },
                    onPrdpExpiryChange = { viewModel.updateDriverPrdpExpiry(it) },
                    onReferralCodeChange = { viewModel.updateDriverReferralCode(it) },
                    onTermsToggle = { viewModel.toggleDriverTerms(it) },
                    onSapsConsentToggle = { viewModel.toggleSapsConsent() },
                    onScanBackId = { viewModel.scanBackId() },
                    onUploadPrdp = { viewModel.uploadPrdp() },
                    onTriggerBiometrics = { viewModel.triggerBiometricScan() },
                    onUploadDekra = { viewModel.uploadDekraCertificate() },
                    onSubmitVehicleReview = { viewModel.submitVehicleReview() },
                    onTogglePushNotifications = { viewModel.togglePushNotifications() },
                    onSupportClick = { viewModel.showToast("Ride Go 24/7 WhatsApp Hotline: 0800 000 000") }
                )
            } else {
                // Sliding tabs transition between Hub (Explore), Rides, Activity, Account
                AnimatedContent(
                    targetState = uiState.currentTab,
                    transitionSpec = {
                        val initialOrder = when (initialState) {
                            VoltScreenTab.EXPLORE -> 0
                            VoltScreenTab.RIDES -> 1
                            VoltScreenTab.ACTIVITY -> 2
                            VoltScreenTab.ACCOUNT -> 3
                            VoltScreenTab.DRIVER -> 4
                        }
                        val targetOrder = when (targetState) {
                            VoltScreenTab.EXPLORE -> 0
                            VoltScreenTab.RIDES -> 1
                            VoltScreenTab.ACTIVITY -> 2
                            VoltScreenTab.ACCOUNT -> 3
                            VoltScreenTab.DRIVER -> 4
                        }
                        val isForward = targetOrder >= initialOrder
                        if (isForward) {
                            (slideInHorizontally(
                                animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                                initialOffsetX = { fullWidth -> fullWidth }
                            ) + fadeIn(animationSpec = tween(220))).togetherWith(
                                slideOutHorizontally(
                                    animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                                    targetOffsetX = { fullWidth -> -fullWidth }
                                ) + fadeOut(animationSpec = tween(220))
                            )
                        } else {
                            (slideInHorizontally(
                                animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                                initialOffsetX = { fullWidth -> -fullWidth }
                            ) + fadeIn(animationSpec = tween(220))).togetherWith(
                                slideOutHorizontally(
                                    animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                                    targetOffsetX = { fullWidth -> fullWidth }
                                ) + fadeOut(animationSpec = tween(220))
                            )
                        }.using(SizeTransform(clip = false))
                    },
                    label = "main_tabs_slider",
                    modifier = Modifier.fillMaxSize()
                ) { tab ->
                    when (tab) {
                        VoltScreenTab.RIDES -> {
                            RidesScreen(
                                state = uiState,
                                onTierSelected = { viewModel.selectTier(it) },
                                onConfirmDispatch = { viewModel.startDispatch() },
                                onPromoClick = { viewModel.showToast("R20 Promo applied to this booking!") },
                                onPaymentSelected = { viewModel.selectPaymentMethod(it) },
                                onEditPickup = { viewModel.openDestinationSearch() },
                                onEditDestination = { viewModel.openDestinationSearch() }
                            )
                        }

                        VoltScreenTab.ACTIVITY -> {
                            ActivityScreen(
                                state = uiState,
                                onTabSelected = { viewModel.setActivityTab(it) },
                                onFilterSelected = { viewModel.setFilter(it) },
                                onReceiptClick = { viewModel.showReceipt(it) },
                                onRebookClick = { viewModel.rebookRide(it) },
                                onDismissReceipt = { viewModel.dismissReceipt() },
                                onDownloadStatement = { viewModel.showToast("Downloading October statement PDF...") },
                                onScheduleRide = { viewModel.showToast("Opening Schedule Ride picker...") },
                                onCancelReservation = { viewModel.showToast("Reservation #RG-RES-8821 cancelled successfully.") },
                                onEditReservation = { viewModel.showToast("Editing reservation #RG-RES-8821 details...") },
                                onDownloadExpenseReport = { viewModel.showToast("Exporting SARS-compliant VAT expense report...") }
                            )
                        }

                        VoltScreenTab.EXPLORE -> {
                            ExploreScreen(
                                pickupLocation = uiState.pickupLocation,
                                onBookToLocation = { dest -> viewModel.rebookRide(dest) },
                                onBookFastRide = { dest, tier -> viewModel.bookFastRide(dest, tier) },
                                onOpenSearch = { viewModel.openDestinationSearch() },
                                onRecenterLocation = { viewModel.showToast("Calibrated GPS on ${uiState.pickupLocation}") },
                                onClaimPromo = { viewModel.showToast("MZANSI30 Applied! 30% off your next 5 trips across Western Cape") }
                            )
                        }

                        VoltScreenTab.ACCOUNT -> {
                            AccountScreen(
                                onActionClick = { action -> viewModel.showToast(action) },
                                onSwitchToDriverClick = { viewModel.openDriverOnboarding() },
                                isRiderVerified = uiState.riderState.isVerified,
                                onVerifyRiderClick = { viewModel.openRiderVerification() },
                                onSignOutClick = { viewModel.signOut() }
                            )
                        }

                        VoltScreenTab.DRIVER -> {
                            LaunchedEffect(Unit) {
                                viewModel.selectTab(VoltScreenTab.EXPLORE)
                            }
                        }
                    }
                }
            }

        }
    }
}

            // App Update Available Floating Banner
            AnimatedVisibility(
                visible = uiState.appUpdateAvailable,
                enter = slideInVertically(initialOffsetY = { -it }) + fadeIn(),
                exit = slideOutVertically(targetOffsetY = { -it }) + fadeOut(),
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .statusBarsPadding()
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                val context = LocalContext.current
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(14.dp))
                        .background(VoltPrimaryContainer)
                        .border(1.dp, IceBlue.copy(alpha = 0.5f), RoundedCornerShape(14.dp))
                        .padding(horizontal = 14.dp, vertical = 10.dp)
                        .clickable {
                            if (!uiState.isDownloadingUpdate) {
                                viewModel.downloadAndInstallUpdate(context)
                            }
                        }
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.weight(1f)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(32.dp)
                                    .clip(CircleShape)
                                    .background(VoltOnPrimaryFixed.copy(alpha = 0.2f)),
                                contentAlignment = Alignment.Center
                            ) {
                                if (uiState.isDownloadingUpdate) {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(18.dp),
                                        color = VoltOnPrimaryFixed,
                                        strokeWidth = 2.dp
                                    )
                                } else {
                                    Icon(
                                        imageVector = Icons.Filled.SystemUpdate,
                                        contentDescription = "Update available",
                                        tint = VoltOnPrimaryFixed,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = if (uiState.isDownloadingUpdate) {
                                        "Downloading update... ${(uiState.updateDownloadProgress * 100).toInt()}%"
                                    } else {
                                        "New update ready • ${uiState.latestReleaseInfo?.tagName ?: "v1.1"}"
                                    },
                                    color = VoltOnPrimaryFixed,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = if (uiState.isDownloadingUpdate) "Please wait while APK downloads..." else "Tap to download & install update",
                                    color = VoltOnPrimaryFixed.copy(alpha = 0.85f),
                                    fontSize = 11.sp
                                )
                            }
                        }

                        if (!uiState.isDownloadingUpdate) {
                            IconButton(
                                onClick = { viewModel.dismissAppUpdateBanner() },
                                modifier = Modifier.size(24.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.Close,
                                    contentDescription = "Dismiss",
                                    tint = VoltOnPrimaryFixed,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }
                    }
                }
            }

            // Kinetic Toast Banner Overlay
            AnimatedVisibility(
                visible = uiState.toastMessage != null,
                enter = slideInVertically(initialOffsetY = { it }) + fadeIn(),
                exit = slideOutVertically(targetOffsetY = { it }) + fadeOut(),
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 16.dp)
                    .navigationBarsPadding()
            ) {
                uiState.toastMessage?.let { msg ->
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .shadow(12.dp, spotColor = VoltPrimaryContainer)
                            .background(VoltPrimaryContainer)
                            .padding(horizontal = 18.dp, vertical = 10.dp)
                            .testTag("kinetic_toast"),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.CheckCircle,
                                contentDescription = null,
                                tint = VoltOnPrimaryFixed,
                                modifier = Modifier.size(18.dp)
                            )
                            Text(
                                text = "  $msg",
                                color = VoltOnPrimaryFixed,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

    }
}
