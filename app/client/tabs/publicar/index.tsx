import ActionCard from "@/components/ActionCard";
import CustomView from "@/components/CustomView";
import { routes } from "@/constants/routes";
import { ScrollView } from "react-native";

const PublicarScreen = () => {
  return (
    <ScrollView>
      <CustomView margin className="mt-3">
        {/* Publicar Oferta */}
        <ActionCard
          href={routes.client.modal.ofertas}
          title="Publicar Oferta"
          description="Comparte tu talento y servicios con la comunidad"
          iconName="add-circle"
        />

        {/* Comprar Créditos */}
        <ActionCard
          href={routes.client.modal.creditos}
          title="Comprar Créditos"
          description="Adquiere créditos y mira la información de tus ofertas"
          iconName="card"
        />

        {/* Mis Ofertas */}
        <ActionCard
          href={routes.client.ofertas.index}
          title="Mis Ofertas"
          description="Revisa y gestiona tus ofertas publicadas en el catálogo"
          iconName="list"
        />

        {/* Solicitar Servicio */}
        <ActionCard
          href="/"
          title="Solicitar Servicio"
          description="Solicita un servicio que no esté en el catálogo"
          iconName="construct"
        />

        {/* Ver mis solicitudes de servicios */}
        <ActionCard
          href="/"
          title="Ver mis solicitudes de servicios"
          description="Mira el estado de tus solicitudes de servicios"
          iconName="document-text"
        />
      </CustomView>
    </ScrollView>
  );
};

export default PublicarScreen;