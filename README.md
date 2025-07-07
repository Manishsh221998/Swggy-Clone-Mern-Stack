
# 🍔 MERN Stack Delivery App - EatZy

A modern full-stack fast food delivery web application built with **MERN**, role-based access, and seamless payment integration.

 

## 📋 Table of Contents

- [Preview Credentials](#preview-credentials)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Authorizations](#authorizations)
- [License](#license)

---

## 🧪 Preview Credentials

### Super Admin
- ✉️ Email: `superadmin@yopmail.com`
- 🔐 Password: `1234`

### Admin
- ✉️ Email: `m@yopmail.com`
- 🔐 Password: `1234`

### Employee
- ✉️ Email: `kk@yopmail.com`
- 🔐 Password: `1234`

---

## 🌟 Features

### 🔐 Authentication & Authorization
- Secure JWT-based login & session handling
- Role-based access: Super Admin, Admin, Employee, Users
- JSON WTK Login with secure refresh token
- Email verification and password recovery flows

### 📦 Backend
- User, Order, Product, Category, Contact, Auth routes
- RESTful API with CRUD support
- Encrypted passwords with `bcryptjs`
- Image upload with Multer  
- Integrated Razorpay payment gateway

### 🖥️ Frontend
- Responsive React UI using Tailwind CSS & MUI
- Auth pages: Sign up, Login, Forgot Password, OTP verify
- Dashboard for admin roles
- Product browsing, sorting, searching, filtering
- Cart & order tracking
- Confetti animation on successful orders
- Lazy loading 
- react select for adnace filter with serach 
- react-toastify for success and error message

---

## 🛠️ Tech Stack

### 🔧 Backend
- Node.js / Express.js
- MongoDB / Mongoose
- JWT, bcryptjs, Multer
- Nodemailer 
- Razorpay, Twilio (SMS)
- connect-flash
- cors
- ejs
- joi-validator
- morgan
- express-rate-limit
- swagger-ui-express


### 🎨 Frontend
- React.js + Tailwind CSS + Styled Components
- Material-UI, React Hook Form, Swiper
- Redux Toolkit + React Query
- React Toastify, Framer Motion, GSAP
- React Helmet, React Confetti, Swiper.js

---

## ⚙️ Environment Variables

### 🌍 Common
```env
PORT=
MONGO_URI=
JWT_SECRET_KEY=
```

### 📧 Email Configuration
```env
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
```

### 🔐 JWT Keys
```env
JWT_EMAIL_CONFIRMATION_KEY=
JWT_RESET_FORGOTTEN_PASSWORD_KEY=
```

### ☁️ Cloudinary
```env
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

### 🔑 OAuth2 (Google)
```env
OAUTH_USER=
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
```

---

## 📦 Dependencies

### Client
```json
@emotion/react, @emotion/styled, @mui/material, styled-components,
@reduxjs/toolkit, @tanstack/react-query, react-hook-form,
axios, framer-motion, react-toastify, react-icons, swiper,
gsap, razorpay, react-awesome-reveal, react-confetti, 
react-router-dom, react-helmet, @formkit/auto-animate, tailwindcss
```

### Server
```json
express, mongoose, bcryptjs, jsonwebtoken, dotenv, nodemailer,
multer, cloudinary, body-parser, cookie-parser, cors,
connect-flash, express-session, twilio, joi, morgan, ejs, axios,
razorpay, nodemon
```

---

## 🛠️ Installation

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Manishsh221998/Swggy-Clone-Mern-Stack.git
cd server
cd client
```

### 2️⃣ Setup Server

```bash
cd server
npm install
cp .env.example .env  # then add environment variables
npm run start
```

### 3️⃣ Setup Client

```bash
cd client
npm install
npm run dev
```

## 🛡️ Authorizations

- 🧑‍💼 **Super Admin** – Manages all users, admins, orders, and site-wide settings
- 🧑‍🔧 **Admin** – Can manage products, categories, view all orders, create and mange employee
- 👨‍🍳 **Employee** – Can manage individual order updates
- 🙋 **User** – Can browse products, order, view order history

---

## 👨‍💻 Author

Made with ❤️ by **Manish Sharma**

---
