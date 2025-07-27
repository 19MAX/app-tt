import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import CategoryBadge from "./CategoryBadge";
import CustomCard from "./CustomCard";
import CustomText from "./CustomText";
import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";

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
  isFavorite = false,
  phone,
  showPhone = false,
  onPress,
  onFavoritePress,
  onPhonePress,
}) => {
  return (
    <CustomCard className="mx-4 my-2">
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.95 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <View className="flex-row">
          {/* Left side - Image */}
          <View className="w-1/4 relative overflow-hidden rounded-l-xl bg-gray-100">
            {image ? (
              <Image
                source={{ uri: image }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="absolute inset-0 items-center justify-center bg-gray-200">
                <Ionicons name="image-outline" size={28} color="#9CA3AF" />
              </View>
            )}

            <FavoriteButton
              isFavorite={isFavorite}
              onPress={onFavoritePress}
              size={18}
              position="absolute"
              top={8}
              right={8}
              showBackground={true}
            />
          </View>

          {/* Right side - Dynamic Content */}
          <View className="flex-1 px-3 justify-between">
            {/* Top section */}
            <View>
              <CustomText
                variant="caption"
                weight="semibold"
                color="black"
                numberOfLines={2}
                className="mb-1"
              >
                {title}
              </CustomText>

              <CategoryBadge
                category={category}
                variant="small"
                position="relative"
                containerStyle="self-start mb-1"
              />

              <CustomText
                variant="small"
                weight="medium"
                color="secondary"
                className="mb-1"
              >
                {providerName}
              </CustomText>

              <View className="flex-row items-center mb-1">
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

              {showPhone && phone && (
                <View className="flex-row items-center mb-1">
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

            {/* Bottom section */}
            <View className="flex-row items-end justify-between mt-1 mb-2">
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
                  <CustomText variant="small" color="muted" className="ml-1">
                    {reviewCount}
                  </CustomText>
                </View>
              </View>

              <CustomText variant="body" weight="bold" color="success">
                ${price}/h
              </CustomText>
            </View>
          </View>
        </View>
      </Pressable>
    </CustomCard>
  );
};

export default ServiceListItem;
