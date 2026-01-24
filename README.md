# 🚀 AI Resume Builder – MERN Stack Application

An **AI-powered Online Resume Builder** built using the **MERN Stack**.  
This application allows users to create, manage, preview, and optimize resumes using **Google Gemini AI**, upload profile images with background removal, and share resumes via live public links.

This project is designed as a **real-world, production-ready MERN application** with AI integration.

---

## ✨ Features

- ✅ User Sign In / Sign Up (JWT Authentication)
- ✅ Create New Resume
- ✅ Edit & Delete Existing Resumes
- ✅ Live Resume Preview
- ✅ Public Shareable Resume Link
- ✅ Upload Resume and Optimize Using AI
- ✅ AI-Powered Resume Content Improvement
- ✅ Upload Profile Image
- ✅ AI-Based Background Removal
- ✅ Multiple Resume Templates
- ✅ Fully Responsive Design

---

## 🛠 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Redux
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

### AI & Media Services

- Google Gemini AI (Resume Optimization)
- ImageKit (Image Upload & Background Removal)

---

## 🔐 Authentication Flow

- JWT-based authentication
- Secure API routes
- Protected resume operations (Create / Edit / Delete)

---

## 🤖 AI Resume Optimization

The app uses **Google Gemini AI** to:

- Improve resume content
- Optimize bullet points
- Enhance professional wording
- Make resumes more ATS-friendly

---

## 🖼 Image Upload & Background Removal

- Images are uploaded to **ImageKit**
- AI-based background removal
- Optimized image delivery for performance

---

## 🌐 Live Resume Sharing

- Each resume gets a **public shareable URL**
- Viewable without authentication
- Perfect for job applications

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=your_openai_base_url
OPENAI_MODEL=your_openai_model


```

### Frontend (Frontend/.env)

```env
VITE_API_BASE_URL=http://localhost:5000

```
