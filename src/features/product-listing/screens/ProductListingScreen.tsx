/**
 * =============================================================================
 * features/product-listing/screens/ProductListingScreen.tsx
 * =============================================================================
 *
 * The main screen component for the product listing feature.
 * Renders a 2-column grid of products using a FlatList.
 *
 * @module features/product-listing/screens/ProductListingScreen
 */

import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

// Feature Imports
import { ProductCard } from "../components/ProductCard";

// Shared / Cross-feature Imports
import { useCartActions } from "@/features/cart/hooks/useCart";
import { PRODUCTS } from "@/shared/catalog/data";
import { Product } from "@/shared/catalog/types";
import { useToast } from "@/shared/hooks/useToast";

export function ProductListingScreen() {
  const router = useRouter();

  // We only need the actions here, so we use useCartActions to avoid
  // re-rendering this entire grid every time the cart state changes.
  const { add: addToCart } = useCartActions();
  const toast = useToast();

  const handleProductPress = useCallback((product: Product) => {
    // Navigate to the dynamic product detail route
    router.push(`/product/${product.id}`);
  }, [router]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    toast.show("Added to cart");
  }, [addToCart, toast]);

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => (
    <View className="flex-1 max-w-[50%]">
      <ProductCard
        product={item}
        onPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    </View>
  ), [handleProductPress, handleAddToCart]);

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        // Performance optimizations
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

// React Native's FlatList props like contentContainerStyle and columnWrapperStyle
// don't always play perfectly with NativeWind classes (they expect StyleObjects),
// so we use a standard StyleSheet for these specific layout props while keeping
// the rest of the UI in Tailwind.
const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    gap: 16,
  },
  columnWrapper: {
    gap: 16,
  },
});
