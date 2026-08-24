/**
 * =============================================================================
 * app/product/[id].tsx — Product Detail Entry Point
 * =============================================================================
 *
 * Thin delegator component for the product detail route ("/product/[id]").
 * In Phase 2, this will import and render `<ProductDetail />` from
 * `features/product-view/`.
 */

import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Detail Placeholder (Phase 2)</Text>
      <Text style={styles.subtext}>Product ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  subtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
});
