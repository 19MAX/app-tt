import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function RegisterScreen() {
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
              value={""}
              onChangeText={()=>{}}
              keyboardType="numeric"
              maxLength={13}
            />

            <PressableButton
              title="Siguiente"
              disabled={false}
              className="bg-primary mb-3"
              textClassName="text-white font-bold"
              loading={false}
              onPress={ () => router.push("/auth/register-data") }
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
