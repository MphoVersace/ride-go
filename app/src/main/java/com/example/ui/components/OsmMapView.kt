package com.example.ui.components

import android.content.Context
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalInspectionMode
import androidx.compose.ui.viewinterop.AndroidView
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.CustomZoomButtonsController
import org.osmdroid.views.MapView

/**
 * High-performance Jetpack Compose wrapper for OpenStreetMap via osmdroid.
 * Features:
 * - 100% Free & Open-Source (Zero API keys, zero quota limits).
 * - Custom Executive Dark Mode ColorMatrix: Inverts and tints standard OSM tiles
 *   to match Ride Go's 60-30-10 Black (#000000) and Deep Navy (#0B1938) palette.
 * - Smooth camera navigation, multi-touch gestures, and dynamic recentering.
 */
@Composable
fun OsmMapView(
    latitude: Double,
    longitude: Double,
    modifier: Modifier = Modifier,
    zoomLevel: Double = 15.5,
    isDarkMode: Boolean = true,
    recenterTrigger: Int = 0,
    onMapReady: (MapView) -> Unit = {}
) {
    val isInspection = LocalInspectionMode.current
    if (isInspection) {
        // Fallback for Android Studio Compose Preview
        Box(
            modifier = modifier
                .fillMaxSize()
                .background(Color(0xFF0B1938))
        )
        return
    }

    val context = LocalContext.current

    // Initialize osmdroid configuration with application package user-agent
    remember(context) {
        Configuration.getInstance().apply {
            load(context, context.getSharedPreferences("osmdroid_ride_go", Context.MODE_PRIVATE))
            userAgentValue = context.packageName
        }
    }

    val mapView = remember {
        MapView(context).apply {
            setTileSource(TileSourceFactory.MAPNIK)
            setMultiTouchControls(true)
            isTilesScaledToDpi = true
            zoomController.setVisibility(CustomZoomButtonsController.Visibility.NEVER)
            minZoomLevel = 4.0
            maxZoomLevel = 20.0

            if (isDarkMode) {
                // Executive Dark Mode Color Filter: inverts light tiles and casts Deep Navy blue
                val darkMatrix = floatArrayOf(
                    -0.80f,  0.00f,  0.00f, 0f, 215f, // Red
                     0.00f, -0.80f,  0.00f, 0f, 225f, // Green
                     0.00f,  0.00f, -0.60f, 0f, 250f, // Blue (subtle navy/slate boost)
                     0.00f,  0.00f,  0.00f, 1f,   0f  // Alpha
                )
                val colorFilter = ColorMatrixColorFilter(ColorMatrix(darkMatrix))
                overlayManager.tilesOverlay.setColorFilter(colorFilter)
            }

            controller.setZoom(zoomLevel)
            controller.setCenter(GeoPoint(latitude, longitude))
            onMapReady(this)
        }
    }

    // Lifecycle handling: resume/pause tile loader
    DisposableEffect(mapView) {
        mapView.onResume()
        onDispose {
            mapView.onPause()
            mapView.onDetach()
        }
    }

    // Camera recenter on trigger or coordinate change
    LaunchedEffect(recenterTrigger, latitude, longitude) {
        mapView.controller.animateTo(
            GeoPoint(latitude, longitude),
            zoomLevel,
            900L
        )
    }

    AndroidView(
        factory = { mapView },
        modifier = modifier.fillMaxSize()
    )
}
