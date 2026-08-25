/**
 * =============================================================================
 * features/product-view/components/ProductInformation.tsx
 * =============================================================================
 *
 * A presentational component that renders the core details of a product,
 * including a large 1:1 aspect ratio image, pricing, and description text.
 * It is wrapped in a ScrollView to allow scrolling past the large image.
 *
 * @module features/product-view/components/ProductInformation
 */

import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

import { BLURHASH } from "@/features/product-listing/constants";
import { ProductInformationProps } from "../types";


const ProductInformation = ({ product }: ProductInformationProps) => {
  return (
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
  );
};

export default ProductInformation;
