import { ProductId } from "./types";

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

