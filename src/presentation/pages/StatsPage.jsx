import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { useStats } from '../hooks/useStats';

const COLORS = ['#667eea', '#764ba2', '#22c55e', '#fbbf24'];

/**
 * Stats Page - Dashboard statistics with charts
 */
export function StatsPage() {
    const { stats, loading, error, refresh } = useStats();

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Chart data
    const barData = [
        { name: 'Users', value: stats.totalUsers, fill: '#667eea' },
        { name: 'Posts', value: stats.totalPosts, fill: '#764ba2' },
        { name: 'Verified', value: stats.verifiedUsers, fill: '#22c55e' },
    ];

    const pieData = [
        { name: 'Verified', value: stats.verifiedUsers || 0 },
        { name: 'Unverified', value: Math.max(0, stats.totalUsers - stats.verifiedUsers) },
    ];

    return (
        <DashboardLayout>
            <div className="page-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ color: '#fff', margin: 0 }}>📊 Thống kê tổng quan</h3>
                    <button onClick={refresh} className="btn-primary" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}>
                        🔄 Refresh
                    </button>
                </div>

                {error && (
                    <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#ef4444' }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Tổng Users</h3>
                            <span className="card-icon">👥</span>
                        </div>
                        <p className="card-value">{loading ? '...' : stats.totalUsers}</p>
                        <p className="card-subtitle">Người dùng đăng ký</p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Tổng Posts</h3>
                            <span className="card-icon">📝</span>
                        </div>
                        <p className="card-value">{loading ? '...' : stats.totalPosts}</p>
                        <p className="card-subtitle">Bài viết đã tạo</p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Email Verified</h3>
                            <span className="card-icon">✅</span>
                        </div>
                        <p className="card-value">{loading ? '...' : stats.verifiedUsers}</p>
                        <p className="card-subtitle">Đã xác thực email</p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Tỷ lệ xác thực</h3>
                            <span className="card-icon">📈</span>
                        </div>
                        <p className="card-value">
                            {loading ? '...' : stats.totalUsers > 0 
                                ? Math.round((stats.verifiedUsers / stats.totalUsers) * 100) + '%'
                                : '0%'
                            }
                        </p>
                        <p className="card-subtitle">Users đã xác thực</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                    {/* Bar Chart */}
                    <div className="dashboard-card">
                        <h4 style={{ color: '#fff', marginTop: 0, marginBottom: '24px' }}>📊 Tổng quan số liệu</h4>
                        {loading ? (
                            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>⏳ Đang tải...</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: 'rgba(0,0,0,0.8)', 
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#667eea" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Pie Chart */}
                    <div className="dashboard-card">
                        <h4 style={{ color: '#fff', marginTop: 0, marginBottom: '24px' }}>🥧 Tỷ lệ xác thực Email</h4>
                        {loading ? (
                            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>⏳ Đang tải...</p>
                            </div>
                        ) : stats.totalUsers === 0 ? (
                            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Chưa có dữ liệu</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#22c55e' : '#ef4444'} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: 'rgba(0,0,0,0.8)', 
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Verified</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Unverified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Users */}
                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ color: '#fff', marginBottom: '16px' }}>👥 Users gần đây</h3>
                    {loading ? (
                        <div className="dashboard-card" style={{ textAlign: 'center', padding: '24px' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>⏳ Đang tải...</p>
                        </div>
                    ) : stats.recentUsers.length === 0 ? (
                        <div className="dashboard-card" style={{ textAlign: 'center', padding: '24px' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Chưa có user nào</p>
                        </div>
                    ) : (
                        <div className="dashboard-card">
                            {stats.recentUsers.map((user, index) => (
                                <div 
                                    key={user.id} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px',
                                        padding: '12px 0',
                                        borderBottom: index < stats.recentUsers.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                                    }}
                                >
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1rem'
                                    }}>
                                        👤
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.85rem' }}>
                                            {user.email}
                                        </p>
                                    </div>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        background: user.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                                        color: user.role === 'ADMIN' ? '#ef4444' : '#667eea'
                                    }}>
                                        {user.role || 'USER'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
