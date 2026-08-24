/**
 * =============================================================================
 * app/cart.tsx — Shopping Cart Entry Point
 * =============================================================================
 *
 * Thin delegator component for the cart route ("/cart").
 * In Phase 2, this will import and render the cart view from `features/cart/`.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping Cart Placeholder (Phase 2)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});
