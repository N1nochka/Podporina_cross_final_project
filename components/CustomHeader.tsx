import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomHeaderProps {
    title: string;
    onBack: () => void;
}

export default function CustomHeader({ title, onBack }: CustomHeaderProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={[styles.backArrow, { color: colors.textPrimary }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
            <View style={{ width: 40 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    backButton: { paddingRight: 16 },
    backArrow: { fontSize: 24, fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 },
});