package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.example.model.RideTierType
import com.example.ui.theme.VoltPrimaryContainer

@Composable
fun VehicleSilhouette(
    tier: RideTierType,
    modifier: Modifier = Modifier,
    width: Dp = 80.dp,
    height: Dp = 48.dp
) {
    Box(modifier = modifier.size(width, height)) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            when (tier) {
                RideTierType.ECO -> drawEcoCar(size.width, size.height)
                RideTierType.COMFORT -> drawComfortCar(size.width, size.height)
                RideTierType.XL -> drawXlCar(size.width, size.height)
                RideTierType.BLACK -> drawBlackCar(size.width, size.height)
            }
        }
    }
}

private fun DrawScope.drawEcoCar(w: Float, h: Float) {
    // Ground shadow
    drawOval(
        brush = Brush.radialGradient(
            colors = listOf(VoltPrimaryContainer.copy(alpha = 0.25f), Color.Transparent),
            center = Offset(w * 0.5f, h * 0.88f),
            radius = w * 0.45f
        ),
        topLeft = Offset(w * 0.1f, h * 0.82f),
        size = Size(w * 0.8f, h * 0.14f)
    )

    // Body
    val bodyPath = Path().apply {
        moveTo(w * 0.15f, h * 0.72f)
        cubicTo(w * 0.12f, h * 0.65f, w * 0.14f, h * 0.52f, w * 0.20f, h * 0.46f)
        lineTo(w * 0.32f, h * 0.28f)
        cubicTo(w * 0.38f, h * 0.18f, w * 0.46f, h * 0.14f, w * 0.58f, h * 0.14f)
        lineTo(w * 0.70f, h * 0.14f)
        cubicTo(w * 0.78f, h * 0.14f, w * 0.85f, h * 0.20f, w * 0.90f, h * 0.30f)
        lineTo(w * 0.96f, h * 0.48f)
        cubicTo(w * 0.98f, h * 0.58f, w * 0.96f, h * 0.68f, w * 0.92f, h * 0.72f)
        lineTo(w * 0.15f, h * 0.72f)
        close()
    }
    drawPath(
        path = bodyPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF333333), Color(0xFF1E1E1E), Color(0xFF0F0F0F)),
            start = Offset(w * 0.15f, h * 0.25f),
            end = Offset(w * 0.90f, h * 0.75f)
        )
    )
    drawPath(path = bodyPath, color = Color(0xFF888888), style = Stroke(width = 1.5f))

    // Windshield & windows
    val windowPath = Path().apply {
        moveTo(w * 0.35f, h * 0.32f)
        lineTo(w * 0.46f, h * 0.20f)
        lineTo(w * 0.70f, h * 0.20f)
        cubicTo(w * 0.75f, h * 0.20f, w * 0.80f, h * 0.24f, w * 0.84f, h * 0.32f)
        lineTo(w * 0.88f, h * 0.45f)
        lineTo(w * 0.30f, h * 0.45f)
        close()
    }
    drawPath(
        path = windowPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFFCCCCCC), Color(0x66FFFFFF), Color(0xFF1A1A1A))
        )
    )
    drawPath(path = windowPath, color = Color(0x88FFFFFF), style = Stroke(width = 1f))

    // Headlight & taillight
    drawCircle(VoltPrimaryContainer, radius = w * 0.025f, center = Offset(w * 0.92f, h * 0.52f))
    drawLine(VoltPrimaryContainer, Offset(w * 0.14f, h * 0.58f), Offset(w * 0.19f, h * 0.58f), strokeWidth = 2f)

    // Wheels
    drawWheel(w * 0.32f, h * 0.74f, h * 0.18f, Color(0xFFE4E4E7))
    drawWheel(w * 0.76f, h * 0.74f, h * 0.18f, Color(0xFFE4E4E7))
}

private fun DrawScope.drawComfortCar(w: Float, h: Float) {
    // Ice blue luminous ground illumination
    drawOval(
        brush = Brush.radialGradient(
            colors = listOf(Color(0x887DD3FC), Color(0x222563EB), Color.Transparent),
            center = Offset(w * 0.5f, h * 0.88f),
            radius = w * 0.48f
        ),
        topLeft = Offset(w * 0.08f, h * 0.82f),
        size = Size(w * 0.84f, h * 0.15f)
    )

    // Sleek sedan body
    val bodyPath = Path().apply {
        moveTo(w * 0.10f, h * 0.68f)
        cubicTo(w * 0.08f, h * 0.58f, w * 0.12f, h * 0.48f, w * 0.18f, h * 0.42f)
        lineTo(w * 0.36f, h * 0.22f)
        cubicTo(w * 0.44f, h * 0.12f, w * 0.56f, h * 0.10f, w * 0.72f, h * 0.12f)
        lineTo(w * 0.85f, h * 0.22f)
        cubicTo(w * 0.92f, h * 0.28f, w * 0.96f, h * 0.38f, w * 0.98f, h * 0.48f)
        lineTo(w * 0.99f, h * 0.58f)
        cubicTo(w * 0.99f, h * 0.66f, w * 0.95f, h * 0.72f, w * 0.88f, h * 0.72f)
        lineTo(w * 0.14f, h * 0.72f)
        close()
    }
    drawPath(
        path = bodyPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF3A3528), Color(0xFF222019), Color(0xFF141312), Color(0xFF080807)),
            start = Offset(w * 0.1f, h * 0.2f),
            end = Offset(w * 0.95f, h * 0.7f)
        )
    )
    drawPath(path = bodyPath, color = VoltPrimaryContainer, style = Stroke(width = 1.8f))

    // Ice blue tinted glass
    val windowPath = Path().apply {
        moveTo(w * 0.32f, h * 0.32f)
        lineTo(w * 0.44f, h * 0.17f)
        lineTo(w * 0.70f, h * 0.17f)
        cubicTo(w * 0.77f, h * 0.17f, w * 0.82f, h * 0.22f, w * 0.86f, h * 0.28f)
        lineTo(w * 0.89f, h * 0.40f)
        lineTo(w * 0.26f, h * 0.40f)
        close()
    }
    drawPath(
        path = windowPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFFBAE6FD), Color(0x667DD3FC), Color(0xDD0D172E))
        )
    )
    drawPath(path = windowPath, color = VoltPrimaryContainer, style = Stroke(width = 1f))

    // Modern beltline stroke
    drawLine(
        color = VoltPrimaryContainer,
        start = Offset(w * 0.14f, h * 0.48f),
        end = Offset(w * 0.97f, h * 0.52f),
        strokeWidth = 2f,
        cap = StrokeCap.Round
    )

    // LED headlights & taillights
    drawOval(
        brush = Brush.radialGradient(
            colors = listOf(Color.White, VoltPrimaryContainer, Color.Transparent),
            center = Offset(w * 0.96f, h * 0.52f),
            radius = w * 0.05f
        ),
        topLeft = Offset(w * 0.91f, h * 0.48f),
        size = Size(w * 0.09f, h * 0.08f)
    )
    drawLine(VoltPrimaryContainer, Offset(w * 0.10f, h * 0.56f), Offset(w * 0.15f, h * 0.56f), strokeWidth = 2.5f)

    // Canary spoked wheels
    drawWheel(w * 0.28f, h * 0.74f, h * 0.19f, VoltPrimaryContainer)
    drawWheel(w * 0.78f, h * 0.74f, h * 0.19f, VoltPrimaryContainer)
}

private fun DrawScope.drawXlCar(w: Float, h: Float) {
    // Subtle ground shadow
    drawOval(
        brush = Brush.radialGradient(
            colors = listOf(Color(0x22000000), Color.Transparent),
            center = Offset(w * 0.5f, h * 0.88f),
            radius = w * 0.46f
        ),
        topLeft = Offset(w * 0.08f, h * 0.82f),
        size = Size(w * 0.84f, h * 0.15f)
    )

    // Roof rack
    drawRoundRect(
        color = VoltPrimaryContainer,
        topLeft = Offset(w * 0.35f, h * 0.08f),
        size = Size(w * 0.42f, h * 0.04f),
        cornerRadius = CornerRadius(2f, 2f)
    )

    // SUV body
    val bodyPath = Path().apply {
        moveTo(w * 0.10f, h * 0.72f)
        cubicTo(w * 0.08f, h * 0.62f, w * 0.10f, h * 0.48f, w * 0.14f, h * 0.40f)
        lineTo(w * 0.22f, h * 0.22f)
        cubicTo(w * 0.28f, h * 0.14f, w * 0.35f, h * 0.12f, w * 0.44f, h * 0.12f)
        lineTo(w * 0.82f, h * 0.12f)
        cubicTo(w * 0.88f, h * 0.12f, w * 0.94f, h * 0.18f, w * 0.96f, h * 0.28f)
        lineTo(w * 0.98f, h * 0.46f)
        cubicTo(w * 1.00f, h * 0.56f, w * 0.98f, h * 0.68f, w * 0.94f, h * 0.72f)
        lineTo(w * 0.10f, h * 0.72f)
        close()
    }
    drawPath(
        path = bodyPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF2A2A2A), Color(0xFF1C1C1C), Color(0xFF101010), Color(0xFF000000)),
            start = Offset(w * 0.1f, h * 0.15f),
            end = Offset(w * 0.95f, h * 0.75f)
        )
    )
    drawPath(path = bodyPath, color = Color(0xFFCCCCCC), style = Stroke(width = 1.5f))

    // Panoramic side glass
    val windowPath = Path().apply {
        moveTo(w * 0.24f, h * 0.36f)
        lineTo(w * 0.32f, h * 0.18f)
        lineTo(w * 0.84f, h * 0.18f)
        lineTo(w * 0.90f, h * 0.38f)
        lineTo(w * 0.18f, h * 0.38f)
        close()
    }
    drawPath(
        path = windowPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFFDDDDDD), Color(0x66AAAAAA), Color(0xFF111111))
        )
    )
    drawPath(path = windowPath, color = Color(0xFF888888), style = Stroke(width = 1f))

    // Chrome accent line
    drawLine(Color(0xFFFFFFFF), Offset(w * 0.12f, h * 0.50f), Offset(w * 0.97f, h * 0.50f), strokeWidth = 1.5f)

    // Rugged wheels
    drawWheel(w * 0.28f, h * 0.74f, h * 0.20f, Color(0xFFE4E4E7))
    drawWheel(w * 0.78f, h * 0.74f, h * 0.20f, Color(0xFFE4E4E7))
}

private fun DrawScope.drawBlackCar(w: Float, h: Float) {
    // Subtle luxury VIP Ice Blue underglow
    drawOval(
        brush = Brush.radialGradient(
            colors = listOf(Color(0x667DD3FC), Color(0x222563EB), Color.Transparent),
            center = Offset(w * 0.5f, h * 0.88f),
            radius = w * 0.50f
        ),
        topLeft = Offset(w * 0.05f, h * 0.82f),
        size = Size(w * 0.90f, h * 0.15f)
    )

    // Long wheelbase executive saloon
    val bodyPath = Path().apply {
        moveTo(w * 0.06f, h * 0.68f)
        cubicTo(w * 0.04f, h * 0.58f, w * 0.08f, h * 0.48f, w * 0.14f, h * 0.40f)
        lineTo(w * 0.30f, h * 0.24f)
        cubicTo(w * 0.40f, h * 0.14f, w * 0.54f, h * 0.10f, w * 0.70f, h * 0.10f)
        lineTo(w * 0.84f, h * 0.12f)
        cubicTo(w * 0.92f, h * 0.16f, w * 0.98f, h * 0.26f, w * 1.00f, h * 0.38f)
        lineTo(w * 1.01f, h * 0.54f)
        cubicTo(w * 1.02f, h * 0.64f, w * 0.98f, h * 0.70f, w * 0.92f, h * 0.70f)
        lineTo(w * 0.10f, h * 0.70f)
        close()
    }
    drawPath(
        path = bodyPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF27272A), Color(0xFF18181B), Color(0xFF09090B), Color(0xFF000000)),
            start = Offset(w * 0.06f, h * 0.12f),
            end = Offset(w * 0.98f, h * 0.72f)
        )
    )
    drawPath(path = bodyPath, color = Color(0xFFE4E4E7), style = Stroke(width = 1.4f))

    // Dark tinted privacy windows
    val windowPath = Path().apply {
        moveTo(w * 0.28f, h * 0.34f)
        lineTo(w * 0.40f, h * 0.18f)
        lineTo(w * 0.72f, h * 0.18f)
        cubicTo(w * 0.80f, h * 0.18f, w * 0.87f, h * 0.24f, w * 0.90f, h * 0.32f)
        lineTo(w * 0.93f, h * 0.40f)
        lineTo(w * 0.22f, h * 0.40f)
        close()
    }
    drawPath(
        path = windowPath,
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF71717A), Color(0xFF27272A), Color(0xFF09090B))
        )
    )
    drawPath(path = windowPath, color = Color(0xFFA1A1AA), style = Stroke(width = 0.8f))

    // Chrome beltline & canary pinstripe
    drawLine(Color(0xFFF4F4F5), Offset(w * 0.08f, h * 0.48f), Offset(w * 0.99f, h * 0.50f), strokeWidth = 1.6f)
    drawLine(VoltPrimaryContainer.copy(alpha = 0.8f), Offset(w * 0.18f, h * 0.53f), Offset(w * 0.94f, h * 0.53f), strokeWidth = 1.0f)

    // High intensity projector lights
    drawCircle(Color.White, radius = w * 0.025f, center = Offset(w * 0.98f, h * 0.50f))
    drawLine(VoltPrimaryContainer, Offset(w * 0.06f, h * 0.54f), Offset(w * 0.12f, h * 0.54f), strokeWidth = 2.6f)

    // VIP Multi-spoke alloy wheels
    drawWheel(w * 0.26f, h * 0.72f, h * 0.20f, Color(0xFFE4E4E7))
    drawWheel(w * 0.80f, h * 0.72f, h * 0.20f, Color(0xFFE4E4E7))
}

private fun DrawScope.drawWheel(cx: Float, cy: Float, radius: Float, spokeColor: Color) {
    // Tire
    drawCircle(Color(0xFF09090B), radius = radius, center = Offset(cx, cy))
    drawCircle(spokeColor.copy(alpha = 0.8f), radius = radius, center = Offset(cx, cy), style = Stroke(width = 2f))
    // Rim
    drawCircle(Color(0xFF18181B), radius = radius * 0.65f, center = Offset(cx, cy))
    drawCircle(spokeColor, radius = radius * 0.65f, center = Offset(cx, cy), style = Stroke(width = 1.2f))
    // Hub
    drawCircle(spokeColor, radius = radius * 0.25f, center = Offset(cx, cy))

    // Spokes
    for (i in 0 until 4) {
        val angle = (i * 45) * (Math.PI / 180.0)
        val cos = Math.cos(angle).toFloat()
        val sin = Math.sin(angle).toFloat()
        drawLine(
            color = spokeColor.copy(alpha = 0.9f),
            start = Offset(cx - cos * radius * 0.6f, cy - sin * radius * 0.6f),
            end = Offset(cx + cos * radius * 0.6f, cy + sin * radius * 0.6f),
            strokeWidth = 1f
        )
    }
}
