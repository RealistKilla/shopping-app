import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { QuantitySelector } from '../QuantitySelector';

describe('QuantitySelector Component', () => {
  it('renders the correct initial quantity', () => {
    const { getByText } = render(
      <QuantitySelector
        quantity={5}
        onDecrement={jest.fn()}
        onIncrement={jest.fn()}
        testID="test-qty"
      />
    );
    
    expect(getByText('5')).toBeTruthy();
  });

  it('calls onIncrement when the plus button is pressed', () => {
    const mockIncrement = jest.fn();
    const { getByTestId } = render(
      <QuantitySelector
        quantity={2}
        onDecrement={jest.fn()}
        onIncrement={mockIncrement}
        testID="test-qty"
      />
    );
    
    const incrementButton = getByTestId('test-qty-increase');
    fireEvent.press(incrementButton);
    
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when the minus button is pressed', () => {
    const mockDecrement = jest.fn();
    const { getByTestId } = render(
      <QuantitySelector
        quantity={2}
        onDecrement={mockDecrement}
        onIncrement={jest.fn()}
        testID="test-qty"
      />
    );
    
    const decrementButton = getByTestId('test-qty-decrease');
    fireEvent.press(decrementButton);
    
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });
});
