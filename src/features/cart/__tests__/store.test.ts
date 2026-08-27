import { type Product } from '@/shared/catalog/types';
import { createProductId } from '@/shared/catalog/utils';
import { act, renderHook } from '@testing-library/react-native';
import { useCartStore } from '../store';

describe('useCartStore', () => {
  const p1Id = createProductId('test-product-1');
  const mockProduct: Product = {
    id: p1Id,
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

    expect(result.current.items[p1Id]).toBeDefined();
    expect(result.current.items[p1Id].quantity).toBe(1);
    expect(result.current.items[p1Id].product).toEqual(mockProduct);
  });

  it('should increment quantity if item already exists in cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.add(mockProduct);
    });

    expect(result.current.items[p1Id].quantity).toBe(2);
  });

  it('should increment quantity explicitly using incrementQty', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.incrementQty(p1Id);
    });

    expect(result.current.items[p1Id].quantity).toBe(2);
  });

  it('should decrement quantity explicitly using decrementQty', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.incrementQty(p1Id); // qty: 2
      result.current.decrementQty(p1Id); // qty: 1
    });

    expect(result.current.items[p1Id].quantity).toBe(1);
  });

  it('should remove item entirely if decrementQty reduces quantity to 0', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct); // qty: 1
      result.current.decrementQty(p1Id); // qty: 0
    });

    expect(result.current.items[p1Id]).toBeUndefined();
  });

  it('should ignore quantity updates for non-existent items', () => {
    const { result } = renderHook(() => useCartStore());
    const nonExistentId = createProductId('non-existent');

    act(() => {
      result.current.incrementQty(nonExistentId);
      result.current.decrementQty(nonExistentId);
    });

    expect(result.current.items[nonExistentId]).toBeUndefined();
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add(mockProduct);
      result.current.remove(p1Id);
    });

    expect(result.current.items[p1Id]).toBeUndefined();
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
