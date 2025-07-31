import CustomCard from "@/components/CustomCard";
import CustomText from "@/components/CustomText";
import CustomView from "@/components/CustomView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

const CreditosModal = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const creditPackages = [
    {
      id: 1,
      credits: 10,
      price: 5.99,
      popular: false,
      description: "Perfecto para empezar",
    },
    {
      id: 2,
      credits: 25,
      price: 12.99,
      popular: true,
      description: "El más popular",
    },
    {
      id: 3,
      credits: 50,
      price: 22.99,
      popular: false,
      description: "Mejor valor",
    },
    {
      id: 4,
      credits: 100,
      price: 39.99,
      popular: false,
      description: "Para profesionales",
    },
  ];

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackage(packageId);
  };

  const handlePurchase = () => {
    if (selectedPackage) {
      console.log("Comprando paquete:", selectedPackage);
      // Aquí irá la lógica de compra
    }
  };

  return (
    <CustomView flex>
      <ScrollView>
        <CustomView margin className="mt-4">
          {/* Header Info */}
          <CustomCard className="mb-4 p-4">
            <CustomView className="items-center">
              <CustomView className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="diamond" size={32} color="#10B981" />
              </CustomView>
              <CustomText
                variant="h3"
                weight="bold"
                color="primary"
                className="mb-2"
              >
                Comprar Créditos
              </CustomText>
              {/* <CustomText
                variant="body"
                color="secondary"
                className="text-center"
              >
                Adquiere créditos para destacar tus servicios y llegar a más
                clientes
              </CustomText> */}
            </CustomView>
          </CustomCard>

          {/* Paquetes de Créditos */}
          <CustomText variant="h4" weight="semibold" className="mb-4">
            Selecciona un Paquete
          </CustomText>

          {creditPackages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              onPress={() => handleSelectPackage(pkg.id)}
              activeOpacity={0.8}
              className="mb-3"
            >
              <CustomCard
                className={`p-4 ${
                  selectedPackage === pkg.id ? "border-2 border-green-500" : ""
                } ${pkg.popular ? "bg-green-50" : ""}`}
              >
                {pkg.popular && (
                  <CustomView className="absolute -top-2 right-4 bg-green-500 px-3 py-1 rounded-full">
                    <CustomText
                      variant="small"
                      className="text-white font-bold"
                    >
                      Más Popular
                    </CustomText>
                  </CustomView>
                )}

                <CustomView className="flex-row items-center justify-between">
                  <CustomView className="flex-1">
                    <CustomView className="flex-row items-center mb-2">
                      <Ionicons
                        name="diamond-outline"
                        size={24}
                        color="#10B981"
                      />
                      <CustomText variant="h4" weight="bold" className="ml-2">
                        {pkg.credits} Créditos
                      </CustomText>
                    </CustomView>
                    <CustomText variant="small" color="secondary">
                      {pkg.description}
                    </CustomText>
                  </CustomView>

                  <CustomView className="items-end">
                    <CustomText variant="h4" weight="bold" color="primary">
                      ${pkg.price}
                    </CustomText>
                    <CustomText variant="small" color="secondary">
                      ${(pkg.price / pkg.credits).toFixed(2)} por crédito
                    </CustomText>
                  </CustomView>

                  {selectedPackage === pkg.id && (
                    <CustomView className="ml-3">
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#10B981"
                      />
                    </CustomView>
                  )}
                </CustomView>
              </CustomCard>
            </TouchableOpacity>
          ))}

          {/* Información de Uso */}
          <CustomCard className="mb-4 p-4 bg-blue-50">
            <CustomView className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#3B82F6" />
              <CustomView className="flex-1 ml-3">
                <CustomText variant="body" weight="medium" className="mb-2">
                  ¿Cómo usar los créditos?
                </CustomText>
                <CustomText variant="small" color="secondary">
                  • 1 crédito = Destacar servicio por 7 días{"\n"}• 2 créditos =
                  Aparecer en búsquedas principales{"\n"}• 3 créditos =
                  Promoción premium por 30 días
                </CustomText>
              </CustomView>
            </CustomView>
          </CustomCard>

          {/* Botón de Compra */}
          <TouchableOpacity
            onPress={handlePurchase}
            disabled={!selectedPackage}
            className={`p-4 rounded-lg mb-8 ${
              selectedPackage ? "bg-green-500" : "bg-gray-300"
            }`}
            activeOpacity={0.8}
          >
            <CustomView className="flex-row items-center justify-center">
              <Ionicons
                name="card"
                size={24}
                color={selectedPackage ? "white" : "#9CA3AF"}
              />
              <CustomText
                variant="body"
                weight="bold"
                className={`ml-2 ${selectedPackage ? "text-white" : "text-gray-500"}`}
              >
                {selectedPackage ? "Comprar Ahora" : "Selecciona un Paquete"}
              </CustomText>
            </CustomView>
          </TouchableOpacity>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default CreditosModal;
