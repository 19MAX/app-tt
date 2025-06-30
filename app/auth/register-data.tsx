import { BackButton } from "@/components/BackButton";
import { DatePicker } from "@/components/DatePicker";
import { GenderPicker } from "@/components/GenderPicker";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { registerUser } from "@/core/services/auth/registerUser";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";

function getParamString(param: any): string {
  if (Array.isArray(param)) return param[0] || "";
  return param || "";
}

function calcularEdad(fechaNacimiento: string): number {
  if (!fechaNacimiento) return 0;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export default function RegisterDataScreen() {
  const params = useLocalSearchParams();
  const [email, setEmail] = useState(getParamString(params.email));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefono, setTelefono] = useState(getParamString(params.phone));
  const [direccion, setDireccion] = useState(getParamString(params.address));
  const [genero, setGenero] = useState(getParamString(params.gender));
  const [fechaNacimiento, setFechaNacimiento] = useState(getParamString(params.date_of_birth));
  const [edad, setEdad] = useState(calcularEdad(getParamString(params.date_of_birth)));
  const [nombreCompleto, setNombreCompleto] = useState(getParamString(params.full_name));
  const [cedula] = useState(getParamString(params.cedula) || getParamString(params.identification));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDateChange = (date: string) => {
    setFechaNacimiento(date);
    setEdad(calcularEdad(date));
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    if (!email || !password || !confirmPassword || !nombreCompleto || !cedula) {
      setError("Todos los campos obligatorios deben estar completos.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }
    try {
      const payload = {
        email,
        password,
        nombreCompleto,
        numeroContacto: telefono,
        edad,
        ci: cedula,
        urlFoto: undefined,
      };
      console.log("[Registro] Enviando datos al API:", payload);
      const result = await registerUser(payload);
      console.log("[Registro] Resultado del servicio:", result);
      if (result.success) {
        Alert.alert("Registro exitoso", result.message, [
          { text: "OK", onPress: () => router.replace("/auth/login") },
        ]);
      } else {
        setError(result.message || "No se pudo registrar el usuario. Intenta nuevamente.");
      }
    } catch (e: any) {
      setError("Error inesperado al registrar usuario");
    }
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <BackButton topNavigationBar />
      <View className="flex-1 px-6 py-1">
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-4xl font-bold text-primary text-center font-work-black mb-4">
              ¡Bienvenido!
            </Text>
            <Text className="text-gray-600 text-center mb-3" numberOfLines={1} ellipsizeMode="tail">
              {nombreCompleto}
            </Text>
          </View>
          <View className="space-y-4">
            <Input
              placeholder="Email *"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Contraseña *"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              placeholder="Confirmar Contraseña *"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Input
              placeholder="Teléfono (solo números)"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="numeric"
            />
            <Input
              placeholder="Dirección"
              value={direccion}
              onChangeText={setDireccion}
            />
            <GenderPicker
              value={genero}
              onChange={setGenero}
              placeholder="Seleccionar Género"
            />
            <View className="flex-row space-x-3 mb-3">
              <View className="flex-1 me-4">
                <DatePicker
                  value={fechaNacimiento}
                  onChange={handleDateChange}
                  placeholder="Fecha de Nacimiento"
                />
              </View>
              <View className="flex-1">
                <TextInput
                  placeholder="Edad"
                  value={edad ? `${edad} años` : ""}
                  editable={false}
                  className="border border-gray-300 bg-gray-50 rounded-xl px-6 py-4 text-gray-600"
                  style={{ textAlign: "center" }}
                />
              </View>
            </View>
            {error ? (
              <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            ) : null}
            <PressableButton
              title={loading ? "Registrando..." : "Completar registro"}
              onPress={handleRegister}
              disabled={loading}
              loading={loading}
              className="bg-primary mb-3"
              textClassName="text-white font-bold"
            />
            <PressableButton
              title="Volver"
              onPress={() => router.back()}
              className="border border-primary bg-transparent mb-3"
              textClassName="text-primary font-bold"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
