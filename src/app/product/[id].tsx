/**
 * =============================================================================
 * app/product/[id].tsx — Product Detail Entry Point
 * =============================================================================
 *
 * Thin delegator component for the product detail route ("/product/[id]").
 * In Phase 2, this will import and render `<ProductDetail />` from
 * `features/product-view/`.
 */

import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-body-lg text-on-surface">
        Product Detail Placeholder (Phase 2)
      </Text>
      <Text className="mt-sm text-body-md text-on-surface-variant">
        Product ID: {id}
      </Text>
    </View>
  );
}
