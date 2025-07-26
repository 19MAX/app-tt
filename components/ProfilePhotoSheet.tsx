import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { forwardRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "./Avatar";

interface ProfilePhotoSheetProps {
  nombre: string;
  imagenUrl?: string;
  loading?: boolean;
  onPickImage: () => void;
  onTakePhoto: () => void;
  onCancel: () => void;
}

export const ProfilePhotoSheet = forwardRef<
  BottomSheetModal,
  ProfilePhotoSheetProps
>(({ nombre, imagenUrl, loading, onPickImage, onTakePhoto, onCancel }, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={[`100%`]}
      enablePanDownToClose
      backdropComponent={({ style }) => (
        <BlurView
          intensity={60}
          tint="dark"
          style={[
            style as any,
            {
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.55)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        />
      )}
      backgroundStyle={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleStyle={{ backgroundColor: "#fff" }}
      handleIndicatorStyle={{ backgroundColor: "#2563eb" }}
      topInset={insets.top}
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 32,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 24,
          justifyContent: "flex-start",
        }}
      >
        <Avatar
          nombre={nombre}
          imagenUrl={imagenUrl}
          size={100}
          onPress={() => {}}
          showEditIcon={true}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 22,
          }}
        >
          Cambia tu foto de perfil
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            width: "100%",
          }}
          onPress={onPickImage}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Seleccionar de galería
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            width: "100%",
          }}
          onPress={onTakePhoto}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Tomar una foto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#e5e7eb",
            padding: 16,
            borderRadius: 12,
            width: "100%",
          }}
          onPress={onCancel}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text
            style={{
              color: "#111",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

ProfilePhotoSheet.displayName = "ProfilePhotoSheet";
