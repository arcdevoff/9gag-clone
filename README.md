# 9GAG Clone --- Fullstack Open Source Project

![screen](https://arcdevoff.site/portfolio/9gag.png)

A fullstack open-source 9GAG-style platform built with **NestJS**,
**Prisma**, **Next.js 15**, and **PostgreSQL**.\
Includes authentication, posts with images or videos, tags, topics,
voting (likes/dislikes), and a popularity feed based on likes within a
configurable time window.

---

## 🚀 Features

### 🔹 Backend (NestJS + Prisma)

- JWT authentication (access + refresh tokens)
- Email confirmation system
- Create posts with:
  - image
  - video
  - topic
  - tags
- Like / Dislike voting system
- Popular posts algorithm:
  - counts likes within last **N hours**
  - N is configurable through `.env`
- Infinite scroll support
- File uploading (images/videos)
- Modular clean architecture

### 🔹 Frontend (Next.js 15)

- Modern UI with Tailwind
- Infinite scroll feed
- Post creation form with image/video preview
- Login / registration pages
- Topic and tag filtering
- Optimistic updates for voting
- Responsive mobile-friendly layout

---

## 🛠️ Tech Stack

### **Backend**

- NestJS 11\
- Prisma ORM 6\
- PostgreSQL\
- Passport (JWT)\
- Multer (file uploads)\
- Class-validator / class-transformer

### **Frontend**

- Next.js 15 (Turbopack)\
- React 19\
- TailwindCSS 4\
- Redux Toolkit\
- React Query\
- Axios

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arcdevoff/9gag-clone.git
cd 9gag-clone
```

---

## 🖥️ Backend Setup (NestJS)

Go to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Copy environment file:

```bash
cp .env.example .env
```

Update `.env` with your database URL, JWT secrets and email settings.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run start:dev
```

---

## 🎨 Frontend Setup (Next.js)

Go to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Copy environment file:

```bash
cp .env.example .env
```

Start dev server:

```bash
npm run dev
```

---

## ⚙️ Environment Variables

### **Backend `.env`**

      NODE_ENV=development
      PORT=5000

      APP_NAME=9GAG
      APP_URL=http://localhost:5000

      CLIENT_URL=http://localhost:3000

      DATABASE_URL="postgresql://postgres:root@localhost:5432/gag"

      MAIL_USER=user@mail.com
      MAIL_PASS=password
      MAIL_HOST=smtp.mail.com
      MAIL_PORT=465

      ACCESS_TOKEN_SECRET=replace_this_access_secret
      REFRESH_TOKEN_SECRET=replace_this_refresh_secret
      ACCESS_TOKEN_EXPIRES_IN=15m
      REFRESH_TOKEN_EXPIRES_IN=7d

      POPULAR_POSTS_HOURS=24

### **Frontend `.env`**

      NEXT_PUBLIC_BASE_URL=http://localhost:3000

      NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
      NEXT_PUBLIC_APP_NAME=9GAG

      NEXT_PUBLIC_POSTS_PER_PAGE=12

---

## 🧪 Scripts

### Backend

```bash
npm run start:dev
npm run build
npm run start:prod
```

### Frontend

```bash
npm run dev
npm run build
npm run start
```

---

## 📈 Popular Posts Algorithm

The backend calculates "popular" posts by:

- counting number of **likes**
- within the last **POPULAR_POSTS_HOURS** (default: 24 hours)
- sorting posts by like count

You can change it in `.env`:

    POPULAR_POSTS_HOURS=24

---

## 🚀 Roadmap

- User Profile Updates (Allow users to update their avatar and username)

- Post Comments (Add support for commenting on posts)

- Bookmarks (Enable users to save posts to a personal bookmarks list.)

---

## 📝 License

MIT License --- free to use, modify and distribute.

---

## ❤️ Support

If you like this project --- give it a ⭐ on GitHub!
