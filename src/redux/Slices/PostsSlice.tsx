import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
import {RootState} from '../store';
import type {Token} from './UserSlice';

interface PostState {
  posts: any[];
  loading: boolean;
  error: string | null | undefined;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
}

const apiBaseURL = Config.REACT_APP_API_BASE_URL;

export const fetchPosts = createAsyncThunk<
  {posts: any[]; pagination: any},
  {page: number; pageSize: number},
  {state: RootState; rejectValue: string}
>('user/fetchPosts', async ({page, pageSize}, {getState, rejectWithValue}) => {
  try {
    const accessToken = (getState().user.user as Token).accessToken;
    const response = await axios.get(`${apiBaseURL}/posts`, {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {page, pageSize},
    });
    if (response.data) {
      return {
        posts: response.data.results,
        pagination: response.data.pagination,
      };
    } else {
      return rejectWithValue('No data received from server');
    }
  } catch (error: any) {
    return rejectWithValue('Failed to fetch posts');
  }
});

const initialState: PostState = {
  posts: [],
  pagination: null,
  loading: false,
  error: null,
};

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
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
  },
});

export const {clearError} = PostSlice.actions;
export default PostSlice.reducer;
