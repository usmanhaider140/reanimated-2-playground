import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ImageUrl =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const Screen5 = () => {
  const scale = useSharedValue(1);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(event);
      scale.value = event.scale;
    },
    onEnd: (event) => {
      console.log(event);
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <AnimatedImage style={[{flex: 1}, rStyle]} source={{uri: ImageUrl}} />
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({});

export default Screen5;
