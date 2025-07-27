import { View } from "react-native";
import CustomText from "./CustomText";

interface CategoryBadgeProps {
  category: string;
  variant?: "default" | "small" | "large";
  position?: "absolute" | "relative";
  backgroundColor?: string;
  textColor?: string;
  containerStyle?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  variant = "default",
  position = "absolute",
  backgroundColor = "bg-blue-600/80",
  textColor = "white",
  containerStyle = "",
}) => {
  // Estilos según la variante - aún más pequeños
  const variantStyles = {
    small: "px-1 py-0.5 rounded-sm",
    default: "px-1.5 py-0.5 rounded-sm",
    large: "px-2 py-1 rounded-md",
  };

  // Variantes de texto - más pequeñas
  const textVariants = {
    small: "caption" as const,
    default: "caption" as const,
    large: "caption" as const,
  };

  // Posición
  const positionStyle = position === "absolute" ? "absolute top-2 left-2" : "";

  // Determinar el color del texto basado en el fondo
  const getTextColor = () => {
    if (backgroundColor.includes("blue")) return "white";
    if (backgroundColor.includes("green")) return "white";
    if (backgroundColor.includes("red")) return "white";
    if (backgroundColor.includes("yellow")) return "black";
    if (backgroundColor.includes("gray")) return "white";
    if (backgroundColor.includes("white")) return "black";
    return "white";
  };

  return (
    <View
      className={`${backgroundColor} ${variantStyles[variant]} ${positionStyle} ${containerStyle} shadow-sm border border-white/20`}
    >
      <CustomText
        variant={textVariants[variant]}
        weight="medium"
        color={getTextColor()}
        numberOfLines={1}
        className="text-xs"
      >
        {category}
      </CustomText>
    </View>
  );
};

export default CategoryBadge;
