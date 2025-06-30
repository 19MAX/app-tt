import { Avatar } from "@/components/Avatar";
import { ProfileMenuItem } from "@/components/ProfileMenuItem";
import { useAuth } from "@/context/auth/AuthContext";
import { capitalizarPalabras } from "@/helpers";
import { router } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";

export default function PerfilTab() {
  const auth = useAuth();

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
          // Borrar historial de navegación y redirigir a login
          router.replace("/auth/login");
        },
      },
    ]);
  };

  const handleChangePhoto = () => {
    // TODO: Implementar cambio de foto
    Alert.alert("Cambiar foto", "Función en desarrollo");
  };

  const handleEditProfile = () => {
    // TODO: Implementar edición de perfil
    Alert.alert("Editar perfil", "Función en desarrollo");
  };

  const handleChangePassword = () => {
    // TODO: Implementar cambio de contraseña
    Alert.alert("Cambiar contraseña", "Función en desarrollo");
  };

  const handleNotifications = () => {
    // TODO: Implementar configuración de notificaciones
    Alert.alert("Notificaciones", "Función en desarrollo");
  };

  const handlePrivacy = () => {
    // TODO: Implementar configuración de privacidad
    Alert.alert("Privacidad", "Función en desarrollo");
  };

  const handleHelp = () => {
    // TODO: Implementar ayuda
    Alert.alert("Ayuda", "Función en desarrollo");
  };

  if (!auth?.token) return null;

  const nombreCompleto =
    auth?.user?.nombreCompleto || auth?.user?.email || "Usuario";
  const nombreFormateado = auth?.user?.nombreCompleto
    ? capitalizarPalabras(auth.user.nombreCompleto)
    : auth?.user?.email || "Usuario";

  // Obtener primer nombre y apellido
  const nombres = nombreFormateado.split(" ");
  const primerNombre = nombres[0] || "";
  const apellido = nombres.slice(1).join(" ") || "";

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
    >
      {/* Header con Avatar y Nombre */}
      <View className="bg-white pt-16 pb-10 items-center">
        <Avatar
          nombre={nombreCompleto}
          imagenUrl={auth?.user?.urlFoto}
          size={120}
          onPress={handleChangePhoto}
          showEditIcon={true}
        />

        <View className="mt-6 items-center">
          <Text className="text-2xl font-bold text-gray-900">
            {primerNombre}
          </Text>
          {apellido && (
            <Text className="text-xl text-gray-600 mt-1">{apellido}</Text>
          )}
        </View>
      </View>

      {/* Menú de Configuración */}
      <View className="mt-6 bg-white rounded-t-3xl flex-1">
        <View className="px-6 py-6">
          <Text className="text-xl font-bold text-gray-900">Configuración</Text>
        </View>

        <ProfileMenuItem
          icon="person-outline"
          title="Cambiar información"
          subtitle="Editar datos personales"
          onPress={handleEditProfile}
        />

        <ProfileMenuItem
          icon="lock-closed-outline"
          title="Cambiar contraseña"
          subtitle="Actualizar contraseña de acceso"
          onPress={handleChangePassword}
        />

        <ProfileMenuItem
          icon="notifications-outline"
          title="Notificaciones"
          subtitle="Configurar alertas y notificaciones"
          onPress={handleNotifications}
        />

        <ProfileMenuItem
          icon="shield-checkmark-outline"
          title="Privacidad"
          subtitle="Configurar privacidad y seguridad"
          onPress={handlePrivacy}
        />

        <ProfileMenuItem
          icon="help-circle-outline"
          title="Ayuda y soporte"
          subtitle="Centro de ayuda y contacto"
          onPress={handleHelp}
        />

        {/* Separador */}
        <View className="h-8 bg-gray-50" />

        {/* Botón de cerrar sesión */}
        <ProfileMenuItem
          icon="log-out-outline"
          title="Cerrar sesión"
          subtitle="Salir de la aplicación"
          onPress={handleLogout}
          danger={true}
          showArrow={false}
        />

        {/* Espacio al final */}
        <View className="h-12" />
      </View>
    </ScrollView>
  );
}
