package com.example.ui.components

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
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
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.LocalTaxi
import androidx.compose.material.icons.filled.NearMe
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
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
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface

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
        animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
        label = "bottom_nav_slider"
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .shadow(elevation = 16.dp, spotColor = Color.Black)
            .background(VoltSurface.copy(alpha = 0.96f))
            .navigationBarsPadding()
            .height(68.dp)
            .testTag("volt_bottom_nav"),
        contentAlignment = Alignment.Center
    ) {
        BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
            val itemWidth = maxWidth / 4
            val pillWidth = 68.dp

            // Sliding Active Indicator Capsule
            Box(
                modifier = Modifier
                    .align(Alignment.CenterStart)
                    .offset(x = itemWidth * animatedIndex + (itemWidth - pillWidth) / 2)
                    .width(pillWidth)
                    .height(52.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(VoltPrimaryContainer.copy(alpha = 0.14f))
                    .border(1.dp, VoltPrimaryContainer.copy(alpha = 0.35f), RoundedCornerShape(16.dp))
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceAround,
                verticalAlignment = Alignment.CenterVertically
            ) {
                NavItem(
                    tab = VoltScreenTab.EXPLORE,
                    icon = Icons.Filled.NearMe,
                    isSelected = currentTab == VoltScreenTab.EXPLORE,
                    onClick = { onTabSelected(VoltScreenTab.EXPLORE) }
                )
                NavItem(
                    tab = VoltScreenTab.RIDES,
                    icon = Icons.Filled.LocalTaxi,
                    isSelected = currentTab == VoltScreenTab.RIDES,
                    onClick = { onTabSelected(VoltScreenTab.RIDES) }
                )
                NavItem(
                    tab = VoltScreenTab.ACTIVITY,
                    icon = Icons.Filled.History,
                    isSelected = currentTab == VoltScreenTab.ACTIVITY,
                    onClick = { onTabSelected(VoltScreenTab.ACTIVITY) }
                )
                NavItem(
                    tab = VoltScreenTab.ACCOUNT,
                    icon = Icons.Filled.Person,
                    isSelected = currentTab == VoltScreenTab.ACCOUNT,
                    onClick = { onTabSelected(VoltScreenTab.ACCOUNT) }
                )
            }
        }
    }
}

@Composable
private fun NavItem(
    tab: VoltScreenTab,
    icon: ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val activeColor = Color.White
    val inactiveColor = Color.White.copy(alpha = 0.6f)

    Column(
        modifier = Modifier
            .size(width = 72.dp, height = 52.dp)
            .clip(CircleShape)
            .clickable(onClick = onClick)
            .padding(vertical = 4.dp)
            .testTag("nav_item_${tab.name.lowercase()}"),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = tab.label,
            tint = if (isSelected) activeColor else inactiveColor,
            modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = tab.label.uppercase(),
            color = if (isSelected) activeColor else inactiveColor,
            fontSize = 10.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
            letterSpacing = 0.5.sp
        )
    }
}
