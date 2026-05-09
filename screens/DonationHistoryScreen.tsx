import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store';
import { cancelScheduledDonation } from '../store/donationsSlice';
import DonorRating from '../components/DonorRating';
import { TYPOGRAPHY } from '../constants';
import { useFocusEffect } from '@react-navigation/native';

export default function DonationHistoryScreen({ navigation }: any) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const history = useSelector((state: RootState) => state.donations.history);
  const scheduled = useSelector((state: RootState) => state.donations.scheduled);

  // Закрываем модалку при уходе с экрана
  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
      };
    }, [])
  );

  const sortedHistory = [...history].sort((a, b) => {
    const dateA = a.date.split('.').reverse().join('-');
    const dateB = b.date.split('.').reverse().join('-');
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const totalDonations = history.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = history.reduce((s, i) => s + i.amount * i.quantity, 0);

  const lastYearDonations = history
    .filter(item => {
      const [d, m, y] = item.date.split('.').map(Number);
      const date = new Date(y, m - 1, d);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return date >= oneYearAgo;
    })
    .reduce((s, i) => s + i.quantity, 0);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const recentDonations = sortedHistory.slice(0, 2);

  const handleCancelPress = () => {
    setModalVisible(true);
  };

  const confirmCancel = () => {
    dispatch(cancelScheduledDonation());
    setModalVisible(false);
    Alert.alert('Скасовано', 'Запис на здачу плазми скасовано');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.backArrow, { color: colors.textPrimary }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Мої донації</Text>
          <View style={styles.placeholder} />
        </View>

        {/* STATS */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>📊 АКТИВНІСТЬ:</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textPrimary }]}>Всього здач:</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{totalDonations}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textPrimary }]}>За 12 місяців:</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{lastYearDonations}</Text>
          </View>
        </View>

        {/* RATING */}
        <DonorRating totalDonations={totalDonations} totalAmount={totalAmount} />

        {/* HISTORY */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>📜 ІСТОРІЯ ДОНАЦІЙ:</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          {recentDonations.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>У вас ще немає донацій</Text>
          ) : (
            <>
              {recentDonations.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.historyItem}>
                    <View>
                      <Text style={[styles.historyTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                      <Text style={[styles.historyDate, { color: colors.textSecondary }]}>{item.date}</Text>
                    </View>
                    <Text style={[styles.historyAmount, { color: colors.primary }]}>{item.amount}€</Text>
                  </View>
                  {index < recentDonations.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
              <TouchableOpacity onPress={() => navigation.navigate('FullHistory')} style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>Вся історія →</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Скасувати запис?</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              Ви впевнені, що хочете скасувати заплановану здачу плазми?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.textSecondary }]}>Ні</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirmButton, { backgroundColor: colors.primary }]} 
                onPress={confirmCancel}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Так, скасувати</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 30 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: { padding: 4, width: 40 },
  backArrow: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: TYPOGRAPHY.h2, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  placeholder: { width: 40 },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
    marginLeft: 14,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  scheduledRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduledInfo: { flex: 1 },
  date: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 14, marginTop: 4 },
  location: { fontSize: 12, marginTop: 2 },
  cancelButton: { padding: 8 },
  cancelText: { fontSize: 14, fontWeight: 'bold' },

  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 16, fontWeight: 'bold' },
  statValue: { fontSize: 16, fontWeight: 'bold' },

  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  historyTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  historyDate: { fontSize: 12 },
  historyAmount: { fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 16, paddingVertical: 20 },
  divider: { height: 1, marginVertical: 4 },
  viewAllButton: { alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  viewAllText: { fontSize: 14, fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalText: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 8 },
  modalCancelButton: { backgroundColor: '#f0f0f0' },
  modalConfirmButton: {},
  modalButtonText: { fontSize: 14, fontWeight: 'bold' },
});