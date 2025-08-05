import { MiOfertaResumen, OfertaPublica } from "@/types/ofertas/ofertas";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import CategoryBadge from "./CategoryBadge";
import CustomCard from "./CustomCard";
import CustomText from "./CustomText";
import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";

interface OfertasCustomProps {
  oferta: MiOfertaResumen | OfertaPublica;
  isPublica: boolean;
  isFavorite?: boolean;
  showPhone?: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
  onPhonePress: () => void;
}

const OfertasCustom = ({
  oferta,
  isPublica,
  onPress,
  onFavoritePress,
  onPhonePress,
  isFavorite = false,
  showPhone,
}: OfertasCustomProps) => {
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
            {oferta.imagen ? (
              <Image
                source={{ uri: oferta.imagen }}
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
                {oferta.titulo}
              </CustomText>

              <CategoryBadge
                category={oferta.servicio.titulo}
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
                {isPublica ? oferta.usuario.nombre : "Tu oferta"}
              </CustomText>

              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={12} color="#6B7280" />
                <CustomText
                  variant="small"
                  color="muted"
                  className="ml-1 flex-1"
                  numberOfLines={1}
                >
                  {oferta.ubicacion.ciudad}
                </CustomText>
              </View>

              {showPhone && oferta.usuario.telefono && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="call-outline" size={12} color="#6B7280" />
                  <CustomText
                    variant="small"
                    color="muted"
                    className="ml-1 flex-1"
                    numberOfLines={1}
                  >
                    {oferta.usuario.telefono}
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
                  rating={oferta.usuario.valoracion}
                  reviewCount={oferta.usuario.numeroValoraciones}
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
                    {oferta.usuario.numeroValoraciones}
                  </CustomText>
                </View>
              </View>

              <CustomText variant="body" weight="bold" color="success">
                ${oferta.precioPersonalizado}/h
              </CustomText>
            </View>
          </View>
        </View>
      </Pressable>
    </CustomCard>
  );
};

export default OfertasCustom;
