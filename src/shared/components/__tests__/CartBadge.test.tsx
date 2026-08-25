import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartBadge } from '../CartBadge';
import { useCartStore } from '@/features/cart/store';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock vector icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('CartBadge Component', () => {
  beforeEach(() => {
    useCartStore.setState({ items: {} });
    mockPush.mockClear();
  });

  it('renders correctly with 0 items', () => {
    const { getByRole, queryByText } = render(<CartBadge />);
    
    // The button should exist
    const button = getByRole('button');
    expect(button).toBeTruthy();
    
    // Accessibility label should read 0
    expect(button.props.accessibilityLabel).toBe('Cart with 0 items');
    
    // The red badge should NOT render when count is 0
    expect(queryByText('0')).toBeNull();
  });

  it('renders badge when items are added to cart', () => {
    // Inject mock state with 3 items
    useCartStore.setState({
      items: {
        '1': { product: { id: '1', name: 'A', price: 10, description: '', image: '' }, quantity: 3 }
      }
    });

    const { getByText, getByRole } = render(<CartBadge />);
    
    // The red badge containing '3' should render
    expect(getByText('3')).toBeTruthy();
    
    // Accessibility label should update
    expect(getByRole('button').props.accessibilityLabel).toBe('Cart with 3 items');
  });

  it('navigates to /cart when pressed', () => {
    const { getByRole } = render(<CartBadge />);
    
    fireEvent.press(getByRole('button'));
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });
});
