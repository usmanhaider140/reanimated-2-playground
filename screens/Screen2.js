import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const CIRCLE_RADIUS = 100 * 2;
export default function AnimatedStyleUpdateExample() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      console.log('onStart');
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.startX;
      translateY.value = event.translationY + ctx.startY;
      console.log('onActive');
    },
    onEnd: (event, ctx) => {
      const distance = Math.sqrt(
        Math.pow(event.translationX, 2) + Math.pow(event.translationY, 2),
      );
      // Here is the problem: if the distance is less than 100, the circle will not be dragged back to the center.
      if (distance < CIRCLE_RADIUS + 50) {
        console.log(distance, CIRCLE_RADIUS);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, [translateX]);
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.AnimatedView, animatedStyle]} />
        </PanGestureHandler>
      </View>
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
    backgroundColor: '#7272c6',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: '#d8d4f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
