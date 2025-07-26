import { useAuth } from "@/context/auth/AuthContext";
import { Api } from "@/core/api/client/Api";
import { capitalizarPalabras } from "@/helpers";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { Alert } from "react-native";

export const useProfile = () => {
  const { user, token, logout, setUser } = useAuth();

  // Instancia de API con el token actual
  const api = useMemo(() => {
    const instance = new Api({
      securityWorker: (token) =>
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
    });

    if (token) {
      instance.setSecurityData(token);
    }

    return instance;
  }, [token]);

  // Datos computados del usuario
  const userInfo = useMemo(() => {
    if (!user) {
      return {
        nombreCompleto: "Usuario",
        nombreFormateado: "Usuario",
        primerNombre: "",
        apellido: "",
        urlFoto: undefined,
        email: "",
        numeroContacto: "",
      };
    }

    const nombreCompleto = user.nombreCompleto || user.email || "Usuario";
    const nombreFormateado = user.nombreCompleto
      ? capitalizarPalabras(user.nombreCompleto)
      : user.email || "Usuario";

    const nombres = nombreFormateado.split(" ");
    const primerNombre = nombres[0] || "";
    const apellido = nombres.slice(1).join(" ") || "";

    return {
      nombreCompleto,
      nombreFormateado,
      primerNombre,
      apellido,
      urlFoto: user.urlFoto,
      email: user.email,
      numeroContacto: user.numeroContacto,
    };
  }, [user]);

  // Acciones
  const handleLogout = useCallback(async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/auth/login");
            } catch (error) {
              console.error("[Profile] Error during logout:", error);
              // Forzar navegación aunque falle
              router.replace("/auth/login");
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, [logout]);

  const updateUserPhoto = useCallback(
    (urlFoto: string) => {
      if (!user) return;

      setUser((prev) => (prev ? { ...prev, urlFoto } : prev));
    },
    [user, setUser]
  );

  const updateProfile = useCallback(
    async (data: { nombreCompleto?: string; numeroContacto?: string }) => {
      try {
        const res = await api.usuarios.actualizarPerfil(data);

        if (res.data) {
          // Actualizar el estado local
          setUser((prev) => (prev ? { ...prev, ...res.data } : prev));

          Alert.alert("¡Éxito!", "Datos actualizados correctamente.");
          return true;
        }

        Alert.alert("Error", "No se pudo actualizar el perfil.");
        return false;
      } catch (error: any) {
        console.error("[Profile] Update error:", error);

        let errorMessage = "No se pudo actualizar el perfil.";

        if (error?.response?.data?.message) {
          errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join("\n")
            : error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        Alert.alert("Error", errorMessage);
        return false;
      }
    },
    [api, setUser]
  );

  // Funciones placeholder (puedes implementarlas después)
  const handleEditProfile = useCallback(() => {
    Alert.alert("Editar perfil", "Función en desarrollo");
  }, []);

  const handleChangePassword = useCallback(() => {
    Alert.alert("Cambiar contraseña", "Función en desarrollo");
  }, []);

  const handleNotifications = useCallback(() => {
    Alert.alert("Notificaciones", "Función en desarrollo");
  }, []);

  const handlePrivacy = useCallback(() => {
    Alert.alert("Privacidad", "Función en desarrollo");
  }, []);

  const handleHelp = useCallback(() => {
    Alert.alert("Ayuda", "Función en desarrollo");
  }, []);

  return {
    // Datos del usuario
    user,
    userInfo,
    token,
    isAuthenticated: !!token && !!user,

    // API instance
    api,

    // Acciones agrupadas
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
