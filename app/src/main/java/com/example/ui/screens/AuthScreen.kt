package com.example.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.SizeTransform
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Stars
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.RideGoLogo
import com.example.ui.theme.IceBlue
import com.example.ui.theme.VoltOnPrimaryFixed
import com.example.ui.theme.VoltOnSurface
import com.example.ui.theme.VoltOnSurfaceVariant
import com.example.ui.theme.VoltPrimaryContainer
import com.example.ui.theme.VoltSurface
import com.example.ui.theme.VoltSurfaceContainer
import com.example.ui.theme.VoltSurfaceContainerHigh
import com.example.ui.theme.VoltSurfaceContainerHighest

enum class AuthTab {
    SIGN_IN,
    SIGN_UP
}

enum class SignUpRole {
    RIDER,
    DRIVER
}

/**
 * Ride GO Sign Up / Login Screen.
 * Strictly adheres to the 60-30-10 Black, Deep Navy Blue, and White color system.
 * Directly integrates the comprehensive Rider and Driver Sign Up flows.
 */
@Composable
fun AuthScreen(
    onSignInSuccess: (emailOrPhone: String) -> Unit,
    onStartRiderSignUp: (name: String, email: String, phone: String) -> Unit,
    onStartDriverSignUp: (name: String, phone: String) -> Unit,
    onContinueAsGuest: () -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedTab by remember { mutableStateOf(AuthTab.SIGN_IN) }
    var selectedSignUpRole by remember { mutableStateOf(SignUpRole.RIDER) }
    val scrollState = rememberScrollState()
    val focusManager = LocalFocusManager.current

    // Sign In form fields
    var loginIdentifier by remember { mutableStateOf("082 492 1093") }
    var loginPassword by remember { mutableStateOf("••••••••") }
    var loginPasswordVisible by remember { mutableStateOf(false) }
    var rememberMe by remember { mutableStateOf(true) }

    // Sign Up form fields
    var signUpName by remember { mutableStateOf("") }
    var signUpPhone by remember { mutableStateOf("") }
    var signUpEmail by remember { mutableStateOf("") }
    var signUpPassword by remember { mutableStateOf("") }
    var signUpPasswordVisible by remember { mutableStateOf(false) }
    var acceptTerms by remember { mutableStateOf(true) }

    // Validation state
    var errorMessage by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(VoltSurface)
            .statusBarsPadding()
            .navigationBarsPadding()
            .imePadding()
            .verticalScroll(scrollState)
            .padding(horizontal = 24.dp, vertical = 16.dp)
            .testTag("auth_screen"),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        // Official Ride GO Brand Emblem
        RideGoLogo(
            size = 60.dp
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Brand Name Wordmark: Ride + Deep Navy Blue GO Pill
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = "Ride",
                color = VoltOnSurface,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = (-0.5).sp
            )
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(VoltPrimaryContainer)
                    .border(1.dp, IceBlue.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                    .padding(horizontal = 10.dp, vertical = 3.dp)
            ) {
                Text(
                    text = "GO",
                    color = Color.White,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 0.5.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(4.dp))

        Text(
            text = if (selectedTab == AuthTab.SIGN_IN) {
                "Welcome back • Reliable Rides Across South Africa"
            } else {
                "Join Ride GO • Choose Rider or Driver Onboarding"
            },
            color = VoltOnSurfaceVariant,
            fontSize = 13.sp,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Segmented Tab Switcher with physical sliding indicator
        val tabSlideOffset by animateFloatAsState(
            targetValue = if (selectedTab == AuthTab.SIGN_IN) 0f else 1f,
            animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
            label = "auth_tab_slider_anim"
        )

        BoxWithConstraints(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(VoltSurfaceContainer)
                .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                .padding(4.dp)
                .testTag("auth_tab_container")
        ) {
            val tabWidth = maxWidth / 2

            // Sliding Deep Navy Pill Indicator
            Box(
                modifier = Modifier
                    .offset(x = tabWidth * tabSlideOffset)
                    .width(tabWidth)
                    .height(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltPrimaryContainer)
                    .border(1.dp, IceBlue.copy(alpha = 0.25f), RoundedCornerShape(12.dp))
            )

            // Clickable tab labels on top of the sliding indicator
            Row(modifier = Modifier.fillMaxWidth()) {
                // Sign In Tab
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .clickable {
                            selectedTab = AuthTab.SIGN_IN
                            errorMessage = null
                        }
                        .testTag("auth_tab_sign_in"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Sign In",
                        color = if (selectedTab == AuthTab.SIGN_IN) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                // Sign Up Tab
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .clickable {
                            selectedTab = AuthTab.SIGN_UP
                            errorMessage = null
                        }
                        .testTag("auth_tab_sign_up"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Sign Up",
                        color = if (selectedTab == AuthTab.SIGN_UP) VoltOnPrimaryFixed else VoltOnSurfaceVariant,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Error message if any
        if (errorMessage != null) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltSurfaceContainerHigh)
                    .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(12.dp))
                    .padding(12.dp)
            ) {
                Text(
                    text = errorMessage ?: "",
                    color = VoltPrimaryContainer,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Animated Form Content (Sliding transition between Sign In and Sign Up >= 150ms)
        AnimatedContent(
            targetState = selectedTab,
            transitionSpec = {
                if (targetState == AuthTab.SIGN_UP) {
                    (slideInHorizontally(
                        animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                        initialOffsetX = { fullWidth -> fullWidth }
                    ) + fadeIn(animationSpec = tween(220))).togetherWith(
                        slideOutHorizontally(
                            animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                            targetOffsetX = { fullWidth -> -fullWidth }
                        ) + fadeOut(animationSpec = tween(220))
                    )
                } else {
                    (slideInHorizontally(
                        animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                        initialOffsetX = { fullWidth -> -fullWidth }
                    ) + fadeIn(animationSpec = tween(220))).togetherWith(
                        slideOutHorizontally(
                            animationSpec = tween(durationMillis = 220, easing = FastOutSlowInEasing),
                            targetOffsetX = { fullWidth -> fullWidth }
                        ) + fadeOut(animationSpec = tween(220))
                    )
                }.using(SizeTransform(clip = false))
            },
            label = "auth_form_slider"
        ) { tab ->
            if (tab == AuthTab.SIGN_IN) {
                // ====================
                // SIGN IN FORM
                // ====================
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Mobile or Email field
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(
                            text = "MOBILE NUMBER OR EMAIL",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        OutlinedTextField(
                            value = loginIdentifier,
                            onValueChange = { loginIdentifier = it },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("login_identifier_input"),
                            leadingIcon = {
                                Icon(
                                    imageVector = if (loginIdentifier.contains("@")) Icons.Filled.Email else Icons.Filled.Phone,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer
                                )
                            },
                            singleLine = true,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedContainerColor = VoltSurfaceContainer,
                                unfocusedContainerColor = VoltSurfaceContainer,
                                focusedTextColor = VoltOnSurface,
                                unfocusedTextColor = VoltOnSurface,
                                focusedBorderColor = VoltPrimaryContainer,
                                unfocusedBorderColor = VoltSurfaceContainerHighest,
                                cursorColor = VoltPrimaryContainer
                            ),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(
                                keyboardType = KeyboardType.Email,
                                imeAction = ImeAction.Next
                            )
                        )
                    }

                    // Password field
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(
                            text = "PASSWORD",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )
                        OutlinedTextField(
                            value = loginPassword,
                            onValueChange = { loginPassword = it },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("login_password_input"),
                            leadingIcon = {
                                Icon(
                                    imageVector = Icons.Filled.Lock,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer
                                )
                            },
                            trailingIcon = {
                                IconButton(onClick = { loginPasswordVisible = !loginPasswordVisible }) {
                                    Icon(
                                        imageVector = if (loginPasswordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                                        contentDescription = "Toggle password visibility",
                                        tint = VoltOnSurfaceVariant
                                    )
                                }
                            },
                            visualTransformation = if (loginPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                            singleLine = true,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedContainerColor = VoltSurfaceContainer,
                                unfocusedContainerColor = VoltSurfaceContainer,
                                focusedTextColor = VoltOnSurface,
                                unfocusedTextColor = VoltOnSurface,
                                focusedBorderColor = VoltPrimaryContainer,
                                unfocusedBorderColor = VoltSurfaceContainerHighest,
                                cursorColor = VoltPrimaryContainer
                            ),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(
                                keyboardType = KeyboardType.Password,
                                imeAction = ImeAction.Done
                            ),
                            keyboardActions = KeyboardActions(
                                onDone = {
                                    focusManager.clearFocus()
                                    if (loginIdentifier.isNotBlank()) {
                                        onSignInSuccess(loginIdentifier)
                                    }
                                }
                            )
                        )
                    }

                    // Remember Me & Forgot Password Row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.clickable { rememberMe = !rememberMe }
                        ) {
                            Checkbox(
                                checked = rememberMe,
                                onCheckedChange = { rememberMe = it },
                                colors = CheckboxDefaults.colors(
                                    checkedColor = VoltPrimaryContainer,
                                    checkmarkColor = VoltOnPrimaryFixed,
                                    uncheckedColor = VoltSurfaceContainerHighest
                                )
                            )
                            Text(
                                text = "Remember me",
                                color = VoltOnSurface,
                                fontSize = 12.sp
                            )
                        }

                        Text(
                            text = "Forgot password?",
                            color = VoltPrimaryContainer,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier
                                .clickable { errorMessage = "Password reset link sent to your mobile." }
                                .padding(4.dp)
                        )
                    }

                    // Primary Sign In Button
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(52.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(VoltPrimaryContainer)
                            .shadow(8.dp, RoundedCornerShape(16.dp), spotColor = VoltPrimaryContainer)
                            .clickable {
                                if (loginIdentifier.isBlank()) {
                                    errorMessage = "Please enter your mobile number or email"
                                } else {
                                    onSignInSuccess(loginIdentifier)
                                }
                            }
                            .testTag("submit_sign_in_btn"),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "SIGN IN",
                            color = VoltOnPrimaryFixed,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 0.5.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Dedicated New User Callout: Quick Access to Rider or Driver Sign Up
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(16.dp))
                            .background(VoltSurfaceContainer)
                            .border(1.dp, VoltSurfaceContainerHighest, RoundedCornerShape(16.dp))
                            .padding(16.dp)
                    ) {
                        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text(
                                text = "NEW TO RIDE GO?",
                                color = VoltOnSurfaceVariant,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 0.5.sp
                            )
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                // Rider sign up button
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .clip(RoundedCornerShape(12.dp))
                                        .background(VoltSurfaceContainerHigh)
                                        .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(12.dp))
                                        .clickable { onStartRiderSignUp("", "", "") }
                                        .padding(vertical = 12.dp, horizontal = 10.dp)
                                        .testTag("signin_to_rider_signup_btn"),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Filled.DirectionsCar,
                                            contentDescription = null,
                                            tint = VoltPrimaryContainer,
                                            modifier = Modifier.size(16.dp)
                                        )
                                        Text(
                                            text = "Rider Sign Up",
                                            color = VoltOnSurface,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }

                                // Driver sign up button
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .clip(RoundedCornerShape(12.dp))
                                        .background(VoltSurfaceContainerHigh)
                                        .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(12.dp))
                                        .clickable { onStartDriverSignUp("", "") }
                                        .padding(vertical = 12.dp, horizontal = 10.dp)
                                        .testTag("signin_to_driver_signup_btn"),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Filled.Badge,
                                            contentDescription = null,
                                            tint = VoltPrimaryContainer,
                                            modifier = Modifier.size(16.dp)
                                        )
                                        Text(
                                            text = "Driver Sign Up",
                                            color = VoltPrimaryContainer,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // ====================
                // SIGN UP SECTION: DEDICATED RIDER & DRIVER PATHWAYS
                // ====================
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "CHOOSE ACCOUNT TYPE",
                        color = VoltOnSurfaceVariant,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )

                    // Role selector cards: Rider vs Driver
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // Rider Card Selector
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .clip(RoundedCornerShape(16.dp))
                                .background(if (selectedSignUpRole == SignUpRole.RIDER) VoltSurfaceContainerHigh else VoltSurfaceContainer)
                                .border(
                                    width = if (selectedSignUpRole == SignUpRole.RIDER) 2.dp else 1.dp,
                                    color = if (selectedSignUpRole == SignUpRole.RIDER) VoltPrimaryContainer else VoltSurfaceContainerHighest,
                                    shape = RoundedCornerShape(16.dp)
                                )
                                .clickable { selectedSignUpRole = SignUpRole.RIDER }
                                .padding(14.dp)
                                .testTag("select_rider_role_btn")
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(CircleShape)
                                            .background(if (selectedSignUpRole == SignUpRole.RIDER) VoltPrimaryContainer else VoltSurfaceContainerHighest),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = Icons.Filled.DirectionsCar,
                                            contentDescription = null,
                                            tint = if (selectedSignUpRole == SignUpRole.RIDER) VoltOnPrimaryFixed else VoltOnSurface,
                                            modifier = Modifier.size(20.dp)
                                        )
                                    }

                                    if (selectedSignUpRole == SignUpRole.RIDER) {
                                        Icon(
                                            imageVector = Icons.Filled.CheckCircle,
                                            contentDescription = null,
                                            tint = VoltPrimaryContainer,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }
                                }

                                Text(
                                    text = "Rider Account",
                                    color = VoltOnSurface,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "Book rides & unlock R50 voucher",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp,
                                    lineHeight = 15.sp
                                )
                            }
                        }

                        // Driver Card Selector
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .clip(RoundedCornerShape(16.dp))
                                .background(if (selectedSignUpRole == SignUpRole.DRIVER) VoltSurfaceContainerHigh else VoltSurfaceContainer)
                                .border(
                                    width = if (selectedSignUpRole == SignUpRole.DRIVER) 2.dp else 1.dp,
                                    color = if (selectedSignUpRole == SignUpRole.DRIVER) VoltPrimaryContainer else VoltSurfaceContainerHighest,
                                    shape = RoundedCornerShape(16.dp)
                                )
                                .clickable { selectedSignUpRole = SignUpRole.DRIVER }
                                .padding(14.dp)
                                .testTag("select_driver_role_btn")
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(CircleShape)
                                            .background(if (selectedSignUpRole == SignUpRole.DRIVER) VoltPrimaryContainer else VoltSurfaceContainerHighest),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = Icons.Filled.Badge,
                                            contentDescription = null,
                                            tint = if (selectedSignUpRole == SignUpRole.DRIVER) VoltOnPrimaryFixed else VoltOnSurface,
                                            modifier = Modifier.size(20.dp)
                                        )
                                    }

                                    if (selectedSignUpRole == SignUpRole.DRIVER) {
                                        Icon(
                                            imageVector = Icons.Filled.CheckCircle,
                                            contentDescription = null,
                                            tint = VoltPrimaryContainer,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }
                                }

                                Text(
                                    text = "Driver Partner",
                                    color = VoltOnSurface,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "Earn up to R8,500/wk with 12% commission",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 11.sp,
                                    lineHeight = 15.sp
                                )
                            }
                        }
                    }

                    // Direct Launch Action Banner based on selected role
                    if (selectedSignUpRole == SignUpRole.RIDER) {
                        // RIDER SIGN UP DIRECT ACTION
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(16.dp))
                                .background(VoltSurfaceContainer)
                                .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(16.dp))
                                .padding(16.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Icon(
                                        imageVector = Icons.Filled.Stars,
                                        contentDescription = null,
                                        tint = VoltPrimaryContainer,
                                        modifier = Modifier.size(18.dp)
                                    )
                                    Text(
                                        text = "Official 5-Step Rider Sign Up",
                                        color = VoltOnSurface,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }

                                Text(
                                    text = "• Step 1: Sign up details & password\n• Step 2: SMS & Email OTP verification\n• Step 3: Smart ID or Passport capture\n• Step 4: Facial selfie liveness match\n• Step 5: Payment method & R50 voucher",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 12.sp,
                                    lineHeight = 18.sp
                                )

                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(48.dp)
                                        .clip(RoundedCornerShape(14.dp))
                                        .background(VoltPrimaryContainer)
                                        .clickable {
                                            onStartRiderSignUp(signUpName, signUpEmail, signUpPhone)
                                        }
                                        .testTag("open_rider_signup_screen_btn"),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        Text(
                                            text = "OPEN RIDER SIGN UP SCREEN",
                                            color = VoltOnPrimaryFixed,
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.Black
                                        )
                                        Icon(
                                            imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                            contentDescription = null,
                                            tint = VoltOnPrimaryFixed,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    } else {
                        // DRIVER SIGN UP DIRECT ACTION
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(16.dp))
                                .background(VoltSurfaceContainer)
                                .border(1.dp, VoltPrimaryContainer, RoundedCornerShape(16.dp))
                                .padding(16.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Icon(
                                        imageVector = Icons.Filled.Shield,
                                        contentDescription = null,
                                        tint = VoltPrimaryContainer,
                                        modifier = Modifier.size(18.dp)
                                    )
                                    Text(
                                        text = "Official 5-Step Driver Onboarding",
                                        color = VoltOnSurface,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }

                                Text(
                                    text = "• Step 1: Personal credentials & City\n• Step 2: License card & PrDP upload\n• Step 3: SAPS biometric background check\n• Step 4: Vehicle review & Dekra disc\n• Step 5: Partner activation & Payout bank",
                                    color = VoltOnSurfaceVariant,
                                    fontSize = 12.sp,
                                    lineHeight = 18.sp
                                )

                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(48.dp)
                                        .clip(RoundedCornerShape(14.dp))
                                        .background(VoltPrimaryContainer)
                                        .clickable {
                                            onStartDriverSignUp(signUpName, signUpPhone)
                                        }
                                        .testTag("open_driver_onboarding_screen_btn"),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        Text(
                                            text = "OPEN DRIVER ONBOARDING SCREEN",
                                            color = VoltOnPrimaryFixed,
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.Black
                                        )
                                        Icon(
                                            imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                            contentDescription = null,
                                            tint = VoltOnPrimaryFixed,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(4.dp))

                    // Optional Quick-Start Pre-fill Fields
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text(
                            text = "OR PRE-FILL YOUR INFORMATION",
                            color = VoltOnSurfaceVariant,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )

                        // Full Name
                        OutlinedTextField(
                            value = signUpName,
                            onValueChange = { signUpName = it },
                            placeholder = { Text("Full Name (e.g. Sipho Mabaso)", color = VoltOnSurfaceVariant) },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("signup_name_input"),
                            leadingIcon = {
                                Icon(
                                    imageVector = Icons.Filled.Person,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer
                                )
                            },
                            singleLine = true,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedContainerColor = VoltSurfaceContainer,
                                unfocusedContainerColor = VoltSurfaceContainer,
                                focusedTextColor = VoltOnSurface,
                                unfocusedTextColor = VoltOnSurface,
                                focusedBorderColor = VoltPrimaryContainer,
                                unfocusedBorderColor = VoltSurfaceContainerHighest,
                                cursorColor = VoltPrimaryContainer
                            ),
                            shape = RoundedCornerShape(14.dp)
                        )

                        // Mobile Number
                        OutlinedTextField(
                            value = signUpPhone,
                            onValueChange = { signUpPhone = it },
                            placeholder = { Text("082 123 4567", color = VoltOnSurfaceVariant) },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("signup_phone_input"),
                            leadingIcon = {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    modifier = Modifier.padding(start = 12.dp, end = 4.dp)
                                ) {
                                    Text(
                                        text = "+27",
                                        color = VoltPrimaryContainer,
                                        fontSize = 14.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Box(
                                        modifier = Modifier
                                            .width(1.dp)
                                            .height(20.dp)
                                            .background(VoltSurfaceContainerHighest)
                                    )
                                }
                            },
                            singleLine = true,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedContainerColor = VoltSurfaceContainer,
                                unfocusedContainerColor = VoltSurfaceContainer,
                                focusedTextColor = VoltOnSurface,
                                unfocusedTextColor = VoltOnSurface,
                                focusedBorderColor = VoltPrimaryContainer,
                                unfocusedBorderColor = VoltSurfaceContainerHighest,
                                cursorColor = VoltPrimaryContainer
                            ),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone)
                        )

                        // Email
                        OutlinedTextField(
                            value = signUpEmail,
                            onValueChange = { signUpEmail = it },
                            placeholder = { Text("sipho@example.co.za", color = VoltOnSurfaceVariant) },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("signup_email_input"),
                            leadingIcon = {
                                Icon(
                                    imageVector = Icons.Filled.Email,
                                    contentDescription = null,
                                    tint = VoltPrimaryContainer
                                )
                            },
                            singleLine = true,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedContainerColor = VoltSurfaceContainer,
                                unfocusedContainerColor = VoltSurfaceContainer,
                                focusedTextColor = VoltOnSurface,
                                unfocusedTextColor = VoltOnSurface,
                                focusedBorderColor = VoltPrimaryContainer,
                                unfocusedBorderColor = VoltSurfaceContainerHighest,
                                cursorColor = VoltPrimaryContainer
                            ),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
                        )

                        // Terms Checkbox
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { acceptTerms = !acceptTerms },
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Checkbox(
                                checked = acceptTerms,
                                onCheckedChange = { acceptTerms = it },
                                colors = CheckboxDefaults.colors(
                                    checkedColor = VoltPrimaryContainer,
                                    checkmarkColor = VoltOnPrimaryFixed,
                                    uncheckedColor = VoltSurfaceContainerHighest
                                )
                            )
                            Text(
                                text = "I agree to the Ride GO Terms of Service and Privacy Policy.",
                                color = VoltOnSurfaceVariant,
                                fontSize = 12.sp,
                                lineHeight = 16.sp
                            )
                        }

                        // Submit Button for pre-filled data
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(52.dp)
                                .clip(RoundedCornerShape(16.dp))
                                .background(VoltPrimaryContainer)
                                .shadow(8.dp, RoundedCornerShape(16.dp), spotColor = VoltPrimaryContainer)
                                .clickable {
                                    if (selectedSignUpRole == SignUpRole.RIDER) {
                                        onStartRiderSignUp(signUpName, signUpEmail, signUpPhone)
                                    } else {
                                        onStartDriverSignUp(signUpName, signUpPhone)
                                    }
                                }
                                .testTag("submit_sign_up_btn"),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = if (selectedSignUpRole == SignUpRole.RIDER) {
                                    "CONTINUE RIDER SIGN UP →"
                                } else {
                                    "CONTINUE DRIVER ONBOARDING →"
                                },
                                color = VoltOnPrimaryFixed,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 0.5.sp
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Guest / Skip Mode
        Box(
            modifier = Modifier
                .clip(CircleShape)
                .clickable { onContinueAsGuest() }
                .padding(horizontal = 16.dp, vertical = 8.dp)
                .testTag("skip_as_guest_btn"),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Skip for now • Explore as Guest",
                color = VoltOnSurfaceVariant,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Spacer(modifier = Modifier.height(12.dp))
    }
}
