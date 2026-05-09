import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';

import MainTabs from './MainTabs';
import SupportScreen from '../screens/SupportScreen';
import { SCREENS } from './screens';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

function ThemeToggleHeader() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ marginRight: 16, padding: 8 }}
    >
      <Text style={{ fontSize: 24 }}>
        {isDarkMode ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

export default function DrawerNavigator({ onLogout }: any) {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },

        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: colors.textSecondary,

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },

        headerShown: true,
        headerTitle: '',

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ fontSize: 28, color: colors.textPrimary }}>
              ☰
            </Text>
          </TouchableOpacity>
        ),

        headerRight: () => <ThemeToggleHeader />,

        headerStyle: {
          backgroundColor: colors.headerBackground,
          shadowOpacity: 0,
          elevation: 0,
        },
      })}

      drawerContent={(props) => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 50,
          }}
        >
          {/* ОСНОВНОЕ МЕНЮ */}
          <DrawerItemList {...props} />

          {/* ВЫХОД (КАК ОБЫЧНЫЙ СЕРЫЙ ПУНКТ) */}
          <DrawerItem
            label="Вийти"
            labelStyle={{
              fontSize: 16,
              fontWeight: '500',
              color: colors.textSecondary, // 👈 СЕРЫЙ КАК У ДРУГИХ
            }}
            icon={() => (
              <Text
                style={{
                  fontSize: 20,
                  color: colors.textSecondary,
                }}
              >
                🚪
              </Text>
            )}
            onPress={() => {
              Alert.alert(
                'Вихід',
                'Ви впевнені, що хочете вийти?',
                [
                  {
                    text: 'Скасувати',
                    style: 'cancel',
                  },
                  {
                    text: 'Вийти',
                    style: 'destructive',
                    onPress: () => {
                      if (onLogout) {
                        onLogout();
                      }
                    },
                  },
                ]
              );
            }}
          />
        </View>
      )}
    >
      {/* ГЛАВНАЯ */}
      <Drawer.Screen
        name="Головна"
        options={{
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      >
        {(props) => (
          <MainTabs {...props} onLogout={onLogout} />
        )}
      </Drawer.Screen>

      {/* ПОДДЕРЖКА */}
      <Drawer.Screen
        name={SCREENS.SUPPORT}
        component={SupportScreen}
        options={{
          drawerLabel: 'Підтримка',
          title: 'Підтримка',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>❓</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
} 