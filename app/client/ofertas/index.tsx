import CustomView from "@/components/CustomView";
import OfertasCustom from "@/components/OfertasCustom";
import { MiOfertaResumen } from "@/types/ofertas/ofertas";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

const MisOfertas = () => {
  const ofertas: MiOfertaResumen[] = [
    {
      id: "1",
      servicioId: "serv1",
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
  const renderOferta = ({ item }: { item: MiOfertaResumen }) => (
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
    <CustomView className="mt-4">
      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id}
        renderItem={renderOferta}
        contentContainerStyle={{ paddingBottom: 40 }} // espacio al final
        showsVerticalScrollIndicator={true}
      />
    </CustomView>
  );
};

export default MisOfertas;
