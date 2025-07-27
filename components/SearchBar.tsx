import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar servicios...",
  onPress,
  onChangeText,
  value,
  editable = true,
}) => {
  return (
    <TouchableOpacity
      onPress={editable ? undefined : onPress}
      disabled={editable}
      className="flex-row items-center bg-gray-100 rounded-xl px-4 mx-4 mb-4 mt-4"
    >
      <Ionicons name="search" size={20} color="#6B7280" />
      <TextInput
        className="flex-1 ml-3 text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
