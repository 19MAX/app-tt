import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import CustomCard from "@/components/CustomCard";
import CustomText from "@/components/CustomText";
import CustomView from "@/components/CustomView";

interface ActionCardProps {
  href: string; // Puedes usar keyof typeof routes si quieres mayor tipado estricto
  title: string;
  description: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const ActionCard: React.FC<ActionCardProps> = ({
  href,
  title,
  description,
  iconName = "add-circle",
}) => {
  return (
    <CustomCard className="my-3 p-4">
      {/* Link + Pressable para navegación y tactilidad */}
      <Link href={href as any} asChild>
        <Pressable className="flex-row items-center active:opacity-70">
          <CustomView className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Ionicons name={iconName} size={28} color="#3B82F6" />
          </CustomView>

          <CustomView className="flex-1 pr-2">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={2}
              className="mb-1 leading-tight"
            >
              {title}
            </CustomText>
            <CustomText
              variant="small"
              color="secondary"
              numberOfLines={2}
              className="leading-relaxed"
            >
              {description}
            </CustomText>
          </CustomView>

          <CustomView className="ml-auto pl-2">
            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </CustomView>
        </Pressable>
      </Link>
    </CustomCard>
  );
};

export default ActionCard;
