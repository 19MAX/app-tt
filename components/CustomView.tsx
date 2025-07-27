import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
  safe?: boolean;
  bgColor?: string;
  children?: React.ReactNode;
}

const CustomView: React.FC<Props> = ({
  style,
  className,
  margin = false,
  safe = false,
  bgColor,
  children,
  ...props
}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: bgColor,
          flex: 1,
          paddingTop: safe ? safeArea.top : 0,
          marginHorizontal: margin ? 16 : 0,
        },
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </View>
  );
};

export default CustomView; 