import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomCard from "../../../../components/CustomCard";
import CustomView from "../../../../components/CustomView";
import ServiceListItem from "../../../../components/ServiceListItem";

type TabType = "favoritos" | "contactos";

export default function FavoritosTab() {
  const [activeTab, setActiveTab] = useState<TabType>("favoritos");

  const handleServicePress = (serviceName: string) => {
    Alert.alert("Servicio seleccionado", `Has seleccionado: ${serviceName}`);
  };

  const handleFavoritePress = (serviceName: string) => {
    Alert.alert("Favorito", `Has quitado de favoritos: ${serviceName}`);
  };

  const handlePhonePress = (phone: string) => {
    Alert.alert("Llamar", `¿Deseas llamar al ${phone}?`);
  };

  // Datos de ejemplo para favoritos
  const favoriteServices = [
    {
      id: 1,
      title: "Reparación de tuberías",
      category: "Plomería",
      providerName: "Plomeros Express",
      location: "Santo Domingo Este",
      rating: 4.8,
      reviewCount: 127,
      price: 25,
      image: undefined,
      iconName: "water-outline" as const,
      isFavorite: true,
    },
    {
      id: 2,
      title: "Instalación eléctrica residencial",
      category: "Electricidad",
      providerName: "ElectroPro",
      location: "Santo Domingo Oeste",
      rating: 4.9,
      reviewCount: 89,
      price: 35,
      image: undefined,
      iconName: "flash-outline" as const,
      isFavorite: true,
    },
    {
      id: 3,
      title: "Limpieza de hogar",
      category: "Limpieza",
      providerName: "CleanHouse",
      location: "Santo Domingo Norte",
      rating: 4.7,
      reviewCount: 203,
      price: 20,
      image: undefined,
      iconName: "sparkles-outline" as const,
      isFavorite: true,
    },
  ];

  // Datos de ejemplo para contactos (con teléfonos)
  const contactServices = [
    {
      id: 1,
      title: "Reparación de tuberías",
      category: "Plomería",
      providerName: "Plomeros Express",
      location: "Santo Domingo Este",
      rating: 4.8,
      reviewCount: 127,
      price: 25,
      image: undefined,
      iconName: "water-outline" as const,
      isFavorite: true,
      phone: "809-555-0123",
    },
    {
      id: 2,
      title: "Instalación eléctrica residencial",
      category: "Electricidad",
      providerName: "ElectroPro",
      location: "Santo Domingo Oeste",
      rating: 4.9,
      reviewCount: 89,
      price: 35,
      image: undefined,
      iconName: "flash-outline" as const,
      isFavorite: true,
      phone: "809-555-0456",
    },
    {
      id: 3,
      title: "Limpieza de hogar",
      category: "Limpieza",
      providerName: "CleanHouse",
      location: "Santo Domingo Norte",
      rating: 4.7,
      reviewCount: 203,
      price: 20,
      image: undefined,
      iconName: "sparkles-outline" as const,
      isFavorite: true,
      phone: "809-555-0789",
    },
    {
      id: 4,
      title: "Mantenimiento de jardín",
      category: "Jardinería",
      providerName: "GardenCare",
      location: "Santo Domingo Este",
      rating: 4.6,
      reviewCount: 156,
      price: 30,
      image: undefined,
      iconName: "leaf-outline" as const,
      isFavorite: true,
      phone: "809-555-0321",
    },
  ];

  const renderTabButton = (
    tab: TabType,
    title: string,
    icon: keyof typeof Ionicons.glyphMap
  ) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg ${
        activeTab === tab ? "bg-blue-500" : "bg-gray-100"
      }`}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={20}
        color={activeTab === tab ? "white" : "#6B7280"}
      />
      <Text
        className={`ml-2 font-medium ${
          activeTab === tab ? "text-white" : "text-gray-600"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con tabs */}
        <CustomView margin>
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Mis Favoritos
          </Text>

          <CustomCard className="p-1">
            <View className="flex-row space-x-2">
              {renderTabButton("favoritos", "Favoritos", "star-outline")}
              {renderTabButton("contactos", "Contactos", "call-outline")}
            </View>
          </CustomCard>
        </CustomView>

        {/* Contenido según tab activo */}
        <CustomView>
          {activeTab === "favoritos" ? (
            <>
              <CustomView margin>
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                  Servicios Favoritos ({favoriteServices.length})
                </Text>
              </CustomView>
              {favoriteServices.map((service) => (
                <ServiceListItem
                  key={service.id}
                  title={service.title}
                  category={service.category}
                  providerName={service.providerName}
                  location={service.location}
                  rating={service.rating}
                  reviewCount={service.reviewCount}
                  price={service.price}
                  image={service.image}
                  iconName={service.iconName}
                  isFavorite={service.isFavorite}
                  onPress={() => handleServicePress(service.title)}
                  onFavoritePress={() => handleFavoritePress(service.title)}
                />
              ))}
            </>
          ) : (
            <>
              <CustomView margin>
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                  Contactos Disponibles ({contactServices.length})
                </Text>
              </CustomView>
              {contactServices.map((service) => (
                <ServiceListItem
                  key={service.id}
                  title={service.title}
                  category={service.category}
                  providerName={service.providerName}
                  location={service.location}
                  rating={service.rating}
                  reviewCount={service.reviewCount}
                  price={service.price}
                  image={service.image}
                  iconName={service.iconName}
                  isFavorite={service.isFavorite}
                  phone={service.phone}
                  showPhone={true}
                  onPress={() => handleServicePress(service.title)}
                  onFavoritePress={() => handleFavoritePress(service.title)}
                  onPhonePress={() => handlePhonePress(service.phone!)}
                />
              ))}
            </>
          )}
        </CustomView>

        {/* Espacio adicional al final */}
        <CustomView className="h-20" />
      </ScrollView>
    </CustomView>
  );
}
