import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
import {RootState} from '../store';
import * as Keychain from 'react-native-keychain';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  user: Token | null;
  loading: boolean;
  error: string | null | undefined;
  isAuth: boolean;
}

interface AuthPayload {
  email: string;
  password: string;
  token_expires_in?: string;
}

const apiBaseURL = Config.REACT_APP_API_BASE_URL;

export const createUser = createAsyncThunk<
  Token,
  AuthPayload,
  {rejectValue: string}
>('user/create', async (userData, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${apiBaseURL}/signup`, userData);
    if (response.data) {
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
      return response.data;
    } else {
      console.error('Signup failed: Invalid server response');
      return rejectWithValue('Invalid response from server');
    }
  } catch (error: any) {
    return rejectWithValue('User already exists');
  }
});

export const loginUser = createAsyncThunk<
  Token,
  AuthPayload,
  {rejectValue: string}
>('user/login', async (loginData, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${apiBaseURL}/login`, loginData);
    if (response.data) {
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
      return response.data;
    } else {
      console.error('Login failed: Invalid server response');
      return rejectWithValue('Invalid response from server');
    }
  } catch (error: any) {
    return rejectWithValue('Incorrect email or password');
  }
});

export const refreshToken = createAsyncThunk<
  Token,
  {refreshToken: string},
  {state: RootState; rejectValue: string}
>('user/refresh', async ({refreshToken}, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${apiBaseURL}/refresh-token`, {
      refreshToken,
      token_expires_in: '30m',
    });
    if (response.data && response.data.accessToken) {
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
      return {
        message: 'Token refreshed successfully',
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } else {
      console.error('Token refresh failed: Invalid server response');
      return rejectWithValue('Invalid response from server');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Network error');
  }
});

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuth = false;
      Keychain.resetGenericPassword();
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<Token>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(
        createUser.rejected,
        (state, action: PayloadAction<string | null | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.isAuth = false;
        },
      )
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Token>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${action.payload.accessToken}`;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | null | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.isAuth = false;
        },
      )
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<Token>) => {
          state.user = action.payload;
          state.isAuth = true;
        },
      )
      .addCase(
        refreshToken.rejected,
        (state, action: PayloadAction<string | null | undefined>) => {
          state.error = action.payload;
          state.isAuth = false;
        },
      );
  },
});

export const {logout, setAuthStatus, clearError} = userSlice.actions;
export default userSlice.reducer;
