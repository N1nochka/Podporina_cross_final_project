import React, { ReactNode } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  FadeInDown
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { SIZES } from '../constants';

interface AnimatedCardProps {
  children: ReactNode;
  variant?: 'default' | 'pink';
  style?: any;
  delay?: number;
  interactive?: boolean;  // для карточек, которые можно нажимать
  onPress?: () => void;
}

const AnimatedCard = ({ 
  children, 
  variant = 'default', 
  style, 
  delay = 0,
  interactive = false,
  onPress 
}: AnimatedCardProps) => {
  const { colors, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;
  const scale = useSharedValue(1);

  const pinkColor = isDarkMode ? '#4A1A2A' : '#FCE4EC';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (interactive) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    }
  };

  const content = (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400).springify().damping(15)}
      style={[animatedStyle, { width: cardWidth }]}
    >
      <View
        style={[
          styles.card,
          { 
            backgroundColor: variant === 'pink' ? pinkColor : colors.cardBackground, 
            borderColor: colors.border 
          },
          style,
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );

  if (interactive && onPress) {
    return (
      <Animated.View
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
        onTouchCancel={handlePressOut}
      >
        {content}
      </Animated.View>
    );
  }

  return content;
};

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

export default AnimatedCard;