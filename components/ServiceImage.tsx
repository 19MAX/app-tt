import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";

interface ServiceImageProps {
  image?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  height?: number;
  width?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  backgroundColor?: string;
  iconSize?: number;
  iconColor?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  containerStyle?: string;
  imageStyle?: string;
  showIcon?: boolean;
}

const ServiceImage: React.FC<ServiceImageProps> = ({
  image,
  iconName = "hammer-outline",
  height = 128, // h-32 = 128px
  width = "100%",
  rounded = "md",
  backgroundColor = "bg-gray-100",
  iconSize = 40,
  iconColor = "#6B7280",
  resizeMode = "cover",
  containerStyle = "",
  imageStyle = "",
  showIcon = true,
}) => {
  // Estilos de redondeo para el contenedor
  const containerRoundedStyles = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Estilos de redondeo para la imagen
  const imageRoundedStyles = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const containerClasses = `${backgroundColor} ${containerRoundedStyles[rounded]} flex items-center justify-center ${containerStyle}`;
  const imageClasses = `w-full h-full ${imageRoundedStyles[rounded]} ${imageStyle}`;

  return (
    <View
      className={containerClasses}
      style={{
        height,
        width: typeof width === "string" ? undefined : width,
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          className={imageClasses}
          resizeMode={resizeMode}
        />
      ) : (
        showIcon && <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
    </View>
  );
};

export default ServiceImage;
