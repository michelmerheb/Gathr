import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import * as Keychain from 'react-native-keychain';


export interface User {
  message: string;
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
  isAuth: boolean;
  posts: any[]; 
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
}


interface AuthPayload {
  email: string;
  password: string;
  token_expires_in?: string;
}

export const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'https://backend-practice.euriskomobility.me';

export const createUser = createAsyncThunk<User, AuthPayload, { rejectValue: string }>(
  'user/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseURL}/signup`, userData);
      if (response.data) {
        console.log("Signup successful!");
        await Keychain.setGenericPassword('token', JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
        return response.data;
      } else {
        console.error("Signup failed: Invalid server response");
        return rejectWithValue('Invalid response from server');
      }
    } catch (error : any) {
        return rejectWithValue("User already exists");
      }
  }
);

export const loginUser = createAsyncThunk<User, AuthPayload, { rejectValue: string }>(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseURL}/login`, loginData);
      if (response.data) {
        console.log("Login successful");
        await Keychain.setGenericPassword('token', JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
        return response.data;
      } else {
        console.error("Login failed: Invalid server response");
        return rejectWithValue('Invalid response from server');
      }
    } catch (error : any) {
        return rejectWithValue('Incorrect email or password');
      }
  }
);

export const refreshToken = createAsyncThunk<User, { refreshToken: string }, { state: RootState, rejectValue: string }>(
  'user/refresh',
  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseURL}/refresh-token`, { refreshToken, token_expires_in: '30m' });
      if (response.data && response.data.accessToken) {
        console.log("Token refresh successful");
        await Keychain.setGenericPassword('token', JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
        return {
            message: "Token refreshed successfully",
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        };
      } else {
                console.error("Token refresh failed: Invalid server response");
        return rejectWithValue('Invalid response from server');
      }
  } catch (error: any) {
      return rejectWithValue(error.response?.data || "Network error");
    }
}
);


export const fetchPosts = createAsyncThunk<
  { posts: any[]; pagination: any }, 
  { page: number; pageSize: number }, 
  { state: RootState; rejectValue: string } 
>(
  'user/fetchPosts',
  async ({ page, pageSize }, { getState, rejectWithValue }) => {
    try {
      const accessToken = (getState().user.user as User).accessToken; // Get access token from state
      const response = await axios.get(`${apiBaseURL}/posts`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { page, pageSize }
      });
      if (response.data) {
        return { posts: response.data.results, pagination: response.data.pagination };
      } else {
        return rejectWithValue('No data received from server');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);



const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  posts: [],
  pagination: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      Keychain.resetGenericPassword();
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
        state.error = null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.accessToken}`;
    })
    .addCase(loginUser.rejected, (state, action: PayloadAction<string | null | undefined>) => {
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
    })
    builder
  .addCase(fetchPosts.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchPosts.fulfilled, (state, action) => {
    state.loading = false;
    state.posts = action.payload.posts;
    state.pagination = action.payload.pagination;
  })
  .addCase(fetchPosts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  }
});

export const { logout, setAuthStatus } = userSlice.actions;
export default userSlice.reducer;
