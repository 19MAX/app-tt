import React from "react";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <View
      className={`bg-white rounded-xl p-2 shadow shadow-black/5 ${className || ""}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default CustomCard; 