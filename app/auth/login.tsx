import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { useAuth } from "@/context/auth/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const result = await auth?.login(email, password);
    setLoading(false);
    console.log("[Login] Resultado del login:", result);
    if (result?.success) {
      setEmail("");
      setPassword("");
      setError("");
      router.replace("/client/tabs/inicio"); // Redirige directamente a la zona privada
    } else {
      setError(result?.error || "Error al iniciar sesión");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <BackButton />

      <View className="flex-1 justify-center px-6 py-12">
        <View className="space-y-6">
          <View className="space-y-2 justify-center items-center my-5">
            <Image
              source={require("../../assets/images/logo-register.png")}
              className="w-24 h-24 rounded-xl"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-4xl font-bold text-primary text-center font-work-black mb-4">
              ¡Hola de nuevo!
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? (
              <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            ) : null}

            <PressableButton
              title={loading ? "Ingresando..." : "Ingresar"}
              onPress={handleLogin}
              disabled={loading}
              className="bg-primary my-3"
              textClassName="text-white font-bold"
            />

            <PressableButton
              title="Registrarse"
              onPress={() => router.push("/auth/register")}
              className="bg-secondary"
              textClassName="text-white font-bold"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
