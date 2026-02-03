import { useState, useRef } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuthStore } from '../../infrastructure/store/authStore';

/**
 * Profile Page - View/Edit current user profile with avatar upload
 */
export function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
    const fileInputRef = useRef(null);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        // Simulated save - in real app would call API
        setTimeout(() => {
            // Update local user state
            if (setUser) {
                setUser({ ...user, ...formData, avatar: avatarPreview });
            }
            setSaving(false);
            setMessage({ type: 'success', text: 'Đã lưu thông tin thành công!' });
            setIsEditing(false);
        }, 1000);
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phone: user?.phone || '',
        });
        setAvatarPreview(user?.avatar || null);
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh!' });
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'File ảnh phải nhỏ hơn 5MB!' });
                return;
            }
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <DashboardLayout>
            <div className="page-content">
                {/* Profile Header */}
                <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div 
                            onClick={handleAvatarClick}
                            style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                cursor: isEditing ? 'pointer' : 'default',
                                position: 'relative',
                                overflow: 'hidden',
                                border: isEditing ? '3px dashed rgba(255,255,255,0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {avatarPreview ? (
                                <img 
                                    src={avatarPreview} 
                                    alt="Avatar" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        borderRadius: '50%'
                                    }} 
                                />
                            ) : '👤'}
                            {isEditing && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'rgba(0,0,0,0.7)',
                                    padding: '8px',
                                    textAlign: 'center',
                                    fontSize: '0.7rem',
                                    color: '#fff'
                                }}>
                                    📷 Đổi ảnh
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h2 style={{ color: '#fff', margin: '0 0 8px 0' }}>
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                                {user?.email}
                            </p>
                            <span style={{ 
                                display: 'inline-block',
                                marginTop: '12px',
                                padding: '6px 16px',
                                background: user?.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(102, 126, 234, 0.3)',
                                color: user?.role === 'ADMIN' ? '#ef4444' : '#667eea',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {user?.role || 'USER'}
                            </span>
                        </div>
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="btn-primary" 
                                style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}
                            >
                                ✏️ Chỉnh sửa
                            </button>
                        )}
                    </div>
                </div>

                {/* Message */}
                {message.text && (
                    <div style={{ 
                        marginBottom: '16px', 
                        padding: '16px', 
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
                        borderRadius: '12px', 
                        color: message.type === 'success' ? '#22c55e' : '#ef4444' 
                    }}>
                        {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                    </div>
                )}

                {/* Profile Details */}
                <h3 style={{ color: '#fff', marginBottom: '16px' }}>Thông tin chi tiết</h3>
                <div className="dashboard-card">
                    {isEditing ? (
                        <form onSubmit={handleSave}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Họ</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Tên</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(255,255,255,0.02)',
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Số điện thoại</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder="+84xxxxxxxxx"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                                <button 
                                    type="submit"
                                    disabled={saving}
                                    className="btn-primary" 
                                    style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}
                                >
                                    {saving ? '⏳ Đang lưu...' : '💾 Lưu thay đổi'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    style={{ 
                                        padding: '12px 24px', 
                                        border: '1px solid rgba(255,255,255,0.2)', 
                                        background: 'transparent',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ❌ Hủy
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Họ</label>
                                <p style={{ color: '#fff', margin: '4px 0 0 0', fontSize: '1.1rem' }}>{user?.lastName || '-'}</p>
                            </div>
                            <div>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Tên</label>
                                <p style={{ color: '#fff', margin: '4px 0 0 0', fontSize: '1.1rem' }}>{user?.firstName || '-'}</p>
                            </div>
                            <div>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Email</label>
                                <p style={{ color: '#fff', margin: '4px 0 0 0', fontSize: '1.1rem' }}>{user?.email || '-'}</p>
                            </div>
                            <div>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Số điện thoại</label>
                                <p style={{ color: '#fff', margin: '4px 0 0 0', fontSize: '1.1rem' }}>{user?.phone || '-'}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Account Settings */}
                <h3 style={{ color: '#fff', marginTop: '32px', marginBottom: '16px' }}>⚙️ Cài đặt tài khoản</h3>
                <div className="dashboard-cards" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="dashboard-card">
                        <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>🔐 Đổi mật khẩu</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 16px 0' }}>
                            Cập nhật mật khẩu để bảo mật tài khoản
                        </p>
                        <button 
                            style={{ 
                                padding: '10px 20px', 
                                border: '1px solid rgba(255,255,255,0.2)', 
                                background: 'transparent',
                                color: '#fff',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                    <div className="dashboard-card">
                        <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>📧 Xác thực email</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 16px 0' }}>
                            {user?.settings?.isEmailVerified ? 'Email đã được xác thực' : 'Email chưa được xác thực'}
                        </p>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            background: user?.settings?.isEmailVerified ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                            color: user?.settings?.isEmailVerified ? '#22c55e' : '#fbbf24'
                        }}>
                            {user?.settings?.isEmailVerified ? '✅ Đã xác thực' : '⏳ Chưa xác thực'}
                        </span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
