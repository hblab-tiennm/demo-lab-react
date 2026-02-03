import { apiClient } from '../api/apiClient';
import { createUser } from '../../domain/entities/user.entity';

/**
 * Auth Repository Implementation
 * Implements IAuthRepository using apiClient
 */
export class AuthRepository {
  /**
   * Register a new user
   * @param {import('../../domain/repositories/auth.repository.interface').RegisterDTO} dto
   * @returns {Promise<import('../../domain/entities/user.entity').User>}
   */
  async register(dto) {
    const response = await apiClient.post('/auth/register', dto);
    return createUser(response.data);
  }

  /**
   * Login user
   * @param {import('../../domain/repositories/auth.repository.interface').LoginDTO} dto
   * @returns {Promise<import('../../domain/repositories/auth.repository.interface').AuthResponse>}
   */
  async login(dto) {
    const response = await apiClient.post('/auth/login', dto);
    const { user, accessToken } = response.data;

    // Persist tokens - API returns { expiresIn, token } in accessToken
    if (accessToken?.token) {
      localStorage.setItem('accessToken', accessToken.token);
    }

    return {
      user: createUser(user),
      token: {
        accessToken: accessToken?.token,
        expiresIn: accessToken?.expiresIn,
      },
    };
  }

  /**
   * Refresh token
   * @param {string} refreshToken
   * @returns {Promise<import('../../domain/repositories/auth.repository.interface').AuthResponse>}
   */
  async refreshToken(refreshToken) {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    const { user, token } = response.data;

    // Update tokens
    if (token?.accessToken) {
      localStorage.setItem('accessToken', token.accessToken);
    }
    if (token?.refreshToken) {
      localStorage.setItem('refreshToken', token.refreshToken);
    }

    return {
      user: createUser(user),
      token,
    };
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

// Singleton instance
export const authRepository = new AuthRepository();
