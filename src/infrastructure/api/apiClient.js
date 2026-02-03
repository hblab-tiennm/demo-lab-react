import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * API Client with interceptors for auto-refresh token
 */
class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request Interceptor: Attach Access Token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle 401 and Refresh Token
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              this.handleLogout();
              return Promise.reject(error);
            }

            const response = await axios.post(`${API_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleLogout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Optionally redirect to login
    // window.location.href = '/login';
  }

  get instance() {
    return this.client;
  }

  // Convenience methods
  get(url, config) {
    return this.client.get(url, config);
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  put(url, data, config) {
    return this.client.put(url, data, config);
  }

  delete(url, config) {
    return this.client.delete(url, config);
  }
}

// Singleton instance
export const apiClient = new ApiClient();
