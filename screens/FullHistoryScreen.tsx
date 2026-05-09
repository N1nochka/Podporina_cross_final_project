import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store';
import Card from '../components/Card';
import { TYPOGRAPHY } from '../constants';

export default function FullHistoryScreen({ navigation }: any) {
  const { colors } = useTheme();
  const history = useSelector((state: RootState) => state.donations.history);
  
  // СОРТУЄМО: спочатку НОВІ (останні), потім СТАРІ
  const sortedHistory = [...history].sort((a, b) => {
    const dateA = a.date.split('.').reverse().join('-');
    const dateB = b.date.split('.').reverse().join('-');
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Вся історія донацій</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        <Card>
          {sortedHistory.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              У вас ще немає донацій
            </Text>
          ) : (
            sortedHistory.map((item, index) => (
              <View key={item.id}>
                <View style={styles.historyItem}>
                  <View>
                    <Text style={[styles.historyNumber, { color: colors.textSecondary }]}>#{index + 1}</Text>
                    <Text style={[styles.historyTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                    <Text style={[styles.historyDate, { color: colors.textSecondary }]}>{item.date}</Text>
                  </View>
                  <Text style={[styles.historyAmount, { color: colors.primary }]}>{item.amount}€</Text>
                </View>
                {index < sortedHistory.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
              </View>
            ))
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 20, marginTop: 10 },
  backButton: { padding: 4, width: 40 },
  backArrow: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: TYPOGRAPHY.h2, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  placeholder: { width: 40 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  historyNumber: { fontSize: 12, marginBottom: 4 },
  historyTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  historyDate: { fontSize: 12 },
  historyAmount: { fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 16, paddingVertical: 20 },
  divider: { height: 1, marginVertical: 4 },
});