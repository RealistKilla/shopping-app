/**
 * =============================================================================
 * features/product-listing/types.ts — Product Listing Types
 * =============================================================================
 *
 * This file defines the types that belong exclusively to the product listing
 * feature, such as component props.
 *
 * @module features/product-listing/types
 */

import { Product } from '@/shared/catalog/types';

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the ProductCard component.
 * 
 * We inject `onPress` and `onAddToCart` as callbacks rather than wiring 
 * the card directly to the navigation or the cart store. This keeps the 
 * component "dumb" and highly reusable (e.g., if we wanted to render a 
 * ProductCard in a "Related Products" section later without it being tied 
 * specifically to the main listing grid's behavior).
 */
export interface ProductCardProps {
  /** The product data to display (image, name, price, etc.) */
  product: Product;

  /** Callback fired when the user taps the card body (to view details) */
  onPress: (product: Product) => void;

  /** Callback fired when the user explicitly taps the "Add to Cart" button */
  onAddToCart: (product: Product) => void;
}
