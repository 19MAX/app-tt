import { BackButton } from "@/components/BackButton";
import { DatePicker } from "@/components/DatePicker";
import { GenderPicker } from "@/components/GenderPicker";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { router } from "expo-router";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function RegisterDataScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <BackButton topNavigationBar />
      <View className="flex-1 px-6 py-1">
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-4xl font-bold text-primary text-center font-work-black mb-4">
              ¡Bienvenido!
            </Text>
            <Text
              className="text-gray-600 text-center mb-3"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {"Nombre del usuario"}
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              placeholder="Email *"
              value={"Email del usuario"}
              onChangeText={() => {}}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              placeholder="Contraseña *"
              value={""}
              onChangeText={() => {}}
              secureTextEntry
            />

            <Input
              placeholder="Confirmar Contraseña *"
              value={""}
              onChangeText={() => {}}
              secureTextEntry
            />

            <Input
              placeholder="Teléfono (solo números)"
              value={"Teléfono del usuario"}
              onChangeText={() => {}}
              keyboardType="numeric"
            />

            <Input
              placeholder="Dirección"
              value={"Dirección del usuario"}
              onChangeText={() => {}}
            />

            <GenderPicker
              value={""}
              onChange={() => {}}
              placeholder="Seleccionar Género"
            />

            {/* Fecha de nacimiento y edad en la misma fila */}
            <View className="flex-row space-x-3 mb-3">
              <View className="flex-1 me-4">
                <DatePicker
                  value={""}
                  onChange={() => {}}
                  placeholder="Fecha de Nacimiento"
                />
              </View>
              <View className="flex-1">
                <TextInput
                  placeholder="Edad"
                  value={"20 años"}
                  editable={false}
                  className="border border-gray-300 bg-gray-50 rounded-xl px-6 py-4 text-gray-600"
                  style={{ textAlign: "center" }}
                />
              </View>
            </View>

            <PressableButton
              title={"completar registro"}
              onPress={() => {}}
              disabled={false}
              loading={false}
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
