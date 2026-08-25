/**
 * =============================================================================
 * shared/components/CartBadge.tsx
 * =============================================================================
 *
 * A reusable header icon button that navigates to the cart.
 * Displays a dynamic red badge containing the total quantity of items
 * in the shopping cart (fetched from Zustand).
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartCount } from '@/features/cart/hooks/useCart';

export function CartBadge() {
  const router = useRouter();
  const count = useCartCount();

  const handlePress = () => {
    router.push('/cart');
  };

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
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
