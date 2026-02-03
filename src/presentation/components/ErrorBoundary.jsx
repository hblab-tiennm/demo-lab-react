import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 */
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        // Log error to service
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div style={styles.container}>
                        <h2 style={styles.title}>Đã xảy ra lỗi</h2>
                        <p style={styles.message}>
                            Vui lòng tải lại trang hoặc thử lại sau.
                        </p>
                        <button
                            style={styles.button}
                            onClick={() => window.location.reload()}
                        >
                            Tải lại trang
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={styles.details}>
                                <summary>Chi tiết lỗi</summary>
                                <pre style={styles.pre}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#dc3545',
    },
    message: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    details: {
        marginTop: '20px',
        textAlign: 'left',
        maxWidth: '600px',
    },
    pre: {
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '5px',
        overflow: 'auto',
        fontSize: '12px',
    },
};
