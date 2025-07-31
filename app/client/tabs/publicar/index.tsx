import ActionCard from "@/components/ActionCards";
import CustomView from "@/components/CustomView";
import { Href } from "expo-router";
import React from "react";

const PublicarScreen = () => {
  const actionItems = [
    {
      href: "/client/modal/ofertas" as Href,
      iconName: "add-circle" as const,
      iconColor: "#3B82F6",
      iconBackgroundColor: "bg-blue-100",
      title: "Publicar Oferta",
      description: "Comparte tu talento con la comunidad",
    },
    {
      href: "/client/modal/creditos" as Href,
      iconName: "card" as const,
      iconColor: "#10B981",
      iconBackgroundColor: "bg-green-100",
      title: "Comprar Créditos",
      description: "Adquiere créditos para ver ofertas",
    },
    {
      href: "/client/historial-ofertas" as Href,
      iconName: "list" as const,
      iconColor: "#8B5CF6",
      iconBackgroundColor: "bg-purple-100",
      title: "Mis Ofertas",
      description: "Revisa y gestiona tus ofertas publicadas",
    },
    {
      href: "/client/solicitar-servicio" as Href,
      iconName: "search" as const,
      iconColor: "#F59E0B",
      iconBackgroundColor: "bg-amber-100",
      title: "Solicitar Servicio",
      description: "Solicita un servicio que no esté en el catálogo",
    },
    {
      href: "/client/mis-solicitudes" as Href,
      iconName: "document-text" as const,
      iconColor: "#EF4444",
      iconBackgroundColor: "bg-red-100",
      title: "Mis Solicitudes",
      description: "Mira el estado de tus solicitudes de servicios",
    },
  ];

  return (
    <CustomView margin className="mt-3 pb-6">
      {actionItems.map((item, index) => (
        <ActionCard
          key={index}
          href={item.href}
          iconName={item.iconName}
          iconColor={item.iconColor}
          iconBackgroundColor={item.iconBackgroundColor}
          title={item.title}
          description={item.description}
        />
      ))}
    </CustomView>
  );
};

export default PublicarScreen;