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

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Feature Imports
import { ProductCard } from '../components/ProductCard';

// Shared / Cross-feature Imports
import { PRODUCTS } from '@/shared/catalog/data';
import { Product } from '@/shared/catalog/types';
import { useCartActions } from '@/features/cart/hooks/useCart';

export function ProductListingScreen() {
  const router = useRouter();
  
  // We only need the actions here, so we use useCartActions to avoid 
  // re-rendering this entire grid every time the cart state changes.
  const { add: addToCart } = useCartActions();

  const handleProductPress = (product: Product) => {
    // Navigate to the dynamic product detail route
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        
        // Content container padding maps to our spacing system (16px)
        contentContainerStyle={styles.listContent}
        
        // Gap between columns
        columnWrapperStyle={styles.columnWrapper}
        
        renderItem={({ item }) => (
          <View className="flex-1 max-w-[50%]">
            <ProductCard 
              product={item} 
              onPress={handleProductPress}
              onAddToCart={handleAddToCart}
            />
          </View>
        )}
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
