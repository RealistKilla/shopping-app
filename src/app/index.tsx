/**
 * =============================================================================
 * app/index.tsx — Product Listing Entry Point
 * =============================================================================
 *
 * Thin delegator component for the root route ("/").
 * In Phase 2, this will import and render `<ProductGrid />` from 
 * `features/product-listing/`.
 */

import React from 'react';
import { View, Text } from 'react-native';

export default function IndexScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-body-lg text-on-surface">Product Listing Placeholder (Phase 2)</Text>
    </View>
  );
}
