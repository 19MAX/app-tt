import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  position?: "absolute" | "relative";
  containerStyle?: string;
  showBackground?: boolean;
  top?: number;
  right?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 18,
  position = "absolute",
  containerStyle = "",
  showBackground = true,
  top = 8,
  right = 8,
}) => {
  const backgroundStyle = showBackground ? "bg-white/90 rounded-full p-1.5 shadow-sm border border-gray-100" : "p-1";
  
  const baseStyle = position === "absolute" 
    ? `${backgroundStyle}`
    : backgroundStyle;

  const absoluteStyle = position === "absolute" ? {
    position: 'absolute' as const,
    top: top,
    right: right,
    zIndex: 10,
  } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${baseStyle} ${containerStyle}`}
      style={absoluteStyle}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={isFavorite ? "#EF4444" : "#6B7280"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;