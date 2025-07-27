import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import CategoryBadge from "./CategoryBadge";
import CustomText from "./CustomText";
import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";
import ServiceImage from "./ServiceImage";

interface ServiceListItemProps {
  title: string;
  category: string;
  providerName: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  image?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  isFavorite?: boolean;
  phone?: string;
  showPhone?: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
  onPhonePress?: () => void;
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({
  title,
  category,
  providerName,
  location,
  rating,
  reviewCount,
  price,
  image,
  iconName = "hammer-outline",
  isFavorite = false,
  phone,
  showPhone = false,
  onPress,
  onFavoritePress,
  onPhonePress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white mx-4 mb-3 rounded-lg border border-gray-100 shadow-sm overflow-hidden"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View className="flex-row">
        {/* Left side - Image (25% width) */}
        <View className="w-1/4 relative">
          <ServiceImage
            image={image}
            iconName={iconName}
            height={100}
            width="100%"
            rounded="none"
            backgroundColor="bg-gray-100"
            iconSize={28}
            resizeMode="cover"
            showIcon={!image}
            imageStyle="w-full h-full"
          />
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={onFavoritePress}
            size={16}
            position="absolute"
            top={8}
            right={8}
            showBackground={true}
          />
        </View>

        {/* Right side - Content (75% width) */}
        <View className="flex-1 p-3 justify-between">
          {/* Top section */}
          <View>
            {/* Title */}
            <CustomText
              variant="body"
              weight="semibold"
              color="black"
              numberOfLines={2}
              className="mb-2"
            >
              {title}
            </CustomText>

            {/* Category Badge */}
            <View className="mb-2">
              <CategoryBadge
                category={category}
                variant="small"
                position="relative"
                backgroundColor="bg-blue-500/70"
                textColor="white"
                containerStyle="self-start"
              />
            </View>

            {/* Provider Name */}
            <CustomText
              variant="small"
              weight="medium"
              color="secondary"
              className="mb-1"
            >
              {providerName}
            </CustomText>

            {/* Location */}
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={12} color="#6B7280" />
              <CustomText
                variant="small"
                color="muted"
                className="ml-1 flex-1"
                numberOfLines={1}
              >
                {location}
              </CustomText>
            </View>

            {/* Phone number - only show when showPhone is true */}
            {showPhone && phone && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="call-outline" size={12} color="#6B7280" />
                <CustomText
                  variant="small"
                  color="muted"
                  className="ml-1 flex-1"
                  numberOfLines={1}
                >
                  {phone}
                </CustomText>
                {onPhonePress && (
                  <TouchableOpacity
                    onPress={onPhonePress}
                    className="ml-2 p-1"
                    activeOpacity={0.7}
                  >
                    <Ionicons name="call" size={14} color="#10B981" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Bottom section - Rating y Precio */}
          <View className="flex-row items-end justify-between">
            {/* Rating y Reviews */}
            <View className="flex-row items-center">
              <RatingDisplay
                rating={rating}
                reviewCount={reviewCount}
                showReviewCount={false}
                starSize={12}
                textVariant="small"
              />
              <View className="flex-row items-center ml-3">
                <Ionicons
                  name="chatbubble-outline"
                  size={12}
                  color="#6B7280"
                />
                <CustomText
                  variant="small"
                  color="muted"
                  className="ml-1"
                >
                  {reviewCount}
                </CustomText>
              </View>
            </View>

            {/* Precio en esquina inferior derecha */}
            <CustomText
              variant="body"
              weight="bold"
              color="success"
            >
              ${price}/h
            </CustomText>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceListItem;