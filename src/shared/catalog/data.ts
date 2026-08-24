/**
 * =============================================================================
 * shared/catalog/data.ts — Mock Product Catalog
 * =============================================================================
 *
 * Hard-coded, in-memory product data for the shopping app. This file serves
 * as the "database" — no backend, no API calls, no async loading.
 *
 * @module shared/catalog/data
 */

import { type Product } from "@/shared/catalog/types";
import { createProductId } from "./utils";

// =============================================================================
// Mock Product Catalog
// =============================================================================

/**
 * The complete product catalog — all 6 products available in the shop.
 *
 * This array is:
 *   - Immutable (frozen via `as const` assertion + readonly Product type)
 *   - Statically defined (no async, no side effects)
 *   - Indexed by position (use PRODUCTS_BY_ID for O(1) ID lookups)
 *
 * Each product has been given a realistic name, price point, and description
 * that would make sense in a lifestyle/home goods e-commerce context,
 * matching the "Indigo Commerce" design system from Stitch.
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: createProductId("prod-001"),
    name: "Minimal Desk Lamp",
    price: 49.99,
    description:
      "A sleek, adjustable LED desk lamp with a matte black finish. " +
      "Features three brightness levels and a flexible gooseneck arm " +
      "that directs light exactly where you need it.",
    image: "https://picsum.photos/seed/desk-lamp/400/500",
  },
  {
    id: createProductId("prod-002"),
    name: "Ceramic Pour-Over Set",
    price: 34.5,
    description:
      "Handcrafted ceramic dripper and carafe set for the perfect " +
      "morning pour-over. The ribbed interior guides water flow evenly " +
      "through the grounds for a balanced, clean extraction.",
    image: "https://picsum.photos/seed/pour-over/400/500",
  },
  {
    id: createProductId("prod-003"),
    name: "Merino Wool Beanie",
    price: 28.0,
    description:
      "Soft, breathable merino wool beanie in a classic ribbed knit. " +
      "Naturally temperature-regulating and moisture-wicking — warm " +
      "in winter, comfortable enough for cool autumn evenings.",
    image: "https://picsum.photos/seed/wool-beanie/400/500",
  },
  {
    id: createProductId("prod-004"),
    name: "Leather Journal A5",
    price: 22.95,
    description:
      "Full-grain leather journal with 192 pages of acid-free, " +
      "dotted paper. Lies flat when open and includes a ribbon " +
      "bookmark and elastic closure band.",
    image: "https://picsum.photos/seed/leather-journal/400/500",
  },
  {
    id: createProductId("prod-005"),
    name: "Bluetooth Speaker Mini",
    price: 59.99,
    description:
      "Compact waterproof speaker with surprisingly rich, " +
      "360-degree sound. 12-hour battery life and a carabiner clip " +
      "for easy attachment to bags, bikes, or belt loops.",
    image: "https://picsum.photos/seed/bt-speaker/400/500",
  },
  {
    id: createProductId("prod-006"),
    name: "Stoneware Planter",
    price: 18.75,
    description:
      "Minimalist stoneware planter with a drainage hole and " +
      "matching saucer. The speckled glaze gives each piece a " +
      "unique, handmade character. Fits pots up to 4 inches.",
    image: "https://picsum.photos/seed/stoneware-pot/400/500",
  },
] as const;
