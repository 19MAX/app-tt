import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

// Importar los componentes
import CategoryCard from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import ServiceListItem from "@/components/ServiceListItem";

// Importar tipos
import { Category } from "@/types";

const InicioTab: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Datos de ejemplo con tipado
  const categories: Category[] = [
    {
      id: 1,
      title: "Limpieza",
      iconName: "brush-outline",
      backgroundColor: "bg-pink-50",
      iconColor: "#EC4899",
    },
    {
      id: 2,
      title: "Electricidad",
      iconName: "flash-outline",
      backgroundColor: "bg-yellow-50",
      iconColor: "#F59E0B",
    },
    {
      id: 3,
      title: "Jardinería",
      iconName: "leaf-outline",
      backgroundColor: "bg-green-50",
      iconColor: "#10B981",
    },
    {
      id: 4,
      title: "Fontanería",
      iconName: "water-outline",
      backgroundColor: "bg-blue-50",
      iconColor: "#3B82F6",
    },
  ];

  // Datos para las cards destacadas (con estructura compatible con ServiceCard)
  const featuredServices = [
    {
      id: "1",
      title: "Reparación de electrodomésticos profesional",
      description:
        "Servicio completo de reparación de lavadoras, refrigeradoras, microondas y más electrodomésticos del hogar",
      providerName: "Juan Pérez",
      location: "Norte de Quito",
      rating: 4.8,
      reviewCount: 127,
      price: 25,
      category: "Electrodomésticos",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      isFavorite: false,
      iconName: "build-outline" as const,
    },
    {
      id: "2",
      title: "Plomería y fontanería",
      description:
        "Instalación y reparación de tuberías, grifos, inodoros y sistemas de agua",
      providerName: "María González",
      location: "Centro Histórico",
      rating: 4.9,
      reviewCount: 89,
      price: 20,
      category: "Plomería",
      isFavorite: true,
      iconName: "water-outline" as const,
    },
    {
      id: "3",
      title: "Carpintería y mueblería",
      description:
        "Fabricación de muebles a medida, reparación de puertas, ventanas y trabajos en madera",
      providerName: "Carlos Ruiz",
      location: "Sur de Quito",
      rating: 4.7,
      reviewCount: 156,
      price: 30,
      category: "Carpintería",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
      isFavorite: false,
      iconName: "hammer-outline" as const,
    },
    {
      id: "4",
      title: "Jardinería y paisajismo",
      description:
        "Diseño de jardines, poda de árboles, mantenimiento de áreas verdes y paisajismo",
      providerName: "Ana Martínez",
      location: "Cumbayá",
      rating: 4.6,
      reviewCount: 73,
      price: 18,
      category: "Jardinería",
      isFavorite: false,
      iconName: "leaf-outline" as const,
    },
  ];

  // Datos actualizados para ServiceListItem con imágenes
  const allServices = [
    {
      id: 1,
      title: "Limpieza profunda de hogar y oficinas",
      category: "Limpieza",
      providerName: "Sofía Pérez",
      location: "Valencia, Norte de Quito",
      rating: 4.9,
      reviewCount: 32,
      price: 25,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
      iconName: "brush-outline" as const,
    },
    {
      id: 2,
      title: "Instalación eléctrica residencial completa",
      category: "Electricidad",
      providerName: "Carlos Rodríguez",
      location: "Madrid Centro, Quito",
      rating: 4.8,
      reviewCount: 25,
      price: 45,
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a4315?w=400",
      iconName: "flash-outline" as const,
    },
    {
      id: 3,
      title: "Reparación de computadoras y laptops",
      category: "Tecnología",
      providerName: "Luis Morales",
      location: "La Carolina, Quito",
      rating: 4.7,
      reviewCount: 89,
      price: 35,
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      iconName: "desktop-outline" as const,
    },
    {
      id: 4,
      title: "Diseño y construcción de jardines",
      category: "Jardinería",
      providerName: "Patricia Vega",
      location: "Tumbaco, Valle de los Chillos",
      rating: 4.6,
      reviewCount: 156,
      price: 22,
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      iconName: "leaf-outline" as const,
    },
    {
      id: 5,
      title: "Pintura interior y exterior de casas",
      category: "Pintura",
      providerName: "Miguel Torres",
      location: "Sur de Quito",
      rating: 4.5,
      reviewCount: 67,
      price: 18,
      iconName: "color-palette-outline" as const,
    },
  ];

  const handleSearchPress = (): void => {
    router.push("/client/tabs/buscar");
  };

  const handleFavoritePress = (serviceId: string): void => {
    const numericId = parseInt(serviceId);
    setFavorites((prev) =>
      prev.includes(numericId)
        ? prev.filter((id) => id !== numericId)
        : [...prev, numericId]
    );
  };

  const handleServiceListFavoritePress = (serviceId: number): void => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleServicePress = (serviceId: string): void => {
    router.push(`/client/tabs/servicio/ ${serviceId}`);
  };

  const handleServiceListPress = (serviceId: number): void => {
    router.push(`/client/tabs/servicio/${serviceId}`);
  };

  const handleCategoryPress = (category: Category): void => {
    router.push(`/client/tabs/categorias/${category.id}`);
  };

  const handleSeeAllCategories = (): void => {
    router.push("/client/tabs/categorias");
  };

  const handleSeeAllFeatured = (): void => {
    router.push("/client/tabs/servicio/featured-services");
  };

  // Función para renderizar cada item de la lista
  const renderServiceItem = ({ item }: { item: (typeof allServices)[0] }) => (
    <ServiceListItem
      key={item.id}
      title={item.title}
      category={item.category}
      providerName={item.providerName}
      location={item.location}
      rating={item.rating}
      reviewCount={item.reviewCount}
      price={item.price}
      image={item.image}
      iconName={item.iconName}
      isFavorite={favorites.includes(item.id)}
      onPress={() => handleServiceListPress(item.id)}
      onFavoritePress={() => handleServiceListFavoritePress(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Buscador */}
        <SearchBar
          placeholder="Buscar servicios..."
          onPress={handleSearchPress}
          editable={false}
        />

        {/* Sección de categorías */}
        <SectionHeader
          title="Categorías"
          iconName="grid-outline"
          showSeeAll={true}
          onSeeAllPress={handleSeeAllCategories}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2 mb-6"
        >
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              iconName={category.iconName}
              backgroundColor={category.backgroundColor}
              iconColor={category.iconColor}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </ScrollView>

        {/* Servicios destacados usando ServiceCard */}
        <SectionHeader
          title="Mejor valorados"
          iconName="trending-up-outline"
          showSeeAll={true}
          onSeeAllPress={handleSeeAllFeatured}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-6"
        >
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              providerName={service.providerName}
              location={service.location}
              rating={service.rating}
              reviewCount={service.reviewCount}
              price={service.price}
              image={service.image}
              category={service.category}
              isFavorite={favorites.includes(parseInt(service.id))}
              onPress={() => handleServicePress(service.id)}
              onFavoritePress={() => handleFavoritePress(service.id)}
              iconName={service.iconName}
            />
          ))}
        </ScrollView>

        {/* Todos los servicios */}
        <SectionHeader title="Todos los servicios" iconName="list-outline" />

        {/* Lista de todos los servicios usando FlatList */}
        <FlatList
          data={allServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable FlatList scroll since it's inside ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </View>
  );
};

export default InicioTab;
