import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store';
import { addDonation, removeDonation, updateQuantity } from '../store/donationsSlice';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import CustomHeader from '../components/CustomHeader';

// Додаємо тип для елемента донації
interface DonationItemType {
    id: number;
    title: string;
    date: string;
    amount: number;
    quantity: number;
}

export default function MyDonationsScreen({ navigation }: any) {
    const { colors } = useTheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const donations = useSelector((state: RootState) => state.donations.items);
    const dispatch = useDispatch();

    // Додаємо типи для параметрів sum та item
    const totalAmount = donations.reduce((sum: number, item: DonationItemType) => sum + item.amount * item.quantity, 0);

    const handleAddTestDonation = () => {
        dispatch(addDonation({
            id: Date.now(),
            title: 'Тестова донація',
            date: new Date().toLocaleDateString(),
            amount: 25,
            quantity: 1,
        }));
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomHeader title="Мої донації" onBack={() => navigation.goBack()} />

            <PrimaryButton title="➕ Додати тестову донацію" onPress={handleAddTestDonation} />

            {donations.length === 0 ? (
                <Card>
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>У вас поки немає запланованих донацій</Text>
                </Card>
            ) : (
                <>
                    {donations.map((item: DonationItemType) => (
                        <Card key={item.id}>
                            <View style={styles.itemRow}>
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                                    <Text style={[styles.itemDate, { color: colors.textSecondary }]}>{item.date}</Text>
                                    <Text style={[styles.itemAmount, { color: colors.primary }]}>{item.amount}€</Text>
                                </View>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={[styles.qtyButton, { borderColor: colors.border }]}
                                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                    >
                                        <Text style={[styles.qtyText, { color: colors.textPrimary }]}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.qtyValue, { color: colors.textPrimary }]}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.qtyButton, { borderColor: colors.border }]}
                                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                    >
                                        <Text style={[styles.qtyText, { color: colors.textPrimary }]}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.deleteButton, { backgroundColor: colors.primary }]}
                                        onPress={() => dispatch(removeDonation(item.id))}
                                    >
                                        <Text style={styles.deleteText}>Видалити</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    ))}
                    <Card>
                        <View style={styles.totalRow}>
                            <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Загалом:</Text>
                            <Text style={[styles.totalAmount, { color: colors.primary }]}>{totalAmount}€</Text>
                        </View>
                    </Card>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
    itemInfo: { flex: 2 },
    itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    itemDate: { fontSize: 14, marginBottom: 2 },
    itemAmount: { fontSize: 18, fontWeight: 'bold' },
    quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    qtyButton: { width: 36, height: 36, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 18, fontWeight: 'bold' },
    qtyValue: { fontSize: 16, fontWeight: 'bold', width: 30, textAlign: 'center' },
    deleteButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    deleteText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 24, fontWeight: 'bold' },
    emptyText: { textAlign: 'center', fontSize: 16, paddingVertical: 20 },
});