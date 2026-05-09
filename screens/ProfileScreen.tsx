import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import OutlineButton from '../components/OutlineButton';
import PlasmaIcon from '../components/PlasmaIcon';
import CustomHeader from '../components/CustomHeader';
import { TYPOGRAPHY, FONT_WEIGHT } from '../constants';

export default function ProfileScreen({ navigation, onLogout }: any) {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'User',
    donorNumber: '101090',
    birthDate: '01.01.2000',
    email: 'user@gmail.com',
    phone: '+491712345678',
    address: 'Schloßstraße 1, 36030 Fulda'
  });
  const [tempData, setTempData] = useState(userData);

  const handleEdit = () => {
    setTempData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
    Alert.alert('Успішно', 'Дані оновлено');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // КНОПКА ВИХОДУ З ПІДТВЕРДЖЕННЯМ
  const handleLogout = () => {
    Alert.alert(
      'Вихід',
      'Ви впевнені, що хочете вийти?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Вийти',
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            }
          }
        }
      ]
    );
  };

  const handleHistoryPress = () => {
    navigation.navigate('DonationHistory');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <CustomHeader title="Мій профіль" onBack={() => navigation.goBack()} />
        <PlasmaIcon size={60} />
        
        {isEditing ? (
          <Card>
            <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>✏️ РЕДАГУВАННЯ ПРОФІЛЮ</Text>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Ім'я</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.name}
              onChangeText={(text) => setTempData({ ...tempData, name: text })}
            />
            <Text style={[styles.label, { color: colors.textSecondary }]}>Номер донора</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.donorNumber}
              onChangeText={(text) => setTempData({ ...tempData, donorNumber: text })}
            />
            <Text style={[styles.label, { color: colors.textSecondary }]}>Дата народження</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.birthDate}
              onChangeText={(text) => setTempData({ ...tempData, birthDate: text })}
            />
            <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.email}
              onChangeText={(text) => setTempData({ ...tempData, email: text })}
              keyboardType="email-address"
            />
            <Text style={[styles.label, { color: colors.textSecondary }]}>Телефон</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.phone}
              onChangeText={(text) => setTempData({ ...tempData, phone: text })}
              keyboardType="phone-pad"
            />
            <Text style={[styles.label, { color: colors.textSecondary }]}>Адреса</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.white, borderColor: colors.border, color: colors.textPrimary }]}
              value={tempData.address}
              onChangeText={(text) => setTempData({ ...tempData, address: text })}
            />
            <OutlineButton title="Скасувати" onPress={handleCancel} />
            <OutlineButton title="Зберегти" onPress={handleSave} />
          </Card>
        ) : (
          <>
            <Text style={[styles.name, { color: colors.primary }]}>{userData.name}</Text>

            <Card>
              <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>👤 ОСОБИСТІ ДАНІ:</Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Номер донора:</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{userData.donorNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Дата народження:</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{userData.birthDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email:</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{userData.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Телефон:</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{userData.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Адреса:</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{userData.address}</Text>
              </View>
            </Card>

         

            <OutlineButton title="РЕДАГУВАТИ ПРОФІЛЬ" onPress={handleEdit} />
          </>
        )}

        {/* КНОПКА ВИХОДУ */}
        <OutlineButton title="ВИЙТИ" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16 },
  name: { fontSize: 20, fontWeight: FONT_WEIGHT.bold, textAlign: 'center', marginBottom: 30 },
  cardTitle: { fontSize: 16, fontWeight: FONT_WEIGHT.bold, marginBottom: 8, textAlign: 'center' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoLabel: { fontSize: 14, fontWeight: FONT_WEIGHT.bold },
  infoValue: { fontSize: 14, fontWeight: FONT_WEIGHT.bold },
  label: { fontSize: 14, fontWeight: FONT_WEIGHT.bold, marginBottom: 4, marginTop: 8 },
  input: { height: 45, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 14, marginBottom: 8 },
  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linkText: { fontSize: 16, fontWeight: FONT_WEIGHT.bold },
  arrowLink: { fontSize: 18, fontWeight: FONT_WEIGHT.bold },
});