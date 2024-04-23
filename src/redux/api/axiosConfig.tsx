import axios from 'axios';
import { store } from '../store';  // Make sure the path is correct
import { refreshToken as refreshAuthToken } from '../Slices/UserSlice';  // Make sure the path is correct

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // Check if the status is 401 Unauthorized and it's the first retry attempt
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark this request as already retried
      try {
        const state = store.getState();
        const refreshToken = state.user.user?.refreshToken;  // Access refreshToken safely

        // Check if refreshToken exists
        if (!refreshToken) {
          return Promise.reject("No refresh token available");
        }

        // Dispatch the refreshToken action
        const result = await store.dispatch(refreshAuthToken(refreshToken));

        if (result.type.endsWith('fulfilled')) {
          const newToken = result.payload.accessToken;  // This assumes payload is always defined and has accessToken
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } else {
          return Promise.reject("Failed to refresh token");
        }
        
      } catch (refreshError) {
        // Handle any errors that occur during the token refresh process
        return Promise.reject(refreshError);
      }
    }
    // If the error is not a 401 or has already been retried, reject the promise with the original error
    return Promise.reject(error);
  }
);
