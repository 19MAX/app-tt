import CustomCard from "@/components/CustomCard";
import CustomText from "@/components/CustomText";
import CustomView from "@/components/CustomView";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";

const PublicarScreen = () => {
  return (
    <CustomView margin className="mt-3">
      {/* Card para Publicar Oferta */}
      <CustomCard className="my-4 p-4">
        <Link href="/client/modal/ofertas" className="flex-row items-center">
          <CustomView className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="add-circle" size={28} color="#3B82F6" />
          </CustomView>

          <CustomView flex className="flex-1">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={1}
              className="mb-1"
            >
              Publicar Oferta
            </CustomText>
            <CustomText variant="small" color="secondary" numberOfLines={2}>
              Comparte tu talento y servicios con la comunidad
            </CustomText>
          </CustomView>

          <CustomView className="ml-2">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </CustomView>
        </Link>
      </CustomCard>

      {/* Card para Comprar Créditos */}
      <CustomCard className="my-4 p-4">
        <Link href="/client/modal/creditos" className="flex-row items-center">
          <CustomView className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="card" size={28} color="#10B981" />
          </CustomView>

          <CustomView flex className="flex-1">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={1}
              className="mb-1"
            >
              Comprar Créditos
            </CustomText>
            <CustomText variant="small" color="secondary" numberOfLines={2}>
              Adquiere créditos para destacar tus servicios
            </CustomText>
          </CustomView>

          <CustomView className="ml-2">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </CustomView>
        </Link>
      </CustomCard>
      {/* Card para Ver Mis Ofertas */}
      <CustomCard className="my-4 p-4">
        <Link href="/" className="flex-row items-center">
          <CustomView className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="list" size={28} color="#8B5CF6" />
          </CustomView>
          <CustomView flex className="flex-1">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={1}
              className="mb-1"
            >
              Mis Ofertas
            </CustomText>
            <CustomText variant="small" color="secondary" numberOfLines={2}>
              Revisa y gestiona tus ofertas publicadas
            </CustomText>
          </CustomView>
          <CustomView className="ml-2">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </CustomView>
        </Link>
      </CustomCard>
      {/* Solicitar servicio */}
      <CustomCard className="my-4 p-4">
        <Link href="/" className="flex-row items-center">
          <CustomView className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="list" size={28} color="#8B5CF6" />
          </CustomView>
          <CustomView flex className="flex-1">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={1}
              className="mb-1"
            >
              Solicitar Servicio
            </CustomText>
            <CustomText variant="small" color="secondary" numberOfLines={2}>
              Solicita un servicio que no este en el catalogo
            </CustomText>
          </CustomView>
          <CustomView className="ml-2">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </CustomView>
        </Link>
      </CustomCard>
      {/* Ver mis solicitudes de servicios */}
      <CustomCard className="my-4 p-4">
        <Link href="/" className="flex-row items-center">
          <CustomView className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="list" size={28} color="#8B5CF6" />
          </CustomView>
          <CustomView flex className="flex-1">
            <CustomText
              variant="h4"
              weight="bold"
              color="primary"
              numberOfLines={1}
              className="mb-1"
            >
              Ver mis solicitudes de servicios
            </CustomText>
            <CustomText variant="small" color="secondary" numberOfLines={2}>
              Mira el estado de tus solicitudes de servicios
            </CustomText>
          </CustomView>
          <CustomView className="ml-2">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </CustomView>
        </Link>
      </CustomCard>
    </CustomView>
  );
};

export default PublicarScreen;