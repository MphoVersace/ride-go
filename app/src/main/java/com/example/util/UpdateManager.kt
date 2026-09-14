package com.example.util

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.core.content.FileProvider
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL

data class AppReleaseInfo(
    val tagName: String,
    val releaseName: String,
    val downloadUrl: String,
    val releaseNotes: String,
    val publishedAt: String
)

object UpdateManager {

    private const val GITHUB_LATEST_RELEASE_API =
        "https://api.github.com/repos/MphoVersace/ride-go/releases/latest"

    /**
     * Checks GitHub Releases API for the latest published build.
     * Returns AppReleaseInfo if a release with an APK is found, null otherwise.
     */
    suspend fun checkLatestRelease(): AppReleaseInfo? = withContext(Dispatchers.IO) {
        try {
            val url = URL(GITHUB_LATEST_RELEASE_API)
            val connection = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                setRequestProperty("Accept", "application/vnd.github.v3+json")
                setRequestProperty("User-Agent", "RideGo-Android")
                connectTimeout = 8000
                readTimeout = 8000
            }

            if (connection.responseCode != 200) {
                return@withContext null
            }

            val responseBody = connection.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(responseBody)

            val tagName = json.optString("tag_name", "latest")
            val releaseName = json.optString("name", "Ride Go Latest Build")
            val body = json.optString("body", "")
            val publishedAt = json.optString("published_at", "")

            var downloadUrl: String? = null
            val assets = json.optJSONArray("assets")
            if (assets != null) {
                for (i in 0 until assets.length()) {
                    val asset = assets.getJSONObject(i)
                    val name = asset.optString("name", "")
                    if (name.endsWith(".apk", ignoreCase = true)) {
                        downloadUrl = asset.optString("browser_download_url")
                        break
                    }
                }
            }

            if (downloadUrl != null) {
                AppReleaseInfo(
                    tagName = tagName,
                    releaseName = releaseName,
                    downloadUrl = downloadUrl,
                    releaseNotes = body,
                    publishedAt = publishedAt
                )
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Downloads the APK file to the app's cache directory with progress reporting.
     */
    suspend fun downloadApk(
        context: Context,
        downloadUrl: String,
        onProgress: (Float) -> Unit = {}
    ): File? = withContext(Dispatchers.IO) {
        try {
            val destinationFile = File(context.cacheDir, "ride-go-update.apk")
            if (destinationFile.exists()) {
                destinationFile.delete()
            }

            val url = URL(downloadUrl)
            val connection = (url.openConnection() as HttpURLConnection).apply {
                connectTimeout = 15000
                readTimeout = 30000
                instanceFollowRedirects = true
            }

            val contentLength = connection.contentLength
            var downloadedBytes = 0L

            connection.inputStream.use { input ->
                FileOutputStream(destinationFile).use { output ->
                    val buffer = ByteArray(8192)
                    var bytesRead: Int
                    while (input.read(buffer).also { bytesRead = it } != -1) {
                        output.write(buffer, 0, bytesRead)
                        downloadedBytes += bytesRead
                        if (contentLength > 0) {
                            val progress = downloadedBytes.toFloat() / contentLength.toFloat()
                            withContext(Dispatchers.Main) {
                                onProgress(progress.coerceIn(0f, 1f))
                            }
                        }
                    }
                }
            }

            destinationFile
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Launches the Android OS package installer using FileProvider.
     */
    fun launchApkInstaller(context: Context, apkFile: File): Boolean {
        return try {
            val authority = "${context.packageName}.provider"
            val apkUri: Uri = FileProvider.getUriForFile(context, authority, apkFile)

            val intent = Intent(Intent.ACTION_VIEW).apply {
                setDataAndType(apkUri, "application/vnd.android.package-archive")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }

            context.startActivity(intent)
            true
        } catch (e: Exception) {
            false
        }
    }
}
