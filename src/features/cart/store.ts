/**
 * =============================================================================
 * features/cart/store.ts — Zustand Cart Store
 * =============================================================================
 *
 * This file implements the state management for the shopping cart using Zustand.
 * The store handles all mutations (actions) and acts as the single source of
 * truth for the user's cart.
 *
 * Note on Selectors:
 *   Computed values (like total items and total price) are exported as raw
 *   selector functions at the bottom. This allows granular subscriptions in
 *   components, preventing the entire app from re-rendering every time any
 *   cart state changes.
 *
 * @module features/cart/store
 */

import { create } from "zustand";
import { type CartStore } from "./types";

// =============================================================================
// Store Implementation
// =============================================================================

export const useCartStore = create<CartStore>((set) => ({
  // Initial State
  items: {},

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  add: (product) =>
    set((state) => {
      const existingItem = state.items[product.id];

      if (existingItem) {
        // Product already in cart, increment quantity
        return {
          items: {
            ...state.items,
            [product.id]: {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            },
          },
        };
      }

      // New product to cart
      return {
        items: {
          ...state.items,
          [product.id]: { product, quantity: 1 },
        },
      };
    }),

  remove: (productId) =>
    set((state) => {
      const { [productId]: removedItem, ...remainingItems } = state.items;
      return { items: remainingItems };
    }),

  incrementQty: (productId) =>
    set((state) => {
      const item = state.items[productId];

      if (!item) return state; // Do nothing if not found

      return {
        items: {
          ...state.items,
          [productId]: {
            ...item,
            quantity: item.quantity + 1,
          },
        },
      };
    }),

  decrementQty: (productId) =>
    set((state) => {
      const item = state.items[productId];

      if (!item) return state; // Do nothing if not found

      if (item.quantity <= 1) {
        // If quantity would drop to 0, remove it entirely
        const { [productId]: removedItem, ...remainingItems } = state.items;
        return { items: remainingItems };
      }

      // Otherwise, decrement safely
      return {
        items: {
          ...state.items,
          [productId]: {
            ...item,
            quantity: item.quantity - 1,
          },
        },
      };
    }),

  clear: () => set({ items: {} }),
}));
