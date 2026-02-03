import { useState } from 'react';
import { LoginUseCase } from '../../application/auth/login.usecase';
import { authRepository } from '../../infrastructure/repositories/auth.repository';
import { useAuthStore } from '../../infrastructure/store/authStore';

// Create usecase instance
const loginUseCase = new LoginUseCase(authRepository);

/**
 * useLogin ViewModel Hook
 * Manages login form state and logic
 */
export function useLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await loginUseCase.execute(formData);
      
      // Update global auth state
      await login(result.user, result.token);
      
      setMessage({
        type: 'success',
        text: 'Đăng nhập thành công!',
      });

      // Return success for redirect
      return { success: true, user: result.user };
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || error.message || 'Đăng nhập thất bại!',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    handleChange,
    handleSubmit,
  };
}
