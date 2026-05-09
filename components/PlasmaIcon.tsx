import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlasmaIconProps {
  size?: number;
  showText?: boolean;
}

const PlasmaIcon: React.FC<PlasmaIconProps> = ({ size = 60, showText = false }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[styles.iconText, { fontSize: size * 0.7 }]}>🩸</Text>
      </View>
      {showText && <Text style={styles.label}>PlasmaDonate</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D32F2F',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  iconText: {
    color: '#D32F2F',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 8,
  },
});

export default PlasmaIcon;