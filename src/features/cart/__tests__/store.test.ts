import { act, renderHook } from '@testing-library/react-native';
import { useCartStore } from '../store';
import { type Product } from '@/shared/catalog/types';

describe('useCartStore', () => {
  const mockProduct: Product = {
    id: 'test-product-1',
    name: 'Test Product',
    price: 99.99,
    description: 'A test product',
    image: 'test-image.jpg',
  };

  beforeEach(() => {
    // Reset store state between tests
    useCartStore.setState({ items: {} });
  });

  it('should start with an empty cart', () => {
    const { result } = renderHook(() => useCartStore());
    expect(result.current.items).toEqual({});
  });

  it('should add a new item to the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
    });

    expect(result.current.items[mockProduct.id]).toBeDefined();
    expect(result.current.items[mockProduct.id].quantity).toBe(1);
    expect(result.current.items[mockProduct.id].product).toEqual(mockProduct);
  });

  it('should increment quantity if item already exists in cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.add(mockProduct);
    });

    expect(result.current.items[mockProduct.id].quantity).toBe(2);
  });

  it('should increment quantity explicitly using incrementQty', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.incrementQty(mockProduct.id);
    });

    expect(result.current.items[mockProduct.id].quantity).toBe(2);
  });

  it('should ignore quantity updates for non-existent items', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.incrementQty('non-existent');
    });

    expect(result.current.items['non-existent']).toBeUndefined();
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.remove(mockProduct.id);
    });

    expect(result.current.items[mockProduct.id]).toBeUndefined();
  });

  it('should clear all items from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.clear();
    });

    expect(result.current.items).toEqual({});
  });
});
