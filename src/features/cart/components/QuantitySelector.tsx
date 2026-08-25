/**
 * =============================================================================
 * features/cart/components/QuantitySelector.tsx
 * =============================================================================
 *
 * A reusable UI component for incrementing and decrementing a quantity.
 * Follows the "Indigo Commerce" design system with subtle borders and
 * centered text alignment.
 *
 * @module features/cart/components/QuantitySelector
 */

import { Pressable, Text, View } from "react-native";

export interface QuantitySelectorProps {
  /** The current numeric quantity to display */
  quantity: number;
  /** Callback fired when the minus button is pressed */
  onDecrement: () => void;
  /** Callback fired when the plus button is pressed */
  onIncrement: () => void;
  /** Disable the entire selector (e.g. while mutating) */
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onDecrement,
  onIncrement,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <View className="flex-row items-center border border-outline-variant rounded-md overflow-hidden bg-surface">
      {/* Decrement Button */}
      <Pressable
        onPress={onDecrement}
        disabled={disabled}
        className="w-8 h-8 items-center justify-center bg-surface active:bg-surface-dim disabled:opacity-50"
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
      >
        <Text className="text-body-lg text-on-surface-variant font-bold leading-none mb-1">
          -
        </Text>
      </Pressable>

      {/* Quantity Display */}
      <View className="w-8 h-8 items-center justify-center border-l border-r border-outline-variant bg-surface-container-lowest">
        <Text className="text-body-md text-on-surface font-semibold">
          {quantity}
        </Text>
      </View>

      {/* Increment Button */}
      <Pressable
        onPress={onIncrement}
        disabled={disabled}
        className="w-8 h-8 items-center justify-center bg-surface active:bg-surface-dim disabled:opacity-50"
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
      >
        <Text className="text-body-lg text-on-surface-variant font-bold leading-none mb-1">
          +
        </Text>
      </Pressable>
    </View>
  );
}
