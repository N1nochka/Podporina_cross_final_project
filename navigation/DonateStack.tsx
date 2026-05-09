import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import DonateScreen from '../screens/DonateScreen';
import { SCREENS } from './screens';

const Stack = createStackNavigator();

export default function DonateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={SCREENS.DONATE}
                component={DonateScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000' }}>←</Text>
                        </TouchableOpacity>
                    ),
                    headerTitle: () => (
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
                            Запис на здачу плазми
                        </Text>
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#FFFFFF' },
                })}
            />
        </Stack.Navigator>
    );
}