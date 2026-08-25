/**
 * =============================================================================
 * app/product/[id].tsx — Product Detail Entry Point
 * =============================================================================
 *
 * Thin delegator component for the product detail route ("/product/[id]").
 * Renders the `<ProductDetailScreen />` from `features/product-view/`.
 */

import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductDetailScreen } from "@/features/product-view";

export default function ProductDetailRoute() {
  // Extract the dynamic 'id' segment from the URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // Pass it to the feature component
  return <ProductDetailScreen productId={id} />;
}
