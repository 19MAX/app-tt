import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import CustomText from "./CustomText";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  showReviewCount?: boolean;
  starSize?: number;
  textVariant?: "small" | "medium" | "large";
  containerStyle?: string;
  starColor?: string;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  showReviewCount = true,
  starSize = 14,
  textVariant = "small",
  containerStyle = "",
  starColor = "#F59E0B",
}) => {
  return (
    <View className={`flex-row items-center ${containerStyle}`}>
      <Ionicons name="star" size={starSize} color={starColor} />
      <CustomText
        variant={"small"}
        weight="medium"
        className="text-gray-700 ml-1"
      >
        {rating.toFixed(1)}
      </CustomText>
      {showReviewCount && reviewCount && (
        <CustomText variant={"small"} color="muted" className="ml-1">
          ({reviewCount})
        </CustomText>
      )}
    </View>
  );
};

export default RatingDisplay;