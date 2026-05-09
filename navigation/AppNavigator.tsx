import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import DrawerNavigator from './DrawerNavigator';
import DonationHistoryScreen from '../screens/DonationHistoryScreen';
import FullHistoryScreen from '../screens/FullHistoryScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Drawer">
          {(props) => (
            <DrawerNavigator
              {...props}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DonationHistory" component={DonationHistoryScreen} />
        <Stack.Screen name="FullHistory" component={FullHistoryScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}