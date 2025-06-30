import { ReactElement } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface PressableButtonProps {
  title: string | ReactElement;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export function PressableButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  className = "mb-3",
  textClassName = "",
}: PressableButtonProps) {
  // Estilos base para el botón y el texto
  const baseButtonClasses = "rounded-xl px-6 py-4 items-center justify-center";
  const baseTextClasses = " text-center";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseButtonClasses} ${disabled || loading ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color="#1E90FF" size="small" />
      ) : typeof title === "string" ? (
        <Text className={`${baseTextClasses} ${textClassName}`}>{title}</Text>
      ) : (
        title
      )}
    </Pressable>
  );
}
