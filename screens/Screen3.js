import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../components/page';

const WORDS = ['Hello', 'World', 'How', 'Are', 'You', 'Today'];

const Screen3 = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      contentContainerStyle={styles.container}>
      {WORDS.map((word, index) => (
        <Page key={index} title={word} index={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Screen3;
