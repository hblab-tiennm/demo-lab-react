import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './presentation/pages/LoginPage';
import { RegisterPage } from './presentation/pages/RegisterPage';
import { HomePage } from './presentation/pages/HomePage';
import { UsersPage } from './presentation/pages/UsersPage';
import { PostsPage } from './presentation/pages/PostsPage';
import { ProfilePage } from './presentation/pages/ProfilePage';
import { StatsPage } from './presentation/pages/StatsPage';

/**
 * App Component
 * Entry point with React Router
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/stats" element={<StatsPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
