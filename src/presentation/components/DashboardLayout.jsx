import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../infrastructure/store/authStore';
import './DashboardLayout.css';

/**
 * Dashboard Layout Component
 * Provides sidebar navigation and main content area
 */
export function DashboardLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="dashboard-auth-prompt">
                <h2>Vui lòng đăng nhập</h2>
                <Link to="/login" className="btn-primary">Đăng nhập</Link>
            </div>
        );
    }

    const menuItems = [
        { path: '/', icon: '🏠', label: 'Trang chủ' },
        { path: '/users', icon: '👥', label: 'Quản lý Users' },
        { path: '/posts', icon: '📝', label: 'Quản lý Posts' },
        { path: '/profile', icon: '👤', label: 'Hồ sơ cá nhân' },
        { path: '/stats', icon: '📊', label: 'Thống kê' },
    ];

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1 className="logo">🚀 Dashboard</h1>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <span className="user-avatar">👤</span>
                        <span className="user-name">{user?.firstName || 'User'}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="content-header">
                    <h2 className="page-title">
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <div className="header-actions">
                        <span className="user-email">{user?.email}</span>
                    </div>
                </header>

                <div className="content-body">
                    {children}
                </div>
            </main>
        </div>
    );
}
