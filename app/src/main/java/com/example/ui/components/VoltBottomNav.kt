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
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.LocalTaxi
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
import com.example.model.VoltScreenTab
import com.example.ui.theme.VoltSurfaceContainerHigh

/**
 * Floating Stadium Pill Bottom Navigation Bar.
 * Contains exclusively the 4 primary app tabs: Hub, Rides, Activity, and Account.
 * Features:
 * - Floating Stadium/Capsule geometry with deep obsidian drop shadow.
 * - Sliding active tab indicator with elevated squircle and pure white active dot.
 * - Strict 60-30-10 Black/Deep Navy/Pure White color palette.
 */
@Composable
fun VoltBottomNav(
    currentTab: VoltScreenTab,
    onTabSelected: (VoltScreenTab) -> Unit,
    modifier: Modifier = Modifier
) {
    val targetIndex = when (currentTab) {
        VoltScreenTab.EXPLORE -> 0
        VoltScreenTab.RIDES -> 1
        VoltScreenTab.ACTIVITY -> 2
        VoltScreenTab.ACCOUNT -> 3
        VoltScreenTab.DRIVER -> 1
    }

    val animatedIndex by animateFloatAsState(
        targetValue = targetIndex.toFloat(),
        animationSpec = tween(durationMillis = 240, easing = FastOutSlowInEasing),
        label = "bottom_nav_slider"
    )

    // Outer transparent host to position the floating pill above the system navigation bar
    Box(
        modifier = modifier
            .fillMaxWidth()
            .background(Color.Transparent)
            .navigationBarsPadding()
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .testTag("volt_bottom_nav"),
        contentAlignment = Alignment.Center
    ) {
        // Floating Stadium Capsule
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(66.dp)
                .shadow(elevation = 16.dp, shape = CircleShape, spotColor = Color.Black)
                .clip(CircleShape)
                .background(VoltSurfaceContainerHigh.copy(alpha = 0.96f))
                .border(1.dp, Color.White.copy(alpha = 0.14f), CircleShape)
                .padding(horizontal = 6.dp, vertical = 6.dp)
        ) {
            BoxWithConstraints(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                val tabCount = 4
                val itemWidth = maxWidth / tabCount
                val pillWidth = itemWidth - 8.dp

                // Sliding Active Tab Indicator Capsule
                Box(
                    modifier = Modifier
                        .align(Alignment.CenterStart)
                        .offset(x = itemWidth * animatedIndex + 4.dp)
                        .width(pillWidth)
                        .height(52.dp)
                        .clip(RoundedCornerShape(22.dp))
                        .background(Color(0xFF162A54))
                        .border(1.dp, Color.White.copy(alpha = 0.20f), RoundedCornerShape(22.dp))
                )

                Row(
                    modifier = Modifier.fillMaxSize(),
                    horizontalArrangement = Arrangement.SpaceAround,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    NavItem(
                        tab = VoltScreenTab.EXPLORE,
                        label = "Hub",
                        icon = Icons.Filled.NearMe,
                        isSelected = currentTab == VoltScreenTab.EXPLORE,
                        onClick = { onTabSelected(VoltScreenTab.EXPLORE) },
                        modifier = Modifier.weight(1f)
                    )
                    NavItem(
                        tab = VoltScreenTab.RIDES,
                        label = "Rides",
                        icon = Icons.Filled.LocalTaxi,
                        isSelected = currentTab == VoltScreenTab.RIDES || currentTab == VoltScreenTab.DRIVER,
                        onClick = { onTabSelected(VoltScreenTab.RIDES) },
                        modifier = Modifier.weight(1f)
                    )
                    NavItem(
                        tab = VoltScreenTab.ACTIVITY,
                        label = "Activity",
                        icon = Icons.Filled.History,
                        isSelected = currentTab == VoltScreenTab.ACTIVITY,
                        onClick = { onTabSelected(VoltScreenTab.ACTIVITY) },
                        modifier = Modifier.weight(1f)
                    )
                    NavItem(
                        tab = VoltScreenTab.ACCOUNT,
                        label = "Account",
                        icon = Icons.Filled.Person,
                        isSelected = currentTab == VoltScreenTab.ACCOUNT,
                        onClick = { onTabSelected(VoltScreenTab.ACCOUNT) },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

@Composable
private fun NavItem(
    tab: VoltScreenTab,
    label: String,
    icon: ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val activeColor = Color.White
    val inactiveColor = Color.White.copy(alpha = 0.55f)

    Column(
        modifier = modifier
            .fillMaxHeight()
            .clip(RoundedCornerShape(22.dp))
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null,
                onClick = onClick
            )
            .padding(vertical = 4.dp)
            .testTag("nav_item_${tab.name.lowercase()}"),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = if (isSelected) activeColor else inactiveColor,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = label,
            color = if (isSelected) activeColor else inactiveColor,
            fontSize = 9.5.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
            letterSpacing = 0.2.sp
        )
        Spacer(modifier = Modifier.height(2.dp))
        // Active indicator dot
        Box(
            modifier = Modifier
                .size(3.5.dp)
                .clip(CircleShape)
                .background(if (isSelected) Color.White else Color.Transparent)
        )
    }
}
