import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CategoryCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  iconName,
  onPress,
  backgroundColor = "bg-blue-50",
  iconColor = "#3B82F6",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${backgroundColor} rounded-lg p-4 mb-4 items-center justify-center min-w-24`}
      style={{ aspectRatio: 1 }}
    >
      <Ionicons name={iconName} size={32} color={iconColor} />
      <Text className="text-sm font-medium text-gray-700 mt-2 text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
