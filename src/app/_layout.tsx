import "../global.css";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Control the native splash screen visibility state
import { useEffect } from "react";
import { useColorScheme } from "react-native";

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
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Indigo Shop",
            // Cart badge will go here in Phase 3
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Product Details",
            // We can configure dynamic titles later based on product name
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            presentation: "modal", // Common pattern for cart
          }}
        />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
