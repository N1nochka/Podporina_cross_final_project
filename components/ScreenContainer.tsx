import React from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scrollable = true }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const Container = scrollable ? ScrollView : View;

  return (
    <Container
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, isLandscape && styles.landscapeContainer]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  landscapeContainer: {
    paddingHorizontal: 32,
  },
});

export default ScreenContainer;