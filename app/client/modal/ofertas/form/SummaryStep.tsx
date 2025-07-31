import CustomText from "@/components/CustomText";
import CustomView from "@/components/CustomView";
import { StepProps } from "@/types/servicios/FormTypes";
import { ScrollView } from "react-native";

export default function SummaryStep({ serviceData }: StepProps) {
  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CustomView className="p-6">
          <CustomText className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Resumen y finalización
          </CustomText>
          <CustomText className="text-gray-600 text-center mb-8">
            Revisa la información de tu servicio
          </CustomText>

          <CustomView className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <CustomView>
              <CustomText className="text-lg font-semibold text-gray-800 mb-2">
                Categoría seleccionada:
              </CustomText>
              <CustomText className="text-gray-700 text-base">
                {serviceData.selectedCategory}
              </CustomText>
            </CustomView>

            <CustomView>
              <CustomText className="text-lg font-semibold text-gray-800 mb-2">
                Precio por hora:
              </CustomText>
              <CustomText className="text-gray-700 text-base">
                ${serviceData.precioPersonalizado}
              </CustomText>
            </CustomView>

            <CustomView>
              <CustomText className="text-lg font-semibold text-gray-800 mb-2">
                Descripción:
              </CustomText>
              <CustomText className="text-gray-700 text-base">
                {serviceData.descripcionPersonalizada}
              </CustomText>
            </CustomView>

            <CustomView>
              <CustomText className="text-lg font-semibold text-gray-800 mb-2">
                Disponibilidad:
              </CustomText>
              <CustomText className="text-gray-700 text-base">
                {serviceData.disponibilidad.diasSemana.join(", ")} de{" "}
                {serviceData.disponibilidad.horaInicio} a{" "}
                {serviceData.disponibilidad.horaFin}
              </CustomText>
            </CustomView>

            <CustomView>
              <CustomText className="text-lg font-semibold text-gray-800 mb-2">
                Ubicación:
              </CustomText>
              <CustomText className="text-gray-700 text-base">
                {serviceData.ubicacion.ciudad} -{" "}
                {serviceData.ubicacion.modalidad}
              </CustomText>
              {serviceData.ubicacion.direccion && (
                <CustomText className="text-gray-700 text-base">
                  {serviceData.ubicacion.direccion}
                </CustomText>
              )}
            </CustomView>
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}
