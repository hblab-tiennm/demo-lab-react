import { apiClient } from '../api/apiClient';

/**
 * Post Repository
 * Handles CRUD API calls for posts
 */
export class PostRepository {
  /**
   * Get all posts with pagination
   * @param {Object} params - { page, limit }
   * @returns {Promise<{ data: Post[], meta: Object }>}
   */
  async getPosts(params = { page: 1, limit: 10 }) {
    const response = await apiClient.get('/posts', { params });
    return response.data;
  }

  /**
   * Get post by ID
   * @param {string} id
   * @returns {Promise<Post>}
   */
  async getPostById(id) {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  }

  /**
   * Create new post
   * @param {Object} data - { translations: [...] }
   * @returns {Promise<Post>}
   */
  async createPost(data) {
    const response = await apiClient.post('/posts', data);
    return response.data;
  }

  /**
   * Update post
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Post>}
   */
  async updatePost(id, data) {
    const response = await apiClient.put(`/posts/${id}`, data);
    return response.data;
  }

  /**
   * Delete post
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deletePost(id) {
    await apiClient.delete(`/posts/${id}`);
  }
}

// Singleton instance
export const postRepository = new PostRepository();
