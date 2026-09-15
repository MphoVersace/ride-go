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
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import com.example.viewmodel.VoltUiState
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
import com.example.ui.screens.ChatScreen
import com.example.ui.screens.SafetyCenterScreen
import com.example.ui.screens.ShareRideScreen
import com.example.ui.screens.TripCompletedScreen
import com.example.model.RidePhase
import com.example.model.UserRole
import com.example.model.DriverStatus
import com.example.model.DriverScreenTab
import com.example.ui.components.DriverBottomNav
import com.example.ui.screens.driver.DriverDashboardScreen
import com.example.ui.screens.driver.DriverIncomingOfferModal
import com.example.ui.screens.driver.DriverActiveTripScreen
import com.example.ui.screens.driver.DriverEarningsScreen
import com.example.ui.screens.driver.DriverProfileScreen
import kotlinx.coroutines.delay
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
import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.ui.platform.LocalContext
import com.example.ui.screens.DestinationSearchScreen
import com.example.ui.theme.IceBlue
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.viewmodel.VoltViewModel
import androidx.compose.ui.graphics.Color


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
    val context = LocalContext.current

    // Request location permissions as soon as the root composable enters composition.
    // If already granted, resolve immediately. If not, the launcher requests them.
    val locationPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val granted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true ||
            permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
        if (granted) {
            viewModel.resolveUserLocation(context)
        }
    }

    // Trigger permission request once (and resolve immediately if already granted)
    LaunchedEffect(Unit) {
        val fineGranted = context.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) ==
            PackageManager.PERMISSION_GRANTED
        val coarseGranted = context.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) ==
            PackageManager.PERMISSION_GRANTED
        if (fineGranted || coarseGranted) {
            viewModel.resolveUserLocation(context)
        } else {
            locationPermissionLauncher.launch(
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )
            )
        }
        viewModel.checkForAppUpdates()
    }


    // Auto-transition driver from approaching to arrived after 12 seconds in live demo
    LaunchedEffect(uiState.isDriverMatched, uiState.ridePhase) {
        if (uiState.isDriverMatched && uiState.ridePhase == RidePhase.APPROACHING) {
            delay(12000L)
            viewModel.driverArrived()
        }
    }

    // Handle back button across all active flows and modal sheets
    BackHandler(
        enabled = uiState.userRole == UserRole.DRIVER ||
            uiState.isChatOpen ||
            uiState.isSafetyOpen ||
            uiState.isShareOpen ||
            uiState.isSearchDestinationActive ||
            uiState.isDispatchActive ||
            uiState.isRiderVerificationActive ||
            uiState.isDriverOnboardingActive
    ) {
        if (uiState.userRole == UserRole.DRIVER) {
            if (uiState.driverStatus == DriverStatus.OFFER_RECEIVED) {
                viewModel.declineTripOffer()
            } else if (uiState.driverTab != DriverScreenTab.CONSOLE) {
                viewModel.selectDriverTab(DriverScreenTab.CONSOLE)
            } else {
                viewModel.switchUserRole(UserRole.RIDER)
            }
        } else if (uiState.isChatOpen) {
            viewModel.closeChat()
        } else if (uiState.isSafetyOpen) {
            viewModel.closeSafetyCenter()
        } else if (uiState.isShareOpen) {
            viewModel.closeShareRide()
        } else if (uiState.isSearchDestinationActive) {
            viewModel.closeDestinationSearch()
        } else if (uiState.isDispatchActive) {
            if (uiState.ridePhase == RidePhase.IN_PROGRESS) {
                viewModel.showToast("Trip in progress. Please wait until arrival.")
            } else if (uiState.ridePhase == RidePhase.COMPLETED) {
                viewModel.skipRating()
            } else {
                viewModel.cancelDispatch()
            }
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

    if (uiState.isSplashActive) {
        // Loading / Splash Screen showing just the brand logo
        SplashScreen(
            onSplashComplete = { viewModel.finishSplash() }
        )
    } else if (!uiState.isAuthenticated && !uiState.isRiderVerificationActive && !uiState.isDriverOnboardingActive) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Sign Up / Login Screen with direct pathways to Rider & Driver onboarding
            AuthScreen(
                onSignInSuccess = { emailOrPhone ->
                    viewModel.switchUserRole(UserRole.RIDER)
                    viewModel.login(emailOrPhone)
                },
                onSignInAsDriver = { emailOrPhone ->
                    viewModel.switchUserRole(UserRole.DRIVER)
                    viewModel.login(emailOrPhone, displayName = "Thulane J. Sigasa")
                },
                onStartRiderSignUp = { name, email, phone ->
                    viewModel.startRiderSignUpFromAuth(name, email, phone)
                },
                onStartDriverSignUp = { name, phone ->
                    viewModel.startDriverSignUpFromAuth(name, phone)
                },
                onContinueAsGuest = {
                    viewModel.switchUserRole(UserRole.RIDER)
                    viewModel.continueAsGuest()
                }
            )

            // App Update Available Floating Banner on Auth Screen
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
                UpdateBannerContent(
                    uiState = uiState,
                    onDownloadClick = { viewModel.downloadAndInstallUpdate(context) },
                    onDismiss = { viewModel.dismissAppUpdateBanner() }
                )
            }

            // Kinetic Toast Banner Overlay on Auth Screen
            AnimatedVisibility(
                visible = uiState.toastMessage != null,
                enter = slideInVertically(initialOffsetY = { it }, animationSpec = tween(100)) + fadeIn(animationSpec = tween(100)),
                exit = slideOutVertically(targetOffsetY = { it }, animationSpec = tween(100)) + fadeOut(animationSpec = tween(100)),
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
                            .testTag("kinetic_toast_auth"),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.CheckCircle,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                            Text(
                                text = "  $msg",
                                color = Color.White,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
    } else if (uiState.isSearchDestinationActive) {
        // Destination Search screen with current location and South Africa place filtering
        DestinationSearchScreen(
            state = uiState,
            onBack = { viewModel.closeDestinationSearch() },
            onSelectDestination = { destination, pickup ->
                viewModel.selectDestination(destination, pickup)
            }
        )
    } else if (uiState.userRole == UserRole.DRIVER) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(VoltSurface)
        ) {
            // Driver Screen tabs
            when (uiState.driverTab) {
                DriverScreenTab.CONSOLE -> {
                    DriverDashboardScreen(
                        state = uiState,
                        onToggleOnline = { viewModel.toggleDriverOnline() },
                        onSimulateOffer = { viewModel.simulateIncomingRideOffer() },
                        onNavigateToTrip = { viewModel.selectDriverTab(DriverScreenTab.ACTIVE_TRIP) },
                        onNavigateToEarnings = { viewModel.selectDriverTab(DriverScreenTab.EARNINGS) }
                    )
                }
                DriverScreenTab.ACTIVE_TRIP -> {
                    DriverActiveTripScreen(
                        state = uiState,
                        onArrivedAtPickup = { viewModel.driverArrivedAtPickup() },
                        onStartTrip = { pin -> viewModel.verifyRiderPinAndStart(pin) },
                        onCompleteTrip = { viewModel.driverCompleteTrip() },
                        onFinishSummary = { rating -> viewModel.driverFinishTripSummary(rating) },
                        onCallRider = { viewModel.showToast("Calling passenger (+27 82 491 8204)...") },
                        onChatRider = { viewModel.showToast("Opening chat with passenger...") }
                    )
                }
                DriverScreenTab.EARNINGS -> {
                    DriverEarningsScreen(
                        state = uiState,
                        onCashOut = { bank -> viewModel.cashOutDriverEarnings(bank) }
                    )
                }
                DriverScreenTab.PROFILE -> {
                    DriverProfileScreen(
                        state = uiState,
                        onSwitchToRider = { viewModel.switchUserRole(UserRole.RIDER) },
                        onSignOut = { viewModel.signOut() }
                    )
                }
            }

            // Driver Incoming Offer Modal
            AnimatedVisibility(
                visible = uiState.driverStatus == DriverStatus.OFFER_RECEIVED && uiState.currentTripOffer != null,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                uiState.currentTripOffer?.let { offer ->
                    DriverIncomingOfferModal(
                        offer = offer,
                        onAccept = { viewModel.acceptTripOffer() },
                        onDecline = { viewModel.declineTripOffer() }
                    )
                }
            }

            // Driver Bottom Navigation Bar
            DriverBottomNav(
                currentTab = uiState.driverTab,
                onTabSelected = { viewModel.selectDriverTab(it) },
                modifier = Modifier.align(Alignment.BottomCenter)
            )

            // Kinetic Toast Banner Overlay for Driver
            AnimatedVisibility(
                visible = uiState.toastMessage != null,
                enter = slideInVertically(initialOffsetY = { it }, animationSpec = tween(100)) + fadeIn(animationSpec = tween(100)),
                exit = slideOutVertically(targetOffsetY = { it }, animationSpec = tween(100)) + fadeOut(animationSpec = tween(100)),
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 88.dp)
                    .navigationBarsPadding()
            ) {
                uiState.toastMessage?.let { msg ->
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .shadow(12.dp, spotColor = VoltPrimaryContainer)
                            .background(VoltPrimaryContainer)
                            .padding(horizontal = 18.dp, vertical = 10.dp)
                            .testTag("kinetic_toast_driver"),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Filled.CheckCircle,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                            Text(
                                text = "  $msg",
                                color = Color.White,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
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
        containerColor = VoltSurface
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = innerPadding.calculateTopPadding())
        ) {
            // Main Screen content switcher
            if (uiState.isDispatchActive) {
                if (uiState.isDriverMatched) {
                    if (uiState.ridePhase == RidePhase.COMPLETED) {
                        TripCompletedScreen(
                            state = uiState,
                            onSubmitRating = { rating -> viewModel.submitRating(rating) },
                            onSkip = { viewModel.skipRating() }
                        )
                    } else {
                        LiveTrackingScreen(
                            state = uiState,
                            onBack = {
                                if (uiState.ridePhase == RidePhase.IN_PROGRESS) {
                                    viewModel.showToast("Trip in progress. Please wait until arrival.")
                                } else {
                                    viewModel.cancelDispatch()
                                }
                            },
                            onCancelRide = { viewModel.cancelDispatch() },
                            onCallDriver = { viewModel.showToast("Calling ${uiState.matchedDriverName} (+27 71 839 2041)...") },
                            onMessageDriver = { viewModel.openChat() },
                            onShareRide = { viewModel.openShareRide() },
                            onSafetyCenterClick = { viewModel.openSafetyCenter() },
                            onStartRide = { viewModel.startRide() },
                            onCompleteTripNow = { viewModel.completeTrip() },
                            onTripDetailsClick = { viewModel.showToast("Trip Ref: #RG-LIVE-9920 • Fixed Fare R${uiState.tripFareTotal}.00") }
                        )
                    }
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
                                userLat = uiState.userLat,
                                userLon = uiState.userLon,
                                onBookToLocation = { dest -> viewModel.rebookRide(dest) },
                                onBookFastRide = { dest, tier -> viewModel.bookFastRide(dest, tier) },
                                onOpenSearch = { viewModel.openDestinationSearch() },
                                onRecenterLocation = {
                                    // Re-acquire GPS on recenter tap
                                    viewModel.resolveUserLocation(context)
                                },
                                onClaimPromo = { viewModel.showToast("MZANSI30 Applied! 30% off your next 5 trips across Western Cape") }
                            )
                        }

                        VoltScreenTab.ACCOUNT -> {
                            AccountScreen(
                                onActionClick = { action -> viewModel.showToast(action) },
                                onSwitchToDriverClick = { viewModel.switchUserRole(UserRole.DRIVER) },
                                isRiderVerified = uiState.riderState.isVerified,
                                onVerifyRiderClick = { viewModel.openRiderVerification() },
                                onSignOutClick = { viewModel.signOut() }
                            )
                        }

                        VoltScreenTab.DRIVER -> {
                            LaunchedEffect(Unit) {
                                viewModel.switchUserRole(UserRole.DRIVER)
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
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                val context = LocalContext.current
                UpdateBannerContent(
                    uiState = uiState,
                    onDownloadClick = { viewModel.downloadAndInstallUpdate(context) },
                    onDismiss = { viewModel.dismissAppUpdateBanner() }
                )
            }

            // Kinetic Toast Banner Overlay
            val hasBottomNav = !uiState.isDispatchActive && !uiState.isRiderVerificationActive && !uiState.isDriverOnboardingActive
            AnimatedVisibility(
                visible = uiState.toastMessage != null,
                enter = slideInVertically(initialOffsetY = { it }, animationSpec = tween(100)) + fadeIn(animationSpec = tween(100)),
                exit = slideOutVertically(targetOffsetY = { it }, animationSpec = tween(100)) + fadeOut(animationSpec = tween(100)),
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = if (hasBottomNav) 88.dp else 16.dp)
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
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                            Text(
                                text = "  $msg",
                                color = Color.White,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            // In-app Rider-Driver Chat Overlay
            AnimatedVisibility(
                visible = uiState.isChatOpen,
                enter = slideInHorizontally(initialOffsetX = { it }) + fadeIn(),
                exit = slideOutHorizontally(targetOffsetX = { it }) + fadeOut()
            ) {
                ChatScreen(
                    state = uiState,
                    onBack = { viewModel.closeChat() },
                    onSendMessage = { text -> viewModel.sendChatMessage(text) },
                    onCallDriver = { viewModel.showToast("Calling ${uiState.matchedDriverName} (+27 71 839 2041)...") }
                )
            }

            // Safety Center Overlay
            AnimatedVisibility(
                visible = uiState.isSafetyOpen,
                enter = slideInHorizontally(initialOffsetX = { it }) + fadeIn(),
                exit = slideOutHorizontally(targetOffsetX = { it }) + fadeOut()
            ) {
                SafetyCenterScreen(
                    state = uiState,
                    onBack = { viewModel.closeSafetyCenter() },
                    onTriggerSOS = { viewModel.triggerSOS() },
                    onToggleLiveShare = { viewModel.toggleLiveShare() },
                    onShareToContact = { contact -> viewModel.shareRideToContact(contact) }
                )
            }

            // Share Ride Overlay
            AnimatedVisibility(
                visible = uiState.isShareOpen,
                enter = slideInHorizontally(initialOffsetX = { it }) + fadeIn(),
                exit = slideOutHorizontally(targetOffsetX = { it }) + fadeOut()
            ) {
                ShareRideScreen(
                    state = uiState,
                    onBack = { viewModel.closeShareRide() },
                    onCopyLink = { viewModel.copyTripLink() },
                    onShareViaSystem = { viewModel.shareRideViaSystem() },
                    onShareToContact = { contact -> viewModel.shareRideToContact(contact) },
                    onToggleLiveShare = { viewModel.toggleLiveShare() }
                )
            }

            // Floating Stadium Pill Bottom Navigation Bar (Overlaid directly with 100% transparent footer)
            if (hasBottomNav) {
                VoltBottomNav(
                    currentTab = uiState.currentTab,
                    onTabSelected = { viewModel.selectTab(it) },
                    modifier = Modifier.align(Alignment.BottomCenter)
                )
            }
        }
    }
}
}


@Composable
private fun UpdateBannerContent(
    uiState: VoltUiState,
    onDownloadClick: () -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(VoltPrimaryContainer)
            .border(1.dp, IceBlue.copy(alpha = 0.5f), RoundedCornerShape(14.dp))
            .padding(horizontal = 14.dp, vertical = 10.dp)
            .clickable {
                if (!uiState.isDownloadingUpdate) {
                    onDownloadClick()
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
                    onClick = onDismiss,
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
