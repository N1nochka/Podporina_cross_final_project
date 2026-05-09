import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store';
import { cancelScheduledDonation } from '../store/donationsSlice';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SmallButton from '../components/SmallButton';

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const scheduled = useSelector((state: RootState) => state.donations.scheduled);

  const handleCancel = useCallback(() => {
    Alert.alert(
      'Скасування запису',
      'Ви впевнені, що хочете скасувати запис на здачу плазми?',
      [
        { text: 'Ні', style: 'cancel' },
        {
          text: 'Так, скасувати',
          style: 'destructive',
          onPress: () => dispatch(cancelScheduledDonation())
        }
      ]
    );
  }, [dispatch]);

  const handleReschedule = useCallback(() => {
    navigation.navigate('Запис');
  }, [navigation]);

  const handleDonatePress = useCallback(() => {
    navigation.navigate('Запис');
  }, [navigation]);

  const hasScheduled = scheduled !== null;
  const formattedScheduled = hasScheduled 
    ? `${scheduled.date} о ${scheduled.time}`
    : 'Немає запланованої здачі';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <Text style={[styles.welcome, { color: colors.textPrimary }]}>Вітаємо, User!</Text>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>🎯 НАСТУПНА ЗДАЧА ПЛАЗМИ:</Text>
        <Card>
          <View style={styles.dateTimeRow}>
            <Text style={[styles.dateText, { color: colors.textPrimary, textAlign: 'center' }]}>{formattedScheduled}</Text>
          </View>
          {hasScheduled && (
            <View style={styles.row}>
              <SmallButton title="Скасувати" onPress={handleCancel} />
              <Text style={[styles.slash, { color: colors.primary }]}>/</Text>
              <SmallButton title="Перенести" onPress={handleReschedule} />
            </View>
          )}
        </Card>

        <View style={styles.centerInfo}>
          <Text style={[styles.centerName, { color: colors.primary }]}>🏥 Plasmaspende-Zentrum in Fulda</Text>
          <Text style={[styles.centerAddress, { color: colors.textPrimary, lineHeight: 24 }]}>Адреса: Bahnhofstraße 2, 36037 Fulda</Text>
          <Text style={[styles.centerPhone, { color: colors.textPrimary, lineHeight: 24 }]}>Номер телефону: 0661 4805000</Text>
        </View>

        {/* КАРТА (тільки для IOS та Android, на Web не відображається) */}
        <Card>
          <Text style={[styles.mapTitle, { color: colors.textPrimary }]}>📍 РОЗТАШУВАННЯ ЦЕНТРУ</Text>
          {Platform.OS !== 'web' ? (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 50.5511,
                  longitude: 9.6808,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 50.5511,
                    longitude: 9.6808,
                  }}
                  title="Plasmaspende-Zentrum"
                  description="Bahnhofstraße 2, Fulda"
                />
              </MapView>
            </View>
          ) : (
            <View style={[styles.mapPlaceholder, { backgroundColor: colors.border }]}>
              <Text style={[styles.mapPlaceholderText, { color: colors.textSecondary }]}>
                🗺️ Карта доступна в мобільному застосунку
              </Text>
            </View>
          )}
        </Card>

        <PrimaryButton title="ЗАПИСАТИСЯ НА ЗДАЧУ ПЛАЗМИ" onPress={handleDonatePress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, marginTop: 4, marginLeft: 14 },
  dateTimeRow: { marginBottom: 12 },
  dateText: { fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 8 },
  slash: { fontSize: 14, fontWeight: 'bold' },
  centerInfo: { marginTop: 20, marginBottom: 16, alignItems: 'center' },
  centerName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  centerAddress: { fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  centerPhone: { fontSize: 14, fontWeight: 'bold' },
  mapTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    height: 220,
    width: '100%',
  },
  mapPlaceholder: {
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapPlaceholderText: {
    fontSize: 14,
    textAlign: 'center',
  },
});