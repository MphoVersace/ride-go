import { createContext, useContext, useEffect, useRef } from 'react';
import { Keyboard, Platform, ScrollView, TextInput, View } from 'react-native';

const FormScrollContext = createContext(null);

export function KeyboardFormScroll({ children, style, onLayout, onScroll, ...props }) {
  const viewport = useRef(null);
  const scroll = useRef(null);
  const scrollY = useRef(0);
  const focused = useRef(null);
  const frame = useRef(null);

  function revealField() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const field = focused.current;
      if (Platform.OS === 'web' || !field?.isFocused()) return;
      const keyboard = Keyboard.metrics();

      viewport.current?.measureInWindow((_x, viewportY, _width, height) => {
        field.measureInWindow((_fieldX, fieldY, _fieldWidth, fieldHeight) => {
          if (focused.current !== field || !field.isFocused()) return;
          const visibleTop = viewportY + 12;
          const visibleBottom = Math.min(viewportY + height, keyboard?.screenY ?? Infinity) - 16;
          const fieldBottom = fieldY + fieldHeight;
          const delta = fieldBottom > visibleBottom ? fieldBottom - visibleBottom : Math.min(0, fieldY - visibleTop);
          if (delta) scroll.current?.scrollTo({ y: Math.max(0, scrollY.current + delta), animated: true });
        });
      });
    });
  }

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidShow', revealField);
    return () => {
      subscription.remove();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <FormScrollContext.Provider value={(field) => {
      focused.current = field;
      revealField();
    }}>
      <View ref={viewport} collapsable={false} style={[{ flex: 1 }, style]} onLayout={(event) => {
        onLayout?.(event);
        if (Platform.OS === 'android') revealField();
      }}>
        <ScrollView
          {...props}
          ref={scroll}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          onScroll={(event) => {
            scrollY.current = event.nativeEvent.contentOffset.y;
            onScroll?.(event);
          }}
        >
          {children}
        </ScrollView>
      </View>
    </FormScrollContext.Provider>
  );
}

export function KeyboardField({ ref, onFocus, nextRef, onSubmitEditing, returnKeyType, keyboardType, ...props }) {
  const input = useRef(null);
  const setFocused = useContext(FormScrollContext);
  const returnKey = returnKeyType ?? (nextRef ? 'next' : 'done');
  // iOS phone and numeric pads do not have a return key.
  const iosPad = Platform.OS === 'ios' && ['phone-pad', 'number-pad'].includes(keyboardType);
  const keyboard = iosPad && (nextRef || onSubmitEditing) ? 'numbers-and-punctuation' : keyboardType;

  return (
    <TextInput
      {...props}
      keyboardType={keyboard}
      returnKeyType={returnKey}
      submitBehavior={nextRef ? 'submit' : 'blurAndSubmit'}
      ref={(node) => {
        input.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      onFocus={(event) => {
        setFocused?.(input.current);
        onFocus?.(event);
      }}
      onSubmitEditing={(event) => {
        nextRef?.current?.focus();
        onSubmitEditing?.(event);
      }}
    />
  );
}
