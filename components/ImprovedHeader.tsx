import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Text, TouchableOpacity, View } from "react-native";
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
          setIsLowCredits(newCredits <= 10); // Alerta si tiene 10 o menos créditos
          setLoading(false);
          
          // Animación de entrada
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();

          // Animación de pulso si los créditos están bajos
          if (newCredits <= 10) {
            startPulseAnimation();
          }
        }, 800);
      } catch (error) {
        console.error('Error al cargar créditos:', error);
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

  const addCredits = (amount: number) => {
    setCredits(prev => {
      const newCredits = prev + amount;
      setIsLowCredits(newCredits <= 10);
      
      // Animación de incremento
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      return newCredits;
    });
  };

  const subtractCredits = (amount: number) => {
    setCredits(prev => {
      const newCredits = Math.max(0, prev - amount);
      setIsLowCredits(newCredits <= 10);
      return newCredits;
    });
  };

  return { 
    credits, 
    loading, 
    isLowCredits, 
    animatedValue, 
    pulseAnim, 
    addCredits, 
    subtractCredits 
  };
}

interface ImprovedHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logoSource?: any;
  showCredits?: boolean;
  showNotifications?: boolean;
  backgroundColor?: string;
  onNotificationPress?: () => void;
  onCreditsPress?: () => void;
  onLogoPress?: () => void;
}

export function ImprovedHeader({ 
  title,
  subtitle,
  showLogo = false,
  logoSource,
  showCredits = true,
  showNotifications = true,
  backgroundColor = "white",
  onNotificationPress,
  onCreditsPress,
  onLogoPress 
}: ImprovedHeaderProps) {
  const insets = useSafeAreaInsets();
  const { credits, loading, isLowCredits, animatedValue, pulseAnim } = useCredits();
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Formatear créditos para mostrar
  const formatCredits = (creditsAmount: number) => {
    if (creditsAmount === 1) return "1 crédito";
    return `${creditsAmount} créditos`;
  };

  // Obtener color según la cantidad de créditos
  const getCreditColor = () => {
    if (credits === 0) return "text-red-600";
    if (credits <= 5) return "text-orange-600";
    if (credits <= 10) return "text-yellow-600";
    return "text-green-600";
  };

  const getCreditBgColor = () => {
    if (credits === 0) return "bg-red-50 border-red-200";
    if (credits <= 5) return "bg-orange-50 border-orange-200";
    if (credits <= 10) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getCreditIcon = () => {
    if (credits === 0) return "alert-circle";
    if (credits <= 10) return "warning";
    return "checkmark-circle";
  };

  return (
    <View 
      className={`${backgroundColor === 'white' ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}
      style={{ paddingTop: insets.top }}
    >
      {/* Gradiente sutil */}
      <LinearGradient
        colors={[
          isLowCredits ? 'rgba(251, 146, 60, 0.05)' : 'rgba(59, 130, 246, 0.05)', 
          'rgba(255, 255, 255, 0)'
        ]}
        className="absolute inset-0"
      />
      
      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          {/* Sección izquierda - Logo o Título */}
          <View className="flex-1">
            {showLogo ? (
              <TouchableOpacity 
                onPress={onLogoPress}
                className="flex-row items-center"
                activeOpacity={0.7}
              >
                {logoSource ? (
                  <Image 
                    source={logoSource}
                    className="w-10 h-10 mr-3"
                    resizeMode="contain"
                  />
                ) : (
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    className="w-10 h-10 rounded-xl mr-3 items-center justify-center shadow-lg"
                  >
                    <Text className="text-white font-bold text-lg">E</Text>
                  </LinearGradient>
                )}
                <View>
                  <Text className="text-xl font-bold text-gray-800">
                    Echo
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Tu servicio ideal
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <Text className="text-xl font-bold text-gray-800">
                  {title}
                </Text>
                {subtitle && (
                  <Text className="text-sm text-gray-500 mt-1">
                    {subtitle}
                  </Text>
                )}
                <View className="w-12 h-1 bg-blue-500 rounded-full mt-1" />
              </View>
            )}
          </View>
          
          {/* Sección derecha - Créditos y Notificaciones */}
          <View className="flex-row items-center space-x-3">
            {/* Créditos mejorados */}
            {showCredits && (
              <Animated.View style={{ 
                transform: [
                  { scale: animatedValue },
                  { scale: isLowCredits ? pulseAnim : 1 }
                ] 
              }}>
                <TouchableOpacity
                  onPress={onCreditsPress}
                  className={`px-4 py-2 rounded-xl flex-row items-center border shadow-sm ${getCreditBgColor()}`}
                  activeOpacity={0.8}
                >
                  <View className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${
                    credits === 0 ? 'bg-red-500' :
                    credits <= 5 ? 'bg-orange-500' :
                    credits <= 10 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    <Ionicons 
                      name={getCreditIcon()} 
                      size={14} 
                      color="white" 
                    />
                  </View>
                  
                  {loading ? (
                    <ActivityIndicator size="small" color="#6B7280" />
                  ) : (
                    <View>
                      <Text className={`font-bold text-sm ${getCreditColor()}`}>
                        {credits}
                      </Text>
                      <Text className="text-xs text-gray-500 -mt-1">
                        {credits === 1 ? 'crédito' : 'créditos'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            )}
            
            {/* Notificaciones mejoradas */}
            {showNotifications && (
              <TouchableOpacity
                onPress={onNotificationPress}
                className="relative w-12 h-12 bg-white rounded-xl items-center justify-center shadow-sm border border-gray-100"
                activeOpacity={0.8}
              >
                <Ionicons name="notifications-outline" size={22} color="#374151" />
                {notificationCount > 0 && (
                  <Animated.View 
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-6 h-6 flex items-center justify-center px-1 shadow-lg"
                  >
                    <Text className="text-white text-xs font-bold">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Text>
                  </Animated.View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Barra de advertencia para créditos bajos */}
        {showCredits && credits <= 5 && credits > 0 && (
          <View className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <View className="flex-row items-center">
              <Ionicons name="warning" size={16} color="#EA580C" />
              <Text className="ml-2 text-orange-700 text-sm font-medium flex-1">
                {credits <= 3 
                  ? `Te quedan solo ${credits} ${credits === 1 ? 'crédito' : 'créditos'}. ¡Recarga pronto!`
                  : `Créditos bajos: ${credits} restantes`
                }
              </Text>
              <TouchableOpacity 
                onPress={onCreditsPress}
                className="bg-orange-500 px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs font-bold">Recargar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Mensaje cuando no hay créditos */}
        {showCredits && credits === 0 && (
          <View className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={16} color="#DC2626" />
              <Text className="ml-2 text-red-700 text-sm font-medium flex-1">
                Sin créditos disponibles
              </Text>
              <TouchableOpacity 
                onPress={onCreditsPress}
                className="bg-red-500 px-4 py-2 rounded-full"
              >
                <Text className="text-white text-xs font-bold">Comprar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}