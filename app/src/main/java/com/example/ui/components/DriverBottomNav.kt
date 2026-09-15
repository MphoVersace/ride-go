package com.example.ui.components

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.DriverScreenTab
import com.example.ui.theme.VoltSurfaceContainerHigh

@Composable
fun DriverBottomNav(
    currentTab: DriverScreenTab,
    onTabSelected: (DriverScreenTab) -> Unit,
    modifier: Modifier = Modifier
) {
    val targetIndex = when (currentTab) {
        DriverScreenTab.CONSOLE -> 0
        DriverScreenTab.ACTIVE_TRIP -> 1
        DriverScreenTab.EARNINGS -> 2
        DriverScreenTab.PROFILE -> 3
    }

    val animatedIndex by animateFloatAsState(
        targetValue = targetIndex.toFloat(),
        animationSpec = tween(durationMillis = 240, easing = FastOutSlowInEasing),
        label = "driver_bottom_nav_slider"
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .background(Color.Transparent)
            .navigationBarsPadding()
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .testTag("driver_bottom_nav"),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp)
                .clip(CircleShape)
                .shadow(
                    elevation = 20.dp,
                    shape = CircleShape,
                    spotColor = Color(0xFF0E2454),
                    ambientColor = Color(0xFF000000)
                )
                .background(Color(0xFF0B1938))
                .border(1.dp, Color(0xFF16294E), CircleShape)
                .padding(horizontal = 6.dp, vertical = 6.dp)
        ) {
            BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
                val tabWidth = maxWidth / 4

                // Sliding active pill indicator
                Box(
                    modifier = Modifier
                        .offset(x = tabWidth * animatedIndex)
                        .width(tabWidth)
                        .fillMaxHeight()
                        .clip(CircleShape)
                        .background(Color(0xFF0E2454))
                        .border(1.dp, Color(0xFF183574), CircleShape)
                ) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = 3.dp)
                            .size(4.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                    )
                }

                Row(
                    modifier = Modifier.fillMaxSize(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    DriverNavItem(
                        label = "Console",
                        icon = Icons.Filled.DirectionsCar,
                        isSelected = currentTab == DriverScreenTab.CONSOLE,
                        onClick = { onTabSelected(DriverScreenTab.CONSOLE) },
                        modifier = Modifier.weight(1f)
                    )
                    DriverNavItem(
                        label = "Trip",
                        icon = Icons.Filled.NearMe,
                        isSelected = currentTab == DriverScreenTab.ACTIVE_TRIP,
                        onClick = { onTabSelected(DriverScreenTab.ACTIVE_TRIP) },
                        modifier = Modifier.weight(1f)
                    )
                    DriverNavItem(
                        label = "Earnings",
                        icon = Icons.Filled.AccountBalanceWallet,
                        isSelected = currentTab == DriverScreenTab.EARNINGS,
                        onClick = { onTabSelected(DriverScreenTab.EARNINGS) },
                        modifier = Modifier.weight(1f)
                    )
                    DriverNavItem(
                        label = "Profile",
                        icon = Icons.Filled.Person,
                        isSelected = currentTab == DriverScreenTab.PROFILE,
                        onClick = { onTabSelected(DriverScreenTab.PROFILE) },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

@Composable
private fun DriverNavItem(
    label: String,
    icon: ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val interactionSource = remember { MutableInteractionSource() }

    Column(
        modifier = modifier
            .fillMaxHeight()
            .clip(CircleShape)
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = onClick
            ),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = if (isSelected) Color.White else Color(0xFF94A3B8),
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = label,
            color = if (isSelected) Color.White else Color(0xFF94A3B8),
            fontSize = 10.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
            maxLines = 1
        )
    }
}
