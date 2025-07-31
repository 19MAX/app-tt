import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Hook mejorado para manejar créditos individuales
function useCredits() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLowCredits, setIsLowCredits] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // Simular carga desde API
        setTimeout(() => {
          const newCredits = 15; // Ejemplo: 15 créditos
          setCredits(newCredits);
          setIsLowCredits(newCredits <= 10);
          setLoading(false);

          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();

          if (newCredits <= 10) {
            startPulseAnimation();
          }
        }, 800);
      } catch (error) {
        console.error("Error al cargar créditos:", error);
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return {
    credits,
    loading,
    isLowCredits,
    animatedValue,
    pulseAnim,
  };
}

// Hook para obtener datos del usuario
function useUser() {
  const [user, setUser] = useState({
    name: "Max",
    initials: "MX",
  });

  return user;
}

interface ImprovedHeaderProps {
  title?: string;
  subtitle?: string;
  showUserGreeting?: boolean;
  showCredits?: boolean;
  showNotifications?: boolean;
  showFilter?: boolean;
  backgroundColor?: string;
  variant?: "home" | "search" | "detailed";
  onNotificationPress?: () => void;
  onCreditsPress?: () => void;
  onFilterPress?: () => void;
  onProfilePress?: () => void;
  scrollable?: boolean;
}

export function ImprovedHeader({
  title,
  subtitle,
  showUserGreeting = false,
  showCredits = true,
  showNotifications = true,
  showFilter = false,
  backgroundColor = "white",
  variant = "detailed",
  onNotificationPress,
  onCreditsPress,
  onFilterPress,
  onProfilePress,
  scrollable = false,
}: ImprovedHeaderProps) {
  const insets = useSafeAreaInsets();
  const { credits, loading, isLowCredits, animatedValue, pulseAnim } =
    useCredits();
  const user = useUser();
  const [notificationCount, setNotificationCount] = useState(3);

  // Función para obtener saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  // Renderizado para vista HOME
  if (variant === "home") {
    return (
      <View>
        <LinearGradient
          colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
          style={scrollable ? {} : { paddingTop: insets.top }}
          className={scrollable ? "pb-6" : "pb-4"}
        >
          <View className={`px-4 ${scrollable ? "pt-4 pb-2" : "py-4"}`}>
            <View className="flex-row items-center justify-between">
              {/* Saludo con iniciales del usuario */}
              <TouchableOpacity
                onPress={onProfilePress}
                className="flex-row items-center flex-1"
                activeOpacity={0.7}
              >
                {/* Avatar circular con iniciales */}
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-3 border-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <Text className="text-white font-bold text-lg">
                    {user.initials}
                  </Text>
                </View>
                <View>
                  <Text className="text-white text-sm" style={{ opacity: 0.8 }}>
                    {getGreeting()}
                  </Text>
                  <Text className="text-white font-semibold text-lg">
                    {user.name}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Iconos de acción */}
              <View className="flex-row items-center space-x-3">
                {/* Créditos destacados */}
                {showCredits && (
                  <Animated.View
                    style={{
                      transform: [
                        { scale: animatedValue },
                        { scale: isLowCredits ? pulseAnim : 1 },
                      ],
                    }}
                  >
                    <TouchableOpacity
                      onPress={onCreditsPress}
                      className="rounded-full px-3 py-2 flex-row items-center border"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      }}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="wallet" size={16} color="white" />
                      <Text className="text-white font-bold text-sm ml-2">
                        {loading ? "..." : credits}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}

                {/* Notificaciones */}
                {showNotifications && (
                  <TouchableOpacity
                    onPress={onNotificationPress}
                    className="relative w-10 h-10 rounded-full items-center justify-center border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="notifications" size={18} color="white" />
                    {notificationCount > 0 && (
                      <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                        <Text className="text-white text-xs font-bold">
                          {notificationCount > 9 ? "9+" : notificationCount}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Gradiente de transición */}
        {!scrollable && (
          <LinearGradient
            colors={["#60A5FA", "rgba(96, 165, 250, 0.5)", "transparent"]}
            className="h-3"
          />
        )}
      </View>
    );
  }

  // Renderizado para vista SEARCH
  if (variant === "search") {
    return (
      <View>
        <LinearGradient
          colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
          style={{ paddingTop: insets.top }}
          className="pb-4"
        >
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between">
              {/* Título de búsqueda */}
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">{title}</Text>
                {subtitle && (
                  <Text
                    className="text-sm mt-1 text-white"
                    style={{ opacity: 0.8 }}
                  >
                    {subtitle}
                  </Text>
                )}
              </View>

              {/* Iconos de acción */}
              <View className="flex-row items-center space-x-3">
                {/* Filtro destacado */}
                {showFilter && (
                  <TouchableOpacity
                    onPress={onFilterPress}
                    className="w-10 h-10 rounded-xl items-center justify-center border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="options" size={18} color="white" />
                  </TouchableOpacity>
                )}

                {/* Notificaciones */}
                {showNotifications && (
                  <TouchableOpacity
                    onPress={onNotificationPress}
                    className="relative w-10 h-10 rounded-xl items-center justify-center border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="notifications-outline"
                      size={18}
                      color="white"
                    />
                    {notificationCount > 0 && (
                      <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                        <Text className="text-white text-xs font-bold">
                          {notificationCount > 9 ? "9+" : notificationCount}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Gradiente de transición */}
        <LinearGradient
          colors={["#60A5FA", "rgba(96, 165, 250, 0.5)", "transparent"]}
          className="h-3"
        />
      </View>
    );
  }

  // Renderizado para vista DETAILED (otras pantallas)
  return (
    <View>
      <LinearGradient
        colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
        style={{ paddingTop: insets.top }}
        className="pb-4"
      >
        <View className="px-4 py-4">
          <View className="flex-row items-center justify-between">
            {/* Título */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-white">{title}</Text>
              {subtitle && (
                <Text
                  className="text-sm mt-1 text-white"
                  style={{ opacity: 0.8 }}
                >
                  {subtitle}
                </Text>
              )}
              <View
                className="w-12 h-1 rounded-full mt-2"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              />
            </View>

            {/* Iconos de acción */}
            <View className="flex-row items-center space-x-3">
              {/* Créditos mejorados */}
              {showCredits && (
                <Animated.View
                  style={{
                    transform: [
                      { scale: animatedValue },
                      { scale: isLowCredits ? pulseAnim : 1 },
                    ],
                  }}
                >
                  <TouchableOpacity
                    onPress={onCreditsPress}
                    className="rounded-full px-3 py-2 flex-row items-center border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="wallet" size={16} color="white" />
                    <Text className="text-white font-bold text-sm ml-2">
                      {loading ? "..." : credits}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}

              {/* Notificaciones */}
              {showNotifications && (
                <TouchableOpacity
                  onPress={onNotificationPress}
                  className="relative w-10 h-10 rounded-xl items-center justify-center border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color="white"
                  />
                  {notificationCount > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                      <Text className="text-white text-xs font-bold">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Gradiente de transición */}
      <LinearGradient
        colors={["#60A5FA", "rgba(96, 165, 250, 0.5)", "transparent"]}
        className="h-3"
      />

      {/* Alerta de créditos bajos */}
      {showCredits && credits <= 3 && credits > 0 && (
        <View className="mx-4 mt-2 bg-orange-50 rounded-xl p-3 border border-orange-200">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="warning" size={16} color="#EA580C" />
            </View>
            <Text className="text-orange-700 text-sm font-medium flex-1">
              Te quedan solo {credits} {credits === 1 ? "crédito" : "créditos"}
            </Text>
            <TouchableOpacity
              onPress={onCreditsPress}
              className="bg-orange-500 px-4 py-2 rounded-full"
            >
              <Text className="text-white text-xs font-bold">Recargar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
