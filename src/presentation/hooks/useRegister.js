import { useState } from 'react';
import { RegisterUseCase } from '../../application/auth/register.usecase';
import { authRepository } from '../../infrastructure/repositories/auth.repository';

// Create usecase instance
const registerUseCase = new RegisterUseCase(authRepository);

/**
 * useRegister ViewModel Hook
 * Manages registration form state and logic
 */
export function useRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setResponse(null);

    try {
      const result = await registerUseCase.execute(formData);
      setResponse(result);
      setMessage({
        type: 'success',
        text: 'Đăng ký thành công!',
      });
      resetForm();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || error.message || 'Đăng ký thất bại. Vui lòng thử lại!',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    response,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
