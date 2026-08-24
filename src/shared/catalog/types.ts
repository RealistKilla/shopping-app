/**
 * =============================================================================
 * shared/catalog/types.ts — Product Domain Types
 * =============================================================================
 *
 * This file defines the core product domain types used across the shopping app.
 * These types live in `shared/catalog/` (not in a feature) because the Product
 * entity is consumed by multiple features:
 *
 *   - features/product-listing  — renders product cards in a grid
 *   - features/product-view     — renders a single product detail screen
 *   - features/cart             — references products inside cart items
 *
 * Type Ownership Rule:
 *   "No feature imports types from another feature. If a type is needed by
 *    2+ features, it moves to shared/."
 *
 * Feature-specific types (e.g. CartItem, ProductCardProps) do NOT belong here.
 * They live inside their respective feature module.
 *
 * @module shared/catalog/types
 */

// =============================================================================
// Product ID — Branded Type for Type Safety
// =============================================================================

/**
 * A branded type that distinguishes product IDs from plain strings at the
 * type level. This prevents accidentally passing an arbitrary string where
 * a product ID is expected, catching bugs at compile time rather than runtime.
 *
 * @example
 * ```ts
 * const id = 'prod-001' as ProductId;  // ✅ Explicit cast
 * const bad: ProductId = 'anything';   // ❌ Type error — must cast
 * ```
 *
 * The `__brand` property is a phantom type — it exists only in TypeScript's
 * type system and has zero runtime cost. No actual `__brand` property is
 * ever assigned to the string.
 */
export type ProductId = string & { readonly __brand: "ProductId" };

// =============================================================================
// Product — Core Domain Entity
// =============================================================================

/**
 * Represents a single product in the catalog.
 *
 * This is the shared domain entity — the "single source of truth" for what
 * a product looks like across the entire application. Every feature that
 * needs product data reads from this shape.
 *
 * Design decisions:
 *   - `id` uses the branded ProductId type for compile-time safety.
 *   - `price` is stored as a number (cents would be more precise for real
 *     commerce, but for this mock-data exercise, dollars-as-floats suffices).
 *   - `image` is a string URI compatible with expo-image's `source` prop.
 *     This supports both remote URLs (https://...) and local `require()`
 *     assets — we use remote placeholder URLs for the mock data.
 *   - `description` is intentionally a simple string. A real app might use
 *     rich text or markdown, but plain text keeps the scope focused.
 */
export interface Product {
  readonly id: ProductId;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly image: string;
}
