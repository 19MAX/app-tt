import { PressableButton } from "@/components/PressableButton";
import { useAuth } from "@/context/auth/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, View } from "react-native";

export default function PerfilTab() {
  const auth = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await auth?.logout();
            // Borrar historial de navegación y redirigir a login
            router.replace("/auth/login");
          },
        },
      ]
    );
  };

  if (!auth?.token) return null;
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Ionicons name="person" size={48} color="#2563eb" />
      <Text className="text-2xl font-bold text-blue-800 mb-4 mt-2">Perfil</Text>
      <Text className="text-lg text-gray-700 mb-2">
        {auth?.user?.nombreCompleto || auth?.user?.email}
      </Text>
      <PressableButton
        title="Cerrar sesión"
        onPress={handleLogout}
        className="bg-red-600 mb-5"
        textClassName="text-white font-bold text-2xl"
      />
    </View>
  );
}
