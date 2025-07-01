// hooks/useImagePicker.ts
import { uploadProfileImage } from "@/core/services/client/uploadImage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";

interface UseImagePickerProps {
  api: any;
  token: string;
  onPhotoUpdate: (urlFoto: string) => void;
}

export const useImagePicker = ({ api, token, onPhotoUpdate }: UseImagePickerProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loading, setLoading] = useState(false);

  const actualizarFotoPerfil = async (uri: string) => {
    try {
      console.log("[actualizarFotoPerfil] URI recibida:", uri);
      const nombreArchivo = uri.split("/").pop() || `foto-perfil.jpg`;
      const mimeType = nombreArchivo.endsWith(".png")
        ? "image/png"
        : nombreArchivo.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg";

      setLoading(true);

      const res = await uploadProfileImage({
        api,
        token,
        uri,
        nombreArchivo,
        mimeType,
      });

      if (res.data?.urlFoto) {
        onPhotoUpdate(res.data.urlFoto);
        Alert.alert("¡Éxito!", "Foto de perfil actualizada correctamente.");
        return;
      }

      Alert.alert("Error", "No se pudo actualizar la foto de perfil.");
    } catch (e: any) {
      console.log("[actualizarFotoPerfil] Error completo:", e);
      console.log("[actualizarFotoPerfil] Error response:", e?.response?.data);
      console.log("[actualizarFotoPerfil] Error status:", e?.response?.status);

      let errorMessage = "No se pudo subir la foto.";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e?.message) {
        errorMessage = e.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
      bottomSheetRef.current?.dismiss();
    }
  };

  const pickImage = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos para acceder a la galería."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      console.log("[pickImage] Resultado de ImagePicker:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await actualizarFotoPerfil(result.assets[0].uri);
      }
    } catch (e) {
      console.log("[pickImage] Error:", e);
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
      setLoading(false);
      bottomSheetRef.current?.dismiss();
    }
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos para acceder a la cámara."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      console.log("[takePhoto] Resultado de ImagePicker:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await actualizarFotoPerfil(result.assets[0].uri);
      }
    } catch (e) {
      console.log("[takePhoto] Error:", e);
      Alert.alert("Error", "No se pudo tomar la foto.");
      setLoading(false);
      bottomSheetRef.current?.dismiss();
    }
  }, []);

  const handleChangePhoto = () => {
    bottomSheetRef.current?.present();
  };

  const handleCancel = () => {
    bottomSheetRef.current?.dismiss();
  };

  return {
    bottomSheetRef,
    loading,
    pickImage,
    takePhoto,
    handleChangePhoto,
    handleCancel,
  };
};