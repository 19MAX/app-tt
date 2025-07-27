import React from "react";
import { ScrollView } from "react-native";
import { StepProps } from "../../types/FormTypes";
import CategoryCard from "../CategoryCard";
import CustomText from "../CustomText";
import CustomView from "../CustomView";

const CATEGORIES = [
  { title: "Desarrollo Web", iconName: "code-slash" as const },
  { title: "Diseño Gráfico", iconName: "brush" as const },
  { title: "Marketing Digital", iconName: "trending-up" as const },
  { title: "Consultoría", iconName: "people" as const },
  { title: "Enseñanza", iconName: "school" as const },
  { title: "Fotografía", iconName: "camera" as const },
  { title: "Redacción", iconName: "create" as const },
  { title: "Traducción", iconName: "language" as const },
];

export default function CategoryStep({
  serviceData,
  updateServiceData,
  errors,
}: StepProps) {
  const handleCategorySelect = (category: string) => {
    updateServiceData({ selectedCategory: category });
  };

  // Función para crear filas de 2 categorías
  const createCategoryRows = () => {
    const rows = [];
    for (let i = 0; i < CATEGORIES.length; i += 2) {
      const rowCategories = CATEGORIES.slice(i, i + 2);
      rows.push(
        <CustomView key={i} className="flex-row justify-between mb-4">
          {rowCategories.map((category, index) => (
            <CustomView key={`${i}-${index}`} className="flex-1 mx-1">
              <CategoryCard
                title={category.title}
                iconName={category.iconName}
                onPress={() => handleCategorySelect(category.title)}
                backgroundColor={
                  serviceData.selectedCategory === category.title
                    ? "bg-blue-100 border-blue-300"
                    : "bg-white border-gray-200"
                }
                iconColor={
                  serviceData.selectedCategory === category.title
                    ? "#1D4ED8"
                    : "#6B7280"
                }
              />
            </CustomView>
          ))}
          {/* Si la fila tiene solo una categoría, añadir un espacio vacío */}
          {rowCategories.length === 1 && (
            <CustomView className="flex-1 mx-1" />
          )}
        </CustomView>
      );
    }
    return rows;
  };

  return (
    <CustomView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CustomView className="p-6">
          <CustomText className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Selecciona tu categoría
          </CustomText>
          <CustomText className="text-gray-600 text-center mb-8">
            Elige el tipo de servicio que ofreces
          </CustomText>

          {errors.selectedCategory && (
            <CustomView className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
              <CustomText className="text-red-600 text-center">
                {errors.selectedCategory}
              </CustomText>
            </CustomView>
          )}

          {/* Renderizar todas las categorías en filas de 2 */}
          {createCategoryRows()}
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}