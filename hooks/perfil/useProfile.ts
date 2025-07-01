// hooks/useProfile.ts
import { useAuth } from "@/context/auth/AuthContext";
import { Api } from "@/core/api/client/Api";
import { capitalizarPalabras } from "@/helpers";
import { router } from "expo-router";
import { useMemo } from "react";
import { Alert } from "react-native";

export const useProfile = () => {
  const auth = useAuth();

  const api = useMemo(() => {
    const instance = new Api({
      securityWorker: (token) =>
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
    });
    if (auth?.token) {
      instance.setSecurityData(auth.token);
    }
    return instance;
  }, [auth?.token]);

  // Datos computados del usuario
  const userInfo = useMemo(() => {
    const nombreCompleto =
      auth?.user?.nombreCompleto || auth?.user?.email || "Usuario";
    const nombreFormateado = auth?.user?.nombreCompleto
      ? capitalizarPalabras(auth.user.nombreCompleto)
      : auth?.user?.email || "Usuario";

    const nombres = nombreFormateado.split(" ");
    const primerNombre = nombres[0] || "";
    const apellido = nombres.slice(1).join(" ") || "";

    return {
      nombreCompleto,
      nombreFormateado,
      primerNombre,
      apellido,
      urlFoto: auth?.user?.urlFoto,
      email: auth?.user?.email,
      numeroContacto: auth?.user?.numeroContacto,
    };
  }, [auth?.user]);

  // Acciones
  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await auth?.logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert("Editar perfil", "Función en desarrollo");
  };

  const handleChangePassword = () => {
    Alert.alert("Cambiar contraseña", "Función en desarrollo");
  };

  const handleNotifications = () => {
    Alert.alert("Notificaciones", "Función en desarrollo");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacidad", "Función en desarrollo");
  };

  const handleHelp = () => {
    Alert.alert("Ayuda", "Función en desarrollo");
  };

  const updateUserPhoto = (urlFoto: string) => {
    if (typeof auth?.setUser === "function") {
      auth.setUser((prev: any) => ({
        ...prev,
        urlFoto,
      }));
    }
  };

  // Nueva función para actualizar nombre y teléfono
  const updateProfile = async (data: { nombreCompleto?: string; numeroContacto?: string }) => {
    try {
      const res = await api.usuarios.actualizarPerfil(data);
      if (res.data) {
        if (typeof auth?.setUser === "function") {
          auth.setUser((prev: any) => ({ ...prev, ...res.data }));
        }
        Alert.alert("¡Éxito!", "Datos actualizados correctamente.");
        return true;
      }
      Alert.alert("Error", "No se pudo actualizar el perfil.");
      return false;
    } catch (e: any) {
      let errorMessage = "No se pudo actualizar el perfil.";
      if (e?.response?.data?.message) {
        errorMessage = Array.isArray(e.response.data.message)
          ? e.response.data.message.join("\n")
          : e.response.data.message;
      } else if (e?.message) {
        errorMessage = e.message;
      }
      Alert.alert("Error", errorMessage);
      return false;
    }
  };

  return {
    userInfo,
    api,
    token: auth?.token,
    isAuthenticated: !!auth?.token,
    actions: {
      handleLogout,
      handleEditProfile,
      handleChangePassword,
      handleNotifications,
      handlePrivacy,
      handleHelp,
      updateUserPhoto,
      updateProfile,
    },
  };
};
