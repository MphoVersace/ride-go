package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.ui.theme.VoltGreen
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSecondary
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest
import com.example.ui.theme.VoltSurfaceContainerLow

private const val PROFILE_AVATAR_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0YxM6ObsFE_glbaPfgO-8ms2C-WFMc2gZzguhnRa8eRX59G9LNumWX_oj7zrAgUBOluiCCEjKGLWsz5U0yI7ysFqF7rl8VcSgzup_ioe89hm54VqCT88IQ1euYGNOCgdJk0TSm7EZhF86pB_7_aeMjB51mm49bPCulYOlRfhue1gvG3j81L6ZBn9i21-xmPFdojEvDzepXEAc8mRDaZsyAUV8K9mr810izLY3MjG_ayGhsJW6g9_Q"

@Composable
fun AccountScreen(
    onActionClick: (String) -> Unit,
    onSwitchToDriverClick: () -> Unit = {},
    isRiderVerified: Boolean = false,
    onVerifyRiderClick: () -> Unit = {},
    onSignOutClick: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .testTag("account_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // User Profile Summary Card
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainer)
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .border(2.dp, VoltPrimaryContainer, CircleShape)
            ) {
                AsyncImage(
                    model = ImageRequest.Builder(LocalContext.current)
                        .data(if (isRiderVerified) "https://lh3.googleusercontent.com/aida-public/AB6AXuC_hpmAR41urfWSsqQ0q9ZrrwqgF3IiflmE4tJXavqqQIDHmsyg-m8MiqtGYHVze0nn9me6GCM9BU75yHkQWPAEkQe44T4nbQxG1t-gVI9FOle31mF_FmrOm_ioB_j5vFwL8u52NAs5E5sBISruz-LFkgC1zekdsDkCDjQ3w0ErNfCfhrFJvWQ7ndYaoEKvnZzzhaCdP-PN7xQnVs5TeDtP-u-ByaLnJ4Q0nNyqur_BRyWN5Llw73Hg" else PROFILE_AVATAR_URL)
                        .crossfade(true)
                        .build(),
                    contentDescription = "Profile Picture",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (isRiderVerified) "Thulane J. Sigasa" else "Thulane J. Sigasa",
                    color = VoltOnSurface,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "pharezsigasa@gmail.com",
                    color = VoltOnSurfaceVariant,
                    fontSize = 12.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer)
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = if (isRiderVerified) "TIER 1 VERIFIED ★ 5.0" else "TOP RIDER ★ 4.98",
                            color = VoltOnPrimaryFixed,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                    }
                    if (isRiderVerified) {
                        Box(
                            modifier = Modifier
                                .clip(CircleShape)
                                .background(VoltGreen.copy(alpha = 0.2f))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = "SA ID ✓",
                                color = VoltGreen,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // Rider ID Verification Status Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .border(
                    1.dp,
                    if (isRiderVerified) VoltGreen.copy(alpha = 0.4f) else VoltPrimaryContainer.copy(alpha = 0.4f),
                    RoundedCornerShape(16.dp)
                )
                .clickable { onVerifyRiderClick() }
                .padding(14.dp)
                .testTag("account_rider_verification_card")
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    modifier = Modifier.weight(1f),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(if (isRiderVerified) VoltGreen.copy(alpha = 0.2f) else VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = if (isRiderVerified) Icons.Filled.CheckCircle else Icons.Filled.Badge,
                            contentDescription = null,
                            tint = if (isRiderVerified) VoltGreen else VoltOnPrimaryFixed,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = if (isRiderVerified) "SA Smart ID Verified" else "Verify Your SA Smart ID",
                            color = VoltOnSurface,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = if (isRiderVerified) "Biometrics cleared • SmartID: 9403••••084" else "5-Step rider check • Get R50 voucher",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                    }
                }

                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(if (isRiderVerified) VoltSurfaceContainerHighest else VoltPrimaryContainer)
                        .padding(horizontal = 10.dp, vertical = 5.dp)
                ) {
                    Text(
                        text = if (isRiderVerified) "VIEW" else "VERIFY",
                        color = if (isRiderVerified) VoltOnSurface else VoltOnPrimaryFixed,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Driver Onboarding Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainer)
                .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.35f), RoundedCornerShape(20.dp))
                .clickable { onSwitchToDriverClick() }
                .padding(16.dp)
                .testTag("driver_onboarding_account_card")
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    modifier = Modifier.weight(1f),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(CircleShape)
                            .background(VoltPrimaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Badge,
                            contentDescription = null,
                            tint = VoltOnPrimaryFixed,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "Drive with Ride",
                                color = VoltOnSurface,
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Go",
                                color = Color.White,
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Text(
                            text = "Earn R14,500+ Avg Weekly • 5-Step Verification",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp
                        )
                    }
                }
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = "START",
                        color = VoltOnPrimaryFixed,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Volt Wallet & Cash Balance
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(20.dp))
                .background(VoltSurfaceContainerLow)
                .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.2f), RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "RIDE GO WALLET",
                        color = Color.White.copy(alpha = 0.8f),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "R150.00",
                        color = VoltOnSurface,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(VoltPrimaryContainer)
                        .clickable { onActionClick("Top up Ride Go Wallet") }
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                ) {
                    Text(
                        text = "+ Top Up",
                        color = VoltOnPrimaryFixed,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))
            HorizontalDivider(color = VoltSurfaceContainerHighest)
            Spacer(modifier = Modifier.height(10.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.CreditCard,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Capitec Pay (•••• 4282) Primary",
                        color = VoltOnSurfaceVariant,
                        fontSize = 12.sp
                    )
                }
                Text(
                    text = "Manage",
                    color = Color.White,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable { onActionClick("Manage payment methods") }
                )
            }
        }

        // Settings Section
        Text(
            text = "PREFERENCES & SAFETY",
            color = VoltSecondary,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.sp
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
        ) {
            AccountSettingItem(
                icon = Icons.Filled.Security,
                title = "Safety & Emergency Tools",
                subtitle = "Share trip status, PIN verification, 24/7 SOS",
                onClick = { onActionClick("Safety Tools opened") }
            )
            HorizontalDivider(color = VoltSurfaceContainerHigh, modifier = Modifier.padding(horizontal = 16.dp))
            AccountSettingItem(
                icon = Icons.Filled.Star,
                title = "Ride Pass & Rewards",
                subtitle = "Earn points on rides across Cape Town & Joburg",
                onClick = { onActionClick("Ride Pass & Rewards") }
            )
            HorizontalDivider(color = VoltSurfaceContainerHigh, modifier = Modifier.padding(horizontal = 16.dp))
            AccountSettingItem(
                icon = Icons.Filled.Lock,
                title = "Privacy & Security",
                subtitle = "Biometrics, device permissions, sign-in",
                onClick = { onActionClick("Privacy Settings") }
            )
            HorizontalDivider(color = VoltSurfaceContainerHigh, modifier = Modifier.padding(horizontal = 16.dp))
            AccountSettingItem(
                icon = Icons.Filled.SupportAgent,
                title = "24/7 Priority Concierge",
                subtitle = "Instant live support for Cape Town fleet",
                onClick = { onActionClick("Concierge Support contacted") }
            )
        }

        // Sign Out Button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                .clickable { onSignOutClick() }
                .padding(16.dp)
                .testTag("account_sign_out_btn"),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Sign Out",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
private fun AccountSettingItem(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(14.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(
            modifier = Modifier.weight(1f),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(VoltSurfaceContainerHigh),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(18.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = title,
                    color = VoltOnSurface,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = subtitle,
                    color = VoltSecondary,
                    fontSize = 11.sp
                )
            }
        }

        Icon(
            imageVector = Icons.Filled.ChevronRight,
            contentDescription = null,
            tint = Color.White.copy(alpha = 0.7f),
            modifier = Modifier.size(18.dp)
        )
    }
}
