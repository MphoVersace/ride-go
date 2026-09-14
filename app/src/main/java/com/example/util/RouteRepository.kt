package com.example.util

import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import org.osmdroid.util.GeoPoint

/**
 * RouteRepository
 *
 * Fetches real road-following route geometry between two coordinates using the free
 * OSRM (Open Source Routing Machine) public demo server backed by OpenStreetMap data.
 *
 * No API key required. Returns a list of [GeoPoint]s that represent the exact road path,
 * which can be drawn as an osmdroid Polyline overlay on the map.
 *
 * Also provides forward geocoding of address strings to lat/lon via Nominatim OSM.
 */
object RouteRepository {

    private val httpClient = OkHttpClient()

    /**
     * Fetches a road-accurate route between [fromLat]/[fromLon] and [toLat]/[toLon].
     * Uses OSRM public demo server (car profile, full geometry overview).
     *
     * Returns an empty list if routing fails (network error, no route found, etc.).
     */
    fun fetchRoute(
        fromLat: Double, fromLon: Double,
        toLat: Double, toLon: Double
    ): List<GeoPoint> {
        return try {
            // OSRM route API: returns full geometry of the actual road path
            val url = "https://router.project-osrm.org/route/v1/driving/" +
                "$fromLon,$fromLat;$toLon,$toLat" +
                "?overview=full&geometries=geojson"

            val request = Request.Builder()
                .url(url)
                .header("User-Agent", "RideGo-Android/1.0 (contact@ride-go.co.za)")
                .build()

            val response = httpClient.newCall(request).execute()
            val body = response.body?.string() ?: return emptyList()
            val json = JSONObject(body)

            if (json.optString("code") != "Ok") return emptyList()

            val routes = json.optJSONArray("routes") ?: return emptyList()
            if (routes.length() == 0) return emptyList()

            val geometry = routes.getJSONObject(0)
                .getJSONObject("geometry")
            val coordinates = geometry.getJSONArray("coordinates")

            val points = mutableListOf<GeoPoint>()
            for (i in 0 until coordinates.length()) {
                val coord = coordinates.getJSONArray(i)
                val lon = coord.getDouble(0)
                val lat = coord.getDouble(1)
                points.add(GeoPoint(lat, lon))
            }
            points
        } catch (e: Exception) {
            emptyList()
        }
    }

    /**
     * Forward-geocodes an address string to a [GeoPoint] using Nominatim OSM.
     * Restricts search to South Africa for accuracy.
     * Returns null if geocoding fails.
     */
    fun geocodeAddress(address: String): GeoPoint? {
        return try {
            val encoded = java.net.URLEncoder.encode(address, "UTF-8")
            val url = "https://nominatim.openstreetmap.org/search" +
                "?q=$encoded&countrycodes=za&format=jsonv2&limit=1"

            val request = Request.Builder()
                .url(url)
                .header("User-Agent", "RideGo-Android/1.0 (contact@ride-go.co.za)")
                .build()

            val response = httpClient.newCall(request).execute()
            val body = response.body?.string() ?: return null
            val array = org.json.JSONArray(body)
            if (array.length() == 0) return null

            val result = array.getJSONObject(0)
            val lat = result.getDouble("lat")
            val lon = result.getDouble("lon")
            GeoPoint(lat, lon)
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Convenience method: geocodes both endpoints then fetches the OSRM road route.
     * Returns empty list if either geocoding or routing fails.
     */
    fun fetchRouteByAddress(fromAddress: String, toAddress: String): List<GeoPoint> {
        val from = geocodeAddress(fromAddress) ?: return emptyList()
        val to = geocodeAddress(toAddress) ?: return emptyList()
        return fetchRoute(from.latitude, from.longitude, to.latitude, to.longitude)
    }
}
