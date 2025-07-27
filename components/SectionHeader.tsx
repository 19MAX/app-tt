import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  showSeeAll = false, 
  onSeeAllPress, 
  iconName = "trending-up-outline" 
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <View className="flex-row items-center">
        <Ionicons name={iconName} size={20} color="#3B82F6" />
        <Text className="text-lg font-semibold text-gray-900 ml-2">
          {title}
        </Text>
      </View>
      
      {showSeeAll && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-blue-600 font-medium">
            Ver todos
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;