import ProtectedRoute from "@/components/ProtectedRoute";
import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <ProtectedRoute>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ofertas/index"
          options={{
            headerTitle: "Mis Ofertas",
            headerShown: true,
          }}
        />
      </Stack>
    </ProtectedRoute>
  );
}
