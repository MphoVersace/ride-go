package com.example.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.model.DriverOnboardingState
import com.example.model.RideTierType
import com.example.model.RiderIdDocType
import com.example.model.RiderVerificationState
import com.example.model.TripHistoryItem
import com.example.model.VoltScreenTab
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class VoltUiState(
    val currentTab: VoltScreenTab = VoltScreenTab.EXPLORE,
    val isSplashActive: Boolean = true,
    val isAuthenticated: Boolean = false,
    val userDisplayName: String = "Sipho M.",
    val userEmail: String = "sipho.m@capetown.co.za",
    val userPhone: String = "+27 82 492 1093",
    val selectedTier: RideTierType = RideTierType.COMFORT,
    val isDispatchActive: Boolean = false,
    val dispatchStatusText: String = "Securing priority lane dispatch...",
    val dispatchProgress: Float = 0.45f,
    val isDriverMatched: Boolean = false,
    val matchedDriverName: String = "Marcus Vance",
    val matchedVehicle: String = "Toyota Corolla Quest",
    val driverRating: String = "4.97",
    val driverTripsCount: String = "1,420 trips",
    val driverPhotoUrl: String = "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNJ6swvCY1onaSSJdXSEvu2F89aEMyTQSAAqafOSvzSXe31lB_6zXU3nRdps2Iw6kxkBcdR2BVfy5oOvwmnUiqg10MYml42CCf_HKPXuj0nQRmhu-WUYPQZZHdu-4LIcWsqMZiiE0sspJZbShLG-0UQ2crJYTwEW3uc9rmst3kZl2zTiw5wX4R9EdRN-rC05fFqr2DxFCjp0fPNYP7yEQK_V3jMKRhQLxSuJHkwwjAWG-1lA5oNBJIDCuMYONcAN3Ew",
    val driverLicensePlate: String = "JM 42 KL • GP",
    val driverProvince: String = "Gauteng",
    val driverVehicleColor: String = "Midnight Silver Metallic",
    val rideSecurityPin: String = "4819",
    val driverEtaMinutes: Int = 3,
    val driverEtaTimeFormatted: String = "09:42 AM",
    val activeActivityTab: String = "Past Trips", // Past Trips, Upcoming (1), Business
    val activeFilter: String = "Last 30 Days",
    val toastMessage: String? = null,
    val selectedReceipt: TripHistoryItem? = null,
    val pickupLocation: String = "Sandton City (Rivonia Rd Entrance)",
    val destinationLocation: String = "O.R. Tambo Int'l Airport (Terminal A)",
    val trips: List<TripHistoryItem> = emptyList(),
    val isDriverOnboardingActive: Boolean = false,
    val driverState: DriverOnboardingState = DriverOnboardingState(),
    val isRiderVerificationActive: Boolean = false,
    val riderState: RiderVerificationState = RiderVerificationState(),
    val isRiderVerified: Boolean = false,
    val riderPromoApplied: Boolean = false
)

class VoltViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(
        VoltUiState(
            trips = listOf(
                TripHistoryItem(
                    id = "trip-1",
                    title = "Ride Go Comfort",
                    tierTag = "COMFORT",
                    timestamp = "Yesterday • 8:15 PM",
                    fareFormatted = "R125.00",
                    isCompleted = true,
                    pickupLocation = "V&A Waterfront (Breakwater Blvd, Cape Town)",
                    dropoffLocation = "Camps Bay Promenade (Victoria Rd)",
                    driverName = "Marcus",
                    driverCar = "Toyota Corolla",
                    driverRating = 5.0,
                    paymentMethod = "Capitec Pay (•••• 4282)",
                    receiptId = "RCPT-98214",
                    tripDistanceKm = 8.5
                ),
                TripHistoryItem(
                    id = "trip-2",
                    title = "Ride Go Black",
                    tierTag = "BLACK",
                    timestamp = "Oct 12 • 11:30 AM",
                    fareFormatted = "R280.00",
                    isCompleted = true,
                    pickupLocation = "Cape Town Int'l Airport (CPT Terminal 2)",
                    dropoffLocation = "Century City (Bridgeway Precinct, Cape Town)",
                    userRating = 5,
                    paymentMethod = "Capitec Pay (•••• 4282)",
                    receiptId = "RCPT-97812",
                    tripDistanceKm = 21.3
                ),
                TripHistoryItem(
                    id = "trip-3",
                    title = "Ride Go Saver",
                    tierTag = "SAVER",
                    timestamp = "Oct 9 • 6:45 PM",
                    fareFormatted = "R75.00",
                    isCompleted = true,
                    pickupLocation = "Green Point (Somerset Road, Cape Town)",
                    dropoffLocation = "Kloof Street (Gardens, Cape Town)",
                    paymentMethod = "Bank Card (•••• 4019)",
                    receiptId = "RCPT-97103",
                    tripDistanceKm = 4.7
                )
            )
        )
    )
    val uiState: StateFlow<VoltUiState> = _uiState.asStateFlow()

    private var dispatchJob: Job? = null

    private val dispatchStates = listOf(
        "Contacting nearby driver...",
        "Matching with nearby Go Comfort vehicle...",
        "Driver confirming route clearance...",
        "Securing route dispatch..."
    )

    fun selectTab(tab: VoltScreenTab) {
        _uiState.update {
            it.copy(
                currentTab = tab,
                isDriverOnboardingActive = (tab == VoltScreenTab.DRIVER),
                isRiderVerificationActive = false
            )
        }
    }

    fun selectTier(tier: RideTierType) {
        _uiState.update { it.copy(selectedTier = tier) }
    }

    fun setActivityTab(tab: String) {
        _uiState.update { it.copy(activeActivityTab = tab) }
        showToast("$tab view loaded")
    }

    fun setFilter(filter: String) {
        _uiState.update { it.copy(activeFilter = filter) }
        showToast("Filtering by: $filter")
    }

    fun startDispatch() {
        _uiState.update {
            it.copy(
                isDispatchActive = true,
                isDriverMatched = false,
                dispatchStatusText = "Scanning nearby verified drivers...",
                dispatchProgress = 0.35f
            )
        }
        dispatchJob?.cancel()
        dispatchJob = viewModelScope.launch {
            delay(1800)
            _uiState.update {
                it.copy(
                    dispatchStatusText = "Connecting with nearest Go Comfort vehicle...",
                    dispatchProgress = 0.65f
                )
            }
            delay(1800)
            _uiState.update {
                it.copy(
                    dispatchStatusText = "Marcus Vance confirmed your ride request!",
                    dispatchProgress = 1.0f,
                    isDriverMatched = true
                )
            }
            showToast("Driver confirmed! Marcus is 3 mins away.")
        }
    }

    fun confirmDriverNow() {
        dispatchJob?.cancel()
        _uiState.update {
            it.copy(
                isDispatchActive = true,
                isDriverMatched = true,
                dispatchStatusText = "Driver Marcus Vance confirmed your booking!",
                dispatchProgress = 1.0f
            )
        }
        showToast("Marcus Vance confirmed! Live trip tracking started.")
    }

    fun cancelDispatch() {
        dispatchJob?.cancel()
        _uiState.update {
            it.copy(
                isDispatchActive = false,
                isDriverMatched = false
            )
        }
        showToast("Ride request cancelled")
    }

    fun rebookRide(destination: String) {
        _uiState.update {
            it.copy(
                destinationLocation = destination,
                currentTab = VoltScreenTab.RIDES
            )
        }
        showToast("Route pre-set to: $destination")
    }

    fun bookFastRide(destination: String, tier: RideTierType? = null) {
        _uiState.update {
            it.copy(
                destinationLocation = destination,
                selectedTier = tier ?: it.selectedTier,
                currentTab = VoltScreenTab.RIDES
            )
        }
        showToast("Fast booking selected: $destination")
    }

    fun showReceipt(item: TripHistoryItem) {
        _uiState.update { it.copy(selectedReceipt = item) }
    }

    fun dismissReceipt() {
        _uiState.update { it.copy(selectedReceipt = null) }
    }

    fun showToast(msg: String) {
        _uiState.update { it.copy(toastMessage = msg) }
        viewModelScope.launch {
            delay(2800)
            _uiState.update { if (it.toastMessage == msg) it.copy(toastMessage = null) else it }
        }
    }

    fun clearToast() {
        _uiState.update { it.copy(toastMessage = null) }
    }

    // Driver Onboarding Actions
    fun openDriverOnboarding(step: Int = 1) {
        _uiState.update {
            it.copy(
                isDriverOnboardingActive = true,
                isRiderVerificationActive = false,
                driverState = it.driverState.copy(currentStep = step.coerceIn(1, 5))
            )
        }
    }

    fun closeDriverOnboarding() {
        _uiState.update { it.copy(isDriverOnboardingActive = false) }
    }

    fun setDriverStep(step: Int) {
        val clamped = step.coerceIn(1, 5)
        _uiState.update { it.copy(driverState = it.driverState.copy(currentStep = clamped)) }
    }

    fun updateDriverFullName(name: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(fullName = name)) }
    }

    fun updateDriverPhone(phone: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(phoneNumber = phone)) }
    }

    fun selectDriverCity(city: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(selectedCity = city)) }
    }

    fun selectDriverLicenseCode(code: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(licenseCode = code)) }
    }

    fun updateDriverLicenseSerial(serial: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(licenseSerial = serial)) }
    }

    fun selectDriverPrdpCategory(category: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(prdpCategory = category)) }
    }

    fun updateDriverPrdpExpiry(expiry: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(prdpExpiry = expiry)) }
    }

    fun updateDriverReferralCode(code: String) {
        _uiState.update { it.copy(driverState = it.driverState.copy(referralCode = code)) }
    }

    fun toggleDriverTerms(accepted: Boolean) {
        _uiState.update { it.copy(driverState = it.driverState.copy(termsAccepted = accepted)) }
    }

    fun toggleSapsConsent() {
        _uiState.update {
            val next = !it.driverState.sapsConsent
            it.copy(driverState = it.driverState.copy(sapsConsent = next))
        }
    }

    fun scanBackId() {
        _uiState.update {
            it.copy(driverState = it.driverState.copy(idBackScanned = true))
        }
        showToast("PDF417 Barcode Verified ✓")
    }

    fun uploadPrdp() {
        _uiState.update {
            it.copy(driverState = it.driverState.copy(prdpUploaded = true))
        }
        showToast("PrDP License Uploaded ✓")
    }

    fun triggerBiometricScan() {
        if (_uiState.value.driverState.isScanningBiometrics) return
        _uiState.update {
            it.copy(driverState = it.driverState.copy(isScanningBiometrics = true))
        }
        viewModelScope.launch {
            delay(1600)
            _uiState.update {
                it.copy(
                    driverState = it.driverState.copy(
                        isScanningBiometrics = false,
                        biometricsVerified = true
                    )
                )
            }
            showToast("Liveness Confirmed ✓ 99.8% Match")
        }
    }

    fun uploadDekraCertificate() {
        _uiState.update {
            it.copy(driverState = it.driverState.copy(dekraUploaded = true))
        }
        showToast("DEKRA Certificate Uploaded ✓")
    }

    fun submitVehicleReview() {
        _uiState.update {
            it.copy(
                driverState = it.driverState.copy(
                    isSubmittingVehicle = true,
                    currentStep = 5
                )
            )
        }
        showToast("Vehicle submitted for review ✓")
    }

    fun togglePushNotifications() {
        _uiState.update {
            val next = !it.driverState.pushNotificationsEnabled
            it.copy(driverState = it.driverState.copy(pushNotificationsEnabled = next))
        }
        val isNow = _uiState.value.driverState.pushNotificationsEnabled
        showToast(if (isNow) "Notifications Activated ✓" else "Notifications Paused")
    }

    // --- Rider Verification Flow Actions ---
    fun openRiderVerification(step: Int = 1) {
        _uiState.update {
            it.copy(
                isRiderVerificationActive = true,
                isDriverOnboardingActive = false,
                riderState = it.riderState.copy(currentStep = step)
            )
        }
    }

    fun closeRiderVerification() {
        _uiState.update { it.copy(isRiderVerificationActive = false) }
    }

    fun setRiderStep(step: Int) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(currentStep = step.coerceIn(1, 5)))
        }
    }

    fun updateRiderFullName(name: String) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(fullName = name))
        }
    }

    fun updateRiderPhone(phone: String) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(phone = phone))
        }
    }

    fun updateRiderEmail(email: String) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(email = email))
        }
    }

    fun toggleRiderTos(accepted: Boolean) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(tosAccepted = accepted))
        }
    }

    fun toggleRiderPromo(accepted: Boolean) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(promoAccepted = accepted))
        }
    }

    fun sendRiderVerificationCodes() {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(isSendingOtp = true))
        }
        viewModelScope.launch {
            delay(900)
            _uiState.update {
                it.copy(
                    riderState = it.riderState.copy(
                        isSendingOtp = false,
                        currentStep = 2
                    )
                )
            }
            showToast("SMS & Email OTP Dispatched ✓")
        }
    }

    fun resendRiderOtp() {
        showToast("New OTP sent to +27 71 839 2041 and Email")
    }

    fun selectRiderDocType(type: RiderIdDocType) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(selectedDocType = type))
        }
    }

    fun triggerRiderIdCapture() {
        if (_uiState.value.riderState.isScanningId) return
        _uiState.update {
            it.copy(riderState = it.riderState.copy(isScanningId = true))
        }
        viewModelScope.launch {
            delay(1200)
            _uiState.update {
                it.copy(
                    riderState = it.riderState.copy(
                        isScanningId = false,
                        isIdCaptured = true
                    )
                )
            }
            showToast("ID Verified Successfully ✓")
        }
    }

    fun triggerRiderFacialScan() {
        if (_uiState.value.riderState.isScanningLiveness) return
        _uiState.update {
            it.copy(riderState = it.riderState.copy(isScanningLiveness = true))
        }
        viewModelScope.launch {
            delay(1500)
            _uiState.update {
                it.copy(
                    riderState = it.riderState.copy(
                        isScanningLiveness = false,
                        isLivenessVerified = true
                    )
                )
            }
            showToast("Liveness Verified ✓")
        }
    }

    fun selectRiderPayment(payment: String) {
        _uiState.update {
            it.copy(riderState = it.riderState.copy(selectedPayment = payment))
        }
        showToast("Payment: $payment selected")
    }

    fun completeRiderVerificationAndRide() {
        _uiState.update {
            val name = it.riderState.fullName.ifBlank { it.userDisplayName }
            it.copy(
                isRiderVerificationActive = false,
                isRiderVerified = true,
                isAuthenticated = true,
                userDisplayName = name,
                userEmail = it.riderState.email.ifBlank { it.userEmail },
                userPhone = it.riderState.phone.ifBlank { it.userPhone },
                riderPromoApplied = true,
                riderState = it.riderState.copy(isVerified = true),
                currentTab = VoltScreenTab.RIDES
            )
        }
        showToast("R50 Voucher Activated! Ready to ride ⚡")
    }

    fun startRiderSignUpFromAuth(name: String = "", email: String = "", phone: String = "") {
        _uiState.update {
            it.copy(
                isRiderVerificationActive = true,
                isDriverOnboardingActive = false,
                riderState = it.riderState.copy(
                    currentStep = 1,
                    fullName = if (name.isNotBlank()) name else it.riderState.fullName,
                    email = if (email.isNotBlank()) email else it.riderState.email,
                    phone = if (phone.isNotBlank()) phone else it.riderState.phone
                )
            )
        }
    }

    fun startDriverSignUpFromAuth(name: String = "", phone: String = "") {
        _uiState.update {
            it.copy(
                isDriverOnboardingActive = true,
                isRiderVerificationActive = false,
                driverState = it.driverState.copy(
                    currentStep = 1,
                    fullName = if (name.isNotBlank()) name else it.driverState.fullName,
                    phoneNumber = if (phone.isNotBlank()) phone else it.driverState.phoneNumber
                )
            )
        }
    }

    fun completeDriverOnboarding() {
        _uiState.update {
            val name = it.driverState.fullName.ifBlank { it.userDisplayName }
            it.copy(
                isDriverOnboardingActive = false,
                isAuthenticated = true,
                userDisplayName = name,
                userPhone = it.driverState.phoneNumber.ifBlank { it.userPhone },
                currentTab = VoltScreenTab.DRIVER,
                toastMessage = "Driver Onboarding Complete! Welcome Partner ⚡"
            )
        }
    }

    fun finishSplash() {
        _uiState.update { it.copy(isSplashActive = false) }
    }

    fun login(emailOrPhone: String, displayName: String = "Sipho M.") {
        _uiState.update {
            it.copy(
                isAuthenticated = true,
                isSplashActive = false,
                userDisplayName = displayName,
                userEmail = if (emailOrPhone.contains("@")) emailOrPhone else it.userEmail,
                userPhone = if (!emailOrPhone.contains("@")) emailOrPhone else it.userPhone,
                toastMessage = "Welcome back to Ride GO, $displayName!"
            )
        }
    }

    fun signUp(name: String, email: String, phone: String) {
        _uiState.update {
            it.copy(
                isAuthenticated = true,
                isSplashActive = false,
                userDisplayName = name,
                userEmail = email,
                userPhone = phone,
                toastMessage = "Account created! Welcome to Ride GO, $name!"
            )
        }
    }

    fun continueAsGuest() {
        _uiState.update {
            it.copy(
                isAuthenticated = true,
                isSplashActive = false,
                toastMessage = "Exploring Ride GO as Guest"
            )
        }
    }

    fun signOut() {
        _uiState.update {
            it.copy(
                isAuthenticated = false,
                toastMessage = "Signed out successfully"
            )
        }
    }
}

