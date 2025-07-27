import React from "react";
import { ScrollView } from "react-native";
import { StepProps } from "../../types/FormTypes";
import CustomText from "../CustomText";
import CustomView from "../CustomView";
import { Input } from "../Input";

export default function PriceDescriptionStep({ serviceData, updateServiceData, errors }: StepProps) {
  return (
    <CustomView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CustomView className="p-6">
          <CustomText className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Precio y descripción
          </CustomText>
          <CustomText className="text-gray-600 text-center mb-8">
            Define el costo y describe tu servicio
          </CustomText>
          
          <CustomView className="space-y-6">
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Precio por hora ($)</CustomText>
              <Input
                placeholder="Ej: 120"
                keyboardType="numeric"
                value={serviceData.precioPersonalizado > 0 ? serviceData.precioPersonalizado.toString() : ""}
                onChangeText={(text: string) => updateServiceData({
                  precioPersonalizado: parseInt(text) || 0
                })}
              />
              {errors.precioPersonalizado && (
                <CustomText className="text-red-600 text-sm mt-2">{errors.precioPersonalizado}</CustomText>
              )}
            </CustomView>
            
            <CustomView>
              <CustomText className="text-lg font-semibold mb-3 text-gray-800">Descripción de tu servicio</CustomText>
              <Input
                placeholder="Describe tu experiencia y lo que ofreces... (mínimo 20 caracteres)"
                multiline
                numberOfLines={4}
                value={serviceData.descripcionPersonalizada}
                onChangeText={(text: string) => updateServiceData({
                  descripcionPersonalizada: text
                })}
              />
              <CustomText className="text-gray-500 text-sm mt-2">
                {serviceData.descripcionPersonalizada.length}/20 caracteres mínimo
              </CustomText>
              {errors.descripcionPersonalizada && (
                <CustomText className="text-red-600 text-sm mt-2">{errors.descripcionPersonalizada}</CustomText>
              )}
            </CustomView>
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}