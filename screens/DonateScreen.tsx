import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { scheduleDonation } from '../store/donationsSlice';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import CustomHeader from '../components/CustomHeader';
import { useFocusEffect, CommonActions } from '@react-navigation/native';

interface CalendarDay {
  day: number | null;
  isCurrentMonth: boolean;
}

export default function DonateScreen({ navigation }: any) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const cellSize = 44;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [month, setMonth] = useState(3);
  const year = 2026;

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  const times = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30'
  ];

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setSelectedDate(null);
      setSelectedTime(null);
    }, [])
  );

  // ✅ формат с нулями
  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  const generateCalendar = (month: number, year: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const offset = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const calendar: CalendarDay[] = [];

    for (let i = offset - 1; i >= 0; i--) {
      calendar.push({
        day: daysInPrev - i,
        isCurrentMonth: false,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      calendar.push({
        day: d,
        isCurrentMonth: true,
      });
    }

    const remaining = 42 - calendar.length;
    for (let d = 1; d <= remaining; d++) {
      calendar.push({
        day: d,
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const calendar = generateCalendar(month, year);

  const rows: CalendarDay[][] = [];
  for (let i = 0; i < calendar.length; i += 7) {
    rows.push(calendar.slice(i, i + 7));
  }

  const isWeekend = (date: Date) => {
    const wd = date.getDay();
    return wd === 0 || wd === 6;
  };

  const handleSelectDate = (day: number | null, isCurrentMonth: boolean) => {
    if (!day || !isCurrentMonth) return;

    const date = new Date(year, month, day);

    if (isWeekend(date)) {
      Alert.alert('Недоступно', 'Запис у вихідні неможливий');
      return;
    }

    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Помилка', 'Оберіть дату та час');
      return;
    }

    const donationData = {
      date: formatDate(selectedDate),
      time: selectedTime,
      location: 'Plasmaspende-Zentrum in Fulda',
    };
    
    // Логування для перевірки
    console.log('📝 Dispatching scheduleDonation:', donationData);
    
    dispatch(scheduleDonation(donationData));

    Alert.alert('Успішно!', 'Ви записані', [
      {
        text: 'OK',
        onPress: () => {
          setSelectedDate(null);
          setSelectedTime(null);
          
          // Скидаємо навігацію до головного екрану, зберігаючи стан Redux
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Drawer' }],
            })
          );
        },
      },
    ]);
  };

  const nextMonth = () => setMonth(m => (m === 11 ? 0 : m + 1));
  const prevMonth = () => setMonth(m => (m === 0 ? 11 : m - 1));

  const monthName = new Date(year, month)
    .toLocaleString('uk-UA', { month: 'long' })
    .toUpperCase();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.contentContainer, { alignItems: 'center' }]}
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader title="Запис на здачу плазми" onBack={() => navigation.goBack()} />

      <Card>
        <View style={styles.wrapper}>

          <Text style={[styles.title, { color: colors.textSecondary }]}>
            📅 ОБЕРІТЬ ДАТУ:
          </Text>

          <View style={styles.navRow}>
            <TouchableOpacity onPress={prevMonth}>
              <Text style={[styles.arrow, { color: colors.textPrimary }]}>‹</Text>
            </TouchableOpacity>

            <Text style={[styles.month, { color: colors.textPrimary }]}>
              {monthName} {year}
            </Text>

            <TouchableOpacity onPress={nextMonth}>
              <Text style={[styles.arrow, { color: colors.textPrimary }]}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {weekDays.map((d, i) => (
              <View key={i} style={styles.weekCell}>
                <Text style={{ color: colors.textSecondary }}>{d}</Text>
              </View>
            ))}
          </View>

          {rows.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map((item, j) => {
                const { day, isCurrentMonth } = item;

                const date = day && isCurrentMonth ? new Date(year, month, day) : null;

                const isSelected =
                  selectedDate &&
                  date &&
                  selectedDate.toDateString() === date.toDateString();

                const isDisabled = !day || !isCurrentMonth;
                const isWeekendDay = date ? isWeekend(date) : false;

                return (
                  <TouchableOpacity
                    key={j}
                    onPress={() => handleSelectDate(day, isCurrentMonth)}
                    disabled={isDisabled}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderWidth: isSelected ? 2 : 1,
                        backgroundColor: 'transparent',
                      },
                    ]}
                  >
                    {day && (
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: !isCurrentMonth || isWeekendDay
                            ? '#999'
                            : isSelected
                            ? colors.primary
                            : colors.textPrimary,
                        }}
                      >
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={[styles.title, { color: colors.textSecondary }]}>
          ⏰ ОБЕРІТЬ ЧАС:
        </Text>

        <View style={styles.timeGrid}>
          {times.map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTime(t)}
              style={[
                styles.timeCell,
                { borderColor: colors.border },
                selectedTime === t && {
                  borderColor: colors.primary,
                  borderWidth: 2,
                },
              ]}
            >
              <Text
                style={{
                  color: selectedTime === t ? colors.primary : colors.textPrimary,
                  fontWeight: 'bold',
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <PrimaryButton title="ПІДТВЕРДИТИ" onPress={handleConfirm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },
  contentContainer: { paddingBottom: 20 },
  wrapper: { alignItems: 'center' },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    paddingLeft: 12,
  },

  navRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  arrow: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },

  month: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  weekCell: {
    width: 44,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  cell: {
    margin: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  timeCell: {
    width: 78,
    height: 44,
    margin: 3,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});