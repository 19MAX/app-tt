import CustomCard from "@/components/CustomCard";
import CustomText from "@/components/CustomText";
import CustomView from "@/components/CustomView";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import React from "react";

interface ActionCardProps {
  href: Href;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackgroundColor: string;
  title: string;
  description: string;
}

const ActionCard = ({
  href,
  iconName,
  iconColor,
  iconBackgroundColor,
  title,
  description,
}:ActionCardProps) => {
  return (
    <CustomCard className="my-3 p-4">
      <Link href={href} asChild>
        <CustomView className="flex-row items-center active:opacity-70">
          {/* Icono */}
          <CustomView
            className={`w-14 h-14 ${iconBackgroundColor} rounded-full items-center justify-center mr-4`}
          >
            <Ionicons name={iconName} size={28} color={iconColor} />
          </CustomView>

          {/* Contenido de texto */}
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

          {/* Flecha */}
          <CustomView className="ml-auto pl-2">
            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </CustomView>
        </CustomView>
      </Link>
    </CustomCard>
  );
};

export default ActionCard;
