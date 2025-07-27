import { View } from "react-native";
import CustomText from "./CustomText";

interface CategoryBadgeProps {
  category: string;
  variant?: "small" | "default" | "large";
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
  textColor = "text-white",
  containerStyle = "",
}) => {
  const variantClassMap = {
    small: "px-1 py-0.5 text-badge",
    default: "px-1.5 py-0.5 text-caption",
    large: "px-2 py-1 text-caption",
  };

  const positionClass = position === "absolute" ? "absolute top-2 left-2" : "";

  return (
    <View
      className={`
        ${backgroundColor}
        ${variantClassMap[variant]}
        ${positionClass}
        ${containerStyle}
        rounded-lg shadow-sm border border-white/20
      `}
    >
      <CustomText
        className={`${textColor} font-medium text-text-badge`}
        numberOfLines={1}
      >
        {category}
      </CustomText>
    </View>
  );
};

export default CategoryBadge;
