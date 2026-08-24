/**
 * =============================================================================
 * app/index.tsx — Product Listing Entry Point
 * =============================================================================
 *
 * Thin delegator component for the root route ("/").
 * In Phase 2, this will import and render `<ProductGrid />` from
 * `features/product-listing/`.
 */

import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Listing Placeholder (Phase 2)</Text>
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
});
