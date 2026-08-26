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

import { Pressable, Text, View } from "react-native";
import { AddToCartSectionProps } from "../types";

/* 
 * Pinned Bottom Bar for Add to Cart
 * This keeps the primary action always accessible regardless of scroll position
 */

const AddToCartSection = ({ onPress, productName }: AddToCartSectionProps) => {
  
  return (
    <View className="absolute bottom-0 left-0 right-0 p-lg bg-background border-t border-outline-variant pt-md pb-xl shadow-sm">
      <Pressable
        onPress={onPress}
        className="w-full items-center justify-center rounded-lg bg-primary py-md active:opacity-80"
        accessibilityRole="button"
        accessibilityLabel={`Add ${productName} to cart`}
        testID="product-view-add-to-cart"
      >
        <Text className="text-body-lg font-bold text-on-primary">
          Add to Cart
        </Text>
      </Pressable>
    </View>
  );
};

export default AddToCartSection;
