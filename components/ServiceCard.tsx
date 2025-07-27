import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import CategoryBadge from "./CategoryBadge";
import CustomText from "./CustomText";
import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";
import ServiceImage from "./ServiceImage";

interface ServiceCardProps {
  title: string;
  description?: string;
  providerName: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  image?: string;
  category: string;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  width?: number;
  variant?: "default" | "compact" | "detailed";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  providerName,
  location,
  rating,
  reviewCount,
  price,
  image,
  category,
  isFavorite = false,
  onPress,
  onFavoritePress,
  iconName = "hammer-outline",
  width = 280,
  variant = "default",
}) => {
  // Configuraciones según la variante
  const variantConfig = {
    compact: {
      imageHeight: 96, // h-24
      showDescription: false,
      padding: "p-3",
    },
    default: {
      imageHeight: 128, // h-32
      showDescription: true,
      padding: "p-4",
    },
    detailed: {
      imageHeight: 160, // h-40
      showDescription: true,
      padding: "p-4",
    },
  };

  const config = variantConfig[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg mr-4 mb-4 shadow-sm border border-gray-100"
      style={{ width }}
    >
      {/* Header with image/icon and overlays */}
      <View className="relative">
        <ServiceImage
          image={image}
          iconName={iconName}
          height={config.imageHeight}
          rounded="md"
        />

        <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />

        <CategoryBadge
          category={category}
          variant={variant === "compact" ? "small" : "default"}
        />
      </View>

      {/* Content */}
      <View className={config.padding}>
        {/* Título */}
        <CustomText
          variant={variant === "compact" ? "small" : "h3"}
          weight="semibold"
          color="black"
          numberOfLines={variant === "detailed" ? 3 : 2}
          className="mb-1"
        >
          {title}
        </CustomText>

        {/* Descripción (condicional según variante) */}
        {config.showDescription && description && (
          <CustomText
            variant="small"
            color="secondary"
            numberOfLines={variant === "detailed" ? 4 : 2}
            className="mb-2"
          >
            {description}
          </CustomText>
        )}

        {/* Nombre del proveedor */}
        <CustomText
          variant="small"
          weight="medium"
          className="text-gray-700 mb-1"
        >
          {providerName}
        </CustomText>

        {/* Ubicación */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <CustomText
            variant="small"
            color="muted"
            className="ml-1"
            numberOfLines={1}
          >
            {location}
          </CustomText>
        </View>

        {/* Rating y precio */}
        <View className="flex-row items-center justify-between">
          <RatingDisplay
            rating={rating}
            reviewCount={reviewCount}
            textVariant="small"
          />
          <CustomText
            variant={variant === "compact" ? "small" : "h3"}
            weight="bold"
            color="success"
          >
            ${price}/hora
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
