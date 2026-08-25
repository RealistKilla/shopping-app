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

import { View } from "react-native";

// Shared / Cross-feature Imports
import { useCartActions } from "@/features/cart/hooks/useCart";
import { getProductById } from "@/shared/catalog/data";
import { ProductId } from "@/shared/catalog/types";
import { useToast } from "@/shared/hooks/useToast";
import { AddToCartSection } from "../components/AddToCartSection";
import { NoProducts } from "../components/NoProducts";
import { ProductInformation } from "../components/ProductInformation";

// A generic subtle blurhash to use as a placeholder while network images load

export interface ProductDetailScreenProps {
  /** The ID of the product to display, extracted from the route params */
  productId: string;
}

export function ProductDetailScreen({ productId }: ProductDetailScreenProps) {
  // We only need the actions here, so we use useCartActions to avoid
  // re-rendering the detail view every time the cart state changes.
  const { add: addToCart } = useCartActions();
  const toast = useToast();

  // Retrieve the product from our mock catalog
  // In a real app, this might be a React Query fetch using the ID
  const product = getProductById(productId as ProductId);

  // Handle the "Product Not Found" state gracefully
  if (!product) {
    return <NoProducts />;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.show("Added to cart");
  };

  return (
    <View className="flex-1 bg-background">
      <ProductInformation product={product} />
      <AddToCartSection productName={product.name} onPress={handleAddToCart} />
    </View>
  );
}
