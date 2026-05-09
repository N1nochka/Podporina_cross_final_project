import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';

export default function NewsDetailsScreen({ route, navigation }: any) {
    const { title, body } = route.params;
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={[styles.backArrow, { color: colors.textPrimary }]}>←</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>Деталі новини</Text>
                    <View style={styles.placeholder} />
                </View>

                <Card>
                    <Text style={[styles.newsTitle, { color: colors.textPrimary }]}>{title}</Text>
                    <Text style={[styles.newsBody, { color: colors.textSecondary }]}>{body}</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 16 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 },
    backButton: { padding: 4, width: 40 },
    backArrow: { fontSize: 24, fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 },
    placeholder: { width: 40 },
    newsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    newsBody: { fontSize: 14, lineHeight: 22 },
});