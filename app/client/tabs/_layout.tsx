import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ClientTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="inicio/index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favoritos/index"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
