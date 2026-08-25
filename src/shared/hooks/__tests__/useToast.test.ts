import { act, renderHook } from '@testing-library/react-native';
import { useToast } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    useToast.setState({ isVisible: false, message: '' });
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.isVisible).toBe(false);
    expect(result.current.message).toBe('');
  });

  it('should show toast with provided message', () => {
    const { result } = renderHook(() => useToast());
    const testMessage = 'Added to cart!';

    act(() => {
      result.current.show(testMessage);
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.message).toBe(testMessage);
  });

  it('should hide toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Test');
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.message).toBe('Test'); // Message should remain for smooth exit animation
  });
});
