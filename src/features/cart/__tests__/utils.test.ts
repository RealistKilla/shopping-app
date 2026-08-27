import { createProductId } from '@/shared/catalog/utils';
import { type CartStore } from '../types';
import { selectCartCount, selectCartItemsArray, selectCartTotal } from '../utils';

const p1Id = createProductId('p-1');
const p2Id = createProductId('p-2');

describe('Cart Utils / Selectors', () => {
  const mockState: CartStore = {
    items: {
      [p1Id]: {
        product: { id: p1Id, name: 'Product 1', price: 10, description: '', image: '' },
        quantity: 2,
      },
      [p2Id]: {
        product: { id: p2Id, name: 'Product 2', price: 25, description: '', image: '' },
        quantity: 1,
      },
    },
    add: jest.fn(),
    remove: jest.fn(),
    incrementQty: jest.fn(),
    decrementQty: jest.fn(),
    clear: jest.fn(),
  };

  const emptyState: CartStore = {
    items: {},
    add: jest.fn(),
    remove: jest.fn(),
    incrementQty: jest.fn(),
    decrementQty: jest.fn(),
    clear: jest.fn(),
  };

  describe('selectCartCount', () => {
    it('returns 0 for an empty cart', () => {
      expect(selectCartCount(emptyState)).toBe(0);
    });

    it('returns the total sum of all item quantities', () => {
      expect(selectCartCount(mockState)).toBe(3); // 2 + 1
    });
  });

  describe('selectCartTotal', () => {
    it('returns 0 for an empty cart', () => {
      expect(selectCartTotal(emptyState)).toBe(0);
    });

    it('returns the total monetary value of the cart', () => {
      // (10 * 2) + (25 * 1) = 45
      expect(selectCartTotal(mockState)).toBe(45);
    });
  });

  describe('selectCartItemsArray', () => {
    it('returns an empty array for an empty cart', () => {
      expect(selectCartItemsArray(emptyState)).toEqual([]);
    });

    it('returns an array of cart items', () => {
      const items = selectCartItemsArray(mockState);
      expect(items).toHaveLength(2);
      expect(items[0].product.id).toBe(p1Id);
      expect(items[1].product.id).toBe(p2Id);
    });
  });
});
