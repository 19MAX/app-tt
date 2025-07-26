import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: "default" | "error" | "success";
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export function Input({
  label,
  error,
  variant = "default",
  className = "",
  labelClassName = "",
  errorClassName = "",
  ...props
}: InputProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "error":
        return "border-error";
      case "success":
        return "border-success";
      default:
        return "border-neutral-300";
    }
  };

  const getLabelClasses = () => {
    const baseClasses = "text-sm font-work-medium mb-1";
    const variantClasses =
      variant === "error" ? "text-error" : "text-neutral-700";
    return `${baseClasses} ${variantClasses} ${labelClassName}`;
  };

  const getErrorClasses = () => {
    return `text-sm text-error mt-1 ${errorClassName}`;
  };

  return (
    <View className="w-full mb-4">
      {label && <Text className={getLabelClasses()}>{label}</Text>}

      <TextInput
        className={`
          w-full
          px-4
          py-4
          border
          rounded-xl
          text-base
          text-neutral-900
          bg-white
          placeholder:text-neutral-400
          ${getVariantClasses()}
          ${className}
        `}
        placeholderTextColor="#a3a3a3"
        {...props}
      />

      {error && <Text className={getErrorClasses()}>{error}</Text>}
    </View>
  );
}
