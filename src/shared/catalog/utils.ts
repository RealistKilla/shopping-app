import { PRODUCTS } from "./data";
import { Product, ProductId } from "./types";

/**
 * Helper function to create a ProductId from a plain string.
 * Provides a single, explicit entry point for constructing product IDs
 * rather than scattering `as ProductId` casts throughout the codebase.
 *
 * @param id - The raw string identifier for the product.
 * @returns The same string, branded as a ProductId at the type level.
 *
 * @example
 * ```ts
 * import { createProductId } from '@/shared/catalog/types';
 *
 * const id = createProductId('prod-001');
 * // typeof id === ProductId ✅
 * ```
 */
export const createProductId = (id: string): ProductId => {
  return id as ProductId;
};

/**
 * A pre-built Map for O(1) product lookups by ID.
 *
 * Why a Map and not a Record?
 *   - Map preserves the branded ProductId key type without type gymnastics.
 *   - Map.get() returns `Product | undefined`, forcing callers to handle
 *     the "not found" case — safer than Record's implicit `undefined`.
 *
 * This Map is created once at module load time. Since PRODUCTS is a small,
 * static array (6 items), the upfront cost is negligible.
 *
 * @example
 * ```ts
 * import { PRODUCTS_BY_ID } from '@/shared/catalog/data';
 * import { createProductId } from '@/shared/catalog/types';
 *
 * const product = PRODUCTS_BY_ID.get(createProductId('prod-001'));
 * if (product) {
 *   console.log(product.name); // "Minimal Desk Lamp"
 * }
 * ```
 */
export const PRODUCTS_BY_ID: ReadonlyMap<Product["id"], Product> = new Map(
  PRODUCTS.map((product) => [product.id, product]),
);

/**
 * Retrieves a single product by its ID.
 *
 * This is a convenience wrapper around PRODUCTS_BY_ID.get() that provides
 * a more descriptive function name for use in hooks and components.
 *
 * Returns `undefined` if no product matches the given ID, allowing callers
 * to handle the missing-product case explicitly (e.g. showing a 404 screen
 * or redirecting back to the product listing).
 *
 * @param id - The ProductId to look up.
 * @returns The matching Product, or undefined if not found.
 *
 * @example
 * ```ts
 * import { getProductById } from '@/shared/catalog/data';
 * import { createProductId } from '@/shared/catalog/types';
 *
 * const lamp = getProductById(createProductId('prod-001'));
 * // lamp?.name === "Minimal Desk Lamp"
 * ```
 */
export const getProductById = (id: Product["id"]): Product | undefined => {
  return PRODUCTS_BY_ID.get(id);
};
