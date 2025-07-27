// client/tabs/servicio/index.tsx
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import CustomText from "../../../../components/CustomText";
import CustomView from "../../../../components/CustomView";
import { PressableButton } from "../../../../components/PressableButton";

// Importar los componentes de pasos
import AvailabilityStep from "../../../../components/servicio/AvailabilityStep";
import CategoryStep from "../../../../components/servicio/CategoryStep";
import LocationStep from "../../../../components/servicio/LocationStep";
import PriceDescriptionStep from "../../../../components/servicio/PriceDescriptionStep";
import SummaryStep from "../../../../components/servicio/SummaryStep";

// Tipos
import { FormErrors, ServiceData } from "../../../../types/FormTypes";

// Configuración de pasos
import CustomCard from "@/components/CustomCard";
import { STEPS_CONFIG } from "../../../../config/StepsConfig";

export default function ServicioTab() {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceData>({
    servicioId: "",
    selectedCategory: "",
    precioPersonalizado: 0,
    descripcionPersonalizada: "",
    disponibilidad: {
      diasSemana: [],
      horaInicio: "09:00",
      horaFin: "18:00",
    },
    ubicacion: {
      ciudad: "",
      direccion: "",
      modalidad: "",
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateCurrentStep = (): boolean => {
    const stepConfig = STEPS_CONFIG.find((step) => step.id === currentStep);
    if (!stepConfig?.validation) return true;

    const stepErrors = stepConfig.validation(serviceData);
    setErrors((prev) => ({ ...prev, ...stepErrors }));

    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < STEPS_CONFIG.length) {
      setCurrentStep(currentStep + 1);
      setErrors({}); // Limpiar errores al avanzar
    } else {
      handleFinalize();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Limpiar errores al retroceder
    }
  };

  const handleFinalize = () => {
    Alert.alert(
      "¡Servicio Creado!",
      "Tu servicio ha sido registrado exitosamente.",
      [
        {
          text: "OK",
          onPress: () => console.log("Servicio finalizado", serviceData),
        },
      ]
    );
  };

  const updateServiceData = (updates: Partial<ServiceData>) => {
    setServiceData((prev) => ({ ...prev, ...updates }));
    // Limpiar errores relacionados cuando se actualiza la data
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach((key) => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  const renderStepContent = () => {
    const stepProps = {
      serviceData,
      updateServiceData,
      errors,
    };

    switch (currentStep) {
      case 1:
        return <CategoryStep {...stepProps} />;
      case 2:
        return <PriceDescriptionStep {...stepProps} />;
      case 3:
        return <AvailabilityStep {...stepProps} />;
      case 4:
        return <LocationStep {...stepProps} />;
      case 5:
        return <SummaryStep {...stepProps} />;
      default:
        return <CategoryStep {...stepProps} />;
    }
  };

  const currentStepConfig = STEPS_CONFIG.find(
    (step) => step.id === currentStep
  );

  return (
    <CustomView margin className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Header con indicador de progreso */}
        <CustomView className="bg-blue-600 pt-12 pb-6 px-4">
          <CustomText className="text-white text-center text-xl font-bold mb-2">
            {currentStepConfig?.title}
          </CustomText>
          <CustomText className="text-blue-100 text-center text-sm mb-4">
            Paso {currentStep} de {STEPS_CONFIG.length}
          </CustomText>
          <CustomView className="flex-row space-x-2">
            {STEPS_CONFIG.map((step) => (
              <CustomView
                key={step.id}
                className={`flex-1 h-2 rounded-full ${
                  step.id <= currentStep ? "bg-white" : "bg-blue-400"
                }`}
              />
            ))}
          </CustomView>
        </CustomView>

        {/* Contenido del paso actual */}
        <CustomCard>
        { renderStepContent()}
        </CustomCard>

        {/* Botones de navegación */}
        <CustomView className="p-4 bg-white border-t border-gray-200">
          <CustomView className="flex-row space-x-3">
            {currentStep > 1 && (
              <PressableButton
                title="Anterior"
                onPress={handleBack}
                className="flex-1 bg-gray-500"
                textClassName="text-white font-semibold text-base"
              />
            )}

            <PressableButton
              title={
                currentStep === STEPS_CONFIG.length ? "Finalizar" : "Siguiente"
              }
              onPress={handleNext}
              className={`flex-1 ${
                currentStep === STEPS_CONFIG.length
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
              textClassName="text-white font-semibold text-base"
            />
          </CustomView>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
}
