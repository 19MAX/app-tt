import { obtenerIniciales } from "@/helpers";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

interface AvatarProps {
  nombre: string;
  imagenUrl?: string;
  size?: number;
  onPress?: () => void;
  showEditIcon?: boolean;
}

export function Avatar({
  nombre,
  imagenUrl,
  size = 100,
  onPress,
  showEditIcon = true,
}: AvatarProps) {
  const iniciales = obtenerIniciales(nombre);
  const fontSize = size * 0.4;
  const iconSize = size * 0.2;
  const editIconContainerSize = iconSize + 12;

  return (
    <View className="relative">
      <Pressable
        onPress={onPress}
        className="relative"
        style={{ width: size, height: size }}
      >
        {imagenUrl ? (
          <Image
            source={{ uri: imagenUrl }}
            className="rounded-full"
            style={{ width: size, height: size }}
          />
        ) : (
          <View
            className="bg-primary rounded-full items-center justify-center"
            style={{ width: size, height: size }}
          >
            <Text className="text-white font-bold" style={{ fontSize }}>
              {iniciales}
            </Text>
          </View>
        )}

        {showEditIcon && (
          <View
            className="absolute bottom-1 right-1 bg-white rounded-full border-2 border-primary items-center justify-center shadow-sm"
            style={{
              width: editIconContainerSize,
              height: editIconContainerSize,
            }}
          >
            <Ionicons name="pencil" size={iconSize} color="#2563eb" />
          </View>
        )}
      </Pressable>
    </View>
  );
}
