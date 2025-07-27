import React from "react";
import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption' | 'overline';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'danger' | 'success' | 'warning' | 'info' | 'white' | 'black';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  numberOfLines?: number;
  children: React.ReactNode;
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body',
  weight = 'normal',
  color = 'black',
  align = 'left',
  transform = 'none',
  numberOfLines,
  children,
  className = '',
  ...props
}) => {
  // Variantes de tamaño y estilo mejoradas
  const variantClasses = {
    h1: 'text-4xl leading-tight', // 36px
    h2: 'text-3xl leading-tight', // 30px
    h3: 'text-2xl leading-snug',  // 24px
    h4: 'text-xl leading-snug',   // 20px
    body: 'text-base leading-relaxed', // 16px
    small: 'text-sm leading-normal',   // 14px
    caption: 'text-xs leading-normal', // 12px
    overline: 'text-xs leading-normal tracking-widest', // 12px con spacing
  };

  // Pesos de fuente
  const weightClasses = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  // Colores expandidos
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'text-purple-600',
    muted: 'text-gray-500',
    danger: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    info: 'text-cyan-600',
    white: 'text-white',
    black: 'text-gray-900',
  };

  // Alineación de texto
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Transformación de texto
  const transformClasses = {
    none: '',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  };

  // Combinar todas las clases
  const combinedClassName = [
    variantClasses[variant],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    transformClasses[transform],
    className
  ].filter(Boolean).join(' ').trim();

  return (
    <Text
      className={combinedClassName}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;