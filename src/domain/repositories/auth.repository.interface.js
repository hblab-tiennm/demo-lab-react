/**
 * Auth Repository Interface
 * Domain layer contract for authentication operations
 */

/**
 * Register DTO
 * @typedef {Object} RegisterDTO
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} [phone]
 */

/**
 * Login DTO
 * @typedef {Object} LoginDTO
 * @property {string} email
 * @property {string} password
 */

/**
 * Token Response
 * @typedef {Object} TokenResponse
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {number} expiresIn
 */

/**
 * Auth Response
 * @typedef {Object} AuthResponse
 * @property {import('../entities/user.entity').User} user
 * @property {TokenResponse} token
 */

/**
 * Auth Repository Interface (for documentation/reference)
 * In production, this would be implemented by AuthRepository
 */
/* eslint-disable no-unused-vars */
export const AuthRepositoryInterface = {
  register: async (dto) => {},
  login: async (dto) => {},
  refreshToken: async (refreshToken) => {},
  logout: async () => {},
};
/* eslint-enable no-unused-vars */