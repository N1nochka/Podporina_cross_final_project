import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightColors = {
    primary: '#D32F2F',
    primaryDark: '#B71C1C',
    background: '#FFFFFF',
    headerBackground: '#FFFFFF',
    cardBackground: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textLight: '#9E9E9E',
    border: '#E0E0E0',
    white: '#FFFFFF',
    black: '#000000',
    progressBackground: '#FFCDD2',
    progressFill: '#D32F2F',
    success: '#2E7D32',
    shadow: '#000000',
    textOnPrimary: '#FFFFFF',
};

const darkColors = {
    primary: '#E57373',
    primaryDark: '#EF9A9A',
    background: '#1a1a1a',
    headerBackground: '#1a1a1a',
    cardBackground: '#2d2d2d',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textLight: '#757575',
    border: '#404040',
    white: '#2d2d2d',
    black: '#FFFFFF',
    progressBackground: '#4A1A2A',
    progressFill: '#E57373',
    success: '#81C784',
    shadow: '#000000',
    textOnPrimary: '#FFFFFF',
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = '@theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme === 'dark') {
                setIsDarkMode(true);
            } else if (savedTheme === 'light') {
                setIsDarkMode(false);
            } else {
                setIsDarkMode(systemScheme === 'dark');
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    };

    const toggleTheme = () => {
        const newThemeMode = !isDarkMode;
        setIsDarkMode(newThemeMode);
        AsyncStorage.setItem(THEME_KEY, newThemeMode ? 'dark' : 'light');
    };

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};