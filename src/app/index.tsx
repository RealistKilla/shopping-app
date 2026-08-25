/**
 * =============================================================================
 * app/index.tsx — Product Listing Entry Point
 * =============================================================================
 *
 * Thin delegator component for the root route ("/").
 * Renders the `<ProductListingScreen />` from `features/product-listing/`.
 */

import { ProductListingScreen } from "@/features/product-listing";

export default function IndexScreen() {
  return <ProductListingScreen />;
}
