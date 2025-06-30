import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PressableButton } from "../components/PressableButton";

import "../global.css";

export default function Index() {
  return (
    <View
      className="bg-principal"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 24,
            padding: 24,
            marginBottom: 16,
          }}
        >
          <Ionicons name="briefcase-outline" size={80} color="#fff" />
        </View>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 8,
          }}
        >
          Camello
        </Text>
        <Text className="text-white text-xl font-work-black">
          Tu próximo trabajo te espera
        </Text>
      </View>
      <View style={{ width: "70%" }}>
        <PressableButton
          title="Buscar trabajos"
          onPress={() => router.push("/auth/login")}
          className="mb-5 bg-white/25"
          textClassName="text-white font-bold text-3xl"
        />
        <PressableButton
          title="Crear perfil"
          onPress={() => router.push("/auth/register")}
          className="p-5 bg-white font-work-black"
          textClassName="text-blue-800 font-work-black font-bold text-3xl"
        />
      </View>
    </View>
  );
}
