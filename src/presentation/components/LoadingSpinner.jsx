/**
 * Loading Spinner Component
 */
export function LoadingSpinner({ size = 'medium', message = '' }) {
    const sizes = {
        small: { width: '20px', height: '20px' },
        medium: { width: '40px', height: '40px' },
        large: { width: '60px', height: '60px' },
    };

    return (
        <div style={styles.container}>
            <div style={{ ...styles.spinner, ...sizes[size] }} />
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    spinner: {
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #4f46e5',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    message: {
        marginTop: '10px',
        color: '#666',
        fontSize: '14px',
    },
};

// Add keyframes to document if not exists
if (typeof document !== 'undefined') {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    try {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
        // Keyframes already exists or sheet not available
    }
}
