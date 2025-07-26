import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function BuscarTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Ionicons name="search" size={48} color="#2563eb" />
      <Text className="text-2xl font-bold text-blue-800 mt-2">Buscar</Text>
      <Text className="text-gray-500 mt-2">
        Aquí se mostrarán las categorías y resultados de búsqueda.
      </Text>
    </View>
  );
}
