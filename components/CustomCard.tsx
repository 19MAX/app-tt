import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
  padding?: boolean;
}

const CustomCard = ({ className, padding = false, children }: Props) => {
  return (
    <View
      className={`bg-white rounded-xl ${padding ? "p-2" : ""} shadow shadow-black/5 ${className || ""}`}
    >
      {children}
    </View>
  );
};

export default CustomCard;
