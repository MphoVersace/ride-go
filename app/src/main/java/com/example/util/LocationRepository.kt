package com.example.util

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import com.example.model.NominatimSuggestion
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray
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

    /**
     * Live Nominatim address autocomplete search.
     *
     * Queries the free OpenStreetMap Nominatim API with the provided [query] string and returns
     * up to [limit] address suggestions as [NominatimSuggestion] items.
     *
     * By default restricts results to South Africa (`countrycodes=za`). Set [globalFallback] to
     * true to broaden the search worldwide when SA returns no results.
     *
     * Must be called from a coroutine context; internally switches to [Dispatchers.IO].
     */
    suspend fun searchAddresses(
        query: String,
        limit: Int = 7,
        globalFallback: Boolean = false
    ): List<NominatimSuggestion> = withContext(Dispatchers.IO) {
        if (query.isBlank()) return@withContext emptyList()
        val results = fetchNominatimSuggestions(query, limit, countryCode = "za")
        if (results.isEmpty() && globalFallback) {
            return@withContext fetchNominatimSuggestions(query, limit, countryCode = null)
        }
        results
    }

    private fun fetchNominatimSuggestions(
        query: String,
        limit: Int,
        countryCode: String?
    ): List<NominatimSuggestion> {
        return try {
            val encoded = java.net.URLEncoder.encode(query.trim(), "UTF-8")
            val countryParam = if (countryCode != null) "&countrycodes=$countryCode" else ""
            val url = "https://nominatim.openstreetmap.org/search" +
                "?q=$encoded$countryParam&format=jsonv2&limit=$limit&addressdetails=1"

            val request = Request.Builder()
                .url(url)
                .header("User-Agent", "RideGo-Android/1.0 (contact@ride-go.co.za)")
                .header("Accept-Language", "en")
                .build()

            val response = httpClient.newCall(request).execute()
            val body = response.body?.string() ?: return emptyList()
            val array = JSONArray(body)

            val suggestions = mutableListOf<NominatimSuggestion>()
            for (i in 0 until array.length()) {
                val item = array.getJSONObject(i)
                val placeId = item.optLong("place_id", i.toLong())
                val displayName = item.optString("display_name", "")
                val lat = item.optDouble("lat", 0.0)
                val lon = item.optDouble("lon", 0.0)
                val type = item.optString("type", "")
                val addressObj = item.optJSONObject("address")
                val (shortLabel, subLabel) = buildLabels(displayName, addressObj)
                suggestions.add(
                    NominatimSuggestion(
                        placeId = placeId,
                        displayName = displayName,
                        shortLabel = shortLabel,
                        subLabel = subLabel,
                        lat = lat,
                        lon = lon,
                        type = type
                    )
                )
            }
            suggestions
        } catch (_: Exception) {
            emptyList()
        }
    }

    /**
     * Builds concise display labels from the raw Nominatim address object.
     * Returns Pair(shortLabel, subLabel).
     */
    private fun buildLabels(displayName: String, address: JSONObject?): Pair<String, String> {
        if (address == null) {
            // Fall back to splitting the full display name on commas
            val parts = displayName.split(",").map { it.trim() }
            val short = parts.take(2).joinToString(", ")
            val sub = parts.drop(2).take(2).joinToString(", ")
            return short to sub
        }

        val amenity = address.optString("amenity", "")
        val road = address.optString("road", "")
        val houseNumber = address.optString("house_number", "")
        val suburb = address.optString("suburb", "")
            .ifEmpty { address.optString("neighbourhood", "") }
            .ifEmpty { address.optString("quarter", "") }
        val city = address.optString("city", "")
            .ifEmpty { address.optString("town", "") }
            .ifEmpty { address.optString("village", "") }
        val province = address.optString("state", "")

        val primaryParts = mutableListOf<String>()
        if (amenity.isNotEmpty()) primaryParts.add(amenity)
        else {
            if (houseNumber.isNotEmpty() && road.isNotEmpty()) primaryParts.add("$houseNumber $road")
            else if (road.isNotEmpty()) primaryParts.add(road)
        }
        if (suburb.isNotEmpty()) primaryParts.add(suburb)

        val shortLabel = if (primaryParts.isEmpty()) {
            displayName.split(",").take(2).joinToString(", ").trim()
        } else {
            primaryParts.take(2).joinToString(", ")
        }

        val subParts = mutableListOf<String>()
        if (city.isNotEmpty()) subParts.add(city)
        if (province.isNotEmpty()) subParts.add(province)
        val subLabel = subParts.joinToString(", ")

        return shortLabel to subLabel
    }
}

