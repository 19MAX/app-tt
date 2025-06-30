import { useAuth } from "@/context/auth/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function ClientIndex() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.initializing && !auth?.loading) {
      router.replace("/client/tabs/inicio");
    }
  }, [auth?.initializing, auth?.loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cargando...</Text>
    </View>
  );
}
