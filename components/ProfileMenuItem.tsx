import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  danger?: boolean;
}

export function ProfileMenuItem({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  danger = false,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between py-5 px-6 border-b border-gray-100 active:bg-gray-50 ${
        danger ? "bg-red-50" : "bg-white"
      }`}
    >
      <View className="flex-row items-center flex-1">
        <View
          className={`w-11 h-11 rounded-full items-center justify-center mr-4 ${
            danger ? "bg-red-100" : "bg-gray-100"
          }`}
        >
          <Ionicons
            name={icon}
            size={22}
            color={danger ? "#dc2626" : "#6b7280"}
          />
        </View>
        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              danger ? "text-red-600" : "text-gray-900"
            }`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
          )}
        </View>
      </View>

      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={danger ? "#dc2626" : "#9ca3af"}
        />
      )}
    </Pressable>
  );
}
