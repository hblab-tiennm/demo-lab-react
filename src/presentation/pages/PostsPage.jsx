import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { usePosts } from '../hooks/usePosts';

/**
 * Posts Page - CRUD posts with real API data
 */
export function PostsPage() {
    const { posts, loading, error, refresh, createPost, deletePost } = usePosts();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');

        const result = await createPost({
            title: [
                { languageCode: 'vi_VN', text: formData.title }
            ],
            description: [
                { languageCode: 'vi_VN', text: formData.description }
            ]
        });

        setFormLoading(false);

        if (result.success) {
            setShowForm(false);
            setFormData({ title: '', description: '' });
        } else {
            setFormError(result.error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            const result = await deletePost(id);
            if (!result.success) {
                alert('Xóa thất bại: ' + result.error);
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="page-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ color: '#fff', margin: 0 }}>Danh sách bài viết ({posts.length})</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={refresh} className="btn-primary" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}>
                            🔄 Refresh
                        </button>
                        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                            {showForm ? '❌ Đóng' : '➕ Tạo bài viết'}
                        </button>
                    </div>
                </div>

                {/* Create Post Form */}
                {showForm && (
                    <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                        <h4 style={{ color: '#fff', marginTop: 0 }}>Tạo bài viết mới</h4>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '8px' }}>Tiêu đề</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontSize: '1rem'
                                    }}
                                    placeholder="Nhập tiêu đề bài viết"
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '8px' }}>Nội dung</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Nhập nội dung bài viết"
                                />
                            </div>
                            {formError && (
                                <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#ef4444' }}>
                                    ⚠️ {formError}
                                </div>
                            )}
                            <button 
                                type="submit" 
                                disabled={formLoading}
                                className="btn-primary" 
                                style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}
                            >
                                {formLoading ? '⏳ Đang tạo...' : '✅ Tạo bài viết'}
                            </button>
                        </form>
                    </div>
                )}

                {error && (
                    <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#ef4444' }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Posts Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '48px' }}>
                        ⏳ Đang tải bài viết...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="dashboard-card" style={{ textAlign: 'center', padding: '48px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                            📝 Chưa có bài viết nào. Tạo bài viết đầu tiên!
                        </p>
                    </div>
                ) : (
                    <div className="dashboard-cards">
                        {posts.map((post) => (
                            <div key={post.id} className="dashboard-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>
                                            {post.translations?.[0]?.title || 'Untitled'}
                                        </h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 12px 0', fontSize: '0.9rem' }}>
                                            {post.translations?.[0]?.description?.substring(0, 100)}...
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(post.id)}
                                        style={{
                                            padding: '8px 12px',
                                            background: 'rgba(239, 68, 68, 0.2)',
                                            color: '#ef4444',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                    📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
