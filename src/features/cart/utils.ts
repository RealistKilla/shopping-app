// =============================================================================
// Computed Selectors
// =============================================================================
// We export these so that components can pass them directly into the hook:
// e.g., const cartTotal = useCartStore(selectCartTotal);

import { CartItem, CartStore } from "./types";

/**
 * Returns the total number of physical items in the cart by summing
 * up the quantities of every individual cart line item.
 */
export const selectCartCount = (state: CartStore): number => {
  return Object.values(state.items).reduce(
    (total, item) => total + item.quantity,
    0,
  );
};

/**
 * Returns the total monetary value of the cart in dollars.
 * (Quantity * Price) for each item.
 */
export const selectCartTotal = (state: CartStore): number => {
  return Object.values(state.items).reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

/**
 * Convenience selector to get the items as an array rather than a Record,
 * which is useful for rendering lists (e.g., FlatList).
 */
export const selectCartItemsArray = (state: CartStore): CartItem[] => {
  return Object.values(state.items);
};
