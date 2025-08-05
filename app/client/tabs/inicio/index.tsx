import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

// Importar los componentes
import OfertasCustom from "@/components/OfertasCustom";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { MiOfertaResumen, OfertaPublica } from "@/types/ofertas/ofertas";

const InicioTab = () => {
  const router = useRouter();
  // const [searchText, setSearchText] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);

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

  const ofertas: (MiOfertaResumen | OfertaPublica)[] = [
    {
      id: "1",
      servicioId: "serv1",
      usuarioId: "user1",
      usuario: {
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "123456789",
        valoracion: 4.5,
        numeroValoraciones: 20,
      },
      titulo: "Clases de Matemáticas",
      imagen: "https://via.placeholder.com/150",
      precioPersonalizado: 15,
      descripcionPersonalizada: "Aprende matemáticas desde cero",
      disponibilidad: {
        diasSemana: ["Lunes", "Miércoles"],
        horaInicio: "09:00",
        horaFin: "12:00",
      },
      ubicacion: {
        ciudad: "Ciudad de México",
        modalidad: "presencial",
      },
      estado: "activa",
      fechaCreacion: "2025-08-01",
      servicio: {
        titulo: "Educación",
        categoria: "clases",
      },
    },
    {
      id: "2",
      servicioId: "serv2",
      usuarioId: "user2",
      usuario: {
        nombre: "Ana",
        apellido: "García",
        telefono: "987654321",
        valoracion: 4.8,
        numeroValoraciones: 35,
      },
      titulo: "Clases de Inglés Online",
      imagen: "",
      precioPersonalizado: 20,
      descripcionPersonalizada: "Clases para todos los niveles",
      disponibilidad: {
        diasSemana: ["Martes", "Jueves"],
        horaInicio: "14:00",
        horaFin: "17:00",
      },
      ubicacion: {
        ciudad: "Buenos Aires",
        modalidad: "virtual",
      },
      estado: "activa",
      fechaCreacion: "2025-08-03",
      servicio: {
        titulo: "Idiomas",
        categoria: "clases",
      },
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

  const handleServicePress = (serviceId: string): void => {
    // router.push(`/client/tabs/servicio/ ${serviceId}`);
  };

  const handleSeeAllFeatured = (): void => {
    // router.push("/client/tabs/servicio/featured-services");
  };

  const renderOferta = ({
    item,
  }: {
    item: MiOfertaResumen | OfertaPublica;
  }) => (
    <OfertasCustom
      oferta={item}
      isPublica={true}
      isFavorite={false}
      showPhone={true}
      onPress={() => console.log("Oferta seleccionada", item.id)}
      onFavoritePress={() => console.log("Favorito toggle", item.id)}
      onPhonePress={() => console.log("Llamar a", item.usuario.telefono)}
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id}
        renderItem={renderOferta}
        ListHeaderComponent={
          <>
            {/* Buscador */}
            <SearchBar
              placeholder="Buscar servicios..."
              onPress={handleSearchPress}
              editable={false}
            />

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

            {/* Título de la sección de ofertas */}
            <SectionHeader title="Todas las ofertas" iconName="list-outline" />
          </>
        }
        contentContainerStyle={{ paddingBottom: 40 }} // espacio al final
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default InicioTab;
