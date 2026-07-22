import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { loginRequest, registerRequest, getMeRequest } from '../../../api/auth.api';

// بترجع رسالة واضحة تفرّق بين "مش قادر يوصل للسيرفر" و "السيرفر رد برفض"
const extractErrorMessage = error => {
  if (!error.response) {
    return 'مش قادر نوصل للسيرفر، اتأكد إن الباك شغال والـ IP صح';
  }
  return error.response.data?.message || 'حصل خطأ، حاول تاني';
};

export const login = createAsyncThunk('auth/login', async ({ phone, password }, { rejectWithValue }) => {
  try {
    const response = await loginRequest(phone, password);
    const { token, user } = response.data.data;
    await SecureStore.setItemAsync('authToken', token);
    return { token, user };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const register = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const response = await registerRequest(formData);
    const { token, user } = response.data.data;
    await SecureStore.setItemAsync('authToken', token);
    return { token, user };
  } catch (error) {
    return rejectWithValue({
      message: extractErrorMessage(error),
      field: error.response?.data?.field || null, // مفيش response = مفيش field أصلاً، طبيعي
    });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('authToken');
});

export const restoreSession = createAsyncThunk('auth/restoreSession', async (_, { rejectWithValue }) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (!token) return rejectWithValue(null);
  try {
    const response = await getMeRequest();
    const { user } = response.data.data;
    return { token, user };
  } catch (error) {
    await SecureStore.deleteItemAsync('authToken');
    return rejectWithValue(null);
  }
});

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  sessionChecked: false,

  id: null,
  name: null,
  phone: null,
  role: null,
  accountStatus: null,
  referralCode: null,

  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateClientInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearAuthError: state => {
      state.error = null;
    },
    addFavorite: (state, action) => {
      state.favorites.push({ id: `fav_${Date.now()}`, ...action.payload });
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(f => f.id !== action.payload);
    },
    updateFavorite: (state, action) => {
      state.favorites = state.favorites.map(f => (f.id === action.payload.id ? { ...f, ...action.payload } : f));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        Object.assign(state, action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        Object.assign(state, action.payload.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'حصل خطأ، حاول تاني';
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState, sessionChecked: true };
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        Object.assign(state, action.payload.user);
        state.sessionChecked = true;
      })
      .addCase(restoreSession.rejected, state => {
        state.sessionChecked = true;
      });
  },
});

export const { updateClientInfo, clearAuthError, addFavorite, removeFavorite, updateFavorite } = authSlice.actions;
export default authSlice.reducer;