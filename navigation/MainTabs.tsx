import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import DonateScreen from '../screens/DonateScreen';
import BonusesScreen from '../screens/BonusesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DonationHistoryScreen from '../screens/DonationHistoryScreen';
import FullHistoryScreen from '../screens/FullHistoryScreen';
import PlasmaNewsScreen from '../screens/PlasmaNewsScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// СТЕК ДЛЯ ДОНАЦИЙ
function DonationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen name="DonationsList" component={DonationHistoryScreen} />
      <Stack.Screen name="FullHistory" component={FullHistoryScreen} />
    </Stack.Navigator>
  );
}

// СТЕК ДЛЯ НОВОСТЕЙ
function NewsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen name="NewsList" component={PlasmaNewsScreen} />
      <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs({ onLogout }: any) {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons: Record<string, string> = {
            Головна: '🏠',
            Запис: '📅',
            Бонуси: '🎁',
            Новини: '📰',
            Донації: '📦',
            Профіль: '👤',
          };
          return <Text style={{ fontSize: 24, color }}>{icons[route.name]}</Text>;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Запис" component={DonateScreen} />
      <Tab.Screen name="Бонуси" component={BonusesScreen} />
      <Tab.Screen name="Новини" component={NewsStack} />
      <Tab.Screen name="Донації" component={DonationsStack} />
      <Tab.Screen name="Профіль">
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}