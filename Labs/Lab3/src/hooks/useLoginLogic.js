import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { authService } from '../utils/authService';
import { validators } from '../utils/validators';
import { loginReducer, initialLoginState, LOGIN_ACTIONS } from '../store/login/LoginReducer';

/**
 * Custom hook để quản lý logic của trang Login
 * Xử lý form state, validation, và authentication
 */
export function useLoginLogic() {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const navigate = useNavigate();
  const { isLoading: authLoading, error: authError, login, setError, clearError } = useAuth();

  /**
   * Xử lý khi người dùng nhập input
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      dispatch({ type: LOGIN_ACTIONS.SET_USERNAME, payload: value });
    } else if (name === 'password') {
      dispatch({ type: LOGIN_ACTIONS.SET_PASSWORD, payload: value });
    }
  };

  /**
   * Xử lý submit form đăng nhập
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    dispatch({ type: LOGIN_ACTIONS.CLEAR_FIELD_ERRORS });

    // Validation
    const errors = validators.validateLoginForm(state.username, state.password);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: LOGIN_ACTIONS.SET_FIELD_ERROR, payload: errors });
      return;
    }

    try {
      // Start loading
      dispatch({ type: LOGIN_ACTIONS.LOGIN_START });

      // Gọi API đăng nhập
      const user = await authService.login(state.username, state.password);

      // Lưu user vào context
      login(user);

      // Login success
      dispatch({ type: LOGIN_ACTIONS.LOGIN_SUCCESS });

      // Navigate về trang chủ
      setTimeout(() => {
  if (user.role === "admin") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}, 300);

    } catch (err) {
      const errorMsg = err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
      setError(errorMsg);
      dispatch({ type: LOGIN_ACTIONS.LOGIN_ERROR, payload: errorMsg });
    }
  };

  /**
   * Xử lý khi người dùng nhấn Hủy bỏ
   */
  const handleCancel = () => {
    dispatch({ type: LOGIN_ACTIONS.RESET_FORM });
    clearError();
    navigate('/');
  };

  return {
    // Form state
    username: state.username,
    password: state.password,
    fieldErrors: state.fieldErrors,
    
    // Loading state
    isLoading: state.isLoading,
    
    // Global auth error
    error: authError,
    
    // Handlers
    handleInputChange,
    handleSubmit,
    handleCancel,
  };
}
