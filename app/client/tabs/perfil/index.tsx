import { Avatar } from "@/components/Avatar";
import { BottomSheet } from "@/components/BottomSheet";
import { Input } from "@/components/Input";
import { PressableButton } from "@/components/PressableButton";
import { ProfileMenuItem } from "@/components/ProfileMenuItem";
import { ProfilePhotoSheet } from "@/components/ProfilePhotoSheet";
import { useImagePicker } from "@/hooks/perfil/useImagerPicker";
import { useProfile } from "@/hooks/perfil/useProfile";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PerfilTab() {
  const { userInfo, api, token, isAuthenticated, actions } = useProfile();

  const {
    bottomSheetRef,
    loading,
    pickImage,
    takePhoto,
    handleChangePhoto,
    handleCancel,
  } = useImagePicker({
    api,
    token: token || "",
    onPhotoUpdate: actions.updateUserPhoto,
  });

  // Estado para hoja de edición
  const editSheetRef = useRef<BottomSheetModal>(null);
  const [editNombre, setEditNombre] = useState(userInfo.nombreCompleto || "");
  const [editTelefono, setEditTelefono] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Abrir hoja de edición y setear valores actuales
  const openEditSheet = () => {
    setEditNombre(userInfo.nombreCompleto || "");
    setEditTelefono(userInfo.numeroContacto || "");
    editSheetRef.current?.present();
  };

  // Guardar cambios
  const handleSaveEdit = async () => {
    setEditLoading(true);
    const ok = await actions.updateProfile({
      nombreCompleto: editNombre,
      numeroContacto: editTelefono,
    });
    setEditLoading(false);
    if (ok) {
      editSheetRef.current?.dismiss();
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        {/* Header con Avatar y Nombre */}
        <View className="bg-white pt-16 pb-10 items-center">
          <Avatar
            nombre={userInfo.nombreCompleto}
            imagenUrl={userInfo.urlFoto}
            size={120}
            onPress={handleChangePhoto}
            showEditIcon={true}
          />

          <View className="mt-6 items-center">
            <Text className="text-2xl font-bold text-gray-900">
              {userInfo.primerNombre}
            </Text>
            {userInfo.apellido && (
              <Text className="text-xl text-gray-600 mt-1">
                {userInfo.apellido}
              </Text>
            )}
          </View>
        </View>

        {/* Menú de Configuración */}
        <View className="mt-6 bg-white rounded-t-3xl flex-1">
          <View className="px-6 py-6">
            <Text className="text-xl font-bold text-gray-900">
              Configuración
            </Text>
          </View>

          <ProfileMenuItem
            icon="person-outline"
            title="Cambiar información"
            subtitle="Editar datos personales"
            onPress={openEditSheet}
          />

          <ProfileMenuItem
            icon="lock-closed-outline"
            title="Cambiar contraseña"
            subtitle="Actualizar contraseña de acceso"
            onPress={actions.handleChangePassword}
          />

          <ProfileMenuItem
            icon="notifications-outline"
            title="Notificaciones"
            subtitle="Configurar alertas y notificaciones"
            onPress={actions.handleNotifications}
          />

          <ProfileMenuItem
            icon="shield-checkmark-outline"
            title="Privacidad"
            subtitle="Configurar privacidad y seguridad"
            onPress={actions.handlePrivacy}
          />

          <ProfileMenuItem
            icon="help-circle-outline"
            title="Ayuda y soporte"
            subtitle="Centro de ayuda y contacto"
            onPress={actions.handleHelp}
          />

          {/* Separador */}
          <View className="h-8 bg-gray-50" />

          {/* Botón de cerrar sesión */}
          <ProfileMenuItem
            icon="log-out-outline"
            title="Cerrar sesión"
            subtitle="Salir de la aplicación"
            onPress={actions.handleLogout}
            danger={true}
            showArrow={false}
          />

          {/* Espacio al final */}
          <View className="h-12" />
        </View>
      </ScrollView>

      {/* Hoja inferior para editar datos */}
      <BottomSheet
        ref={editSheetRef}
        fullScreen={false}
        rounded={true}
        style={{ backgroundColor: "#fff" }}
        onClose={() => setEditLoading(false)}
      >
        <Text className="text-xl font-bold text-center mb-4">Editar datos personales</Text>
        <Input
          label="Nombre completo"
          value={editNombre}
          onChangeText={setEditNombre}
          placeholder="Nombre completo"
        />
        <Input
          label="Teléfono"
          value={editTelefono}
          onChangeText={setEditTelefono}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />
        <PressableButton
          title={editLoading ? "Guardando..." : "Guardar cambios"}
          onPress={handleSaveEdit}
          loading={editLoading}
          className="mb-2 bg-blue-600"
          textClassName="text-white font-bold"
        />
        <PressableButton
          title="Cancelar"
          onPress={() => editSheetRef.current?.dismiss()}
          className="bg-gray-200"
          textClassName="text-gray-900 font-bold"
        />
      </BottomSheet>

      <ProfilePhotoSheet
        ref={bottomSheetRef}
        nombre={userInfo.nombreCompleto}
        imagenUrl={userInfo.urlFoto}
        loading={loading}
        onPickImage={pickImage}
        onTakePhoto={takePhoto}
        onCancel={handleCancel}
      />
    </>
  );
}
