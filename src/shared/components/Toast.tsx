/**
 * =============================================================================
 * shared/components/Toast.tsx — Global Toast Overlay
 * =============================================================================
 *
 * Renders the global toast notification using react-native-reanimated
 * for smooth entrance and exit animations. This should be mounted ONCE
 * at the root layout level (`_layout.tsx`).
 */

import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "../hooks/useToast";

export function Toast() {
  const { isVisible, message } = useToast();
  const insets = useSafeAreaInsets();

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50); // Start slightly below

  useEffect(() => {
    if (isVisible) {
      // Slide up and fade in
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      // Slide down and fade out
      opacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.ease),
      });
      translateY.value = withTiming(50, {
        duration: 200,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [isVisible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          bottom: insets.bottom + 100, // Above bottom buttons/nav
          alignSelf: "center",
          zIndex: 999,
        },
        animatedStyle,
      ]}
      className="bg-emerald-100 rounded-full py-3 px-6 shadow-sm flex-row items-center justify-center border border-emerald-200"
    >
      <Text className="text-body-md text-emerald-800 font-semibold text-center">
        {message}
      </Text>
    </Animated.View>
  );
}
