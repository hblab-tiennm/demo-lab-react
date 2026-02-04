import { useState, useEffect, useCallback } from 'react';
import { userRepository } from '../../infrastructure/repositories/user.repository';

/**
 * useUsers Hook
 * Fetches and manages users list state
 */
export function useUsers(initialPage = 1, initialLimit = 10) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
  });

  const fetchUsers = useCallback(async (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userRepository.getUsers({ page, limit });
      
      // Handle different response formats
      if (Array.isArray(response)) {
        setUsers(response);
        setPagination(prev => ({ ...prev, total: response.length }));
      } else if (response.data) {
        setUsers(response.data);
        setPagination({
          page: response.meta?.page || page,
          limit: response.meta?.limit || limit,
          total: response.meta?.total || response.data.length,
        });
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
    fetchUsers(page, pagination.limit);
  };

  const refresh = () => fetchUsers();

  return {
    users,
    loading,
    error,
    pagination,
    goToPage,
    refresh,
  };
}
