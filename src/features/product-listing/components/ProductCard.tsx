/**
 * =============================================================================
 * features/product-listing/components/ProductCard.tsx
 * =============================================================================
 *
 * A reusable UI component that displays a single product in a card format.
 * Follows the "My Store" design system:
 *  - 1px outline border instead of shadows
 *  - 16px internal padding
 *  - 4:5 aspect ratio image
 *  - Indigo colored price tag
 *
 * @module features/product-listing/components/ProductCard
 */

import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { BLURHASH } from "../constants";
import { ProductCardProps } from "../types";

export const ProductCard = React.memo(({
  product,
  onPress,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Pressable
      onPress={() => onPress(product)}
      className="rounded-lg border border-outline-variant bg-surface overflow-hidden"
      testID={`product-card-${product.id}`}
    >
      {/* 
        Image Section 
        Using aspect-[4/5] to maintain consistent vertical rhythm across the grid
        as per the design system layout guidelines.
      */}
      <Image
        source={product.image}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={200}
        style={{ height: 200, width: 200 }}
        className="w-full aspect-[4/5] bg-surface-dim"
      />

      {/* 
        Content Section 
        16px internal padding (p-md) 
      */}
      <View className="p-md gap-sm">
        <View>
          <Text className="text-body-md text-on-surface" numberOfLines={1}>
            {product.name}
          </Text>
          <Text className="text-price-tag text-primary mt-xs">
            R{product.price.toFixed(2)}
          </Text>
        </View>

        {/* 
          Add to Cart Button
          We stop propagation here so tapping the button doesn't ALSO trigger
          the card's onPress (which navigates to the detail screen).
        */}
        <Pressable
          onPress={(e) => {
            // Prevent the parent Pressable (card) from triggering
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="mt-xs items-center justify-center rounded bg-primary py-sm active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
          testID={`add-to-cart-${product.id}`}
        >
          <Text className="text-label-caps text-on-primary">ADD TO CART</Text>
        </Pressable>
      </View>
    </Pressable>
  );
});
