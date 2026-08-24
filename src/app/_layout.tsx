import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
    </ThemeProvider>
  );
}
