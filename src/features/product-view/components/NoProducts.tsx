import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const NoProducts = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-background p-lg">
      <Text className="text-headline-lg text-on-background text-center mb-md">
        Product Not Found
      </Text>
      <Text className="text-body-lg text-on-surface-variant text-center mb-lg">
        We couldn't find the product you're looking for. It may have been
        removed or the link is broken.
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
};

export default NoProducts;
