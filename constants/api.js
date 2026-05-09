// API для отримання донорських новин / статистики
export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 * Отримує список донорських новин / постів
 * Використовується на головному екрані для відображення активності
 */
export const fetchDonationNews = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP помилка: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка запиту до API:', error);
        throw error;
    }
};