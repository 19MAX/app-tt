import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { Api } from "@/core/api/client/Api";
import CedulaValidationService from "@/core/services/auth/CedulaValidationService";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const api = new Api({});

export default function RegisterScreen() {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    setLoading(true);
    setError("");
    // 1. Verificar en API interna (Swagger)
    try {
      const res = await api.usuarios.verificarCi({ ci: cedula });
      if (res.data?.existe) {
        setLoading(false);
        setError("La cédula ya está registrada en el sistema.");
        return;
      }
    } catch (e) {
      // Si la API interna falla, continuar con la externa
    }
    // 2. Verificar en API externa
    const externa = await CedulaValidationService.validarCedula(cedula);
    setLoading(false);
    // Validación estricta: debe existir y tener datos clave
    if (!externa || !externa.success || !externa.data || !externa.data.full_name || !externa.data.date_of_birth) {
      setError("La cédula no existe en el registro nacional. Debe ser válida y estar registrada.");
      return;
    }
    // 3. Navegar a register-data pasando los datos de la persona
    router.push({
      pathname: "/auth/register-data",
      params: { ...externa.data, cedula },
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <BackButton topNavigationBar />
      <View className="flex-1 justify-center px-6 py-1">
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-4xl font-bold text-primary text-center font-work-black mb-4">
              ¡Empecemos!
            </Text>
            <Text className="text-gray-600 text-center mb-3">
              ¿Cual es tu número de cédula?
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              placeholder="Número de Cédula"
              value={cedula}
              onChangeText={setCedula}
              keyboardType="numeric"
              maxLength={13}
            />
            {error ? (
              <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            ) : null}
            <PressableButton
              title={loading ? "Verificando..." : "Siguiente"}
              disabled={loading || !cedula}
              className="bg-primary mb-3"
              textClassName="text-white font-bold"
              loading={loading}
              onPress={handleNext}
            />
            <PressableButton
              title="Volver al Login"
              onPress={() => router.back()}
              className="border border-primary bg-transparent"
              textClassName="text-primary font-bold"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
