import { ImprovedHeader } from "@/components/ImprovedHeader";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function ClientTabsLayout() {
  const handleNotificationPress = () => {
    console.log("Navegando a notificaciones...");
    // router.push("/(client)/notificaciones");
  };

  const handleCreditsPress = () => {
    console.log("Navegando a gestión de créditos...");
    // router.push("/(client)/creditos");
  };

  const handleProfilePress = () => {
    console.log("Navegando al perfil...");
    // router.push("/(client)/perfil");
  };

  const handleFilterPress = () => {
    console.log("Abriendo filtros de búsqueda...");
    // Aquí podrías abrir un modal o pantalla de filtros
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="inicio/index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <ImprovedHeader
              variant="home"
              showUserGreeting={true}
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
              onProfilePress={handleProfilePress}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="buscar/index"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <ImprovedHeader
              variant="search"
              title="Buscar"
              showCredits={false}
              showFilter={true}
              onNotificationPress={handleNotificationPress}
              onFilterPress={handleFilterPress}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="publicar/index"
        options={{
          title: "Publicar",

          tabBarIcon: ({ color, size, focused }) => (
            <View
              className={`w-14 h-8 rounded-full items-center justify-center ${
                focused ? "bg-blue-500 shadow-lg" : "bg-gray-200"
              }`}
            >
              <Ionicons
                name="add"
                size={24}
                color={focused ? "white" : color}
              />
            </View>
          ),
          headerShown: true,
          header: () => (
            <ImprovedHeader
              title="Publicar"
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos/index"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <ImprovedHeader
              variant="detailed"
              title="Favoritos"
              showCredits={false}
              onNotificationPress={handleNotificationPress}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <ImprovedHeader
              variant="detailed"
              title="Perfil"
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
            />
          ),
        }}
      />
    </Tabs>
  );
}
