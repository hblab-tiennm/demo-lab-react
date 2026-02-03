import { DashboardLayout } from '../components/DashboardLayout';
import { useAuthStore } from '../../infrastructure/store/authStore';

/**
 * Home Page Component
 * Dashboard home with welcome message and quick stats
 */
export function HomePage() {
    const { user } = useAuthStore();

    return (
        <DashboardLayout>
            <div className="page-content">
                <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 style={{ color: '#fff', margin: '0 0 8px 0' }}>
                        🎉 Chào mừng, {user?.firstName || 'User'}!
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                        Đây là trang Dashboard quản lý. Chọn menu bên trái để bắt đầu.
                    </p>
                </div>

                <h3 style={{ color: '#fff', marginBottom: '16px' }}>📊 Tổng quan nhanh</h3>
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Quản lý Users</h3>
                            <span className="card-icon">👥</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            Xem và quản lý danh sách người dùng
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Quản lý Posts</h3>
                            <span className="card-icon">📝</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            Tạo và quản lý bài viết
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Hồ sơ cá nhân</h3>
                            <span className="card-icon">👤</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            Xem và cập nhật thông tin cá nhân
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Thống kê</h3>
                            <span className="card-icon">📊</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            Xem báo cáo và biểu đồ
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
