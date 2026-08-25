import { type Product } from "@/shared/catalog/types";

export interface ProductInformationProps {
  /** The product domain model to display */
  product: Product;
}

export interface AddToCartSectionProps {
  /** Callback fired when the "Add to Cart" button is pressed */
  onPress: () => void;
  /** The name of the product being added to the cart (for accessibility) */
  productName: string;
}

export interface ProductDetailScreenProps {
  /** The ID of the product to display, extracted from the route params */
  productId: string;
}