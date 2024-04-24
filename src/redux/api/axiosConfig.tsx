import axios from 'axios';
import { store } from '../store';
import { refreshToken as refreshAuthToken } from '../Slices/UserSlice';
import * as Keychain from 'react-native-keychain'
import { apiBaseURL } from '../Slices/UserSlice';

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const credentials = await Keychain.getGenericPassword();
      const tokens = credentials ? JSON.parse(credentials.password) : null;
      if (tokens && tokens.refreshToken) {
        const response = await axios.post(`${apiBaseURL}/refresh-token`, {
          refreshToken: tokens.refreshToken,
          token_expires_in: '30m'
        });
        if (response.status === 200) {
          store.dispatch(refreshAuthToken(response.data));
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);


