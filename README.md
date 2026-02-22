# 🏨 glowing-adventure

> Hotel Booking Atlantis Project

---

## 📁 Project Structure

A **Mono Repo** containing all three components of the Hotel Booking platform:

| Layer    | Tech Stack              |
| -------- | ----------------------- |
| Frontend | React + Vite            |
| Backend  | Node + Express          |
| Admin    | Concurrent Dev Sessions |

---

## ⚙️ Setup Steps

### Prerequisites

- **Node.js** v22.13 — [Download here](https://nodejs.org/en/download)
- **NPM** v11.7
- **MongoDB Atlas** (Cloud) — used as the database

### Installation

Open a terminal in the IDE at the project root and run:

```bash
npm i
```

---

## 🛠️ Admin

```bash
cd <project-root>/admin
npm run dev   # Runs 2 sessions in parallel via concurrently
> Credentials : admin@atlantis.com ; password
```

---

## 🖥️ Frontend

**Stack:** React + Vite

```bash
cd frontend
npm run dev
```

---

## 🔧 Backend

**Stack:** Node + Express

```bash
cd backend
npm start      # Live mode
npm run dev    # Developer mode
```

### Dependencies

| Package        | Purpose                       |
| -------------- | ----------------------------- |
| `mongoose`     | MongoDB object modeling       |
| `cors`         | Cross-origin data sharing     |
| `dotenv`       | Security & secrets management |
| `jsonwebtoken` | JWT authentication            |
| `bcryptjs`     | Password encryption           |

---

## ☁️ Cloud

- **Database:** MongoDB Atlas (Cloud Access)

