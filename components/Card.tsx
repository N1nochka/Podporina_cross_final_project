import React, { memo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SIZES } from '../constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'pink';
  style?: any;
}

const Card = memo(({ children, variant = 'default', style }: CardProps) => {
  const { colors, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  const pinkColor = isDarkMode ? '#4A1A2A' : '#FCE4EC';

  return (
    <View
      style={[
        styles.card,
        { width: cardWidth, backgroundColor: variant === 'pink' ? pinkColor : colors.cardBackground, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
});

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    padding: SIZES.paddingMedium,
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    marginBottom: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

export default Card;