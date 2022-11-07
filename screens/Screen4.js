import React from 'react';
import {View, Text, StyleSheet, Switch, Dimensions} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1e1e1e',
    text: '#f8f8f8',
    circle: '#252525',
  },
  light: {
    background: '#f8f8f8',
    text: '#1e1e1e',
    circle: '#eaeaea',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)',
};

const Screen = () => {
  const [theme, setTheme] = React.useState('light');
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(0, 2000) : withTiming(1, 2000);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.background, Colors.light.background],
    );
    return {backgroundColor};
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.circle, Colors.light.circle],
    );
    return {backgroundColor};
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.text, Colors.light.text],
    );
    return {color};
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>{theme}</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={theme === 'dark' ? 'purple' : 'white'}
        />
      </Animated.View>
    </Animated.View>
  );
};

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 10,
    marginBottom: 20,
  },
});

export default Screen;
