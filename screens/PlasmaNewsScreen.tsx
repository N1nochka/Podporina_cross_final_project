import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { fetchDonationNews } from '../api/newsApi';
import Card from '../components/Card';

interface NewsItem {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export default function PlasmaNewsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDonationNews();
      setNews(data);
    } catch (err) {
      setError('Не вдалося завантажити новини. Перевірте з\'єднання.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Кожен раз при фокусі на екрані збільшуємо лічильник, що викликає перерендер з новими ключами
  useFocusEffect(
    useCallback(() => {
      setAnimationTrigger(prev => prev + 1);
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNews();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Завантаження новин...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.primary }]}>{error}</Text>
        <TouchableOpacity onPress={loadNews}>
          <Text style={[styles.retryText, { color: colors.primary }]}>Спробувати ще раз</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderNewsItem = ({ item, index }: { item: NewsItem; index: number }) => {
    return (
      <Animated.View
        key={`${animationTrigger}-${item.id}`}
        entering={ZoomIn.delay(index * 100).duration(400)}
        style={styles.cardWrapper}
      >
        <Card>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NewsDetails', {
              newsId: item.id,
              title: item.title,
              body: item.body
            })}
          >
            <Text style={[styles.newsTitle, { color: colors.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.newsBody, { color: colors.textSecondary }]} numberOfLines={2}>
              {item.body}
            </Text>
            <Text style={[styles.readMore, { color: colors.primary }]}>Детальніше →</Text>
          </TouchableOpacity>
        </Card>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => `${animationTrigger}-${item.id}`}
      renderItem={renderNewsItem}
      contentContainerStyle={[styles.listContainer, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20
  },
  cardWrapper: {
    marginBottom: 12
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  newsBody: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20
  },
  readMore: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});