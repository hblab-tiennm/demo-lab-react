import { useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useUsers } from '../hooks/useUsers';

/**
 * Users Page - List all users with real API data
 */
export function UsersPage() {
    const { users, loading, error, pagination, refresh } = useUsers();

    useEffect(() => {
        refresh();
    }, []);

    return (
        <DashboardLayout>
            <div className="page-content">
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Tổng Users</h3>
                            <span className="card-icon">👥</span>
                        </div>
                        <p className="card-value">{loading ? '...' : users.length}</p>
                        <p className="card-subtitle">Đã tải từ API</p>
                    </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#fff', margin: 0 }}>Danh sách Users</h3>
                    <button onClick={refresh} className="btn-primary" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                        🔄 Refresh
                    </button>
                </div>

                {error && (
                    <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#ef4444' }}>
                        ⚠️ {error}
                    </div>
                )}

                <div style={{ marginTop: '16px' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                                        ⏳ Đang tải...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                                        Chưa có user nào
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                borderRadius: '50%', 
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem'
                                            }}>
                                                {user.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : '👤'}
                                            </div>
                                        </td>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                background: user.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                                                color: user.role === 'ADMIN' ? '#ef4444' : '#667eea'
                                            }}>
                                                {user.role || 'USER'}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                background: user.settings?.isEmailVerified ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                                                color: user.settings?.isEmailVerified ? '#22c55e' : '#fbbf24'
                                            }}>
                                                {user.settings?.isEmailVerified ? '✅ Verified' : '⏳ Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
