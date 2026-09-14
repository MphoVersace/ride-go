package com.example.ui.components

import android.content.Context
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.graphics.Paint
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
import org.osmdroid.util.BoundingBox
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.CustomZoomButtonsController
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Polyline

/**
 * High-performance Jetpack Compose wrapper for OpenStreetMap via osmdroid.
 * Features:
 * - 100% Free & Open-Source (Zero API keys, zero quota limits).
 * - Custom Executive Dark Mode ColorMatrix: Inverts and tints standard OSM tiles
 *   to match Ride Go's 60-30-10 Black (#000000) and Deep Navy (#0B1938) palette.
 * - Smooth camera navigation, multi-touch gestures, and dynamic recentering.
 * - Real road-accurate route polyline overlay support via [routePoints].
 */
@Composable
fun OsmMapView(
    latitude: Double,
    longitude: Double,
    modifier: Modifier = Modifier,
    zoomLevel: Double = 15.5,
    isDarkMode: Boolean = true,
    recenterTrigger: Int = 0,
    routePoints: List<GeoPoint> = emptyList(),
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

    // Route polyline overlay — redraws whenever routePoints changes
    LaunchedEffect(routePoints) {
        // Remove any existing route overlays
        val existingRoutes = mapView.overlays.filterIsInstance<Polyline>()
        mapView.overlays.removeAll(existingRoutes)

        if (routePoints.size >= 2) {
            // Shadow/backing stroke for depth (dark navy, wider)
            val shadowLine = Polyline(mapView).apply {
                setPoints(routePoints)
                outlinePaint.apply {
                    color = android.graphics.Color.argb(200, 11, 25, 56) // #0B1938 navy
                    strokeWidth = 24f
                    strokeCap = Paint.Cap.ROUND
                    strokeJoin = Paint.Join.ROUND
                    isAntiAlias = true
                }
                isGeodesic = false
            }

            // Main white route stroke
            val routeLine = Polyline(mapView).apply {
                setPoints(routePoints)
                outlinePaint.apply {
                    color = android.graphics.Color.WHITE
                    strokeWidth = 7f
                    strokeCap = Paint.Cap.ROUND
                    strokeJoin = Paint.Join.ROUND
                    isAntiAlias = true
                    // Dashed effect to match the design language
                    pathEffect = android.graphics.DashPathEffect(floatArrayOf(28f, 18f), 0f)
                }
                isGeodesic = false
            }

            mapView.overlays.add(shadowLine)
            mapView.overlays.add(routeLine)

            // Fit camera to show entire route with padding
            val boundingBox = BoundingBox.fromGeoPoints(routePoints)
            mapView.post {
                mapView.zoomToBoundingBox(boundingBox, true, 80)
            }

            mapView.invalidate()
        }
    }

    // Camera recenter on trigger or coordinate change (when no route is active)
    LaunchedEffect(recenterTrigger, latitude, longitude) {
        if (routePoints.isEmpty()) {
            mapView.controller.animateTo(
                GeoPoint(latitude, longitude),
                zoomLevel,
                900L
            )
        }
    }

    AndroidView(
        factory = { mapView },
        modifier = modifier.fillMaxSize()
    )
}
