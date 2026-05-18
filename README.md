# ZeroLag StudioZ — Creative Engineering Studio

A premium creative engineering studio designing and building cinematic websites, products, and brands for ambitious teams.

---

## 🏗️ Reorganized Full-Stack Architecture

The project has been refactored from a TanStack Start unified SSR app into a highly modular, standard full-stack architecture to ensure maximum runtime stability, clean separation of concerns, and ease of deployment.

```
root/
│
├── client/              → Frontend (React SPA with Vite & Tailwind CSS v4)
│   ├── src/
│   │   ├── assets/      → Image & vector assets
│   │   ├── components/  → High-end visual React components (GSAP, Lenis, Framer Motion)
│   │   ├── styles/      → Global and Tailwind CSS styling
│   │   ├── App.jsx      → Unified page layout structure
│   │   └── main.jsx     → React DOM hydration entry point
│   ├── index.html
│   ├── vite.config.js   → Configures port 8080 and proxies "/api" to server
│   └── package.json
│
├── server/              → Backend (Node.js & Express REST API)
│   ├── config/          → Singleton MongoDB Atlas Mongoose connection
│   ├── controllers/     → Express route handler controllers
│   ├── models/          → Mongoose Enquiry model mapped to collection "emaildata"
│   ├── routes/          → Route mappings
│   ├── services/        → Modular Resend email notification service
│   ├── app.js           → Configures middleware (CORS, body parsers) and route bindings
│   ├── server.js        → Binds database connection and starts express on port 5000
│   └── package.json
│
├── .env                 → Shared Environment variables
├── package.json         → Root workspace and concurrently startup coordinator
└── README.md
```

---

## ⚡ Development Workflow & Commands

We use **npm workspace orchestration** to manage, install, and run both environments concurrently from the root directory.

### 1. Prerequisites
Ensure you have a `.env` file at the root containing:
```env
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=zerolagstudioz@gmail.com
MONGODB_URI=your_mongodb_connection_uri
```

### 2. Startup Commands

First, install all client and server dependencies recursively:
```bash
npm run install-all
```

Then, boot up the local full-stack development environment concurrently:
```bash
npm run dev
```

* **Frontend Dev Server**: http://localhost:8080/
* **Backend Dev API**: http://localhost:5000/
* **Health Check Endpoint**: http://localhost:5000/health

---

## 📦 Production Builds

To compile and optimize client-side assets for production:
```bash
npm run build
```
This outputs static production-optimized assets inside `client/dist/`.
