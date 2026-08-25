/**
 * =============================================================================
 * shared/components/CartBadge.tsx
 * =============================================================================
 *
 * A reusable header icon button that navigates to the cart.
 * Displays a dynamic red badge containing the total quantity of items
 * in the shopping cart (fetched from Zustand).
 */

import { useCartCount } from "@/features/cart/hooks/useCart";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const CartBadge = () => {
  const router = useRouter();
  const count = useCartCount();

  const handlePress = () => {
    router.push("/cart");
  };

  const CURRENT_COUNT = count > 99 ? "99+" : count;

  return (
    <Pressable
      onPress={handlePress}
      className="relative p-sm active:opacity-60 mr-sm"
      accessibilityRole="button"
      accessibilityLabel={`Cart with ${count} items`}
    >
      <Ionicons name="cart-outline" size={28} color="#111c2d" />

      {/* 
        Badge Container
        Only renders if there's at least 1 item in the cart.
      */}
      {count > 0 && (
        <View className="absolute top-0 right-0 bg-error rounded-full min-w-[20px] h-5 items-center justify-center px-1 border-2 border-background">
          <Text className="text-[10px] text-on-error font-bold">
            {CURRENT_COUNT}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default CartBadge;