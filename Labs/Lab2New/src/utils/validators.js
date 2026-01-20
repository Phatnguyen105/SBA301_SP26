/**
 * Validation utilities
 */

export const validators = {
  // Kiểm tra username
  validateUsername: (username) => {
    if (!username.trim()) {
      return 'Username không được để trống';
    }
    if (username.length < 3) {
      return 'Username phải có ít nhất 3 ký tự';
    }
    if (username.length > 20) {
      return 'Username không được vượt quá 20 ký tự';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username chỉ chứa chữ cái, số và dấu gạch dưới';
    }
    return null;
  },

  // Kiểm tra password
  validatePassword: (password) => {
    if (!password.trim()) {
      return 'Mật khẩu không được để trống';
    }
    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (password.length > 50) {
      return 'Mật khẩu không được vượt quá 50 ký tự';
    }
    return null;
  },

  // Kiểm tra email
  validateEmail: (email) => {
    if (!email.trim()) {
      return 'Email không được để trống';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ';
    }
    return null;
  },

  // Kiểm tra form đăng nhập
  validateLoginForm: (username, password) => {
    const errors = {};

    const usernameError = validators.validateUsername(username);
    if (usernameError) {
      errors.username = usernameError;
    }

    const passwordError = validators.validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    return errors;
  },
};
