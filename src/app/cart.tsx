/**
 * =============================================================================
 * app/cart.tsx — Shopping Cart Entry Point
 * =============================================================================
 *
 * Thin delegator component for the cart route ("/cart").
 * In Phase 2, this will import and render the cart view from `features/cart/`.
 */

import { Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-body-lg text-on-surface">
        Shopping Cart Placeholder (Phase 2)
      </Text>
    </View>
  );
}
