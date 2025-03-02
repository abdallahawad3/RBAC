# Role-Based Authentication in Next.js with Redux & Middleware

This project implements **role-based access control (RBAC)** in a **Next.js** application with a **separate backend API**. It uses **Redux Toolkit** for state management, **Redux Persist** for authentication persistence, and **Next.js middleware** to protect routes based on user roles.

## 🚀 Features
- **🔐 Authentication & Authorization** – Users and admins have different access levels.
- **🛡️ Protected Routes** – Middleware prevents unauthorized access to pages.
- **🔄 Persistent Login** – Users stay logged in using cookies and Redux Persist.
- **🔀 Navigation Control** – Redirects users/admins to the correct dashboard.
- **🌐 Separate API Backend** – Works with an external API for authentication.

## 🛠 Tech Stack
- **Next.js (App Router)**
- **Redux Toolkit & Redux Persist**
- **Axios** for API requests
- **Next.js Middleware** for route protection


## 🚀 Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdallahawad3/RBAC
   ```
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev
   ```


## 🔄 How It Works
- After login, the **token is stored in cookies** and Redux state.
- Middleware **restricts access** based on the user’s role (`user` or `admin`).
- **Unauthorized users** are redirected to `/unauthorized` or `/login`.
- Redux Persist ensures the session is maintained even after refresh.

## 🎯 Example API Response (After Login)
```json
{
    "data": {
        "_id": "672b341256d7d6725ba7c9ce",
        "name": "Abdullah Awad",
        "email": "abdullah@gmail.com",
        "role": "user",
        "active": true
    },
    "token": "jwt"
}
```

---

💡 **Secure authentication and authorization in Next.js with a separate API backend!** 🚀

