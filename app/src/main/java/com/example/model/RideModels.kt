package com.example.model

enum class RidePhase {
    APPROACHING,  // Driver heading to rider's pickup location
    ARRIVED,      // Driver at pickup — waiting for rider to tap Start Ride
    IN_PROGRESS,  // Car driving towards destination
    COMPLETED     // Trip finished — show rating + cost breakdown
}

enum class RideTierType(
    val id: String,
    val title: String,
    val capacity: Int,
    val price: Int,
    val originalPrice: Int,
    val eta: String,
    val feature: String,
    val badge: String? = null,
    val badgeIsYellow: Boolean = true
) {
    SAVER(
        id = "saver",
        title = "Go Saver",
        capacity = 4,
        price = 75,
        originalPrice = 95,
        eta = "3 min away",
        feature = "Affordable everyday ride",
        badge = null
    ),
    COMFORT(
        id = "comfort",
        title = "Go Comfort",
        capacity = 4,
        price = 125,
        originalPrice = 155,
        eta = "5 min away",
        feature = "Spacious legroom",
        badge = "POPULAR",
        badgeIsYellow = true
    ),
    XL(
        id = "xl",
        title = "Go XL",
        capacity = 6,
        price = 195,
        originalPrice = 230,
        eta = "7 min away",
        feature = "Luggage & groups",
        badge = null
    ),
    BLACK(
        id = "black",
        title = "Go Black",
        capacity = 4,
        price = 280,
        originalPrice = 320,
        eta = "8 min away",
        feature = "Comfortable sedan • Extra space",
        badge = "PREMIUM",
        badgeIsYellow = false
    )
}

data class TripHistoryItem(
    val id: String,
    val title: String,
    val tierTag: String,
    val timestamp: String,
    val fareFormatted: String,
    val isCompleted: Boolean = true,
    val pickupLocation: String,
    val dropoffLocation: String,
    val driverName: String? = null,
    val driverCar: String? = null,
    val driverRating: Double? = null,
    val userRating: Int? = null,
    val paymentMethod: String,
    val receiptId: String,
    val tripDistanceKm: Double = 12.4,
    val co2SavedKg: Double = 0.0
)

enum class VoltScreenTab(val label: String) {
    EXPLORE("Hub"),
    RIDES("Rides"),
    DRIVER("Driver"),
    ACTIVITY("Activity"),
    ACCOUNT("Account")
}

data class DriverOnboardingState(
    val currentStep: Int = 1,
    // Step 1
    val fullName: String = "Thulane J. Sigasa",
    val phoneNumber: String = "82 491 8204",
    val selectedCity: String = "cpt",
    val licenseCode: String = "code8",
    val licenseSerial: String = "890314-5082-08-3",
    val prdpCategory: String = "passengers",
    val prdpExpiry: String = "2026-11-30",
    val referralCode: String = "",
    val termsAccepted: Boolean = true,

    // Step 2
    val idFrontVerified: Boolean = true,
    val idBackScanned: Boolean = false,
    val prdpUploaded: Boolean = false,
    val sapsConsent: Boolean = true,

    // Step 3
    val isScanningBiometrics: Boolean = false,
    val biometricsVerified: Boolean = false,
    val livenessStep: Int = 2,

    // Step 4
    val dekraUploaded: Boolean = false,
    val isSubmittingVehicle: Boolean = false,

    // Step 5
    val pushNotificationsEnabled: Boolean = false
)

enum class FastBookingIconType {
    HOME,
    WORK,
    FITNESS,
    AIRPORT,
    FAVORITE
}

data class FastBookingRide(
    val id: String,
    val title: String,
    val subtitle: String,
    val address: String,
    val preferredTier: RideTierType,
    val estimatedFare: String,
    val eta: String,
    val frequencyTag: String,
    val iconType: FastBookingIconType
)

enum class RiderIdDocType(val label: String) {
    SMART_ID("SA Smart ID Card"),
    GREEN_BOOK("Green Barcoded ID Book"),
    PASSPORT("International Passport")
}

data class RiderVerificationState(
    val currentStep: Int = 1, // 1 to 5
    // Step 1: Sign Up & Gateway
    val isDriverSelected: Boolean = false,
    val fullName: String = "Thulane J. Sigasa",
    val phone: String = "079 123 4567",
    val email: String = "pharezsigasa@gmail.com",
    val tosAccepted: Boolean = true,
    val promoAccepted: Boolean = true,
    val isSendingOtp: Boolean = false,

    // Step 2: Phone & Email Verification
    val phoneOtp: String = "592418",
    val isPhoneVerified: Boolean = true,
    val emailOtp: String = "730",
    val emailResendSeconds: Int = 42,
    val isEmailVerified: Boolean = false,

    // Step 3: SA Smart ID Capture
    val selectedDocType: RiderIdDocType = RiderIdDocType.SMART_ID,
    val isCardCornersAligned: Boolean = true,
    val isGlareFree: Boolean = true,
    val isValidDoc: Boolean = true,
    val isScanningId: Boolean = false,
    val isIdCaptured: Boolean = false,

    // Step 4: Facial Liveness Check
    val livenessStep: Int = 2, // 1: Centered, 2: Blink, 3: Smile/Neutral
    val isLightingGood: Boolean = true,
    val isDistancePerfect: Boolean = true,
    val isScanningLiveness: Boolean = false,
    val isLivenessVerified: Boolean = false,

    // Step 5: Profile Ready
    val promoCode: String = "RIDEGOFIRST",
    val selectedPayment: String = "Capitec Pay",
    val pinSecurityActive: Boolean = true,
    val liveShareActive: Boolean = true,
    val armedResponseActive: Boolean = true,
    val isVerified: Boolean = false
)

data class ChatMessage(
    val id: String,
    val text: String,
    val isFromRider: Boolean,
    val timestamp: String
)

data class TrustedContact(
    val name: String,
    val phone: String,
    val relation: String
)

enum class UserRole {
    RIDER,
    DRIVER
}

enum class DriverStatus {
    OFFLINE,
    ONLINE_SEARCHING,
    OFFER_RECEIVED,
    EN_ROUTE_PICKUP,
    WAITING_AT_PICKUP,
    IN_TRANSIT,
    TRIP_SUMMARY
}

enum class DriverScreenTab(val label: String) {
    CONSOLE("Console"),
    ACTIVE_TRIP("Trip"),
    EARNINGS("Earnings"),
    PROFILE("Profile")
}

data class DriverTripOffer(
    val id: String = "REQ-SA-9102",
    val riderName: String = "Lerato M.",
    val riderRating: String = "4.92",
    val tier: RideTierType = RideTierType.COMFORT,
    val pickupAddress: String = "Sandton City (Rivonia Rd Entrance)",
    val destinationAddress: String = "O.R. Tambo Int'l Airport (Terminal A)",
    val distanceKm: Double = 24.0,
    val estimatedMinutes: Int = 28,
    val driverPayout: Int = 128,
    val pickupDistanceKm: Double = 1.2,
    val pickupEtaMinutes: Int = 4,
    val securityPin: String = "4819"
)

data class DriverDailyEarning(
    val dayLabel: String,
    val amountRands: Int,
    val tripsCount: Int
)

/**
 * A single address suggestion returned by the Nominatim OpenStreetMap geocoding API.
 *
 * @param placeId   Nominatim internal place identifier (unique per result).
 * @param displayName Full formatted address string from Nominatim.
 * @param shortLabel Condensed 1-line label suitable for showing in search results (road + suburb or city).
 * @param subLabel   Secondary line detail (city / region).
 * @param lat        Latitude of the geocoded location.
 * @param lon        Longitude of the geocoded location.
 * @param type       Place category (e.g. "amenity", "highway", "suburb").
 */
data class NominatimSuggestion(
    val placeId: Long,
    val displayName: String,
    val shortLabel: String,
    val subLabel: String,
    val lat: Double,
    val lon: Double,
    val type: String = ""
)

