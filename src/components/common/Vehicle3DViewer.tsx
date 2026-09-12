import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { WebView } from "react-native-webview";
import Svg, { Path, Circle } from "react-native-svg";
import { colors } from "../../constants/colors";
import { VEHICLE_GLB_BASE64 } from "../../constants/vehicleModelData";
import {
  Vehicle3DFrontSvg,
  Vehicle3DShadedSideSvg,
  Vehicle3DRearSvg,
} from "./VehicleSvgs";

export type CameraAnglePreset = "front" | "angle" | "side" | "rear";

export interface VehiclePaintFinish {
  id: string;
  name: string;
  hex: string;
  metallic: number;
  roughness: number;
}

// Curated automotive paint finishes aligned strictly with 60-30-10 palette
export const VEHICLE_PAINT_FINISHES: VehiclePaintFinish[] = [
  { id: "cyan", name: "Cyber Cyan", hex: "#5BC0FF", metallic: 0.85, roughness: 0.22 },
  { id: "sapphire", name: "Deep Sapphire", hex: "#1D3557", metallic: 0.9, roughness: 0.2 },
  { id: "platinum", name: "Platinum Silver", hex: "#C9D6E8", metallic: 0.95, roughness: 0.18 },
  { id: "obsidian", name: "Obsidian Navy", hex: "#102A52", metallic: 0.75, roughness: 0.3 },
  { id: "pearl", name: "Pure Pearl", hex: "#FFFFFF", metallic: 0.45, roughness: 0.25 },
  { id: "charcoal", name: "Matte Charcoal", hex: "#334155", metallic: 0.3, roughness: 0.55 },
];

export interface Vehicle3DViewerProps {
  width?: number | string;
  height?: number;
  currentAngle?: CameraAnglePreset | string;
  currentColorHex?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  showAngleControls?: boolean;
  showColorControls?: boolean;
  onAngleChange?: (angle: CameraAnglePreset) => void;
  onColorChange?: (color: VehiclePaintFinish) => void;
  style?: StyleProp<ViewStyle>;
}

// Preset camera orbit angles for model-viewer (theta, phi, radius)
const ORBIT_MAP: Record<CameraAnglePreset, string> = {
  front: "0deg 75deg 2.4m",
  angle: "45deg 72deg 2.5m",
  side: "90deg 75deg 2.4m",
  rear: "180deg 75deg 2.4m",
};

// Pure SVG Icons for angle selectors
const FrontViewIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 11l2-5h10l2 5v6H5v-6z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={8} cy={14} r={1.5} fill={color} />
    <Circle cx={16} cy={14} r={1.5} fill={color} />
  </Svg>
);

const AngleViewIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 13l3-6h8l4 6v4H3v-4z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 17a2 2 0 104 0 2 2 0 00-4 0zM15 17a2 2 0 104 0 2 2 0 00-4 0z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const SideViewIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 13l3-5h9l4 3 3 2v4H2v-4z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={6} cy={17} r={2} stroke={color} strokeWidth={1.5} />
    <Circle cx={17} cy={17} r={2} stroke={color} strokeWidth={1.5} />
  </Svg>
);

const RearViewIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 11l2-5h10l2 5v6H5v-6z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M7 13h10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const Rotate360Icon = ({ color }: { color: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12a9 9 0 11-2.636-6.364M21 3v6h-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Vehicle3DViewer: React.FC<Vehicle3DViewerProps> = ({
  width = "100%",
  height = 250,
  currentAngle = "angle",
  currentColorHex,
  autoRotate = true,
  interactive = true,
  showAngleControls = false,
  showColorControls = false,
  onAngleChange,
  onColorChange,
  style,
}) => {
  const [modelUri] = useState<string>(VEHICLE_GLB_BASE64);
  const [selectedAngle, setSelectedAngle] = useState<CameraAnglePreset>(
    (currentAngle in ORBIT_MAP ? currentAngle : "angle") as CameraAnglePreset
  );
  const [selectedColor, setSelectedColor] = useState<VehiclePaintFinish>(
    VEHICLE_PAINT_FINISHES.find(
      (f) => f.hex.toLowerCase() === currentColorHex?.toLowerCase()
    ) || VEHICLE_PAINT_FINISHES[0]
  );
  const [isAutoRotateActive, setIsAutoRotateActive] = useState<boolean>(autoRotate);
  const [is3DReady, setIs3DReady] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);

  // Synchronize currentAngle prop changes
  useEffect(() => {
    if (currentAngle && currentAngle in ORBIT_MAP) {
      const angleKey = currentAngle as CameraAnglePreset;
      setSelectedAngle(angleKey);
      applyCameraOrbit(ORBIT_MAP[angleKey]);
    }
  }, [currentAngle]);

  // Synchronize currentColorHex prop changes
  useEffect(() => {
    if (currentColorHex) {
      const match = VEHICLE_PAINT_FINISHES.find(
        (f) => f.hex.toLowerCase() === currentColorHex.toLowerCase()
      );
      if (match && match.id !== selectedColor.id) {
        setSelectedColor(match);
      }
    }
  }, [currentColorHex]);

  // Apply PBR material paint color dynamically inside WebGL model-viewer
  useEffect(() => {
    if (webViewRef.current && is3DReady) {
      const js = `
        if (window.setCarColor) {
          window.setCarColor('${selectedColor.hex}', ${selectedColor.metallic}, ${selectedColor.roughness});
        }
        true;
      `;
      webViewRef.current.injectJavaScript(js);
    }
  }, [selectedColor, is3DReady]);

  const applyCameraOrbit = (orbitStr: string) => {
    if (webViewRef.current) {
      const js = `
        if (window.setOrbit) {
          window.setOrbit('${orbitStr}');
        }
        true;
      `;
      webViewRef.current.injectJavaScript(js);
    }
  };

  const handleAngleSelect = (angle: CameraAnglePreset) => {
    setSelectedAngle(angle);
    applyCameraOrbit(ORBIT_MAP[angle]);
    if (onAngleChange) {
      onAngleChange(angle);
    }
  };

  const handleColorSelect = (finish: VehiclePaintFinish) => {
    setSelectedColor(finish);
    if (onColorChange) {
      onColorChange(finish);
    }
  };

  const toggleAutoRotate = () => {
    const nextVal = !isAutoRotateActive;
    setIsAutoRotateActive(nextVal);
    if (webViewRef.current) {
      const js = `
        if (window.toggleAutoRotate) {
          window.toggleAutoRotate(${nextVal});
        }
        true;
      `;
      webViewRef.current.injectJavaScript(js);
    }
  };

  const initialOrbit = ORBIT_MAP[selectedAngle] || ORBIT_MAP.angle;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      background-color: ${colors.background.primary};
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      -webkit-user-select: none;
    }
    model-viewer {
      width: 100%;
      height: 100%;
      background-color: ${colors.background.primary};
      --poster-color: ${colors.background.primary};
      outline: none;
    }
  </style>
</head>
<body>
  <model-viewer
    id="vehicleViewer"
    src="${modelUri}"
    ${interactive ? "camera-controls" : ""}
    ${isAutoRotateActive ? "auto-rotate" : ""}
    rotation-per-second="18deg"
    camera-orbit="${initialOrbit}"
    interpolation-decay="150"
    shadow-intensity="1.6"
    shadow-softness="0.75"
    exposure="1.1"
    environment-image="neutral"
    interaction-prompt="none"
  >
  </model-viewer>

  <script>
    const viewer = document.getElementById('vehicleViewer');

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    window.setCarColor = function(colorHex, metallic, roughness) {
      if (viewer && viewer.model && viewer.model.materials) {
        const [r, g, b] = hexToRgb(colorHex);
        for (const mat of viewer.model.materials) {
          if (mat.pbrMetallicRoughness) {
            mat.pbrMetallicRoughness.setBaseColorFactor([r / 255, g / 255, b / 255, 1.0]);
            mat.pbrMetallicRoughness.setMetallicFactor(metallic !== undefined ? metallic : 0.85);
            mat.pbrMetallicRoughness.setRoughnessFactor(roughness !== undefined ? roughness : 0.22);
          }
        }
      }
    };

    viewer.addEventListener('load', () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: '3D_LOADED' }));
      }
      window.setCarColor('${selectedColor.hex}', ${selectedColor.metallic}, ${selectedColor.roughness});
    });

    viewer.addEventListener('error', (err) => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: '3D_ERROR', error: String(err) }));
      }
    });

    window.setOrbit = function(orbitStr) {
      if (viewer) {
        viewer.cameraOrbit = orbitStr;
        viewer.jumpCameraToGoal();
      }
    };

    window.toggleAutoRotate = function(active) {
      if (viewer) {
        viewer.autoRotate = active;
      }
    };
  </script>
</body>
</html>
  `;

  // Render SVG fallback matching the selected angle and selected paint color
  const renderSvgFallback = () => {
    switch (selectedAngle) {
      case "front":
        return <Vehicle3DFrontSvg width={220} height={135} primaryColor={selectedColor.hex} />;
      case "rear":
        return <Vehicle3DRearSvg width={220} height={135} primaryColor={selectedColor.hex} />;
      case "side":
      case "angle":
      default:
        return <Vehicle3DShadedSideSvg width={240} height={110} primaryColor={selectedColor.hex} />;
    }
  };

  return (
    <View style={[styles.container, { width: width as any, height }, style]}>
      {/* 3D Model WebGL Canvas */}
      <View style={styles.webViewHolder}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent, baseUrl: "" }}
          originWhitelist={["*"]}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === "3D_LOADED") {
                setIs3DReady(true);
              }
            } catch (e) {}
          }}
          style={styles.webView}
        />
      </View>

      {/* Instant Pure Vector SVG Fallback / Loading Presentation */}
      {!is3DReady && (
        <View style={styles.fallbackHolder}>
          {renderSvgFallback()}
          <View style={styles.loadingIndicatorRow}>
            <ActivityIndicator size="small" color={colors.accent.primary} />
            <Text style={styles.loadingText}>Initializing 3D Vehicle...</Text>
          </View>
        </View>
      )}

      {/* Paint Color Swatches Bar (Top Floating Strip) */}
      {showColorControls && (
        <View style={styles.colorPaletteRow}>
          <Text style={styles.paintLabel}>PAINT</Text>
          <View style={styles.swatchesGroup}>
            {VEHICLE_PAINT_FINISHES.map((finish) => {
              const isSelected = selectedColor.id === finish.id;
              return (
                <TouchableOpacity
                  key={finish.id}
                  activeOpacity={0.8}
                  onPress={() => handleColorSelect(finish)}
                  style={[
                    styles.colorSwatchRing,
                    isSelected && styles.colorSwatchRingActive,
                  ]}
                >
                  <View
                    style={[
                      styles.colorSwatchFill,
                      { backgroundColor: finish.hex },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Angle Selector Controls (Rule 1 & Rule 2 Compliant SVGs) */}
      {showAngleControls && (
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.angleButton,
              selectedAngle === "front" && styles.angleButtonActive,
            ]}
            onPress={() => handleAngleSelect("front")}
            activeOpacity={0.8}
          >
            <FrontViewIcon
              color={selectedAngle === "front" ? colors.accent.primary : colors.text.muted}
            />
            <Text
              style={[
                styles.angleButtonText,
                selectedAngle === "front" && styles.angleButtonTextActive,
              ]}
            >
              Front
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.angleButton,
              selectedAngle === "angle" && styles.angleButtonActive,
            ]}
            onPress={() => handleAngleSelect("angle")}
            activeOpacity={0.8}
          >
            <AngleViewIcon
              color={selectedAngle === "angle" ? colors.accent.primary : colors.text.muted}
            />
            <Text
              style={[
                styles.angleButtonText,
                selectedAngle === "angle" && styles.angleButtonTextActive,
              ]}
            >
              3/4
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.angleButton,
              selectedAngle === "side" && styles.angleButtonActive,
            ]}
            onPress={() => handleAngleSelect("side")}
            activeOpacity={0.8}
          >
            <SideViewIcon
              color={selectedAngle === "side" ? colors.accent.primary : colors.text.muted}
            />
            <Text
              style={[
                styles.angleButtonText,
                selectedAngle === "side" && styles.angleButtonTextActive,
              ]}
            >
              Side
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.angleButton,
              selectedAngle === "rear" && styles.angleButtonActive,
            ]}
            onPress={() => handleAngleSelect("rear")}
            activeOpacity={0.8}
          >
            <RearViewIcon
              color={selectedAngle === "rear" ? colors.accent.primary : colors.text.muted}
            />
            <Text
              style={[
                styles.angleButtonText,
                selectedAngle === "rear" && styles.angleButtonTextActive,
              ]}
            >
              Rear
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.angleButton,
              isAutoRotateActive && styles.angleButtonActive,
            ]}
            onPress={toggleAutoRotate}
            activeOpacity={0.8}
          >
            <Rotate360Icon
              color={isAutoRotateActive ? colors.accent.primary : colors.text.muted}
            />
            <Text
              style={[
                styles.angleButtonText,
                isAutoRotateActive && styles.angleButtonTextActive,
              ]}
            >
              360°
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary, // 60% Dominant Background
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  webViewHolder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background.primary,
  },
  webView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  fallbackHolder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loadingIndicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  loadingText: {
    fontSize: 11,
    color: colors.text.muted,
    fontWeight: "500",
  },
  colorPaletteRow: {
    position: "absolute",
    top: 8,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 42, 82, 0.9)", // 30% Panel
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
    zIndex: 10,
    gap: 6,
  },
  paintLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.text.muted,
    letterSpacing: 1,
    marginRight: 2,
  },
  swatchesGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  colorSwatchRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  colorSwatchRingActive: {
    borderColor: colors.accent.primary, // 10% Accent indicator
  },
  colorSwatchFill: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  controlsRow: {
    position: "absolute",
    bottom: 8,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(16, 42, 82, 0.9)", // 30% Panel/Surface
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surface.border,
    zIndex: 10,
  },
  angleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  angleButtonActive: {
    backgroundColor: colors.accent.subtle, // 10% Accent subtle
  },
  angleButtonText: {
    fontSize: 11,
    color: colors.text.muted,
    fontWeight: "600",
  },
  angleButtonTextActive: {
    color: colors.accent.primary,
  },
});

export default Vehicle3DViewer;
