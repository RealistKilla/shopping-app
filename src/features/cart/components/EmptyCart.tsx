import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background p-lg">
      <Text className="text-headline-lg text-on-background mb-md">
        Your cart is empty
      </Text>
      <Text className="text-body-lg text-on-surface-variant text-center mb-lg">
        Looks like you haven't added anything to your cart yet.
      </Text>
      <Pressable
        onPress={() => router.push("/")}
        className="items-center justify-center rounded-lg bg-primary py-md px-lg active:opacity-80"
        accessibilityRole="button"
      >
        <Text className="text-label-caps text-on-primary">START SHOPPING</Text>
      </Pressable>
    </View>
  );
};

export default EmptyCart;
