import { selectCartCount, selectCartTotal, selectCartItemsArray } from '../utils';
import { type CartStore } from '../types';

describe('Cart Utils / Selectors', () => {
  const mockState: CartStore = {
    items: {
      'p-1': {
        product: { id: 'p-1', name: 'Product 1', price: 10, description: '', image: '' },
        quantity: 2,
      },
      'p-2': {
        product: { id: 'p-2', name: 'Product 2', price: 25, description: '', image: '' },
        quantity: 1,
      },
    },
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  };

  const emptyState: CartStore = {
    items: {},
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
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
      expect(items[0].product.id).toBe('p-1');
      expect(items[1].product.id).toBe('p-2');
    });
  });
});
