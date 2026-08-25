/**
 * =============================================================================
 * app/_layout.tsx - Root Application Layout
 * =============================================================================
 *
 * The primary layout wrapper for the entire Expo application.
 * This file is responsible for:
 *  - Initializing the global theme (Dark/Light mode via React Navigation).
 *  - Configuring the root Expo Router Stack navigation.
 *  - Rendering global UI overlays (e.g., the Toast notification system).
 *  - Managing the native splash screen during the NativeWind hydration phase.
 *
 * @module app/_layout
 */

import "../global.css";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Control the native splash screen visibility state
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { CartBadge } from "@/shared/components/CartBadge";
import { Toast } from "@/shared/components/Toast";

// Instruct Expo to hold the splash screen visible during the NativeWind injection phase
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Dismiss the loading splash screen once the NativeWind style layer hydrates and mounts
    SplashScreen.hideAsync().catch(() => {
      /* Prevent unhandled promise rejections if called concurrently */
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerRight: () => <CartBadge />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Indigo Shop",
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Product Details",
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            presentation: "modal",
            // We don't need the cart badge on the cart screen itself
            headerRight: () => null,
          }}
        />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
