import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import PlasmaIcon from '../components/PlasmaIcon';

export default function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const { colors, isDarkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.primary }]}>PlasmaDonate</Text>
      <PlasmaIcon size={60} />
      <Card>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {isLogin ? 'Вхід' : 'Реєстрація'}
        </Text>

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isLogin && (
          <>
            <CustomInput
              placeholder="Ім'я"
              value={firstName}
              onChangeText={setFirstName}
            />
            <CustomInput
              placeholder="Прізвище"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}
        <PrimaryButton title={isLogin ? "УВІЙТИ" : "ЗАРЕЄСТРУВАТИСЯ"} onPress={onLogin} />
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={[styles.switchText, { color: colors.textSecondary }]}>
            {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже маєте акаунт? Увійти'}
          </Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  logo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 80, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  switchText: { fontSize: 14, textAlign: 'center', marginTop: 16 },
});