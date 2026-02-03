import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css';

/**
 * Login Page Component
 * Presentation layer - uses ViewModel hook for logic
 */
export function LoginPage() {
    const navigate = useNavigate();
    const { formData, loading, message, handleChange, handleSubmit } = useLogin();

    const onSubmit = async (e) => {
        const result = await handleSubmit(e);
        if (result?.success) {
            // Redirect to home
            navigate('/');
        }
    };

    return (
        <div className="app">
            <div className="container">
                <div className="form-wrapper">
                    <h1>Đăng Nhập</h1>
                    <p className="subtitle">Chào mừng bạn quay trở lại</p>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Nhập mật khẩu"
                            />
                        </div>

                        {message.text && (
                            <div className={`message ${message.type}`}>{message.text}</div>
                        )}

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>
                            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
