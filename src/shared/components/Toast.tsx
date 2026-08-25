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
  const translateY = useSharedValue(-50); // Start slightly above

  useEffect(() => {
    if (isVisible) {
      // Slide down and fade in
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    } else {
      // Slide up and fade out
      opacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.ease),
      });
      translateY.value = withTiming(-50, {
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

  // We always render the Animated.View but it becomes transparent and non-interactive
  // when isVisible is false. We use pointerEvents="none" to let touches pass through.
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          top: insets.top + 16, // Just below the safe area / header
          left: 16,
          right: 16,
          zIndex: 999, // Ensure it floats above absolutely everything
        },
        animatedStyle,
      ]}
      className="bg-primary rounded-lg py-md px-lg shadow-sm flex-row items-center justify-center"
    >
      <Text className="text-body-md text-on-primary font-semibold text-center">
        {message}
      </Text>
    </Animated.View>
  );
}
