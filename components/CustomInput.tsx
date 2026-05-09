import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { SIZES } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  forceLight?: boolean; // для AuthScreen
}

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  forceLight = false
}: CustomInputProps) => {
  const { colors, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.85, 320);

  // Якщо forceLight=true - завжди світла тема
  const useLightTheme = forceLight;
  const backgroundColor = useLightTheme ? COLORS.white : (isDarkMode ? colors.cardBackground : COLORS.white);
  const textColor = useLightTheme ? COLORS.textPrimary : (isDarkMode ? colors.textPrimary : COLORS.textPrimary);
  const borderColor = useLightTheme ? COLORS.border : colors.border;
  const placeholderColor = useLightTheme ? COLORS.textSecondary : colors.textSecondary;

  return (
    <View style={[styles.container, { width: inputWidth }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            color: textColor,
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12, alignSelf: 'center' },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.paddingMedium,
    fontSize: 14,
  },
});

export default CustomInput;