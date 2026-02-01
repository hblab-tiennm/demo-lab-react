# Demo Lab React - Màn Hình Đăng Ký

Project React demo cho AWS lab với chức năng đăng ký người dùng.

## 🚀 Công Nghệ Sử Dụng

- React 18
- Vite
- Axios
- Modern CSS

## 📋 Yêu Cầu

- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

## 🛠️ Cài Đặt

```bash
# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example (nếu chưa có)
cp .env.example .env
```

## ⚙️ Cấu Hình Environment Variables

File `.env` đã được tạo sẵn với cấu hình mặc định. Nếu cần thay đổi API endpoint, chỉnh sửa file `.env`:

```env
VITE_API_URL=http://tl03-nestjs-dev-alb-2132434153.ap-southeast-1.elb.amazonaws.com
```

**Lưu ý:** Sau khi thay đổi file `.env`, bạn cần restart dev server để áp dụng thay đổi.

## ▶️ Chạy Ứng Dụng

```bash
# Chạy development server
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 📝 Thông Tin API

**Endpoint:** `http://tl03-nestjs-dev-alb-2132434153.ap-southeast-1.elb.amazonaws.com/auth/register`

**Method:** POST

**Request Body:**
```json
{
    "firstName": "abc",
    "lastName": "asdsad",
    "email": "nguyen2@abc.com",
    "password": "Aa@123123",
    "phone": ""
}
```

**Response:**
```json
{
    "id": "1ab111f5-9432-4886-ac8f-f7ffdf7de9a9",
    "createdAt": "2026-02-01T12:42:22.161Z",
    "updatedAt": "2026-02-01T12:42:22.161Z",
    "firstName": "abc",
    "lastName": "asdsad",
    "role": "USER",
    "email": "nguyen2@abc.com",
    "avatar": null,
    "phone": "",
    "isActive": true
}
```

## ✨ Tính Năng

- ✅ Form đăng ký với validation
- ✅ Giao diện đẹp, hiện đại
- ✅ Hiển thị thông báo thành công/lỗi
- ✅ Hiển thị response data từ API
- ✅ Responsive design
- ✅ Loading state khi đang xử lý

## 📦 Build Production

```bash
npm run build
```

## 🎨 Cấu Trúc Form

- **Tên** (firstName) - Bắt buộc
- **Họ** (lastName) - Bắt buộc
- **Email** (email) - Bắt buộc
- **Mật khẩu** (password) - Bắt buộc (tối thiểu 6 ký tự)
- **Số điện thoại** (phone) - Tùy chọn
