import { formatearFechaParaInput } from "@/helpers";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, View } from "react-native";
import { PressableButton } from "./PressableButton";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  textClassName?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Seleccionar Fecha",
  className = "",
  textClassName = "",
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
}: DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para crear fecha sin problemas de zona horaria
  const createDateFromString = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Función para formatear fecha a YYYY-MM-DD sin problemas de zona horaria
  const formatDateToString = (date: Date) => {
    return formatearFechaParaInput(date);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const formattedDate = formatDateToString(selectedDate);
      onChange(formattedDate);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <PressableButton
        title={value || placeholder}
        onPress={openDatePicker}
        className={`border border-gray-300 bg-white ${className}`}
        textClassName={`${value ? "text-gray-900" : "text-gray-500"} ${textClassName}`}
      />

      {showDatePicker && (
        <DateTimePicker
          value={value ? createDateFromString(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}
