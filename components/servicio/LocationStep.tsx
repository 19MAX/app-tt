import React from "react";
import { ScrollView } from "react-native";
import { StepProps } from "../../types/FormTypes";
import CustomText from "../CustomText";
import CustomView from "../CustomView";
import { Input } from "../Input";
import { PressableButton } from "../PressableButton";

const modalidades = ["presencial", "virtual", "ambas"];

export default function LocationStep({ serviceData, updateServiceData, errors }: StepProps) {
  const updateLocation = (field: keyof typeof serviceData.ubicacion, value: string) => {
    updateServiceData({
      ubicacion: {
        ...serviceData.ubicacion,
        [field]: value
      }
    });
  };

  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CustomView className="p-6">
          <CustomText className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Ubicación y modalidad
          </CustomText>
          <CustomText className="text-gray-600 text-center mb-8">
            Define dónde y cómo ofreces tu servicio
          </CustomText>
          
          <CustomView className="space-y-6">
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Ciudad *</CustomText>
              <Input
                placeholder="Ej: Madrid"
                value={serviceData.ubicacion.ciudad}
                onChangeText={(text: string) => updateLocation('ciudad', text)}
              />
              {errors.ciudad && (
                <CustomText className="text-red-600 text-sm mt-2">{errors.ciudad}</CustomText>
              )}
            </CustomView>
            
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Dirección (opcional)</CustomText>
              <Input
                placeholder="Ej: Calle Principal 123"
                value={serviceData.ubicacion.direccion}
                onChangeText={(text: string) => updateLocation('direccion', text)}
              />
            </CustomView>
            
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Modalidad</CustomText>
              <CustomView className="space-y-3">
                {modalidades.map((modalidad) => (
                  <PressableButton
                    key={modalidad}
                    title={modalidad}
                    onPress={() => updateLocation('modalidad', modalidad)}
                    className={`p-4 rounded-lg border-2 ${
                      serviceData.ubicacion.modalidad === modalidad
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white"
                    }`}
                    textClassName={`capitalize ${
                      serviceData.ubicacion.modalidad === modalidad
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </CustomView>
              {errors.modalidad && (
                <CustomText className="text-red-600 text-sm mt-2">{errors.modalidad}</CustomText>
              )}
            </CustomView>
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}
