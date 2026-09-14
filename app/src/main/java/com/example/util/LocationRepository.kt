package com.example.util

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.suspendCancellableCoroutine
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import kotlin.coroutines.resume

/**
 * LocationRepository
 *
 * Fetches the device's real GPS coordinates using FusedLocationProviderClient and
 * reverse-geocodes them to a human-readable South African address via the free
 * OpenStreetMap Nominatim API (no API key required).
 *
 * Permissions ACCESS_FINE_LOCATION and ACCESS_COARSE_LOCATION must be granted before calling
 * [getCurrentLocation]. Check permissions at the call site using ActivityResultContracts.
 */
object LocationRepository {

    private val httpClient = OkHttpClient()

    /**
     * Gets the current device GPS location. Returns null if location services are unavailable
     * or the fix times out.
     */
    @SuppressLint("MissingPermission")
    suspend fun getCurrentLocation(context: Context): Location? {
        val fusedClient = LocationServices.getFusedLocationProviderClient(context)

        // First try last known location for speed
        val lastKnown = suspendCancellableCoroutine<Location?> { cont ->
            fusedClient.lastLocation
                .addOnSuccessListener { location -> cont.resume(location) }
                .addOnFailureListener { cont.resume(null) }
        }
        if (lastKnown != null) return lastKnown

        // Fall back to a fresh single-shot high-accuracy fix
        return suspendCancellableCoroutine { cont ->
            val request = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10_000L)
                .setMaxUpdates(1)
                .setWaitForAccurateLocation(false)
                .build()

            val callback = object : com.google.android.gms.location.LocationCallback() {
                override fun onLocationResult(result: com.google.android.gms.location.LocationResult) {
                    fusedClient.removeLocationUpdates(this)
                    cont.resume(result.lastLocation)
                }
            }
            fusedClient.requestLocationUpdates(request, callback, context.mainLooper)
            cont.invokeOnCancellation { fusedClient.removeLocationUpdates(callback) }
        }
    }

    /**
     * Reverse-geocodes [lat]/[lon] to a short human-readable address string using Nominatim.
     * Returns a formatted South African address or falls back to coordinate string.
     */
    fun reverseGeocode(lat: Double, lon: Double): String {
        return try {
            val url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=$lat&lon=$lon&zoom=17&addressdetails=1"
            val request = Request.Builder()
                .url(url)
                .header("User-Agent", "RideGo-Android/1.0 (contact@ride-go.co.za)")
                .build()
            val response = httpClient.newCall(request).execute()
            val body = response.body?.string() ?: return fallback(lat, lon)
            val json = JSONObject(body)
            formatAddress(json)
        } catch (e: Exception) {
            fallback(lat, lon)
        }
    }

    private fun formatAddress(json: JSONObject): String {
        val address = json.optJSONObject("address") ?: return json.optString("display_name", "Current Location")
        val road = address.optString("road", "")
        val suburb = address.optString("suburb", "")
            .ifEmpty { address.optString("neighbourhood", "") }
            .ifEmpty { address.optString("quarter", "") }
        val city = address.optString("city", "")
            .ifEmpty { address.optString("town", "") }
            .ifEmpty { address.optString("village", "") }

        return when {
            road.isNotEmpty() && suburb.isNotEmpty() -> "$road, $suburb"
            road.isNotEmpty() && city.isNotEmpty() -> "$road, $city"
            suburb.isNotEmpty() && city.isNotEmpty() -> "$suburb, $city"
            city.isNotEmpty() -> city
            else -> json.optString("display_name", "Current Location").take(50)
        }
    }

    private fun fallback(lat: Double, lon: Double): String =
        "%.4f, %.4f".format(lat, lon)
}
