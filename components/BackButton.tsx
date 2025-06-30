import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BackButtonProps {
  onPress?: () => void;
  showGradient?: boolean;
  color?: string;
  size?: number;
  topNavigationBar?: boolean;
}

export function BackButton({
  onPress,
  showGradient = false,
  color = "white",
  size = 30,
  topNavigationBar = false,
}: BackButtonProps) {
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  if (topNavigationBar) {
    return (
      <View style={{ width: "100%" }}>
        {showGradient && (
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              height: 200,
              position: "absolute",
              zIndex: 1,
              width: "100%",
            }}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: insets.top + 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
            zIndex: 99,
            elevation: 9,
          }}
        >
          <Pressable
            onPress={handlePress}
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={size}
              color={color}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <>
      {showGradient && (
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: 200,
            position: "absolute",
            zIndex: 1,
            width: "100%",
          }}
        />
      )}

      <View
        style={{
          position: "absolute",
          zIndex: 99,
          elevation: 9,
          top: insets.top + 10,
          left: 10,
        }}
      >
        <Pressable
          onPress={handlePress}
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 20,
            padding: 8,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={size}
            color={color}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          />
        </Pressable>
      </View>
    </>
  );
}
