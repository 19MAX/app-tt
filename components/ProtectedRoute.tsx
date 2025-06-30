import { useAuth } from "@/context/auth/AuthContext";
import { router, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, initializing } = useAuth() ?? {};
  const pathname = usePathname();

  useEffect(() => {
    if (!initializing && !token && pathname !== "/auth/login") {
      router.replace("/auth/login");
    }
  }, [initializing, token, pathname]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  if (!token) return null;
  return <>{children}</>;
}
