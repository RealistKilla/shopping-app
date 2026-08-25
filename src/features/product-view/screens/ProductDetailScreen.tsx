/**
 * =============================================================================
 * features/product-view/screens/ProductDetailScreen.tsx
 * =============================================================================
 *
 * The main screen component for the product detail feature.
 * Renders the full product information, including a large 1:1 image, 
 * description, and a full-width "Add to Cart" button.
 *
 * @module features/product-view/screens/ProductDetailScreen
 */

import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// Shared / Cross-feature Imports
import { getProductById } from "@/shared/catalog/data";
import { ProductId } from "@/shared/catalog/types";
import { useCartActions } from "@/features/cart/hooks/useCart";

// A generic subtle blurhash to use as a placeholder while network images load
const BLURHASH = "L9AB*A%MtRM|00RjV@of00bI?HWB";

export interface ProductDetailScreenProps {
  /** The ID of the product to display, extracted from the route params */
  productId: string;
}

export function ProductDetailScreen({ productId }: ProductDetailScreenProps) {
  const router = useRouter();
  
  // We only need the actions here, so we use useCartActions to avoid 
  // re-rendering the detail view every time the cart state changes.
  const { add: addToCart } = useCartActions();

  // Retrieve the product from our mock catalog
  // In a real app, this might be a React Query fetch using the ID
  const product = getProductById(productId as ProductId);

  // Handle the "Product Not Found" state gracefully
  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-lg">
        <Text className="text-headline-lg text-on-background text-center mb-md">
          Product Not Found
        </Text>
        <Text className="text-body-lg text-on-surface-variant text-center mb-lg">
          We couldn't find the product you're looking for. It may have been removed or the link is broken.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="items-center justify-center rounded-lg bg-surface-container py-md px-lg active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-label-caps text-on-surface">GO BACK</Text>
        </Pressable>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }} // padding for the pinned bottom bar
        showsVerticalScrollIndicator={false}
      >
        {/* Large 1:1 Product Image */}
        <Image
          source={product.image}
          placeholder={BLURHASH}
          contentFit="cover"
          transition={200}
          className="w-full aspect-square bg-surface-dim"
        />

        {/* Product Information */}
        <View className="p-lg gap-md">
          <View className="gap-xs">
            <Text className="text-headline-lg text-on-background">
              {product.name}
            </Text>
            <Text className="text-display-price text-primary">
              ${product.price.toFixed(2)}
            </Text>
          </View>
          
          <Text className="text-body-lg text-on-surface-variant mt-sm">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* 
        Pinned Bottom Bar for Add to Cart
        This keeps the primary action always accessible regardless of scroll position
      */}
      <View className="absolute bottom-0 left-0 right-0 p-lg bg-background border-t border-outline-variant pt-md pb-xl shadow-sm">
        <Pressable
          onPress={handleAddToCart}
          className="w-full items-center justify-center rounded-lg bg-primary py-md active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
        >
          <Text className="text-body-lg font-bold text-on-primary">
            Add to Cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
