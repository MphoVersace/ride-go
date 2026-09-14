package com.example.ui.components

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
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
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.Polyline

/**
 * High-performance Jetpack Compose wrapper for OpenStreetMap via osmdroid.
 * Features:
 * - 100% Free & Open-Source (Zero API keys, zero quota limits).
 * - Custom Executive Dark Mode ColorMatrix: Inverts and tints standard OSM tiles
 *   to match Ride Go's 60-30-10 Black (#000000) and Deep Navy (#0B1938) palette.
 * - Locked User Location Ping: Genuine osmdroid Marker anchored to exact GPS coordinates,
 *   so the ping stays 100% locked to the road/building when zooming or panning.
 * - Destination Pin & Dotted Destination Route Polyline Overlay support.
 */
@Composable
fun OsmMapView(
    latitude: Double,
    longitude: Double,
    modifier: Modifier = Modifier,
    zoomLevel: Double = 15.5,
    isDarkMode: Boolean = true,
    recenterTrigger: Int = 0,
    showUserLocationMarker: Boolean = true,
    destinationPoint: GeoPoint? = null,
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

    // Locked User Location Ping Marker overlay (stays strictly pinned on zoom & pan)
    LaunchedEffect(latitude, longitude, showUserLocationMarker) {
        val userPoint = GeoPoint(latitude, longitude)
        val existingUserMarkers = mapView.overlays.filterIsInstance<Marker>().filter { it.id == "user_location_ping" }
        mapView.overlays.removeAll(existingUserMarkers)

        if (showUserLocationMarker) {
            val userMarker = Marker(mapView).apply {
                id = "user_location_ping"
                position = userPoint
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_CENTER)
                icon = createUserBeaconDrawable(context)
                infoWindow = null
            }
            mapView.overlays.add(userMarker)
            mapView.invalidate()
        }
    }

    // Destination Pin Marker overlay
    LaunchedEffect(destinationPoint) {
        val existingDestMarkers = mapView.overlays.filterIsInstance<Marker>().filter { it.id == "destination_ping" }
        mapView.overlays.removeAll(existingDestMarkers)

        if (destinationPoint != null) {
            val destMarker = Marker(mapView).apply {
                id = "destination_ping"
                position = destinationPoint
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                icon = createDestinationPinDrawable(context)
                infoWindow = null
            }
            mapView.overlays.add(destMarker)
            mapView.invalidate()
        }
    }

    // Route polyline & Bounding box framing overlay
    LaunchedEffect(routePoints, destinationPoint, latitude, longitude) {
        val existingRoutes = mapView.overlays.filterIsInstance<Polyline>()
        mapView.overlays.removeAll(existingRoutes)

        val pointsToDraw = if (routePoints.size >= 2) {
            routePoints
        } else if (destinationPoint != null) {
            listOf(GeoPoint(latitude, longitude), destinationPoint)
        } else {
            emptyList()
        }

        if (pointsToDraw.size >= 2) {
            // Shadow / backing stroke for depth (dark navy, wider)
            val shadowLine = Polyline(mapView).apply {
                setPoints(pointsToDraw)
                outlinePaint.apply {
                    color = android.graphics.Color.argb(220, 11, 25, 56) // Deep Navy
                    strokeWidth = 24f
                    strokeCap = Paint.Cap.ROUND
                    strokeJoin = Paint.Join.ROUND
                    isAntiAlias = true
                }
                isGeodesic = false
            }

            // Main crisp white dashed route stroke
            val routeLine = Polyline(mapView).apply {
                setPoints(pointsToDraw)
                outlinePaint.apply {
                    color = android.graphics.Color.WHITE
                    strokeWidth = 8f
                    strokeCap = Paint.Cap.ROUND
                    strokeJoin = Paint.Join.ROUND
                    isAntiAlias = true
                    pathEffect = android.graphics.DashPathEffect(floatArrayOf(24f, 16f), 0f)
                }
                isGeodesic = false
            }

            mapView.overlays.add(shadowLine)
            mapView.overlays.add(routeLine)

            // Auto frame camera to fit all points with comfortable padding
            val boundingBox = BoundingBox.fromGeoPoints(pointsToDraw)
            mapView.post {
                mapView.zoomToBoundingBox(boundingBox, true, 110)
            }
            mapView.invalidate()
        }
    }

    // Camera recenter on trigger or coordinate change (when no route is active)
    LaunchedEffect(recenterTrigger, latitude, longitude) {
        if (routePoints.isEmpty() && destinationPoint == null) {
            mapView.controller.animateTo(
                GeoPoint(latitude, longitude),
                zoomLevel,
                800L
            )
        }
    }

    AndroidView(
        factory = { mapView },
        modifier = modifier.fillMaxSize()
    )
}

/**
 * Creates a high-contrast circular location beacon icon for the user's position.
 * Strictly adheres to Ride Go's 60-30-10 palette (White & Deep Navy Blue).
 */
private fun createUserBeaconDrawable(context: Context): Drawable {
    val density = context.resources.displayMetrics.density
    val sizePx = (36 * density).toInt().coerceAtLeast(54)
    val bitmap = Bitmap.createBitmap(sizePx, sizePx, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    val center = sizePx / 2f

    // 1. Outer halo pulse ring (translucent deep navy / white tint)
    val haloPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.argb(90, 14, 36, 84) // Deep navy 35% alpha
        style = Paint.Style.FILL
    }
    canvas.drawCircle(center, center, center * 0.90f, haloPaint)

    // 2. High-contrast white outer ring
    val ringPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        style = Paint.Style.STROKE
        strokeWidth = 3f * density
    }
    canvas.drawCircle(center, center, center * 0.68f, ringPaint)

    // 3. Crisp white beacon core
    val corePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        style = Paint.Style.FILL
    }
    canvas.drawCircle(center, center, center * 0.52f, corePaint)

    // 4. Center obsidian black / deep navy indicator dot
    val centerDotPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.rgb(11, 25, 56) // Deep Navy #0B1938
        style = Paint.Style.FILL
    }
    canvas.drawCircle(center, center, center * 0.24f, centerDotPaint)

    return BitmapDrawable(context.resources, bitmap)
}

/**
 * Creates a crisp white teardrop destination pin with deep navy inner dot.
 */
private fun createDestinationPinDrawable(context: Context): Drawable {
    val density = context.resources.displayMetrics.density
    val widthPx = (34 * density).toInt().coerceAtLeast(50)
    val heightPx = (46 * density).toInt().coerceAtLeast(68)
    val bitmap = Bitmap.createBitmap(widthPx, heightPx, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)

    val r = widthPx / 2f

    // Drop shadow
    val shadowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.argb(120, 0, 0, 0)
        style = Paint.Style.FILL
    }
    val shadowPath = Path().apply {
        arcTo(RectF(2f, 2f, widthPx - 2f, widthPx - 2f), 180f, 180f, false)
        lineTo(widthPx / 2f, heightPx.toFloat())
        close()
    }
    canvas.drawPath(shadowPath, shadowPaint)

    // Solid white teardrop pin
    val pinPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        style = Paint.Style.FILL
    }
    val pinPath = Path().apply {
        arcTo(RectF(0f, 0f, widthPx.toFloat(), widthPx.toFloat()), 180f, 180f, false)
        lineTo(widthPx / 2f, (heightPx - 3 * density))
        close()
    }
    canvas.drawPath(pinPath, pinPaint)

    // Center dark navy circle
    val innerCirclePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.rgb(11, 25, 56) // #0B1938
        style = Paint.Style.FILL
    }
    canvas.drawCircle(r, r, r * 0.42f, innerCirclePaint)

    // Center white dot
    val innerDotPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        style = Paint.Style.FILL
    }
    canvas.drawCircle(r, r, r * 0.18f, innerDotPaint)

    return BitmapDrawable(context.resources, bitmap)
}
