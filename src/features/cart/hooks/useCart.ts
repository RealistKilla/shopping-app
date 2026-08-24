/**
 * =============================================================================
 * features/cart/hooks/useCart.ts — Cart Hooks
 * =============================================================================
 *
 * This file provides custom React hooks for components to interact with the
 * cart store.
 *
 * By exposing granular hooks (`useCartItems`, `useCartCount`, etc.) rather
 * than a single `useCart()` hook that returns the entire state, we ensure
 * components only re-render when the specific data they care about changes.
 *
 * For example, a `CartBadge` in the header using `useCartCount()` will not
 * re-render just because the total price changed or an item's details updated,
 * as long as the total number of items remains the same.
 *
 * @module features/cart/hooks/useCart
 */

import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store";
import type { CartActions, CartItem } from "../types";
import {
  selectCartCount,
  selectCartItemsArray,
  selectCartTotal,
} from "../utils";

// =============================================================================
// State Selectors
// =============================================================================

/**
 * Hook to retrieve the current cart items as an array.
 * Useful for rendering lists (e.g., in a FlatList on the cart screen).
 *
 * Uses `useShallow` to prevent unnecessary re-renders if the array reference
 * changes but the actual contents are structurally equal.
 *
 * @returns Array of CartItem objects.
 */
export function useCartItems(): CartItem[] {
  return useCartStore(useShallow(selectCartItemsArray));
}

/**
 * Hook to retrieve the total count of items in the cart.
 * Useful for the cart badge in the navigation header.
 *
 * @returns Total quantity of all items in the cart.
 */
export function useCartCount(): number {
  return useCartStore(selectCartCount);
}

/**
 * Hook to retrieve the total monetary value of the cart.
 * Useful for the checkout summary section.
 *
 * @returns Total price in dollars.
 */
export function useCartTotal(): number {
  return useCartStore(selectCartTotal);
}

// =============================================================================
// Action Selectors
// =============================================================================

/**
 * Hook to retrieve just the mutator actions for the cart store.
 * Components that only need to add/remove items but don't need to read
 * the state can use this to completely avoid re-renders when state changes.
 *
 * @returns CartActions object containing add, remove, incrementQty, decrementQty, clear.
 */
export function useCartActions(): CartActions {
  return useCartStore(
    useShallow((state) => ({
      add: state.add,
      remove: state.remove,
      incrementQty: state.incrementQty,
      decrementQty: state.decrementQty,
      clear: state.clear,
    })),
  );
}
