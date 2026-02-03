/**
 * User Entity
 * Domain representation of a user
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [avatar]
 * @property {string} role
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * Create a new User entity
 * @param {Partial<User>} data
 * @returns {User}
 */
export function createUser(data = {}) {
  return {
    id: data.id || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || null,
    avatar: data.avatar || null,
    role: data.role || 'USER',
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
}
