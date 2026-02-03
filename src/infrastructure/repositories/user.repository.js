import { apiClient } from '../api/apiClient';

/**
 * User Repository
 * Handles API calls for user management
 */
export class UserRepository {
  /**
   * Get all users with pagination
   * @param {Object} params - { page, limit }
   * @returns {Promise<{ data: User[], meta: { page, limit, total } }>}
   */
  async getUsers(params = { page: 1, limit: 10 }) {
    const response = await apiClient.get('/users', { params });
    return response.data;
  }

  /**
   * Get user by ID
   * @param {string} id
   * @returns {Promise<User>}
   */
  async getUserById(id) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  /**
   * Get admin users
   * @returns {Promise<User[]>}
   */
  async getAdminUsers() {
    const response = await apiClient.get('/users/admin');
    return response.data;
  }

  /**
   * Update user
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<User>}
   */
  async updateUser(id, data) {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  }
}

// Singleton instance
export const userRepository = new UserRepository();
