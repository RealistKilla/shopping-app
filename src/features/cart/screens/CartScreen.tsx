/**
 * =============================================================================
 * features/cart/screens/CartScreen.tsx
 * =============================================================================
 *
 * The main screen component for the shopping cart.
 * Renders the list of cart items, an empty state if the cart is empty,
 * and an order summary footer.
 *
 * @module features/cart/screens/CartScreen
 */

import React, { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";

// Feature Imports
import { CartItem } from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import { useCartActions, useCartItems, useCartTotal } from "../hooks/useCart";
import { CartItem as CartItemType } from "../types";

export function CartScreen() {
  // Zustand Subscriptions
  const items = useCartItems();
  const total = useCartTotal();
  const { incrementQty, decrementQty, remove } = useCartActions();

  const renderItem: ListRenderItem<CartItemType> = useCallback(({ item }) => (
    <CartItem
      item={item}
      onIncrement={incrementQty}
      onDecrement={decrementQty}
      onRemove={remove}
    />
  ), [incrementQty, decrementQty, remove]);

  // ---------------------------------------------------------------------------
  // Empty State
  // ---------------------------------------------------------------------------
  if (items.length === 0) {
    return <EmptyCart />;
  }

  // ---------------------------------------------------------------------------
  // Populated State
  // ---------------------------------------------------------------------------
  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        // Add padding bottom so the last item isn't hidden by the footer
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={renderItem}
        // Performance optimizations
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
      />

      {/* 
        Order Summary Footer
        Pinned to the bottom for easy checkout access.
      */}
      <View className="p-lg bg-surface border-t border-outline-variant shadow-sm pb-xl">
        <View className="flex-row items-center justify-between mb-md">
          <Text className="text-body-lg text-on-surface font-semibold">
            Subtotal
          </Text>
          <Text className="text-headline-lg text-primary">
            ${total.toFixed(2)}
          </Text>
        </View>

        <Pressable
          className="w-full items-center justify-center rounded-lg bg-primary py-md active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-body-lg font-bold text-on-primary">
            Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
