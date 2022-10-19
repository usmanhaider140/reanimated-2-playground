import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const handleRotation = (rotation) => {
  'worklet';
  return `${rotation * 360}deg`;
};

export default function AnimatedStyleUpdateExample(props) {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,

      transform: [
        {scale: scale.value},
        {rotate: handleRotation(progress.value)},
      ],
    };
  }, [progress]);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1, {damping: 10}), 3, true);
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.AnimatedView, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  AnimatedView: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
