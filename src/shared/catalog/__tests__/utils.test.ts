import { createProductId } from '../utils';

describe('Catalog Utils', () => {
  it('should create a valid ProductId', () => {
    const id = createProductId('test-id');
    expect(id).toBe('test-id');
  });
});
