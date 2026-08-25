/**
 * =============================================================================
 * app/cart.tsx — Shopping Cart Entry Point
 * =============================================================================
 *
 * Thin delegator component for the cart route ("/cart").
 * Renders the `<CartScreen />` from `features/cart/`.
 */

import { CartScreen } from "@/features/cart";

export default function CartRoute() {
  return <CartScreen />;
}
