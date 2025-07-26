import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ServicioTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Ionicons name="search" size={48} color="#2563eb" />
      <Text className="text-2xl font-bold text-blue-800 mt-2">Buscar</Text>
      <Text className="text-gray-500 mt-2">
        Aquí se mostrarán los datos para agregar servicios
      </Text>
    </View>
  );
}
