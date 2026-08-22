# 🔐 Authentication & Image Upload API

A backend REST API built with **Node.js, Express.js, MongoDB, and JWT** that provides secure user authentication, role-based authorization, password management, and image upload functionality using **Multer and Cloudinary**.

## 🚀 Features

- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Change Password
- Role-Based Authorization
- Admin Middleware
- Image Upload
- Image Validation
- Image Size Limitation
- Cloudinary Image Storage
- MongoDB Image Metadata Storage
- Image Pagination
- Image Sorting
- RESTful API Structure
- Environment Variable Configuration

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Image Upload

- Multer
- Cloudinary

### Development

- Nodemon
- dotenv

## 📁 Project Structure

```text
Authendication/
│
├── config/
│   └── cloudinary.js
│
├── controllers/
│   ├── auth-controller.js
│   └── image-controllers.js
│
├── database/
│   └── db.js
│
├── helpers/
│   └── cloudinary-helper.js
│
├── middleware/
│   ├── auth-middleware.js
│   ├── admin-middleware.js
│   └── upload-middleware.js
│
├── models/
│   ├── User.js
│   └── Image.js
│
├── routes/
│   ├── auth-routes.js
│   ├── home-routes.js
│   ├── admin-routes.js
│   └── image-routes.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
└── server.js
