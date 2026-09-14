package com.example.model

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
    val fullName: String = "Marcus Thabo Dlamini",
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

