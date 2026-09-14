package com.example.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.ui.res.painterResource
import com.example.R
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.LocalTaxi
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.model.VoltScreenTab
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh

private const val PROFILE_AVATAR_URL =
    "https://lh3.googleusercontent.com/aida/AEtjO1VXAw8bNm11zgxl6J_ZJcmZClK6WZy2m8yCamAD0Pywbo0TpybXWRmifk7uO0LcyjwXFBiHSAa0e3gqQUCeomu0vqokffoEY1hU1gHMzQJAAzxZHPLV8LNTEr3PJvNV4uXwxuihe9E8Jw_pnHG0rNh32Qa-a8qb89oEIULV_a8w87C1_Q_M4WDi1ss9nExL7jS0FGDRiNKujBXUDtFPcTfZMJ74wCT3lghmRsD__3r5PSKcCjYvdz-7mbQmx5hwD8ZxovCmHoW5Ww"

@Composable
fun VoltTopBar(
    currentTab: VoltScreenTab,
    driverStep: Int = 1,
    isDriverOnboarding: Boolean = false,
    isRiderVerification: Boolean = false,
    riderStep: Int = 1,
    onBackClick: (() -> Unit)? = null,
    onNotificationsClick: () -> Unit = {},
    onSupportClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val isDriver = isDriverOnboarding || currentTab == VoltScreenTab.DRIVER

    val driverStepTitles = listOf(
        "Driver Credentials",
        "Government Id Capture",
        "Biometric Facial Scan",
        "Vehicle Inspection Check",
        "Verification Status Tracker"
    )

    val riderStepTitles = listOf(
        "Welcome to Ride Go",
        "Phone Verification",
        "Government Id Capture",
        "Biometric Facial Scan",
        "Identity Profile Setup"
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .background(VoltSurface.copy(alpha = 0.95f))
            .statusBarsPadding()
            .height(64.dp)
            .padding(horizontal = 14.dp)
            .testTag("volt_top_bar"),
        contentAlignment = Alignment.Center
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            if ((isDriver || isRiderVerification) && onBackClick != null) {
                IconButton(
                    onClick = onBackClick,
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainer)
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
            } else {
                // Official Ride GO Brand Logo (RIDEGO.png)
                Image(
                    painter = painterResource(id = R.drawable.ridego_wide),
                    contentDescription = "Ride Go Logo",
                    contentScale = ContentScale.Fit,
                    modifier = Modifier
                        .height(34.dp)
                        .testTag("top_bar_ridego_logo")
                )
            }

            // Center or Spacer
            if (isRiderVerification) {
                Column(
                    modifier = Modifier.weight(1f),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = riderStepTitles.getOrElse(riderStep - 1) { "Identity Verification" }.uppercase(),
                        color = VoltOnSurfaceVariant,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp,
                        maxLines = 1
                    )
                    Spacer(modifier = Modifier.height(3.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        for (i in 1..5) {
                            Box(
                                modifier = Modifier
                                    .size(if (i == riderStep) 6.dp else 4.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (i == riderStep) VoltPrimaryContainer
                                        else if (i < riderStep) VoltPrimaryContainer.copy(alpha = 0.4f)
                                        else VoltSurfaceContainerHigh
                                    )
                            )
                        }
                    }
                }
            } else if (isDriverOnboarding) {
                Column(
                    modifier = Modifier.weight(1f),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = driverStepTitles.getOrElse(driverStep - 1) { "Driver Onboarding" }.uppercase(),
                        color = VoltOnSurfaceVariant,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp,
                        maxLines = 1
                    )
                    Spacer(modifier = Modifier.height(3.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        for (i in 1..5) {
                            Box(
                                modifier = Modifier
                                    .size(if (i == driverStep) 6.dp else 4.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (i == driverStep) VoltPrimaryContainer
                                        else if (i < driverStep) VoltPrimaryContainer.copy(alpha = 0.4f)
                                        else VoltSurfaceContainerHigh
                                    )
                            )
                        }
                    }
                }
            } else {
                Spacer(modifier = Modifier.weight(1f))
            }

            if (!isRiderVerification && !isDriverOnboarding) {
                // Notifications Bell
                IconButton(
                    onClick = onNotificationsClick,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(VoltSurfaceContainerHigh)
                        .testTag("notification_button")
                ) {
                    Box(contentAlignment = Alignment.TopEnd) {
                        Icon(
                            imageVector = Icons.Filled.Notifications,
                            contentDescription = "Notifications",
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .clip(CircleShape)
                                .background(VoltPrimaryContainer)
                        )
                    }
                }

                Spacer(modifier = Modifier.width(8.dp))

                // Profile Picture
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .border(2.dp, VoltPrimaryContainer.copy(alpha = 0.4f), CircleShape)
                        .clickable(onClick = onProfileClick)
                        .testTag("profile_avatar"),
                    contentAlignment = Alignment.Center
                ) {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(PROFILE_AVATAR_URL)
                            .crossfade(true)
                            .build(),
                        contentDescription = "User Profile",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
            } else {
                // Symmetrical Spacer balancing the 38dp back button on the left
                Spacer(modifier = Modifier.size(38.dp))
            }
        }
    }
}

