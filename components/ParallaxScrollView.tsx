import { useEffect, useState, type PropsWithChildren, type ReactElement } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, useColorScheme, View, Text, Button } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

import { StyledComponent } from 'nativewind';
import { Feather } from '@expo/vector-icons';


type Props = PropsWithChildren<{
  pressButton?: () => void;
  showButton?: boolean;
  icon?: 'plus' | 'check';
  padding?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  pressButton = () => { },
  showButton = false,
  icon = 'plus',
  padding = true,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const buttonPosition = useSharedValue(30);

  const animatedButtonStyles = useAnimatedStyle(() => {
    return {
      bottom: buttonPosition.value,
    };
  });

  const _keyboardDidShow = (e:any) => {
    buttonPosition.value = withSpring(
      e.endCoordinates.height + 30,
      {
        damping: 15,
        stiffness:150,
        mass: 2,
      }
    );
  };

  const _keyboardDidHide = () => {
    buttonPosition.value = withTiming(30, { duration: 250 });
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {padding?(<View  style={styles.content}>
          {children}
        </View>):
        (<View  style={styles.content2}>
          {children}
        </View>)}
      </Animated.ScrollView>
      {showButton && (
        <StyledComponent component={ThemedView} tw='rounded-full bg-red-200 w-16 h-16 items-center justify-center absolute right-8' style={animatedButtonStyles}>
          <StyledComponent component={Ripple} rippleContainerBorderRadius={50} onPress={pressButton} rippleSize={100} tw='flex-1 w-full justify-center items-center'>
            <StyledComponent component={Feather} name={icon} size={28} color='red'></StyledComponent>
          </StyledComponent>
        </StyledComponent>
      )}
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(243 244 246)',
  },
  content: {
    flex: 1,
    padding: 15,
    gap: 16,
    overflow: 'hidden',
    // backgroundColor:'red',
  },
  content2: {
    flex: 1,
    // padding: 15,
    // gap: 16,
    overflow: 'hidden',
    // backgroundColor:'red',
  },
});
