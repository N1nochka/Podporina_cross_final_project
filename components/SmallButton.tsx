import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SmallButtonProps {
  title: string;
  onPress: () => void;
}

const SmallButton: React.FC<SmallButtonProps> = ({ title, onPress }) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: colors.primary,
          backgroundColor: isDarkMode ? colors.cardBackground : '#FFFFFF',
        }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors.textPrimary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SmallButton;