import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import { StyledComponent } from 'nativewind';
import { Feather } from '@expo/vector-icons';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  pressButton: () => void ;
  showButton: boolean;
}>;

export default function ParallaxScrollView({
  children,
  pressButton = () => {} ,
  showButton = false,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={styles.content}>
          {children}
        </Animated.View>
      </Animated.ScrollView>
      {showButton && (
        <StyledComponent component={Ripple} tw='absolute bottom-10 right-10' rippleContainerBorderRadius={50} onPress={pressButton}>
        <StyledComponent component={ThemedView} tw='rounded-full bg-red-200 w-16 h-16 items-center justify-center'>
          <StyledComponent component={Feather} name='plus' size={28} color='red'></StyledComponent>
        </StyledComponent>
      </StyledComponent>
      )}
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: 15,
    gap: 16,
    overflow: 'hidden',
  },
});
