// types/index.ts

import { Ionicons } from '@expo/vector-icons';

export interface Service {
  id: number;
  title: string;
  description?: string;
  providerName: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  image?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  category?: string;
}

export interface Category {
  id: number;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  iconColor?: string;
}

export interface Provider {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  location: string;
  isVerified?: boolean;
}

export interface SearchFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

// Navigation types para Expo Router
export type RootStackParamList = {
  'inicio/index': undefined;
  'buscar/index': { initialQuery?: string };
  'servicio/index': undefined;
  'favoritos/index': undefined;
  'perfil/index': undefined;
  ServiceDetail: { service: Service };
  CategoryServices: { category: Category };
  FeaturedServices: undefined;
  CategoriesScreen: undefined;
  SearchScreen: { initialQuery?: string };
  ProviderProfile: { provider: Provider };
};

// Hook types
export interface UseFavoritesReturn {
  favorites: number[];
  addFavorite: (serviceId: number) => void;
  removeFavorite: (serviceId: number) => void;
  isFavorite: (serviceId: number) => boolean;
  toggleFavorite: (serviceId: number) => void;
}