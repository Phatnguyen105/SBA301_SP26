/**
 * Authentication service
 * Mô phỏng các cuộc gọi API và logic xác thực
 */

// Mock user database
const MOCK_USERS = {
  admin: {
    id: 1,
    username: 'admin',
    password: '123456',
    email: 'admin@example.com',
    fullName: 'Administrator',
  },
  user: {
    id: 2,
    username: 'user',
    password: '123456',
    email: 'user@example.com',
    fullName: 'Test User',
  },
};

export const authService = {
  /**
   * Đăng nhập người dùng
   * @param {string} username - Tên người dùng
   * @param {string} password - Mật khẩu
   * @returns {Promise<Object>} User data nếu thành công
   */
  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      // Mô phỏng delay API
      setTimeout(() => {
        const user = MOCK_USERS[username.toLowerCase()];

        if (!user) {
          reject({
            type: 'USER_NOT_FOUND',
            message: 'Tên đăng nhập không tồn tại',
          });
          return;
        }

        if (user.password !== password) {
          reject({
            type: 'INVALID_PASSWORD',
            message: 'Mật khẩu không chính xác',
          });
          return;
        }

        // Trả về user data (không lưu password)
        const { password: _, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      }, 1000);
    });
  },

  /**
   * Đăng xuất
   */
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  /**
   * Kiểm tra xem user đã xác thực hay chưa
   */
  verifyToken: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user ? true : false);
      }, 300);
    });
  },
};
