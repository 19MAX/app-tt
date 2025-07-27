import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
  safe?: boolean;
  bgColor?: string;
}


const CustomView = ({
  style,
  className,
  margin = false,
  safe = false,
  bgColor,
  children,
}: Props) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: bgColor,
          flex: 1,
          paddingTop: safe ? safeArea.top : 0,
          marginHorizontal: margin ? 10 : 0,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};

export default CustomView;
