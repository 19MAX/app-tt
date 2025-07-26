import { useAuth } from "@/context/auth/AuthContext";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  fallback,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { token, initializing, user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Si no está inicializando y no hay token, redirigir
    if (!initializing && !token && pathname !== redirectTo) {
      console.log(
        "[ProtectedRoute] No token found, redirecting to:",
        redirectTo
      );
      router.replace(redirectTo as any);
    }
  }, [initializing, token, pathname, redirectTo]);

  // Mostrar loading mientras inicializa
  if (initializing) {
    return (
      fallback || (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
            Cargando...
          </Text>
        </View>
      )
    );
  }

  // Si no hay token, no renderizar nada (se redirigirá)
  if (!token) {
    return null;
  }

  // Si hay token pero no usuario, mostrar loading
  if (token && !user) {
    return (
      fallback || (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
            Cargando perfil...
          </Text>
        </View>
      )
    );
  }

  return <>{children}</>;
}
