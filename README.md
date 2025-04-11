
# 🖌️ Collaborative Canvas App

A real-time collaborative drawing application where users can sign up, log in, create or join rooms, and draw together using pencil, rectangles, and circles. Built with a scalable monorepo structure using modern full-stack technologies.

## 🚀 Features

- 🔐 User authentication (Signup/Login)
- 🎨 Drawing tools: Pencil, Rectangle, Circle
- 🔁 Real-time collaboration via WebSocket (`ws`)
- 📦 Monorepo setup with Turborepo
- 🧭 Zoom and pan support on the canvas
- 🪄 Smooth animations using Framer Motion
- 🌐 Backend with Node.js, Express, PostgreSQL, and Prisma ORM
- 🎨 Frontend with Next.js, Tailwind CSS, HTML Canvas

## 📸 Screenshots
Landing page
![5](https://github.com/user-attachments/assets/d329d9c1-d342-41c6-a343-3a6cd9d0b18e)
Signup and Signin page
![1](https://github.com/user-attachments/assets/3fb0f26f-3738-41a9-8359-e9797429946a)
Dashboard
![2](https://github.com/user-attachments/assets/fbfd66fc-1d99-4ed0-905d-0f7364309867)
Join room 
![3](https://github.com/user-attachments/assets/9f61e44a-9c84-4c94-9fed-521804a44f8c)
Collaborative canvas
![4](https://github.com/user-attachments/assets/281b8ea2-bbbb-4090-a50d-ca26d07ab0ff)


## 🧰 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Framer Motion](https://www.framer.com/motion/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

### Others

- [WebSocket (`ws`)](https://github.com/websockets/ws)
- [Turborepo](https://turbo.build/repo)
- [Postman](https://www.postman.com/) (for API testing)
- [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Getting Started

```bash
# Clone the repository
git clone (https://github.com/AbhijyYdv547/Canvas-app
cd Canvas-app

# Install dependencies
pnpm install

# Run dev server
pnpm run dev
```

> Make sure you have PostgreSQL running and your `.env` is configured with the database URL.

## 📦 Scripts

| Script             | Description               |
|--------------------|---------------------------|
| `pnpm run dev`     | Run development servers   |
| `pnpm build`       | Build all packages/apps   |
| `pnpm lint`        | Lint the codebase         |
| `pnpm format`      | Format code using Prettier|

## 🗂️ Folder Structure

```
apps/
  ├── canvass-frontend/         # Next.js frontend
  ├── http-backend/        # HTTP backend
  ├── ws-backend/        # Websocket backend
packages/
  ├── backend-common/          # Shared Backend components
  ├── common/          # Shared types components
  ├── db/          # Shared DB components
  ├── ui/          # Shared UI components
  ├── eslint-config/
  ├── typescript-config/
```

## ✅ TODOs

- [ ] Add text support on canvas
- [ ] Polish dashboard UI
- [ ] Deploy backend and frontend

## 📬 Feedback or Collaboration

Wanna contribute or give feedback? Feel free to open an issue or contact me:

- 📫 Email: yadavabhjay@gmail.com
- 🌐 [Portfolio](#)
- 💼 [LinkedIn](https://linkedin.com/in/abj-ydv)

---

