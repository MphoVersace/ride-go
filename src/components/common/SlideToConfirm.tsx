import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants/colors";

interface SlideToConfirmProps {
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
}

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({
  onConfirm,
  label = "SLIDE TO CONFIRM RIDE",
  confirmedLabel = "CONFIRMED",
  disabled = false,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const THUMB_WIDTH = 52;
  const PADDING = 4;

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const maxSlide = Math.max(0, trackWidth - THUMB_WIDTH - PADDING * 2);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !isConfirmed,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return !disabled && !isConfirmed && Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (disabled || isConfirmed || maxSlide <= 0) return;
        const clampedX = Math.max(0, Math.min(gestureState.dx, maxSlide));
        slideAnim.setValue(clampedX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled || isConfirmed || maxSlide <= 0) return;
        if (gestureState.dx > maxSlide * 0.72) {
          // Slide succeeded
          Animated.timing(slideAnim, {
            toValue: maxSlide,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            setIsConfirmed(true);
            onConfirm();
          });
        } else {
          // Snap back
          Animated.spring(slideAnim, {
            toValue: 0,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Track progress (0 to 1) for text fading
  const textOpacity = maxSlide > 0
    ? slideAnim.interpolate({
        inputRange: [0, maxSlide * 0.5],
        outputRange: [1, 0.15],
        extrapolate: "clamp",
      })
    : 1;

  return (
    <View
      style={[styles.track, disabled && styles.trackDisabled]}
      onLayout={onTrackLayout}
    >
      {/* Background Label */}
      <Animated.View
        style={[
          styles.labelContainer,
          { opacity: isConfirmed ? 0 : textOpacity },
        ]}
        pointerEvents="none"
      >
        <Text style={styles.label}>{label}</Text>
      </Animated.View>

      {isConfirmed && (
        <View style={styles.labelContainer} pointerEvents="none">
          <Text style={styles.confirmedText}>{confirmedLabel}</Text>
        </View>
      )}

      {/* Draggable Thumb */}
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="M8 5L15 12L8 19"
            stroke="#000000"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14 5L21 12L14 19"
            stroke="#000000"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surface.card,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    padding: 4,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  trackDisabled: {
    opacity: 0.5,
  },
  labelContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 1.6,
  },
  confirmedText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 2,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default SlideToConfirm;
