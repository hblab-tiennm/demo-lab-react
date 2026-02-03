import { useState, useEffect, useCallback } from 'react';
import { postRepository } from '../../infrastructure/repositories/post.repository';

/**
 * usePosts Hook
 * Fetches and manages posts list state with CRUD operations
 */
export function usePosts(initialPage = 1, initialLimit = 10) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
  });

  const fetchPosts = useCallback(async (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postRepository.getPosts({ page, limit });
      
      if (Array.isArray(response)) {
        setPosts(response);
        setPagination(prev => ({ ...prev, total: response.length }));
      } else if (response.data) {
        setPosts(response.data);
        setPagination({
          page: response.meta?.page || page,
          limit: response.meta?.limit || limit,
          total: response.meta?.total || response.data.length,
        });
      } else {
        setPosts([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (data) => {
    try {
      const newPost = await postRepository.createPost(data);
      setPosts(prev => [newPost, ...prev]);
      return { success: true, data: newPost };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const updatePost = async (id, data) => {
    try {
      const updated = await postRepository.updatePost(id, data);
      setPosts(prev => prev.map(p => p.id === id ? updated : p));
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const deletePost = async (id) => {
    try {
      await postRepository.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const goToPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
    fetchPosts(page, pagination.limit);
  };

  const refresh = () => fetchPosts();

  return {
    posts,
    loading,
    error,
    pagination,
    goToPage,
    refresh,
    createPost,
    updatePost,
    deletePost,
  };
}
