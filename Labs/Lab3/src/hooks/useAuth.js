import { useContext } from 'react';
import { AuthContext, AUTH_ACTIONS } from '../context/AuthContext';

/**
 * Custom hook để sử dụng authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { state, dispatch } = context;

  // Login function
  const login = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: userData,
    });
    localStorage.setItem('lab2_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    dispatch({
      type: AUTH_ACTIONS.LOGOUT,
    });
    localStorage.removeItem('lab2_user');
  };

  // Set error
  const setError = (error) => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_ERROR,
      payload: error,
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({
      type: AUTH_ACTIONS.CLEAR_ERROR,
    });
  };

  // Start loading
  const startLoading = () => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_START,
    });
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    setError,
    clearError,
    startLoading,
  };
}
