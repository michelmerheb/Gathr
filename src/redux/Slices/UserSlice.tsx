import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';  // Assuming the store is in the same directory level


interface User {
  message: string;
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
  isAuth: boolean;
}

interface SignupPayload {
  email: string;
  password: string;
  token_expires_in?: string;
}

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'https://backend-practice.euriskomobility.me';

export const createUser = createAsyncThunk<User, SignupPayload, { rejectValue: string }>(
  'user/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseURL}/signup`, userData);
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const refreshToken = createAsyncThunk<User, string, { state: RootState, rejectValue: string }>(
    'user/refresh',
    async (refreshToken, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${apiBaseURL}/refresh-token`, { refreshToken });
        if (response.data && response.data.accessToken && response.data.refreshToken) {
          // Assuming the API correctly returns an object with accessToken, refreshToken, and any other expected properties
          return response.data as User;
        } else {
          return rejectWithValue('Invalid response from server');
        }
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Network error");
      }
    }
);


const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(refreshToken.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.error = action.payload;
        state.isAuth = false;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
