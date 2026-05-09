import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from './Card';

interface DonorRatingProps {
  totalDonations: number;
  totalAmount: number;
}

const getDonorLevel = (donations: number) => {
  if (donations >= 100) return { level: '🏆 ПЛАТИНОВИЙ ДОНОР', color: '#E5E4E2', nextLevel: 100 };
  if (donations >= 60) return { level: '🥇 ЗОЛОТИЙ ДОНОР', color: '#FFD700', nextLevel: 60 };
  if (donations >= 40) return { level: '🥈 СРІБНИЙ ДОНОР', color: '#C0C0C0', nextLevel: 40 };
  if (donations >= 20) return { level: '🥉 БРОНЗОВИЙ ДОНОР', color: '#CD7F32', nextLevel: 20 };
  return { level: '🎗 ПОЧАТКІВЕЦЬ', color: '#D32F2F', nextLevel: 10 }; // червоний колір
};

export default function DonorRating({ totalDonations, totalAmount }: DonorRatingProps) {
  const { colors } = useTheme();
  
  const { level, color, nextLevel } = useMemo(() => getDonorLevel(totalDonations), [totalDonations]);
  const progress = nextLevel > 0 ? (totalDonations / nextLevel) * 100 : 100;

  return (
    <Card style={styles.card}>  {/* прибрано variant="pink" */}
      
      <View style={styles.levelContainer}>
        <Text style={[styles.level, { color }]}>{level}</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{totalDonations}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Донацій</Text>
        </View>
      </View>
      
      {nextLevel > 0 && (
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            До наступного рівня: {nextLevel - totalDonations} донацій
          </Text>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  levelContainer: { alignItems: 'center', marginBottom: 16 },
  level: { fontSize: 24, fontWeight: 'bold' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  progressContainer: { marginTop: 8 },
  progressText: { fontSize: 12, textAlign: 'center', marginBottom: 8 },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
});