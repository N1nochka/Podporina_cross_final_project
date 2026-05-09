import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import OutlineButton from '../components/OutlineButton';

export default function SupportScreen({ navigation }: any) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Card>
                <Text style={[styles.title, { color: colors.textPrimary }]}>📞 Підтримка</Text>
                <Text style={[styles.info, { color: colors.textSecondary }]}>Email: support@plasmadonate.com</Text>
                <Text style={[styles.info, { color: colors.textSecondary }]}>Телефон: +380 44 123 4567</Text>
                <Text style={[styles.info, { color: colors.textSecondary }]}>Години роботи: Пн-Пт 9:00-18:00</Text>
            </Card>
            <OutlineButton title="Назад" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    info: { fontSize: 16, marginBottom: 12 },
});