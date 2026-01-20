# 📚 Hướng Dẫn Cấu Trúc Dự Án ReactJS

## 🎯 Cấu Trúc Thư Mục Mới

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   ├── Orchid.jsx
│   ├── ListOfOrchid.jsx
│   ├── SearchBar.jsx
│   ├── FilterSearch.jsx
│   ├── FilterSort.jsx
│   ├── CurouselBanner.jsx
│   └── ConfirmModal.jsx
│
├── pages/               # Các trang chính
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx        # ✨ Xây dựng lại với useReducer & useContext
│   └── OrchidDetails.jsx
│
├── layouts/             # Các layout (bố cục)
│   ├── MainLayout.jsx
│   ├── HomeLayout.jsx
│   ├── AboutLayout.jsx
│   └── ContactLayout.jsx
│
├── context/             # ✨ Quản lý state toàn cục với Context API
│   └── AuthContext.jsx  # Authentication context với useReducer
│
├── hooks/               # ✨ Custom hooks
│   └── useAuth.js       # Hook để sử dụng authentication
│
├── utils/               # ✨ Các hàm tiện ích
│   ├── validators.js    # Validation functions
│   └── authService.js   # Authentication service (mô phỏng API)
│
├── data/                # Dữ liệu tĩnh
│   ├── banner.js
│   └── listOrchids.js
│
├── assets/              # Tài nguyên (ảnh, icon, v.v.)
│
├── App.jsx              # Root component
├── main.jsx             # Entry point
├── index.css            # Global styles
└── App.css              # App styles
```

## 🔐 Authentication Flow (Luồng Xác Thực)

### 1. **AuthContext (Context API + useReducer)**
- Quản lý trạng thái xác thực toàn cục
- Lưu trữ user info, loading state, error message
- Actions: LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, CLEAR_ERROR

### 2. **useAuth Hook**
- Custom hook để truy cập auth context
- Provides: `user`, `isLoading`, `error`, `isAuthenticated`
- Methods: `login()`, `logout()`, `setError()`, `clearError()`, `startLoading()`

### 3. **Login Page**
- Sử dụng `useAuth` hook
- Validation qua `validators.js`
- API call qua `authService.js`
- State management qua Context

### 4. **ProtectedRoute Component**
- Kiểm tra nếu user đã xác thực
- Nếu chưa, chuyển hướng đến /login

## 💾 Sử Dụng AuthContext

### Wrap ứng dụng với AuthProvider
```jsx
// src/main.jsx
import { AuthProvider } from "./context/AuthContext";

<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

### Sử dụng useAuth trong component
```jsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Vui lòng đăng nhập</p>;
  }
  
  return (
    <div>
      <p>Xin chào, {user.fullName}!</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}
```

## 🧪 Test Credentials

### Tài khoản Admin
- **Username:** admin
- **Password:** 123456

### Tài khoản User
- **Username:** user
- **Password:** 123456

## 📝 Validation Rules

### Username
- Không được để trống
- Tối thiểu 3 ký tự
- Tối đa 20 ký tự
- Chỉ chứa chữ cái, số và dấu gạch dưới

### Password
- Không được để trống
- Tối thiểu 6 ký tự
- Tối đa 50 ký tự

## 🚀 Cách Mở Rộng

### Thêm Context Mới
1. Tạo file trong `src/context/` (ví dụ: `UserContext.jsx`)
2. Tạo Context, Reducer, Provider
3. Tạo Custom Hook trong `src/hooks/`
4. Wrap trong `main.jsx`

### Thêm Custom Hook Mới
1. Tạo file trong `src/hooks/` (ví dụ: `useForm.js`)
2. Export hook function
3. Import và sử dụng trong components

### Thêm Utility Functions
1. Tạo file trong `src/utils/` (ví dụ: `dateUtils.js`)
2. Export functions
3. Import khi cần

## 🔄 State Flow Diagram

```
User Login
    ↓
Login Page Component
    ↓
authService.login() → Promise
    ↓
useAuth() → dispatch(LOGIN_SUCCESS)
    ↓
AuthContext Update
    ↓
Component Re-render
    ↓
Navigate to Home
```

## 📌 Các File Quan Trọng

| File | Mục Đích |
|------|----------|
| `src/context/AuthContext.jsx` | Quản lý auth state với useReducer |
| `src/hooks/useAuth.js` | Custom hook cho auth |
| `src/utils/authService.js` | Mô phỏng API login |
| `src/utils/validators.js` | Validation functions |
| `src/pages/Login.jsx` | Trang login mới |
| `src/components/ProtectedRoute.jsx` | Bảo vệ các route |
| `src/main.jsx` | Wrap app với AuthProvider |

## 💡 Best Practices

1. **Luôn sử dụng custom hooks** thay vì trực tiếp gọi context
2. **Tách logic validation** ra khỏi component
3. **Sử dụng ProtectedRoute** cho những page cần xác thực
4. **Mỗi context có một custom hook** tương ứng
5. **Lưu user data vào localStorage** để persist login state

## 🎓 Học Thêm

- [React Context API](https://react.dev/reference/react/useContext)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React Router](https://reactrouter.com/)
