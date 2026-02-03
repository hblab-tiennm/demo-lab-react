import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import './RegisterPage.css';

/**
 * Register Page Component
 * Presentation layer - uses ViewModel hook for logic
 */
export function RegisterPage() {
    const {
        formData,
        loading,
        message,
        response,
        handleChange,
        handleSubmit,
    } = useRegister();

    return (
        <div className="app">
            <div className="container">
                <div className="form-wrapper">
                    <h1>Đăng Ký Tài Khoản</h1>
                    <p className="subtitle">Tạo tài khoản mới của bạn</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">Tên *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập tên của bạn"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Họ *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập họ của bạn"
                                />
                            </div>
                        </div>

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
                                minLength="6"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+84xxxxxxxxx (có country code)"
                            />
                        </div>

                        {message.text && (
                            <div className={`message ${message.type}`}>{message.text}</div>
                        )}

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                        </button>
                    </form>

                    {response && (
                        <div className="response-data">
                            <h3>Thông tin tài khoản đã tạo:</h3>
                            <pre>{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    )}

                    <div className="form-footer">
                        <p>
                            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

