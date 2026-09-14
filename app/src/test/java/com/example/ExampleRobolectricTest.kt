package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.example.model.RideTierType
import com.example.model.VoltScreenTab
import com.example.viewmodel.VoltViewModel
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

  @Test
  fun `read string from context`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val appName = context.getString(R.string.app_name)
    assertEquals("Ride Go", appName)
  }

  @Test
  fun `driver onboarding flow updates steps and values correctly`() {
    val viewModel = VoltViewModel()
    
    // Open driver onboarding flow (onboarding mode like rider verification)
    viewModel.openDriverOnboarding()
    assertTrue(viewModel.uiState.value.isDriverOnboardingActive)
    assertEquals(1, viewModel.uiState.value.driverState.currentStep)

    // Update driver info
    viewModel.updateDriverFullName("Nomvula Khumalo")
    viewModel.updateDriverPhone("+27 82 555 1234")
    viewModel.selectDriverCity("Johannesburg")
    viewModel.selectDriverLicenseCode("Code 10 (C1)")
    viewModel.updateDriverLicenseSerial("DL-9843210-ZA")
    viewModel.toggleDriverTerms(true)

    assertEquals("Nomvula Khumalo", viewModel.uiState.value.driverState.fullName)
    assertEquals("Johannesburg", viewModel.uiState.value.driverState.selectedCity)
    assertTrue(viewModel.uiState.value.driverState.termsAccepted)

    // Advance to step 2
    viewModel.setDriverStep(2)
    assertEquals(2, viewModel.uiState.value.driverState.currentStep)

    // Scan ID back
    viewModel.scanBackId()
    assertTrue(viewModel.uiState.value.driverState.idBackScanned)

    // Close onboarding
    viewModel.closeDriverOnboarding()
    assertFalse(viewModel.uiState.value.isDriverOnboardingActive)
  }

  @Test
  fun `book fast ride initiates dispatch with requested destination and tier`() {
    val viewModel = VoltViewModel()
    
    viewModel.bookFastRide("1 Thibault Square, Cape Town CBD", RideTierType.COMFORT)
    
    assertEquals(VoltScreenTab.RIDES, viewModel.uiState.value.currentTab)
    assertEquals("1 Thibault Square, Cape Town CBD", viewModel.uiState.value.destinationLocation)
    assertEquals(RideTierType.COMFORT, viewModel.uiState.value.selectedTier)
    assertEquals("Fast booking selected: 1 Thibault Square, Cape Town CBD", viewModel.uiState.value.toastMessage)
  }

  @Test
  fun `rider verification 5-step flow works end-to-end and activates promo`() {
    val viewModel = VoltViewModel()

    // 1. Open Rider Verification
    viewModel.openRiderVerification()
    assertTrue(viewModel.uiState.value.isRiderVerificationActive)
    assertEquals(1, viewModel.uiState.value.riderState.currentStep)

    // Update details
    viewModel.updateRiderFullName("Nomvula Zungu")
    viewModel.updateRiderPhone("071 839 2041")
    viewModel.updateRiderEmail("nomvula.zungu@icloud.com")
    assertEquals("Nomvula Zungu", viewModel.uiState.value.riderState.fullName)

    // 2. Advance to dual phone/email OTP
    viewModel.setRiderStep(2)
    assertEquals(2, viewModel.uiState.value.riderState.currentStep)

    // 3. Advance to SA Smart ID capture
    viewModel.setRiderStep(3)
    assertEquals(3, viewModel.uiState.value.riderState.currentStep)

    // 4. Advance to Biometric Facial Scan
    viewModel.setRiderStep(4)
    assertEquals(4, viewModel.uiState.value.riderState.currentStep)

    // 5. Complete verification
    viewModel.setRiderStep(5)
    assertEquals(5, viewModel.uiState.value.riderState.currentStep)
    viewModel.completeRiderVerificationAndRide()

    // Verifications after completion
    assertTrue(viewModel.uiState.value.isRiderVerified)
    assertTrue(viewModel.uiState.value.riderPromoApplied)
    assertTrue(viewModel.uiState.value.riderState.isVerified)
    assertEquals(VoltScreenTab.RIDES, viewModel.uiState.value.currentTab)
  }

  @Test
  fun `rider step 1 back navigation returns directly to auth screen and not driver screen`() {
    val viewModel = VoltViewModel()

    // Initially unauthenticated
    assertFalse(viewModel.uiState.value.isAuthenticated)

    // User starts rider signup from Auth Screen
    viewModel.startRiderSignUpFromAuth(name = "Thabo", email = "thabo@ridego.co.za", phone = "0821234567")
    assertTrue(viewModel.uiState.value.isRiderVerificationActive)
    assertTrue(viewModel.uiState.value.isSigningUpFromAuth)
    assertFalse(viewModel.uiState.value.isAuthenticated)
    assertEquals(VoltScreenTab.EXPLORE, viewModel.uiState.value.currentTab)
    assertEquals(1, viewModel.uiState.value.riderState.currentStep)

    // User presses back at step 1
    viewModel.closeRiderVerification()

    // Must return to Auth state: unauthenticated, no active verification, not stuck in DRIVER tab
    assertFalse(viewModel.uiState.value.isRiderVerificationActive)
    assertFalse(viewModel.uiState.value.isDriverOnboardingActive)
    assertFalse(viewModel.uiState.value.isAuthenticated)
    assertFalse(viewModel.uiState.value.isSigningUpFromAuth)
    assertEquals(VoltScreenTab.EXPLORE, viewModel.uiState.value.currentTab)
  }

  @Test
  fun `driver step 1 back navigation returns directly to auth screen`() {
    val viewModel = VoltViewModel()

    // Initially unauthenticated
    assertFalse(viewModel.uiState.value.isAuthenticated)

    // User starts driver signup from Auth Screen
    viewModel.startDriverSignUpFromAuth(name = "Marcus", phone = "0829876543")
    assertTrue(viewModel.uiState.value.isDriverOnboardingActive)
    assertTrue(viewModel.uiState.value.isSigningUpFromAuth)
    assertFalse(viewModel.uiState.value.isAuthenticated)
    assertEquals(VoltScreenTab.EXPLORE, viewModel.uiState.value.currentTab)
    assertEquals(1, viewModel.uiState.value.driverState.currentStep)

    // User presses back at step 1
    viewModel.closeDriverOnboarding()

    // Must return to Auth state: unauthenticated, no active onboarding, not stuck in DRIVER tab
    assertFalse(viewModel.uiState.value.isDriverOnboardingActive)
    assertFalse(viewModel.uiState.value.isRiderVerificationActive)
    assertFalse(viewModel.uiState.value.isAuthenticated)
    assertFalse(viewModel.uiState.value.isSigningUpFromAuth)
    assertEquals(VoltScreenTab.EXPLORE, viewModel.uiState.value.currentTab)
  }

  @Test
  fun `switching from rider to driver step 1 and pressing back still returns to auth screen`() {
    val viewModel = VoltViewModel()

    // User starts rider signup from Auth Screen
    viewModel.startRiderSignUpFromAuth()
    assertTrue(viewModel.uiState.value.isSigningUpFromAuth)

    // In step 1, user taps "Driver" role pill
    viewModel.openDriverOnboarding()
    assertTrue(viewModel.uiState.value.isDriverOnboardingActive)
    assertFalse(viewModel.uiState.value.isRiderVerificationActive)

    // User presses back at driver step 1
    viewModel.closeDriverOnboarding()

    // Must return to Auth screen
    assertFalse(viewModel.uiState.value.isDriverOnboardingActive)
    assertFalse(viewModel.uiState.value.isRiderVerificationActive)
    assertFalse(viewModel.uiState.value.isAuthenticated)
    assertEquals(VoltScreenTab.EXPLORE, viewModel.uiState.value.currentTab)
  }

  @Test
  fun `destination search opens closes and selects destination with auto-transition to Rides tab`() {
    val viewModel = VoltViewModel()

    // 1. Open destination search
    viewModel.openDestinationSearch()
    assertTrue(viewModel.uiState.value.isSearchDestinationActive)

    // 2. Close destination search without selecting
    viewModel.closeDestinationSearch()
    assertFalse(viewModel.uiState.value.isSearchDestinationActive)

    // 3. Re-open and select destination
    viewModel.openDestinationSearch()
    viewModel.selectDestination(
        destination = "Cape Town International Airport (CPT)",
        pickup = "1 Thibault Square, Cape Town CBD"
    )

    assertFalse(viewModel.uiState.value.isSearchDestinationActive)
    assertEquals("Cape Town International Airport (CPT)", viewModel.uiState.value.destinationLocation)
    assertEquals("1 Thibault Square, Cape Town CBD", viewModel.uiState.value.pickupLocation)
    assertEquals(VoltScreenTab.RIDES, viewModel.uiState.value.currentTab)
  }

  @Test
  fun `payment method selection updates state correctly`() {
    val viewModel = VoltViewModel()

    assertEquals("Capitec Pay •••• 4282", viewModel.uiState.value.selectedPaymentMethod)

    viewModel.selectPaymentMethod("FNB Cheque Card •••• 3381")
    assertEquals("FNB Cheque Card •••• 3381", viewModel.uiState.value.selectedPaymentMethod)

    viewModel.selectPaymentMethod("Ride Go Wallet")
    assertEquals("Ride Go Wallet", viewModel.uiState.value.selectedPaymentMethod)
  }

  @Test
  fun `route distance and duration calculation returns empty if no destination and formatted strings when selected`() {
    val viewModel = VoltViewModel()

    // With no destination
    viewModel.selectDestination("", "Sandton City")
    val (distEmpty, timeEmpty) = viewModel.getRouteDistanceAndDuration()
    assertEquals("", distEmpty)
    assertEquals("", timeEmpty)

    // With OR Tambo
    viewModel.selectDestination("O.R. Tambo International Airport", "Sandton City")
    val (distOrTambo, timeOrTambo) = viewModel.getRouteDistanceAndDuration()
    assertEquals("24.0 km", distOrTambo)
    assertEquals("28 mins", timeOrTambo)

    // With Cape Town International
    viewModel.selectDestination("Cape Town International Airport (CPT)", "V&A Waterfront")
    val (distCpt, timeCpt) = viewModel.getRouteDistanceAndDuration()
    assertEquals("21.4 km", distCpt)
    assertEquals("24 mins", timeCpt)
  }

  @Test
  fun `update pickup location changes state`() {
    val viewModel = VoltViewModel()
    viewModel.updatePickupLocation("Sandton City (Rivonia Rd Entrance)")
    assertEquals("Sandton City (Rivonia Rd Entrance)", viewModel.uiState.value.pickupLocation)
  }

  @Test
  fun `app update banner dismisses properly`() {
    val viewModel = VoltViewModel()
    viewModel.dismissAppUpdateBanner()
    assertFalse(viewModel.uiState.value.appUpdateAvailable)
  }

  @Test
  fun `rider confirms ride and driver matches with random distance and heading towards pickup location`() {
    val viewModel = VoltViewModel()
    viewModel.updatePickupLocation("Camps Bay Promenade (Victoria Rd)")

    // Confirm driver booking
    viewModel.confirmDriverNow()

    val state = viewModel.uiState.value
    assertTrue(state.isDriverMatched)
    assertTrue(state.isDispatchActive)
    assertTrue("Driver distance should be > 1.0 km, was ${state.driverStartDistanceKm}", state.driverStartDistanceKm >= 1.0f)
    assertTrue("Driver distance should be <= 4.0 km, was ${state.driverStartDistanceKm}", state.driverStartDistanceKm <= 4.0f)
    assertTrue(state.driverDistanceText.endsWith("km"))
    assertTrue("ETA minutes should be >= 3, was ${state.driverEtaMinutes}", state.driverEtaMinutes >= 3)
    assertEquals("Camps Bay Promenade (Victoria Rd)", state.pickupLocation)
  }
}

