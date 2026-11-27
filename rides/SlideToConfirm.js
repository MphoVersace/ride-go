import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../ui/Icon';
import { colors } from '../ui/theme';

const handleWidth = 48;

export default function SlideToConfirm({ label, onConfirm }) {
  const [width, setWidth] = useState(0);
  const drag = useRef(new Animated.Value(0)).current;
  const confirmed = useRef(false);
  useFocusEffect(useCallback(() => {
    confirmed.current = false;
  }, []));
  const travel = Math.max(0, width - handleWidth - 12);

  function confirm() {
    if (confirmed.current) return;
    confirmed.current = true;
    drag.setValue(0);
    onConfirm();
  }

  function reset() {
    Animated.timing(drag, { toValue: 0, duration: 150, useNativeDriver: false }).start();
  }

  const gesture = PanResponder.create({
    onMoveShouldSetPanResponder: (_, state) => travel > 0 && state.dx > 7 && Math.abs(state.dx) > Math.abs(state.dy),
    onPanResponderMove: (_, state) => drag.setValue(Math.min(travel, Math.max(0, state.dx))),
    onPanResponderRelease: (_, state) => {
      if (state.dx >= travel * 0.8) confirm();
      else reset();
    },
    onPanResponderTerminate: reset,
  });

  return (
    <View style={styles.track} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View {...gesture.panHandlers} style={[styles.handle, { transform: [{ translateX: drag }] }]}>
        <Pressable style={styles.button} onPress={confirm} accessibilityLabel="Confirm ride" accessibilityRole="button">
          <Icon name="arrow" size={22} color={colors.navy} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { minHeight: 60, borderRadius: 19, backgroundColor: colors.navy, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 57 },
  label: { color: colors.white, fontWeight: '800', textAlign: 'center', paddingVertical: 10 },
  handle: { position: 'absolute', left: 6, top: '50%', marginTop: -24 },
  button: { width: handleWidth, height: handleWidth, borderRadius: 15, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
});
