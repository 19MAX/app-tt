import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ModalsLayout = () => {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    router.back();
  };

  const CustomModalHeader = ({ title }: { title: string }) => (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-white border-b border-gray-200"
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={handleBackPress}
          className="flex-row items-center"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#374151" />
          <Text className="text-gray-700 text-base ml-1">Atrás</Text>
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-900 flex-1 text-center">
          {title}
        </Text>

        {/* Spacer para centrar el título */}
        <View className="w-16" />
      </View>
    </View>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="creditos/index"
        options={{
          headerShown: true,
          header: () => <CustomModalHeader title="Comprar Créditos" />,
        }}
      />

      <Stack.Screen
        name="ofertas/index"
        options={{
          headerShown: true,
          header: () => <CustomModalHeader title="Publicar Oferta" />,
        }}
      />
    </Stack>
  );
};

export default ModalsLayout;
