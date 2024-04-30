import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, TextInput, View, Dimensions} from 'react-native';

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
}: any) {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelAnimation]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 10,
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -25],
    }) as Animated.AnimatedInterpolation<number>,
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 18],
    }) as Animated.AnimatedInterpolation<number>,
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }) as Animated.AnimatedInterpolation<number>,
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        blurOnSubmit
      />

      <Animated.Text style={labelStyle}>{label}</Animated.Text>
    </View>
  );
}

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    width: DeviceWidth * 0.8,
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'purple',
    justifyContent: 'flex-end',
  },
  textInput: {
    height: 40,
    width: '100%',
    fontSize: 16,
    color: '#000',
    zIndex: 1,
    paddingHorizontal: 10,
  },
});
