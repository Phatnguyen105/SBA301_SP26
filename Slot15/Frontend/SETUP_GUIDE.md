# Hướng Dẫn Chạy Ứng Dụng ReactJS + JSON Server

## 📋 Cấu Hình Đã Hoàn Thành

✅ Cài đặt `json-server` (port 8080)
✅ Cài đặt `axios` 
✅ Cài đặt `concurrently` (chạy 2 terminal song song)
✅ Tạo file `db.json` với dữ liệu orchids
✅ Tạo `axiosClient.js` để kết nối API
✅ Tạo `api.js` với các hàm CRUD
✅ Update `HomeLayout.jsx` để fetch dữ liệu từ json-server

---

## 🚀 Cách Chạy Ứng Dụng

### **Option 1: Chạy cả 2 terminal cùng lúc (Recommended)**
```bash
npm run dev:all
```

**Lệnh này sẽ:**
- ✅ Khởi động json-server trên: `http://localhost:8080`
- ✅ Khởi động Vite dev server trên: `http://localhost:5173`

### **Option 2: Chạy từng terminal riêng biệt**

**Terminal 1 - JSON Server:**
```bash
npm run server
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

---

## 📊 API Endpoints Sẵn Có

Json-server tự động sinh ra các endpoint từ db.json:

### **Orchids CRUD:**
- `GET /orchids` - Lấy tất cả lan
- `GET /orchids/:id` - Lấy lan theo ID
- `POST /orchids` - Tạo lan mới
- `PUT /orchids/:id` - Cập nhật lan
- `DELETE /orchids/:id` - Xóa lan
- `GET /orchids?q=search` - Tìm kiếm

### **Users:**
- `GET /users` - Lấy tất cả users
- `POST /users` - Tạo user mới
- `PUT /users/:id` - Cập nhật user
- `DELETE /users/:id` - Xóa user

### **Cart:**
- `GET /cart` - Lấy giỏ hàng
- `POST /cart` - Thêm vào giỏ hàng
- `PUT /cart/:id` - Cập nhật item
- `DELETE /cart/:id` - Xóa item

---

## 💻 Sử Dụng API trong React Components

### **Lấy dữ liệu (GET):**
```jsx
import { useEffect, useState } from 'react';
import { orchidAPI } from '../utils/api';

function MyComponent() {
  const [orchids, setOrchids] = useState([]);

  useEffect(() => {
    orchidAPI.getAll().then(data => setOrchids(data));
  }, []);

  return <div>{orchids.map(o => <p key={o.id}>{o.orchidName}</p>)}</div>;
}
```

### **Tạo mới (POST):**
```jsx
const newOrchid = {
  orchidName: "Lan Mới",
  description: "Mô tả",
  category: "Dendrobium",
  price: 500000,
  isSpecial: false
};

await orchidAPI.create(newOrchid);
```

### **Cập nhật (PUT):**
```jsx
await orchidAPI.update(1, {
  orchidName: "Cậu nhật tên",
  price: 600000
});
```

### **Xóa (DELETE):**
```jsx
await orchidAPI.delete(1);
```

---

## 🔧 Cấu Hình axiosClient

File: `src/utils/axiosClient.js`

```javascript
baseURL: 'http://localhost:8080'  // Port của json-server
```

**Request/Response Interceptors:**
- ✅ Tự động thêm token từ localStorage vào Authorization header
- ✅ Xử lý lỗi 401 (redirect đến login)
- ✅ Trả về `response.data` trực tiếp (không cần `.data`)

---

## 📁 File Structure

```
├── db.json                    # Database cho json-server
├── package.json               # Scripts: dev, server, dev:all
├── src/
│   ├── utils/
│   │   ├── axiosClient.js    # Cấu hình axios
│   │   ├── api.js             # CRUD functions
│   │   └── validators.js
│   ├── layouts/
│   │   └── HomeLayout.jsx     # Fetch dữ liệu từ API
│   └── data/
│       └── listOrchids.js     # Dữ liệu fallback
```

---

## 🧪 Test API với Postman/Thunder Client

**Tạo request:**
- URL: `http://localhost:8080/orchids`
- Method: `GET`
- Headers: `Content-Type: application/json`

---

## ⚠️ Troubleshooting

### **Lỗi: Cannot GET /orchids**
- ✅ Kiểm tra json-server đã chạy: `npm run server`
- ✅ Kiểm tra port: `8080`

### **Lỗi: Failed to connect to localhost:8080**
- ✅ Chạy `npm run server` trước
- ✅ Kiểm tra firewall

### **Dữ liệu không cập nhật**
- ✅ Bật React DevTools để debug state
- ✅ Kiểm tra browser console log

---

## 📝 NPM Scripts Có Sẵn

```bash
npm run dev         # Chạy Vite dev server (port 5173)
npm run server      # Chạy json-server (port 8080)
npm run dev:all     # Chạy cả 2 cùng lúc ⭐
npm run build       # Build production
npm run lint        # Kiểm tra code
npm run preview     # Preview build
```

---

## ✨ Lợi Ích Của Cấu Hình Này

✅ **Full CRUD Operations** - Lấy, tạo, sửa, xóa dữ liệu
✅ **Real Backend Simulation** - Giống như API thực tế
✅ **Persistent Data** - Dữ liệu được lưu trong db.json
✅ **Hot Module Reload** - Vite tự reload khi thay đổi code
✅ **Easy Testing** - Dễ test API trước khi deploy

Happy Coding! 🎉
