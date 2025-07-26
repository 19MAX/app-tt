import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { forwardRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomSheetProps {
  /**
   * Si la hoja debe cubrir toda la pantalla hasta el snackbar (true) o solo una parte (false)
   */
  fullScreen?: boolean;
  /**
   * Altura personalizada (en porcentaje o número de px). Si no se define, usa 50% o 100% según fullScreen
   */
  height?: string | number;
  /**
   * Estilos personalizados para la hoja
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Estilos personalizados para el fondo difuminado
   */
  backdropStyle?: StyleProp<ViewStyle>;
  /**
   * Si la hoja debe tener bordes redondeados
   */
  rounded?: boolean;
  /**
   * Si se puede cerrar deslizando hacia abajo
   */
  enablePanDownToClose?: boolean;
  /**
   * Función que se llama al cerrar la hoja
   */
  onClose?: () => void;
  /**
   * Contenido a renderizar dentro de la hoja
   */
  children: React.ReactNode;
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      fullScreen = false,
      height,
      style,
      backdropStyle,
      rounded = true,
      enablePanDownToClose = true,
      onClose,
      children,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    // Snap point dinámico
    const snapPoint = height
      ? typeof height === "number"
        ? height
        : height
      : fullScreen
        ? "100%"
        : "50%";

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={[snapPoint]}
        enablePanDownToClose={enablePanDownToClose}
        onDismiss={onClose}
        backdropComponent={({ style: s }) => (
          <BlurView
            intensity={60}
            tint="dark"
            style={[
              s as any,
              {
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.55)",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              backdropStyle,
            ]}
          />
        )}
        backgroundStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: rounded ? 32 : 0,
          borderTopRightRadius: rounded ? 32 : 0,
        }}
        handleStyle={{ backgroundColor: "#fff" }}
        handleIndicatorStyle={{ backgroundColor: "#2563eb" }}
        topInset={insets.top}
      >
        <BottomSheetView
          style={[
            {
              flex: 1,
              paddingTop: 24,
              paddingHorizontal: 20,
              paddingBottom: insets.bottom + 16,
              justifyContent: "flex-start",
            },
            style,
          ]}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";
