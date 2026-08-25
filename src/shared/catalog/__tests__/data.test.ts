import { PRODUCTS, PRODUCTS_BY_ID, getProductById } from '../data';
import { createProductId } from '../utils';

describe('Catalog Data', () => {
  it('PRODUCTS array should contain mocked products', () => {
    expect(PRODUCTS.length).toBeGreaterThan(0);
    expect(PRODUCTS[0]).toHaveProperty('id');
    expect(PRODUCTS[0]).toHaveProperty('name');
    expect(PRODUCTS[0]).toHaveProperty('price');
  });

  it('PRODUCTS_BY_ID map should be properly populated from PRODUCTS', () => {
    expect(PRODUCTS_BY_ID.size).toBe(PRODUCTS.length);
    
    // Verify a random product is mapped correctly
    const sampleProduct = PRODUCTS[0];
    expect(PRODUCTS_BY_ID.get(sampleProduct.id)).toEqual(sampleProduct);
  });

  describe('getProductById', () => {
    it('returns the correct product for a valid ID', () => {
      const sampleProduct = PRODUCTS[0];
      const result = getProductById(sampleProduct.id);
      expect(result).toEqual(sampleProduct);
    });

    it('returns undefined for an invalid ID', () => {
      const invalidId = createProductId('this-id-does-not-exist');
      const result = getProductById(invalidId);
      expect(result).toBeUndefined();
    });
  });
});
