package com.example

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onRoot
import com.example.ui.screens.ActivityScreen
import com.example.ui.screens.LiveTrackingScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.viewmodel.VoltUiState
import com.github.takahirom.roborazzi.RobolectricDeviceQualifiers
import com.github.takahirom.roborazzi.captureRoboImage
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(qualifiers = RobolectricDeviceQualifiers.Pixel8, sdk = [36])
class GreetingScreenshotTest {

  @get:Rule val composeTestRule = createComposeRule()

  @Test
  fun volt_app_screenshot() {
    composeTestRule.setContent { MyApplicationTheme { VoltAppRoot() } }
    composeTestRule.onRoot().captureRoboImage(filePath = "src/test/screenshots/greeting.png")
  }

  @Test
  fun activity_past_trips_screenshot() {
    composeTestRule.setContent {
      MyApplicationTheme {
        ActivityScreen(
          state = VoltUiState(activeActivityTab = "Past Trips"),
          onTabSelected = {},
          onFilterSelected = {},
          onReceiptClick = {},
          onRebookClick = {},
          onDismissReceipt = {},
          onDownloadStatement = {}
        )
      }
    }
    composeTestRule.onRoot().captureRoboImage(filePath = "src/test/screenshots/activity_past_trips.png")
  }

  @Test
  fun activity_upcoming_screenshot() {
    composeTestRule.setContent {
      MyApplicationTheme {
        ActivityScreen(
          state = VoltUiState(activeActivityTab = "Upcoming (1)"),
          onTabSelected = {},
          onFilterSelected = {},
          onReceiptClick = {},
          onRebookClick = {},
          onDismissReceipt = {},
          onDownloadStatement = {}
        )
      }
    }
    composeTestRule.onRoot().captureRoboImage(filePath = "src/test/screenshots/activity_upcoming.png")
  }

  @Test
  fun activity_business_screenshot() {
    composeTestRule.setContent {
      MyApplicationTheme {
        ActivityScreen(
          state = VoltUiState(activeActivityTab = "Business"),
          onTabSelected = {},
          onFilterSelected = {},
          onReceiptClick = {},
          onRebookClick = {},
          onDismissReceipt = {},
          onDownloadStatement = {}
        )
      }
    }
    composeTestRule.onRoot().captureRoboImage(filePath = "src/test/screenshots/activity_business.png")
  }

  @Test
  fun live_tracking_screenshot() {
    composeTestRule.setContent {
      MyApplicationTheme {
        LiveTrackingScreen(
          state = VoltUiState(
            isDispatchActive = true,
            isDriverMatched = true,
            matchedDriverName = "Marcus Vance",
            matchedVehicle = "Toyota Corolla Quest",
            driverRating = "4.97",
            driverTripsCount = "1,420 trips",
            driverLicensePlate = "JM 42 KL • GP",
            driverProvince = "Gauteng",
            driverVehicleColor = "Midnight Silver Metallic",
            rideSecurityPin = "4819",
            driverEtaMinutes = 3,
            driverEtaTimeFormatted = "09:42 AM",
            pickupLocation = "Sandton City (Rivonia Rd Entrance)",
            destinationLocation = "O.R. Tambo Int'l Airport (Terminal A)"
          ),
          onBack = {},
          onCancelRide = {}
        )
      }
    }
    composeTestRule.onRoot().captureRoboImage(filePath = "src/test/screenshots/live_tracking.png")
  }
}
