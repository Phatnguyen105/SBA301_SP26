// 📚 EXAMPLES - Các ví dụ sử dụng

// ============================================
// 1️⃣  Sử dụng useAuth trong Component
// ============================================

import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Bạn cần đăng nhập để xem trang này</p>;
  }

  return (
    <div>
      <h1>Chào mừng, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}

// ============================================
// 2️⃣  Sử dụng ProtectedRoute
// ============================================

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// ============================================
// 3️⃣  Thêm Context Mới (ví dụ: UserPreference)
// ============================================

// src/context/PreferenceContext.jsx
import React, { createContext, useReducer } from 'react';

const PreferenceContext = createContext();

const preferenceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export function PreferenceProvider({ children }) {
  const [state, dispatch] = useReducer(preferenceReducer, {
    theme: 'light',
    language: 'vi',
  });

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
}

// src/hooks/usePreference.js
import { useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';

export function usePreference() {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error('usePreference must be used within PreferenceProvider');
  }

  const { state, dispatch } = context;

  return {
    theme: state.theme,
    language: state.language,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    setLanguage: (language) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
  };
}

// ============================================
// 4️⃣  Sử dụng Validation Utilities
// ============================================

import { validators } from '../utils/validators';

function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username
    const usernameError = validators.validateUsername(username);
    if (usernameError) {
      console.log(usernameError);
      return;
    }

    // Validate password
    const passwordError = validators.validatePassword(password);
    if (passwordError) {
      console.log(passwordError);
      return;
    }

    // Validate email
    const emailError = validators.validateEmail(email);
    if (emailError) {
      console.log(emailError);
      return;
    }

    // Validate form
    const errors = validators.validateLoginForm(username, password);
    if (Object.keys(errors).length > 0) {
      console.log('Form errors:', errors);
      return;
    }

    // All valid!
    console.log('Form is valid');
  };
}

// ============================================
// 5️⃣  Sử dụng Auth Service
// ============================================

import { authService } from '../utils/authService';

async function handleLogin() {
  try {
    // Login
    const user = await authService.login('admin', '123456');
    console.log('Logged in user:', user);

    // Verify token
    const isValid = await authService.verifyToken(user);
    console.log('Token is valid:', isValid);

    // Logout
    const result = await authService.logout();
    console.log('Logged out:', result);
  } catch (error) {
    console.error('Login error:', error);
  }
}

// ============================================
// 6️⃣  Wrap Multiple Providers
// ============================================

// src/main.jsx
import { AuthProvider } from './context/AuthContext';
import { PreferenceProvider } from './context/PreferenceContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PreferenceProvider>
          <App />
        </PreferenceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

// ============================================
// 7️⃣  Sử dụng Nhiều Hooks Cùng Lúc
// ============================================

import { useAuth } from '../hooks/useAuth';
import { usePreference } from '../hooks/usePreference';

function Layout() {
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = usePreference();

  return (
    <div className={`layout ${theme}`}>
      {isAuthenticated && <p>Đăng nhập: {user.username}</p>}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// ============================================
// 8️⃣  Error Handling dalam Form
// ============================================

import { useAuth } from '../hooks/useAuth';
import { authService } from '../utils/authService';
import { validators } from '../utils/validators';

function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, setError, error, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = validators.validateLoginForm(username, password);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    try {
      // Call API
      const user = await authService.login(username, password);
      // Update context
      login(user);
      // Navigate
      navigate('/dashboard');
    } catch (err) {
      // Set error in context
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Form fields */}
    </form>
  );
}

export default {};
