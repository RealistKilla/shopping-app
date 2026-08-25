/**
 * =============================================================================
 * features/product-view/components/AddToCartSection.tsx
 * =============================================================================
 *
 * A pinned bottom bar containing the primary "Add to Cart" action for the 
 * product detail screen. It sits on top of the scrollable content to ensure 
 * the action is always accessible to the user.
 *
 * @module features/product-view/components/AddToCartSection
 */

import React from "react";
import { Pressable, Text, View } from "react-native";

export interface AddToCartSectionProps {
  /** Callback fired when the "Add to Cart" button is pressed */
  onPress: () => void;
  /** The name of the product being added to the cart (for accessibility) */
  productName: string;
}

export const AddToCartSection = ({ onPress, productName }: AddToCartSectionProps) => {
  {
    /* 
        Pinned Bottom Bar for Add to Cart
        This keeps the primary action always accessible regardless of scroll position
      */
  }
  return (
    <View className="absolute bottom-0 left-0 right-0 p-lg bg-background border-t border-outline-variant pt-md pb-xl shadow-sm">
      <Pressable
        onPress={onPress}
        className="w-full items-center justify-center rounded-lg bg-primary py-md active:opacity-80"
        accessibilityRole="button"
        accessibilityLabel={`Add ${productName} to cart`}
      >
        <Text className="text-body-lg font-bold text-on-primary">
          Add to Cart
        </Text>
      </Pressable>
    </View>
  );
};

export default AddToCartSection;
