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
}

