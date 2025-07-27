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

  const handleLogoPress = () => {
    console.log("Logo presionado - Scroll al inicio");
    // Acción para hacer scroll al top o refresh
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          paddingTop: 6,
          paddingBottom: 6,
          height: 60,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
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
              showLogo={true}
              logoSource={require("../../../assets/images/logo.png")} // Tu logo aquí
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
              onLogoPress={handleLogoPress}
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
              title="Buscar Servicios"
              subtitle="Encuentra lo que necesitas"
              showCredits={false}
              onNotificationPress={handleNotificationPress}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="servicio/index"
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
              title="Publicar Servicio"
              subtitle="Comparte tu talento"
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
              backgroundColor="gray-50"
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
              title="Mis Favoritos"
              subtitle="Servicios guardados"
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
              title="Mi Perfil"
              subtitle="Configuración y estadísticas"
              onNotificationPress={handleNotificationPress}
              onCreditsPress={handleCreditsPress}
            />
          ),
        }}
      />
    </Tabs>
  );
}
