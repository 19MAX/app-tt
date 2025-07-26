import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { PressableButton } from "./PressableButton";

interface GenderPickerProps {
  value?: string;
  onChange: (gender: string) => void;
  placeholder?: string;
  className?: string;
  textClassName?: string;
  options?: string[];
}

const genderConfig = {
  MASCULINO: {
    icon: "male" as const,
    color: "#3B82F6",
    label: "Masculino",
  },
  FEMENINO: {
    icon: "female" as const,
    color: "#EC4899",
    label: "Femenino",
  },
  OTRO: {
    icon: "person" as const,
    color: "#8B5CF6",
    label: "Otro",
  },
};

export function GenderPicker({
  value,
  onChange,
  placeholder = "Seleccionar Género",
  className = "",
  textClassName = "",
  options = ["MASCULINO", "FEMENINO", "OTRO"],
}: GenderPickerProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleGenderSelect = (gender: string) => {
    onChange(gender);
    setShowOptions(false);
  };

  const getSelectedGenderInfo = () => {
    if (!value) return null;
    return genderConfig[value as keyof typeof genderConfig];
  };

  const selectedGender = getSelectedGenderInfo();

  return (
    <View className="space-y-2 mb-3">
      <PressableButton
        title={
          selectedGender ? (
            <View className="flex-row items-center space-x-2">
              <Ionicons
                name={selectedGender.icon}
                size={20}
                color={selectedGender.color}
              />
              <Text className="text-gray-900">{selectedGender.label}</Text>
            </View>
          ) : (
            placeholder
          )
        }
        onPress={() => setShowOptions(!showOptions)}
        className={`border border-gray-300 bg-white ${className}`}
        textClassName={`${value ? "text-gray-900" : "text-gray-500"} ${textClassName}`}
      />

      {showOptions && (
        <View className="bg-gray-50 rounded-lg p-4 space-y-2">
          {options.map((gender) => {
            const config = genderConfig[gender as keyof typeof genderConfig];
            const isSelected = value === gender;

            return (
              <PressableButton
                key={gender}
                title={
                  <View className="flex-row items-center justify-between w-full">
                    <View className="flex-row items-center space-x-3">
                      <Ionicons
                        name={config.icon}
                        size={20}
                        color={config.color}
                      />
                      <Text className="text-gray-900">{config.label}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#10B981"
                      />
                    )}
                  </View>
                }
                onPress={() => handleGenderSelect(gender)}
                className={`${
                  isSelected
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                } border`}
                textClassName="text-gray-900"
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
