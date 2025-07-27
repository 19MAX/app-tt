import React from "react";
import { ScrollView } from "react-native";
import { StepProps } from "../../types/FormTypes";
import CustomText from "../CustomText";
import CustomView from "../CustomView";
import { Input } from "../Input";
import { PressableButton } from "../PressableButton";

const diasSemana = [
  "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"
];

export default function AvailabilityStep({ serviceData, updateServiceData, errors }: StepProps) {
  const toggleDia = (dia: string) => {
    const nuevaDisponibilidad = {
      ...serviceData.disponibilidad,
      diasSemana: serviceData.disponibilidad.diasSemana.includes(dia)
        ? serviceData.disponibilidad.diasSemana.filter(d => d !== dia)
        : [...serviceData.disponibilidad.diasSemana, dia]
    };
    updateServiceData({ disponibilidad: nuevaDisponibilidad });
  };

  const updateTime = (field: 'horaInicio' | 'horaFin', value: string) => {
    updateServiceData({
      disponibilidad: {
        ...serviceData.disponibilidad,
        [field]: value
      }
    });
  };

  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CustomView className="p-6">
          <CustomText className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Disponibilidad
          </CustomText>
          <CustomText className="text-gray-600 text-center mb-8">
            Define tus horarios de trabajo
          </CustomText>
          
          <CustomView className="space-y-6">
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Días disponibles</CustomText>
              <CustomView className="flex-row flex-wrap gap-2">
                {diasSemana.map((dia) => (
                  <PressableButton
                    key={dia}
                    title={dia}
                    onPress={() => toggleDia(dia)}
                    className={`px-4 py-2 rounded-full border ${
                      serviceData.disponibilidad.diasSemana.includes(dia)
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                    textClassName={`capitalize ${
                      serviceData.disponibilidad.diasSemana.includes(dia)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </CustomView>
              {errors.diasSemana && (
                <CustomText className="text-red-600 text-sm mt-2">{errors.diasSemana}</CustomText>
              )}
            </CustomView>
            
            <CustomView className="flex-row space-x-4">
              <CustomView className="flex-1">
                <CustomText className="text-lg font-semibold mb-3 text-gray-800">Hora inicio</CustomText>
                <Input
                  placeholder="09:00"
                  value={serviceData.disponibilidad.horaInicio}
                  onChangeText={(text: string) => updateTime('horaInicio', text)}
                />
                {errors.horaInicio && (
                  <CustomText className="text-red-600 text-sm mt-2">{errors.horaInicio}</CustomText>
                )}
              </CustomView>
              
              <CustomView className="flex-1">
                <CustomText className="text-lg font-semibold mb-3 text-gray-800">Hora fin</CustomText>
                <Input
                  placeholder="18:00"
                  value={serviceData.disponibilidad.horaFin}
                  onChangeText={(text: string) => updateTime('horaFin', text)}
                />
                {errors.horaFin && (
                  <CustomText className="text-red-600 text-sm mt-2">{errors.horaFin}</CustomText>
                )}
              </CustomView>
            </CustomView>
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}