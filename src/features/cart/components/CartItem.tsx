/**
 * =============================================================================
 * features/cart/components/CartItem.tsx
 * =============================================================================
 *
 * A reusable UI component representing a single row in the shopping cart.
 * Renders the product image, details, and a quantity selector side-by-side.
 *
 * @module features/cart/components/CartItem
 */

import { PRODUCT_IMAGE_BLURHASH } from "@/shared/catalog/constants";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { CartItemProps } from "../types";
import { QuantitySelector } from "./QuantitySelector";


export const CartItem = memo(({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartItemProps) => {
  const { product, quantity } = item;

  return (
    <View className="flex-row items-center p-md bg-surface border-b border-outline-variant">
      {/* 
        Image Section (Left)
        80px square image based on the design specifications.
      */}
      <Image
        source={product.image}
        placeholder={PRODUCT_IMAGE_BLURHASH}
        contentFit="cover"
        transition={200}
        className="w-20 h-20 rounded-md bg-surface-dim"
      />

      {/* 
        Details Section (Middle)
        Uses flex-1 so it takes up the remaining horizontal space between 
        the image and the quantity selector.
      */}
      <View className="flex-1 px-md justify-center gap-xs">
        <Text
          className="text-body-md text-on-surface font-semibold"
          numberOfLines={2}
        >
          {product.name}
        </Text>
        <Text className="text-price-tag text-primary">
          R{product.price.toFixed(2)}
        </Text>

        {/* Subtle remove link */}
        <Pressable
          onPress={() => onRemove(product.id)}
          className="mt-xs active:opacity-60 self-start"
          hitSlop={10}
        >
          <Text className="text-label-caps text-outline font-normal underline">
            Remove
          </Text>
        </Pressable>
      </View>

      {/* 
        Action Section (Right)
      */}
      <View className="items-end justify-center">
        <QuantitySelector
          quantity={quantity}
          onDecrement={() => onDecrement(product.id)}
          onIncrement={() => onIncrement(product.id)}
        />
      </View>
    </View>
  );
});
