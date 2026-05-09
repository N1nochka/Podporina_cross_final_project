import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SIZES, TYPOGRAPHY } from '../constants';

interface OutlineButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const OutlineButton = ({ title, onPress, disabled = false }: OutlineButtonProps) => {
  const { colors, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(width * 0.85, 320);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: buttonWidth,
          backgroundColor: isDarkMode ? colors.cardBackground : colors.white,
          borderColor: colors.primaryDark,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: colors.primaryDark }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: SIZES.outlineButtonHeight,
    borderWidth: 2,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  disabled: { opacity: 0.5 },
  text: { fontSize: TYPOGRAPHY.body, fontWeight: '600' },
});

export default OutlineButton;