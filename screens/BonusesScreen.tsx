import React, { useLayoutEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';  // ← вернул Card
import CustomHeader from '../components/CustomHeader';
import { RootState } from '../store';

export default function BonusesScreen({ navigation }: any) {
  const { colors } = useTheme();
  
  // Получаем историю донаций из Redux
  const history = useSelector((state: RootState) => state.donations.history);
  
  // Подсчитываем количество донаций
  const totalDonations = history.reduce((sum, item) => sum + item.quantity, 0);
  
  // Количество донаций за последние 28 дней
  const donationsLast28Days = useMemo(() => {
    const now = new Date();
    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(now.getDate() - 28);
    
    return history.filter(item => {
      const itemDate = parseDate(item.date);
      return itemDate >= twentyEightDaysAgo && itemDate <= now;
    }).reduce((sum, item) => sum + item.quantity, 0);
  }, [history]);
  
  // Количество донаций за последние 90 дней
  const donationsLast90Days = useMemo(() => {
    const now = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(now.getDate() - 90);
    
    return history.filter(item => {
      const itemDate = parseDate(item.date);
      return itemDate >= ninetyDaysAgo && itemDate <= now;
    }).reduce((sum, item) => sum + item.quantity, 0);
  }, [history]);

  // Прогресс для бонуса "4 здачі за 28 днів"
  const progress28days = Math.min((donationsLast28Days / 4) * 100, 100);
  const remaining28days = Math.max(4 - donationsLast28Days, 0);
  
  // Прогресс для бонуса "6 здач за 90 днів"
  const progress90days = Math.min((donationsLast90Days / 6) * 100, 100);
  const remaining90days = Math.max(6 - donationsLast90Days, 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomHeader title="Бонуси та виплати" onBack={() => navigation.goBack()} />

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>💰 ВИПЛАТА ЗА ЗДАЧУ:</Text>
      
      <Card>
        <View style={styles.payoutRow}>
          <Text style={[styles.payoutLabel, { color: colors.textPrimary }]}>Одна здача:</Text>
          <Text style={[styles.amount, { color: colors.textPrimary }]}>25€</Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>🎯 БОНУСНІ ПРОГРАМИ:</Text>

      {/* Бонус 4 здачі за 28 днів */}
      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>📅 4 здачі за 28 днів</Text>
        <Text style={[styles.bonusAmount, { color: colors.textPrimary }]}>
          Бонус: <Text style={[styles.bonusRed, { color: colors.primary }]}>+20€</Text>
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
            <View style={[styles.progressFill, { width: `${progress28days}%`, backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textPrimary }]}>{donationsLast28Days}/4</Text>
        </View>
        <Text style={[styles.bonusRemaining, { color: colors.textSecondary }]}>
          {remaining28days > 0 ? `Ще ${remaining28days} здачі до бонусу 20€` : '🎉 Бонус отримано! 🎉'}
        </Text>
      </Card>

      {/* Бонус 6 здач за 90 днів */}
      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>📅 6 здач за 90 днів</Text>
        <Text style={[styles.bonusAmount, { color: colors.textPrimary }]}>
          Бонус: <Text style={[styles.bonusRed, { color: colors.primary }]}>+30€</Text>
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
            <View style={[styles.progressFill, { width: `${progress90days}%`, backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textPrimary }]}>{donationsLast90Days}/6</Text>
        </View>
        <Text style={[styles.bonusRemaining, { color: colors.textSecondary }]}>
          {remaining90days > 0 ? `Ще ${remaining90days} здачі до бонусу 30€` : '🎉 Бонус отримано! 🎉'}
        </Text>
      </Card>

      {/* Реферальный бонус */}
      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>👥 ПРИВЕДИ ДРУГА</Text>
        <View style={styles.referralRow}>
          <Text style={[styles.referralText, { color: colors.textPrimary }]}>За реєстрацію:</Text>
          <Text style={[styles.referralAmount, { color: colors.primary }]}>10€</Text>
        </View>
        <View style={styles.referralRow}>
          <Text style={[styles.referralText, { color: colors.textPrimary }]}>За 5 здач друга:</Text>
          <Text style={[styles.referralAmount, { color: colors.primary }]}>40€</Text>
        </View>
      </Card>
      
    </ScrollView>
  );
}

// Функция парсинга даты в формате DD.MM.YYYY
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  contentContainer: { paddingTop: 10, paddingBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, marginTop: 16 },
  payoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payoutLabel: { fontSize: 18, fontWeight: 'bold' },
  amount: { fontSize: 20, fontWeight: 'bold' },
  bonusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  bonusAmount: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  bonusRed: {},
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  progressBar: { flex: 1, height: 8, borderRadius: 4, marginRight: 12, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  progressText: { fontSize: 14, fontWeight: 'bold', width: 35, textAlign: 'right' },
  bonusRemaining: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  referralRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  referralText: { fontSize: 16, fontWeight: 'bold' },
  referralAmount: { fontSize: 18, fontWeight: 'bold' },
});