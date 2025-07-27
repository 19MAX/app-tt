import { Alert, ScrollView, Text } from "react-native";
import CategoryCard from "../../../../components/CategoryCard";
import CustomView from "../../../../components/CustomView";
import SearchBar from "../../../../components/SearchBar";

export default function BuscarTab() {
  const handleSearch = () => {
    Alert.alert(
      "Funcionalidad en construcción",
      "La búsqueda estará disponible próximamente"
    );
  };

  const handleCategoryPress = (categoryName: string) => {
    Alert.alert("Categoría seleccionada", `Has seleccionado: ${categoryName}`);
  };

  const handleServicePress = (serviceName: string) => {
    Alert.alert("Servicio seleccionado", `Has seleccionado: ${serviceName}`);
  };

  const handleFavoritePress = (serviceName: string) => {
    Alert.alert("Favorito", `Has marcado como favorito: ${serviceName}`);
  };

  // Datos de ejemplo para categorías
  const categories = [
    {
      title: "Plomería",
      iconName: "water-outline" as const,
      color: "bg-blue-50",
      iconColor: "#3B82F6",
    },
    {
      title: "Electricidad",
      iconName: "flash-outline" as const,
      color: "bg-yellow-50",
      iconColor: "#F59E0B",
    },
    {
      title: "Limpieza",
      iconName: "sparkles-outline" as const,
      color: "bg-green-50",
      iconColor: "#10B981",
    },
    {
      title: "Jardinería",
      iconName: "leaf-outline" as const,
      color: "bg-emerald-50",
      iconColor: "#059669",
    },
    {
      title: "Pintura",
      iconName: "color-palette-outline" as const,
      color: "bg-purple-50",
      iconColor: "#8B5CF6",
    },
    {
      title: "Carpintería",
      iconName: "hammer-outline" as const,
      color: "bg-orange-50",
      iconColor: "#F97316",
    },
  ];

  // Datos de ejemplo para servicios
  const services = [
    {
      id: 1,
      title: "Reparación de tuberías",
      description:
        "Servicio profesional de plomería para reparar fugas y problemas de tuberías",
      providerName: "Plomeros Express",
      location: "Santo Domingo Este",
      rating: 4.8,
      reviewCount: 127,
      price: 25,
      category: "Plomería",
      image: undefined,
      iconName: "water-outline" as const,
    },
    {
      id: 2,
      title: "Instalación eléctrica residencial",
      description:
        "Instalación y mantenimiento de sistemas eléctricos para hogares",
      providerName: "ElectroPro",
      location: "Santo Domingo Oeste",
      rating: 4.9,
      reviewCount: 89,
      price: 35,
      category: "Electricidad",
      image: undefined,
      iconName: "flash-outline" as const,
    },
    {
      id: 3,
      title: "Limpieza de hogar",
      description: "Servicio completo de limpieza para casas y apartamentos",
      providerName: "CleanHouse",
      location: "Santo Domingo Norte",
      rating: 4.7,
      reviewCount: 203,
      price: 20,
      category: "Limpieza",
      image: undefined,
      iconName: "sparkles-outline" as const,
    },
    {
      id: 4,
      title: "Mantenimiento de jardín",
      description:
        "Cuidado y mantenimiento profesional de jardines y áreas verdes",
      providerName: "GardenCare",
      location: "Santo Domingo Este",
      rating: 4.6,
      reviewCount: 156,
      price: 30,
      category: "Jardinería",
      image: undefined,
      iconName: "leaf-outline" as const,
    },
  ];

  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <CustomView margin>
          <SearchBar
            placeholder="Buscar servicios..."
            onPress={handleSearch}
            editable={false}
          />
        </CustomView>

        {/* Categorías */}
        <CustomView margin>
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Categorías
          </Text>

          {/* Primera fila de categorías */}
          <CustomView className="flex-row justify-between mb-2">
            {categories.slice(0, 2).map((category, index) => (
              <CustomView key={index} className="flex-1">
                <CategoryCard
                  title={category.title}
                  iconName={category.iconName}
                  onPress={() => handleCategoryPress(category.title)}
                  backgroundColor={category.color}
                  iconColor={category.iconColor}
                />
              </CustomView>
            ))}
          </CustomView>

          {/* Segunda fila de categorías */}
          <CustomView className="flex-row justify-between mb-2">
            {categories.slice(2, 4).map((category, index) => (
              <CustomView key={index + 2} className="flex-1">
                <CategoryCard
                  title={category.title}
                  iconName={category.iconName}
                  onPress={() => handleCategoryPress(category.title)}
                  backgroundColor={category.color}
                  iconColor={category.iconColor}
                />
              </CustomView>
            ))}
          </CustomView>

          {/* Tercera fila de categorías */}
          <CustomView className="flex-row justify-between mb-6">
            {categories.slice(4, 6).map((category, index) => (
              <CustomView key={index + 4} className="flex-1">
                <CategoryCard
                  title={category.title}
                  iconName={category.iconName}
                  onPress={() => handleCategoryPress(category.title)}
                  backgroundColor={category.color}
                  iconColor={category.iconColor}
                />
              </CustomView>
            ))}
          </CustomView>
        </CustomView>

        {/* Espacio adicional al final */}
        <CustomView className="h-20" />
      </ScrollView>
    </CustomView>
  );
}
