import { useState, useCallback } from 'react';
import { userRepository } from '../../infrastructure/repositories/user.repository';
import { postRepository } from '../../infrastructure/repositories/post.repository';

/**
 * useStats Hook
 * Fetches and aggregates statistics
 */
export function useStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    verifiedUsers: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch users and posts in parallel
      const [usersResponse, postsResponse] = await Promise.all([
        userRepository.getUsers({ page: 1, limit: 100 }),
        postRepository.getPosts({ page: 1, limit: 100 }),
      ]);

      const users = Array.isArray(usersResponse) ? usersResponse : (usersResponse.data || []);
      const posts = Array.isArray(postsResponse) ? postsResponse : (postsResponse.data || []);

      setStats({
        totalUsers: users.length,
        totalPosts: posts.length,
        verifiedUsers: users.filter(u => u.settings?.isEmailVerified).length,
        recentUsers: users.slice(0, 5),
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}
