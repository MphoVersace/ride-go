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
    val scrollState = rememberScrollState()
    val focusManager = LocalFocusManager.current

    // Sign In form fields
    var loginIdentifier by remember { mutableStateOf("082 492 1093") }
    var loginPassword by remember { mutableStateOf("••••••••") }
    var loginPasswordVisible by remember { mutableStateOf(false) }
    var rememberMe by remember { mutableStateOf(true) }

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

        // Official Ride GO Brand Logo (@RIDEGO.png)
        RideGoLogo(
            size = 48.dp
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Welcome to Ride Go • South Africa",
            color = VoltOnSurfaceVariant,
            fontSize = 13.sp,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Segmented Tab Switcher
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

            // Active Sign In Pill Indicator
            Box(
                modifier = Modifier
                    .width(tabWidth)
                    .height(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(VoltPrimaryContainer)
                    .border(1.dp, IceBlue.copy(alpha = 0.25f), RoundedCornerShape(12.dp))
            )

            // Clickable tab labels
            Row(modifier = Modifier.fillMaxWidth()) {
                // Sign In Tab (Active)
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .testTag("auth_tab_sign_in"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Sign In",
                        color = VoltOnPrimaryFixed,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                // Sign Up Tab - directly opens the Rider Sign Up screen where user can also switch to Driver
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .clickable {
                            onStartRiderSignUp("", "", "")
                        }
                        .testTag("auth_tab_sign_up"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Sign Up",
                        color = VoltOnSurfaceVariant,
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
