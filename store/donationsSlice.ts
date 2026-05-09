import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DonationItem {
  id: number;
  title: string;
  date: string;
  amount: number;
  quantity: number;
  location?: string;
  status?: 'planned' | 'completed' | 'cancelled';
}

export interface ScheduledDonation {
  date: string;
  time: string;
  location: string;
}

interface DonationsState {
  items: DonationItem[];
  history: DonationItem[];
  scheduled: ScheduledDonation | null;
}

// Початковий стан з 2 тестовими донаціями
// donationsSlice.ts - обновленный initialState

const initialState: DonationsState = {
  items: [],
  history: [
    {
      id: 6,
      title: 'Донація плазми',
      date: '27.04.2026',  // сегодняшняя донация
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Донація плазми',
      date: '02.04.2026',  // сегодняшняя донация
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Донація плазми',
      date: '26.03.2026',
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Донація плазми',
      date: '15.03.2026',
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Донація плазми',
      date: '15.03.2025',
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
    {
      id: 1,
      title: 'Донація плазми',
      date: '20.02.2025',
      amount: 25,
      quantity: 1,
      location: 'Plasmaspende-Zentrum in Fulda',
      status: 'completed'
    },
  ],
  scheduled: null,
};

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    addDonation: (state, action: PayloadAction<DonationItem>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, status: 'planned' });
      }
    },
    removeDonation: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else if (item && action.payload.quantity === 0) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      }
    },
    completeDonation: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        state.history.unshift({ ...item, status: 'completed' }); // додаємо на початок (нові зверху)
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    addToHistory: (state, action: PayloadAction<DonationItem>) => {
      state.history.unshift({ ...action.payload, status: 'completed' });
    },
    scheduleDonation: (state, action: PayloadAction<ScheduledDonation>) => {
      state.scheduled = action.payload;
    },
    cancelScheduledDonation: (state) => {
      state.scheduled = null;
    },
    clearDonations: (state) => {
      state.items = [];
      state.history = [];
      state.scheduled = null;
    },
  },
});

export const { 
  addDonation, 
  removeDonation, 
  updateQuantity, 
  completeDonation,
  addToHistory,
  scheduleDonation,
  cancelScheduledDonation,
  clearDonations 
} = donationsSlice.actions;

export default donationsSlice.reducer;