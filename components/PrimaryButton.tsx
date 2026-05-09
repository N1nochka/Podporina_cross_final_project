import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { SIZES, TYPOGRAPHY } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  forceLight?: boolean;
}

const PrimaryButton = ({ title, onPress, disabled = false, forceLight = false }: PrimaryButtonProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(width * 0.85, 320);

  const buttonColor = forceLight ? COLORS.primary : colors.primary;
  const textColor = forceLight ? COLORS.textOnPrimary : colors.textOnPrimary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth, backgroundColor: buttonColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  disabled: { opacity: 0.5 },
  text: { fontSize: TYPOGRAPHY.body, fontWeight: 'bold' },
});

export default PrimaryButton;
