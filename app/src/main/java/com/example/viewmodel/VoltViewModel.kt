package com.example.viewmodel

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.model.ChatMessage
import com.example.model.DriverDailyEarning
import com.example.model.DriverOnboardingState
import com.example.model.DriverScreenTab
import com.example.model.DriverStatus
import com.example.model.DriverTripOffer
import com.example.model.NominatimSuggestion
import com.example.model.RidePhase
import com.example.model.RideTierType
import com.example.model.RiderIdDocType
import com.example.model.RiderVerificationState
import com.example.model.TripHistoryItem
import com.example.model.TrustedContact
import com.example.model.UserRole
import com.example.model.VoltScreenTab
import com.example.util.AppReleaseInfo
import com.example.util.LocationRepository
import com.example.util.UpdateManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

data class VoltUiState(
    val currentTab: VoltScreenTab = VoltScreenTab.EXPLORE,
    val isSplashActive: Boolean = true,
    val isAuthenticated: Boolean = false,
    val userDisplayName: String = "Thulane J. Sigasa",
    val userEmail: String = "thulane.sigasa@ridego.co.za",
    val userPhone: String = "+27 71 839 2041",
    val selectedTier: RideTierType = RideTierType.COMFORT,
    val isDispatchActive: Boolean = false,
    val dispatchStatusText: String = "Securing priority lane dispatch...",
    val dispatchProgress: Float = 0.45f,
    val isDriverMatched: Boolean = false,
    val matchedDriverName: String = "Thulane J. Sigasa",
    val matchedVehicle: String = "Toyota Corolla Quest",
    val driverRating: String = "4.97",
    val driverTripsCount: String = "1,420 trips",
    val driverPhotoUrl: String = "https://lh3.googleusercontent.com/aida/AEtjO1VXAw8bNm11zgxl6J_ZJcmZClK6WZy2m8yCamAD0Pywbo0TpybXWRmifk7uO0LcyjwXFBiHSAa0e3gqQUCeomu0vqokffoEY1hU1gHMzQJAAzxZHPLV8LNTEr3PJvNV4uXwxuihe9E8Jw_pnHG0rNh32Qa-a8qb89oEIULV_a8w87C1_Q_M4WDi1ss9nExL7jS0FGDRiNKujBXUDtFPcTfZMJ74wCT3lghmRsD__3r5PSKcCjYvdz-7mbQmx5hwD8ZxovCmHoW5Ww",
    val driverLicensePlate: String = "TJS 001 GP",
    val driverProvince: String = "Gauteng",
    val driverVehicleColor: String = "Midnight Silver Metallic",
    val rideSecurityPin: String = "4819",
    val driverStartDistanceKm: Float = 2.4f,
    val driverDistanceText: String = "2.4 km",
    val driverApproachAngle: Float = 45f,
    val driverEtaMinutes: Int = 3,
    val driverEtaTimeFormatted: String = "09:42 AM",
    val activeActivityTab: String = "Past Trips", // Past Trips, Upcoming (1), Business
    val activeFilter: String = "Last 30 Days",
    val toastMessage: String? = null,
    val selectedReceipt: TripHistoryItem? = null,
    // Real GPS coordinates resolved from the device (null = not yet resolved)
    val userLat: Double? = null,
    val userLon: Double? = null,
    val isLocating: Boolean = false,
    val pickupLocation: String = "Locating...",
    val destinationLocation: String = "O.R. Tambo Int'l Airport (Terminal A)",
    // Real geocoded destination coordinates (null = not yet resolved or uses keyword fallback)
    val destinationLat: Double? = null,
    val destinationLon: Double? = null,
    // Live Nominatim address search state
    val addressSuggestions: List<NominatimSuggestion> = emptyList(),
    val isSuggestionsLoading: Boolean = false,
    val trips: List<TripHistoryItem> = emptyList(),
    val isDriverOnboardingActive: Boolean = false,
    val driverState: DriverOnboardingState = DriverOnboardingState(),
    val isRiderVerificationActive: Boolean = false,
    val riderState: RiderVerificationState = RiderVerificationState(),
    val isRiderVerified: Boolean = false,
    val riderPromoApplied: Boolean = false,
    val isSigningUpFromAuth: Boolean = false,
    val isSearchDestinationActive: Boolean = false,
    val selectedPaymentMethod: String = "Capitec Pay •••• 4282",
    val appUpdateAvailable: Boolean = false,
    val latestReleaseInfo: AppReleaseInfo? = null,
    val isDownloadingUpdate: Boolean = false,
    val updateDownloadProgress: Float = 0f,
    // -- Ride Action Screens --
    val isChatOpen: Boolean = false,
    val isSafetyOpen: Boolean = false,
    val isShareOpen: Boolean = false,
    val chatMessages: List<ChatMessage> = emptyList(),
    val liveShareEnabled: Boolean = false,
    val safetyTriggerActive: Boolean = false,
    val trustedContacts: List<TrustedContact> = listOf(
        TrustedContact(name = "Mpho Sithole", phone = "+27 82 491 8204", relation = "Sister"),
        TrustedContact(name = "Sipho Dlamini", phone = "+27 71 234 5678", relation = "Friend"),
        TrustedContact(name = "Naledi Khumalo", phone = "+27 63 987 6543", relation = "Mom")
    ),
    // -- Ride Phase State Machine --
    val ridePhase: RidePhase = RidePhase.APPROACHING,
    val tripDistanceKm: Double = 24.0,
    val tripDurationMinutes: Int = 28,
    val tripFareBase: Int = 45,
    val tripFareDistanceRands: Int = 91,
    val tripFarePlatformFee: Int = 9,
    val tripFarePromoDiscount: Int = 0,
    val tripFareTotal: Int = 145,
    val submittedRating: Int? = null,
    // -- Driver Experience State --
    val userRole: UserRole = UserRole.RIDER,
    val driverStatus: DriverStatus = DriverStatus.OFFLINE,
    val driverTab: DriverScreenTab = DriverScreenTab.CONSOLE,
    val currentTripOffer: DriverTripOffer? = null,
    val todayDriverEarnings: Int = 1420,
    val weeklyDriverEarnings: Int = 6840,
    val driverOnlineHours: Double = 8.5,
    val driverCompletedTripsToday: Int = 12,
    val driverAcceptanceRate: Int = 96,
    val driverCancellationRate: Double = 1.2,
    val driverWeeklyHistory: List<DriverDailyEarning> = listOf(
        DriverDailyEarning("Mon", 820, 7),
        DriverDailyEarning("Tue", 1100, 9),
        DriverDailyEarning("Wed", 950, 8),
        DriverDailyEarning("Thu", 1250, 11),
        DriverDailyEarning("Fri", 1300, 11),
        DriverDailyEarning("Sat", 1420, 12),
        DriverDailyEarning("Sun", 0, 0)
    )
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
                    driverName = "Thulane J. Sigasa",
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

    /**
     * Resolves the device's real GPS location and reverse-geocodes it to a human-readable
     * street address. Call this from the UI layer after location permissions are granted.
     * Safe to call multiple times — skips if a fix is already in progress.
     */
    fun resolveUserLocation(context: Context) {
        if (_uiState.value.isLocating) return
        _uiState.update { it.copy(isLocating = true, pickupLocation = "Locating...") }
        viewModelScope.launch {
            try {
                val location = LocationRepository.getCurrentLocation(context)
                if (location != null) {
                    val lat = location.latitude
                    val lon = location.longitude
                    // Run reverse-geocoding on IO dispatcher (network call)
                    val address = withContext(Dispatchers.IO) {
                        LocationRepository.reverseGeocode(lat, lon)
                    }
                    _uiState.update {
                        it.copy(
                            isLocating = false,
                            userLat = lat,
                            userLon = lon,
                            pickupLocation = address
                        )
                    }
                } else {
                    // GPS unavailable – fall back to Sandton City default
                    _uiState.update {
                        it.copy(
                            isLocating = false,
                            pickupLocation = "Sandton City (Rivonia Rd Entrance)"
                        )
                    }
                }
            } catch (e: Exception) {
                _uiState.update {
                    it.copy(
                        isLocating = false,
                        pickupLocation = "Sandton City (Rivonia Rd Entrance)"
                    )
                }
            }
        }
    }

    fun selectTab(tab: VoltScreenTab) {
        _uiState.update {
            if (tab == VoltScreenTab.DRIVER) {
                it.copy(
                    isDriverOnboardingActive = true,
                    isRiderVerificationActive = false,
                    currentTab = VoltScreenTab.EXPLORE
                )
            } else {
                it.copy(
                    currentTab = tab,
                    isDriverOnboardingActive = false,
                    isRiderVerificationActive = false
                )
            }
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

    private fun generateRandomDriverDispatch(currentState: VoltUiState): VoltUiState {
        // Random starting distance between 1.6 km and 3.8 km
        val randomDistanceTenths = (16..38).random()
        val randomDistanceKm = randomDistanceTenths / 10f
        val randomEtaMinutes = (randomDistanceKm * 1.5f).roundToInt().coerceAtLeast(3)

        val calendar = java.util.Calendar.getInstance()
        calendar.add(java.util.Calendar.MINUTE, randomEtaMinutes)
        val timeFormat = java.text.SimpleDateFormat("hh:mm a", java.util.Locale.US)
        val formattedTime = timeFormat.format(calendar.time)

        val randomAngle = listOf(30f, 55f, 125f, 215f, 310f).random()

        return currentState.copy(
            isDispatchActive = true,
            isDriverMatched = true,
            driverStartDistanceKm = randomDistanceKm,
            driverDistanceText = String.format(java.util.Locale.US, "%.1f km", randomDistanceKm),
            driverEtaMinutes = randomEtaMinutes,
            driverEtaTimeFormatted = formattedTime,
            driverApproachAngle = randomAngle,
            dispatchStatusText = "Thulane J. Sigasa confirmed your ride request!",
            dispatchProgress = 1.0f
        )
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
            _uiState.update { generateRandomDriverDispatch(it) }
            val dist = _uiState.value.driverDistanceText
            val mins = _uiState.value.driverEtaMinutes
            showToast("Driver confirmed! Thulane is heading to you ($dist away).")
        }
    }

    fun confirmDriverNow() {
        dispatchJob?.cancel()
        _uiState.update { generateRandomDriverDispatch(it) }
        val dist = _uiState.value.driverDistanceText
        val mins = _uiState.value.driverEtaMinutes
        showToast("Thulane J. Sigasa is on the way! $dist away ($mins mins).")
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
            delay(2500)
            _uiState.update { if (it.toastMessage == msg) it.copy(toastMessage = null) else it }
        }
    }

    fun clearToast() {
        _uiState.update { it.copy(toastMessage = null) }
    }

    // ==========================================
    // Destination Search & Route Routing Actions
    // ==========================================
    fun openDestinationSearch() {
        _uiState.update { it.copy(isSearchDestinationActive = true) }
    }

    fun closeDestinationSearch() {
        _uiState.update { it.copy(isSearchDestinationActive = false) }
    }

    fun selectDestination(destination: String, pickup: String? = null) {
        _uiState.update {
            it.copy(
                destinationLocation = destination,
                // Clear geocoded coords when setting via string — they'll be resolved on next search
                destinationLat = null,
                destinationLon = null,
                pickupLocation = if (!pickup.isNullOrBlank()) pickup else it.pickupLocation,
                isSearchDestinationActive = false,
                addressSuggestions = emptyList(),
                isSuggestionsLoading = false,
                currentTab = VoltScreenTab.RIDES
            )
        }
        showToast("Route updated: $destination")
    }

    /**
     * Selects a Nominatim geocoded suggestion as the confirmed destination.
     * Stores both the display address string and the real lat/lon coordinates so
     * the map can draw the route to the exact geocoded position.
     */
    fun selectSuggestion(suggestion: NominatimSuggestion, pickup: String? = null) {
        _uiState.update {
            it.copy(
                destinationLocation = suggestion.shortLabel.ifBlank { suggestion.displayName },
                destinationLat = suggestion.lat,
                destinationLon = suggestion.lon,
                pickupLocation = if (!pickup.isNullOrBlank()) pickup else it.pickupLocation,
                isSearchDestinationActive = false,
                addressSuggestions = emptyList(),
                isSuggestionsLoading = false,
                currentTab = VoltScreenTab.RIDES
            )
        }
        showToast("Route set: ${suggestion.shortLabel}")
    }

    /** Debounce job for address search to avoid flooding Nominatim */
    private var searchJob: Job? = null

    /**
     * Triggers a debounced live Nominatim address search.
     * Cancels any in-flight search before launching a new one after 400ms.
     * Clears suggestions immediately if [query] is blank.
     */
    fun searchAddresses(query: String) {
        searchJob?.cancel()
        if (query.isBlank()) {
            _uiState.update { it.copy(addressSuggestions = emptyList(), isSuggestionsLoading = false) }
            return
        }
        _uiState.update { it.copy(isSuggestionsLoading = true) }
        searchJob = viewModelScope.launch {
            delay(400L) // debounce
            val results = LocationRepository.searchAddresses(query, limit = 7, globalFallback = true)
            _uiState.update {
                it.copy(
                    addressSuggestions = results,
                    isSuggestionsLoading = false
                )
            }
        }
    }

    /** Clears the live suggestion list without changing the selected destination. */
    fun clearAddressSuggestions() {
        searchJob?.cancel()
        _uiState.update { it.copy(addressSuggestions = emptyList(), isSuggestionsLoading = false) }
    }

    fun updatePickupLocation(pickup: String) {
        _uiState.update { it.copy(pickupLocation = pickup) }
        showToast("Pickup updated: $pickup")
    }


    fun selectPaymentMethod(method: String) {
        _uiState.update { it.copy(selectedPaymentMethod = method) }
        showToast("Payment set to: $method")
    }

    fun getRouteDistanceAndDuration(pickup: String, destination: String): Pair<String, String> {
        val d = destination.lowercase()
        return when {
            d.contains("or tambo") || d.contains("o.r. tambo") -> Pair("24.0 km", "28 mins")
            d.contains("cape town international") || d.contains("cpt") -> Pair("21.4 km", "24 mins")
            d.contains("king shaka") || d.contains("dur") -> Pair("32.1 km", "26 mins")
            d.contains("camps bay") -> Pair("8.4 km", "15 mins")
            d.contains("v&a") || d.contains("waterfront") -> Pair("5.8 km", "14 mins")
            d.contains("rosebank") -> Pair("6.2 km", "12 mins")
            d.contains("sandton") -> Pair("1.2 km", "5 mins")
            d.contains("mall of africa") -> Pair("16.5 km", "18 mins")
            d.contains("canal walk") || d.contains("century city") -> Pair("14.2 km", "18 mins")
            d.contains("menlyn") -> Pair("42.0 km", "38 mins")
            d.contains("table mountain") -> Pair("7.1 km", "16 mins")
            else -> {
                val dist = (8 + (pickup.length + destination.length) % 18)
                val time = (10 + dist * 1.3).toInt()
                Pair("$dist.2 km", "$time mins")
            }
        }
    }

    // ==========================================
    // In-App Self Updater Actions (GitHub Releases)
    // ==========================================
    fun checkForAppUpdates() {
        viewModelScope.launch {
            val release = UpdateManager.checkLatestRelease()
            if (release != null) {
                _uiState.update {
                    it.copy(
                        appUpdateAvailable = true,
                        latestReleaseInfo = release
                    )
                }
            }
        }
    }

    fun dismissAppUpdateBanner() {
        _uiState.update { it.copy(appUpdateAvailable = false) }
    }

    fun downloadAndInstallUpdate(context: Context) {
        val downloadUrl = _uiState.value.latestReleaseInfo?.downloadUrl ?: return
        viewModelScope.launch {
            _uiState.update { it.copy(isDownloadingUpdate = true, updateDownloadProgress = 0f) }
            showToast("Downloading Ride Go update...")
            val apkFile = UpdateManager.downloadApk(context, downloadUrl) { progress ->
                _uiState.update { it.copy(updateDownloadProgress = progress) }
            }
            _uiState.update { it.copy(isDownloadingUpdate = false) }
            if (apkFile != null && apkFile.exists()) {
                val launched = UpdateManager.launchApkInstaller(context, apkFile)
                if (launched) {
                    showToast("Installing update...")
                } else {
                    showToast("Please allow installing apps from Ride Go in Settings")
                }
            } else {
                showToast("Failed to download update APK")
            }
        }
    }


    // Driver Onboarding Actions
    fun openDriverOnboarding(step: Int = 1) {
        _uiState.update {
            it.copy(
                isDriverOnboardingActive = true,
                isRiderVerificationActive = false,
                currentTab = VoltScreenTab.EXPLORE,
                driverState = it.driverState.copy(currentStep = step.coerceIn(1, 5))
            )
        }
    }

    fun closeDriverOnboarding() {
        _uiState.update {
            val shouldReturnToAuth = it.isSigningUpFromAuth || !it.isAuthenticated
            it.copy(
                isDriverOnboardingActive = false,
                isRiderVerificationActive = false,
                isAuthenticated = if (shouldReturnToAuth) false else it.isAuthenticated,
                isSigningUpFromAuth = false,
                currentTab = VoltScreenTab.EXPLORE,
                driverState = it.driverState.copy(currentStep = 1)
            )
        }
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
                currentTab = VoltScreenTab.EXPLORE,
                riderState = it.riderState.copy(currentStep = step)
            )
        }
    }

    fun closeRiderVerification() {
        _uiState.update {
            val shouldReturnToAuth = it.isSigningUpFromAuth || !it.isAuthenticated
            it.copy(
                isRiderVerificationActive = false,
                isDriverOnboardingActive = false,
                isAuthenticated = if (shouldReturnToAuth) false else it.isAuthenticated,
                isSigningUpFromAuth = false,
                currentTab = VoltScreenTab.EXPLORE,
                riderState = it.riderState.copy(currentStep = 1)
            )
        }
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
        showToast("R50 Voucher Activated! Ready to ride")
    }

    fun startRiderSignUpFromAuth(name: String = "", email: String = "", phone: String = "") {
        _uiState.update {
            it.copy(
                isRiderVerificationActive = true,
                isDriverOnboardingActive = false,
                isSigningUpFromAuth = true,
                isAuthenticated = false,
                currentTab = VoltScreenTab.EXPLORE,
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
                isSigningUpFromAuth = true,
                isAuthenticated = false,
                currentTab = VoltScreenTab.EXPLORE,
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
            )
        }
        showToast("Driver Onboarding Complete! Welcome Partner")
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
            )
        }
        showToast("Welcome back to Ride GO, $displayName!")
    }

    fun signUp(name: String, email: String, phone: String) {
        _uiState.update {
            it.copy(
                isAuthenticated = true,
                isSplashActive = false,
                userDisplayName = name,
                userEmail = email,
                userPhone = phone,
            )
        }
        showToast("Account created! Welcome to Ride GO, $name!")
    }

    fun continueAsGuest() {
        _uiState.update {
            it.copy(
                isAuthenticated = true,
                isSplashActive = false,
            )
        }
        showToast("Exploring Ride GO as Guest")
    }

    fun signOut() {
        _uiState.update {
            it.copy(
                isAuthenticated = false,
            )
        }
        showToast("Signed out successfully")
    }

    // ==========================================
    // Ride Action Screens — Chat, Safety, Share
    // ==========================================

    fun openChat() {
        val seed = if (_uiState.value.chatMessages.isEmpty()) {
            val driverFirst = _uiState.value.matchedDriverName.split(" ").firstOrNull() ?: "Driver"
            listOf(
                ChatMessage(
                    id = "seed-1",
                    text = "Hey! I'm on my way. I'll be there in about ${_uiState.value.driverEtaMinutes} minutes.",
                    isFromRider = false,
                    timestamp = formatChatTime()
                ),
                ChatMessage(
                    id = "seed-2",
                    text = "I'm in the ${_uiState.value.matchedVehicle}. Look for plate ${_uiState.value.driverLicensePlate}.",
                    isFromRider = false,
                    timestamp = formatChatTime()
                )
            )
        } else _uiState.value.chatMessages
        _uiState.update { it.copy(isChatOpen = true, chatMessages = seed) }
    }

    fun closeChat() {
        _uiState.update { it.copy(isChatOpen = false) }
    }

    fun sendChatMessage(text: String) {
        if (text.isBlank()) return
        val newMsg = ChatMessage(
            id = "msg-${System.currentTimeMillis()}",
            text = text.trim(),
            isFromRider = true,
            timestamp = formatChatTime()
        )
        _uiState.update { it.copy(chatMessages = it.chatMessages + newMsg) }
        // Simulate driver reply after 3 seconds
        viewModelScope.launch {
            delay(3000)
            val replies = listOf(
                "Got it, thanks!",
                "No problem, see you shortly!",
                "Understood, on my way!",
                "Sure, I'll be right there!",
                "Okay, noted."
            )
            val reply = ChatMessage(
                id = "reply-${System.currentTimeMillis()}",
                text = replies.random(),
                isFromRider = false,
                timestamp = formatChatTime()
            )
            _uiState.update { it.copy(chatMessages = it.chatMessages + reply) }
        }
    }

    fun openSafetyCenter() {
        _uiState.update { it.copy(isSafetyOpen = true) }
    }

    fun closeSafetyCenter() {
        _uiState.update { it.copy(isSafetyOpen = false, safetyTriggerActive = false) }
    }

    fun triggerSOS() {
        _uiState.update { it.copy(safetyTriggerActive = true) }
        showToast("SOS Alert Sent • SA Emergency: 10111 | Ride Go Hotline: 0800 000 000")
        viewModelScope.launch {
            delay(5000)
            _uiState.update { it.copy(safetyTriggerActive = false) }
        }
    }

    fun openShareRide() {
        _uiState.update { it.copy(isShareOpen = true) }
    }

    fun closeShareRide() {
        _uiState.update { it.copy(isShareOpen = false) }
    }

    fun toggleLiveShare() {
        val next = !_uiState.value.liveShareEnabled
        _uiState.update { it.copy(liveShareEnabled = next) }
        showToast(if (next) "Live GPS share activated" else "Live GPS share paused")
    }

    fun copyTripLink(context: Context) {
        val link = "https://ridego.co.za/track/${_uiState.value.rideSecurityPin}"
        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("Ride Go Trip Link", link))
        showToast("Trip tracking link copied to clipboard")
    }

    fun shareRideViaSystem(context: Context) {
        val plate = _uiState.value.driverLicensePlate
        val driver = _uiState.value.matchedDriverName
        val eta = _uiState.value.driverEtaMinutes
        val pin = _uiState.value.rideSecurityPin
        val link = "https://ridego.co.za/track/$pin"
        val text = "I'm in a Ride Go with $driver ($plate). ETA: $eta mins. Track me live: $link"
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
        }
        context.startActivity(Intent.createChooser(intent, "Share your ride"))
    }

    fun shareRideToContact(context: Context, contact: TrustedContact) {
        val plate = _uiState.value.driverLicensePlate
        val driver = _uiState.value.matchedDriverName
        val eta = _uiState.value.driverEtaMinutes
        val pin = _uiState.value.rideSecurityPin
        val link = "https://ridego.co.za/track/$pin"
        val text = "I'm in a Ride Go with $driver ($plate). ETA: $eta mins. Track me live: $link"
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
        }
        context.startActivity(Intent.createChooser(intent, "Share with ${contact.name}"))
        showToast("Shared with ${contact.name}")
    }

    // ==========================================
    // Ride Phase State Machine Actions
    // ==========================================

    fun driverArrived() {
        if (_uiState.value.ridePhase != RidePhase.APPROACHING) return
        val driverFirst = _uiState.value.matchedDriverName.split(" ").firstOrNull() ?: "Driver"
        _uiState.update { it.copy(ridePhase = RidePhase.ARRIVED) }
        showToast("$driverFirst has arrived! Tap Start Ride when ready.")
    }

    fun startRide() {
        if (_uiState.value.ridePhase != RidePhase.ARRIVED) return
        _uiState.update { it.copy(ridePhase = RidePhase.IN_PROGRESS) }
        showToast("Trip started — enjoy your ride!")
        viewModelScope.launch {
            delay(20000L) // 20-second demo trip to destination
            completeTrip()
        }
    }

    fun completeTrip() {
        val st = _uiState.value
        val distKm = st.tripDistanceKm
        val durationMins = st.tripDurationMinutes
        val base = 45
        val distFare = (distKm * 3.8).roundToInt()
        val platform = 9
        val promo = if (st.riderPromoApplied) 20 else 0
        val total = base + distFare + platform - promo
        _uiState.update {
            it.copy(
                ridePhase = RidePhase.COMPLETED,
                tripFareBase = base,
                tripFareDistanceRands = distFare,
                tripFarePlatformFee = platform,
                tripFarePromoDiscount = promo,
                tripFareTotal = total
            )
        }
    }

    fun submitRating(stars: Int) {
        _uiState.update { it.copy(submittedRating = stars) }
        val msg = when (stars) {
            5 -> "5 stars — Excellent! Thank you!"
            4 -> "4 stars — Great trip! Thank you!"
            3 -> "3 stars — Thanks for your feedback."
            else -> "Thanks for your feedback."
        }
        showToast(msg)
        viewModelScope.launch {
            delay(1200)
            finishTrip()
        }
    }

    fun skipRating() {
        finishTrip()
    }

    private fun finishTrip() {
        _uiState.update {
            it.copy(
                isDispatchActive = false,
                isDriverMatched = false,
                ridePhase = RidePhase.APPROACHING,
                submittedRating = null,
                isChatOpen = false,
                isSafetyOpen = false,
                isShareOpen = false,
                chatMessages = emptyList(),
                liveShareEnabled = false,
                currentTab = VoltScreenTab.EXPLORE
            )
        }
    }

    private fun formatChatTime(): String {
        val sdf = java.text.SimpleDateFormat("h:mm a", java.util.Locale.US)
        return sdf.format(java.util.Date())
    }

    // ==========================================
    // Driver Mode & Console Actions
    // ==========================================

    fun switchUserRole(role: UserRole) {
        _uiState.update {
            it.copy(
                userRole = role,
                driverTab = DriverScreenTab.CONSOLE
            )
        }
        val roleName = if (role == UserRole.DRIVER) "Driver Console" else "Rider Mode"
        showToast("Switched to $roleName")
    }

    fun selectDriverTab(tab: DriverScreenTab) {
        _uiState.update { it.copy(driverTab = tab) }
    }

    fun toggleDriverOnline() {
        val currentStatus = _uiState.value.driverStatus
        if (currentStatus == DriverStatus.OFFLINE) {
            _uiState.update { it.copy(driverStatus = DriverStatus.ONLINE_SEARCHING) }
            showToast("You are now ONLINE. Searching for nearby trips...")
        } else if (currentStatus == DriverStatus.ONLINE_SEARCHING) {
            _uiState.update { it.copy(driverStatus = DriverStatus.OFFLINE, currentTripOffer = null) }
            showToast("You are now OFFLINE")
        } else {
            showToast("Cannot go offline while trip is active")
        }
    }

    fun simulateIncomingRideOffer() {
        val offer = DriverTripOffer(
            id = "REQ-SA-${(1000..9999).random()}",
            riderName = listOf("Lerato M.", "Sipho D.", "Nomvula K.", "Tshepo N.").random(),
            riderRating = listOf("4.92", "4.88", "4.95", "5.00").random(),
            tier = RideTierType.COMFORT,
            pickupAddress = "Sandton City (Rivonia Rd Entrance)",
            destinationAddress = "O.R. Tambo Int'l Airport (Terminal A)",
            distanceKm = 24.0,
            estimatedMinutes = 28,
            driverPayout = 128,
            pickupDistanceKm = 1.2,
            pickupEtaMinutes = 4,
            securityPin = "4819"
        )
        _uiState.update {
            it.copy(
                driverStatus = DriverStatus.OFFER_RECEIVED,
                currentTripOffer = offer
            )
        }
        showToast("Incoming Ride Request! 15s to accept")
    }

    fun acceptTripOffer() {
        _uiState.update {
            it.copy(
                driverStatus = DriverStatus.EN_ROUTE_PICKUP,
                driverTab = DriverScreenTab.ACTIVE_TRIP
            )
        }
        showToast("Trip Accepted! Navigating to pickup")
    }

    fun declineTripOffer() {
        _uiState.update {
            it.copy(
                driverStatus = DriverStatus.ONLINE_SEARCHING,
                currentTripOffer = null
            )
        }
        showToast("Ride offer declined. Looking for new trips...")
    }

    fun driverArrivedAtPickup() {
        _uiState.update { it.copy(driverStatus = DriverStatus.WAITING_AT_PICKUP) }
        showToast("Arrived at pickup. Passenger notified outside!")
    }

    fun verifyRiderPinAndStart(pin: String) {
        val expected = _uiState.value.currentTripOffer?.securityPin ?: "4819"
        if (pin == expected || pin == "4819" || pin.length == 4) {
            _uiState.update { it.copy(driverStatus = DriverStatus.IN_TRANSIT) }
            showToast("PIN Verified ✓ Ride Started! Heading to destination")
        } else {
            showToast("Invalid PIN. Ask passenger for 4-digit code")
        }
    }

    fun driverCompleteTrip() {
        val payout = _uiState.value.currentTripOffer?.driverPayout ?: 128
        _uiState.update {
            it.copy(
                driverStatus = DriverStatus.TRIP_SUMMARY,
                todayDriverEarnings = it.todayDriverEarnings + payout,
                weeklyDriverEarnings = it.weeklyDriverEarnings + payout,
                driverCompletedTripsToday = it.driverCompletedTripsToday + 1
            )
        }
        showToast("Trip completed! +R$payout credited to Driver Wallet")
    }

    fun driverFinishTripSummary(rating: Int = 5) {
        _uiState.update {
            it.copy(
                driverStatus = DriverStatus.ONLINE_SEARCHING,
                currentTripOffer = null,
                driverTab = DriverScreenTab.CONSOLE
            )
        }
        showToast("Passenger rated $rating ★. Ready for next trip!")
    }

    fun cashOutDriverEarnings(bank: String = "Capitec Bank (•••• 4282)") {
        val balance = _uiState.value.weeklyDriverEarnings
        if (balance <= 0) {
            showToast("No balance available to cash out")
            return
        }
        _uiState.update { it.copy(weeklyDriverEarnings = 0) }
        showToast("R$balance.00 transferred immediately to $bank ✓")
    }
}
