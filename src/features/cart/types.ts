/**
 * =============================================================================
 * features/cart/types.ts — Cart Feature Types
 * =============================================================================
 *
 * This file defines the types that belong exclusively to the cart feature.
 * The cart feature owns its state and shape, meaning this is not a global 
 * type definition file. If other features need to interact with the cart, 
 * they should use the hooks provided by this feature module.
 *
 * @module features/cart/types
 */

import { Product, ProductId } from '@/shared/catalog/types';

// =============================================================================
// Cart Domain Types
// =============================================================================

/**
 * Represents a single distinct product line item in the cart.
 * 
 * Instead of keeping just the ProductId and looking up the product data 
 * everywhere, we store a snapshot of the Product object. This simplifies 
 * rendering the cart and guards against product data changing unexpectedly 
 * (in a real app, prices and descriptions might change on the backend, 
 * but you usually want the cart to reflect what the user saw when adding it).
 */
export interface CartItem {
  /** The full product details snapshot. */
  readonly product: Product;
  
  /** The number of this specific product the user wants to purchase. */
  readonly quantity: number;
}

/**
 * The core state of the cart feature.
 * 
 * We use a Record (dictionary/map) keyed by the branded ProductId. 
 * This enables O(1) lookups for updating quantities, removing items, 
 * or checking if an item already exists in the cart.
 */
 interface CartState {
  /** 
   * A dictionary of cart items, keyed by their product ID. 
   */
  readonly items: Record<ProductId, CartItem>;
}

/**
 * The actions that can be dispatched to mutate the cart state.
 * 
 * We separate these from the state interface so they can be bundled 
 * together into a unified store type, while remaining easy to read.
 */
export interface CartActions {
  /**
   * Adds a product to the cart. If the product is already in the cart, 
   * its quantity is incremented by 1.
   * 
   * @param product - The product to add.
   */
  add: (product: Product) => void;

  /**
   * Removes a product entirely from the cart, regardless of its quantity.
   * 
   * @param productId - The ID of the product to remove.
   */
  remove: (productId: ProductId) => void;

  /**
   * Increases the quantity of a specific product by 1. 
   * If the product is not in the cart, this action does nothing.
   * 
   * @param productId - The ID of the product to increment.
   */
  incrementQty: (productId: ProductId) => void;

  /**
   * Decreases the quantity of a specific product by 1.
   * If the quantity reaches 0, the item is removed from the cart.
   * If the product is not in the cart, this action does nothing.
   * 
   * @param productId - The ID of the product to decrement.
   */
  decrementQty: (productId: ProductId) => void;

  /**
   * Empties the cart entirely, removing all items.
   */
  clear: () => void;
}

/**
 * The complete Zustand store type, combining state and actions.
 */
export type CartStore = CartState & CartActions;
