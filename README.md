# 🏨 glowing-adventure

> Hotel Booking Atlantis Project

---

## 📁 Project Structure

A **Mono Repo** containing all three components of the Hotel Booking platform:

| Layer    | Tech Stack     |
| -------- | -------------- |
| Frontend | React + Vite   |
| Backend  | Node + Express |
| Admin    | React + Vite   |

```
hotel-booking-system/
├── backend/
│   ├── config/         ← DB connection, Multer setup
│   ├── controllers/    ← Auth, Hotel, Booking logic
│   ├── middleware/     ← JWT auth middleware
│   ├── models/         ← User, Hotel, Booking schemas
│   ├── routes/         ← API route definitions
│   ├── uploads/        ← Local image storage (Multer)
│   └── server.js
├── admin/              ← React + Vite admin panel
├── frontend/           ← React + Vite user panel
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** v22.13 — [Download here](https://nodejs.org/en/download)
- **NPM** v11.7
- **MongoDB Atlas** (Cloud) — used as the database

---

## 🔧 Backend

```bash
cd backend
npm install
npm run dev   # Developer mode
npm start     # Live mode
```

Create a `.env` file in `backend/` — refer to `.env.example`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### API Routes

| Method | Route              | Access  | Description                          |
| ------ | ------------------ | ------- | ------------------------------------ |
| POST   | `/api/auth/signup` | Public  | Register a new user                  |
| POST   | `/api/auth/login`  | Public  | Login and receive JWT                |
| GET    | `/api/hotels`      | Public  | Get all hotels (supports `?search=`) |
| GET    | `/api/hotels/:id`  | Public  | Get single hotel                     |
| POST   | `/api/hotels`      | Private | Add a hotel (Admin)                  |
| PUT    | `/api/hotels/:id`  | Private | Update a hotel (Admin)               |
| DELETE | `/api/hotels/:id`  | Private | Delete a hotel (Admin)               |
| POST   | `/api/bookings`    | Private | Create a booking                     |
| GET    | `/api/bookings/my` | Private | Get logged-in user's bookings        |
| GET    | `/api/bookings`    | Private | Get all bookings (Admin)             |

### Dependencies

| Package        | Purpose                   |
| -------------- | ------------------------- |
| `mongoose`     | MongoDB object modeling   |
| `cors`         | Cross-origin data sharing |
| `dotenv`       | Secrets management        |
| `jsonwebtoken` | JWT authentication        |
| `bcryptjs`     | Password hashing          |
| `multer`       | Image file uploads        |
| `nodemon`      | Auto-restart in dev mode  |

---

## 🛠️ Admin Panel

**Port:** `http://localhost:5173`

```bash
cd admin
npm install
npm run dev
```

Create a `.env` file in `admin/` — refer to `.env.example`:

```
VITE_API_URL=http://localhost:5000/api
```

### Features

- Hotel Management — Add, Edit, Delete, View hotels with image uploads
- Bookings View — All bookings with user name, hotel, rooms booked and date
- Search hotels by name or location

### Admin Login

| Field    | Value                |
| -------- | -------------------- |
| Email    | `admin@atlantis.com` |
| Password | `password`           |

> Admin accounts must be manually created in MongoDB Atlas with `role: "admin"` on the user document.

---

## 🖥️ Frontend

**Port:** `http://localhost:5174`

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `frontend/` — refer to `.env.example`:

```
VITE_API_URL=http://localhost:5000/api
```

### Features

- Signup / Login / Logout with JWT authentication
- Browse all available hotels
- Search hotels by name or location
- View hotel details and book rooms
- Rooms reduce automatically on booking
- Prevent booking if rooms are unavailable
- My Bookings page — view personal booking history

### Test User Login

| Field    | Value              |
| -------- | ------------------ |
| Email    | `Bruce@gotham.com` |
| Password | `Batmobile`        |

> Regular users can register directly through the signup page.

---

## ☁️ Cloud

- **Database:** MongoDB Atlas
- **Image Storage:** Local (`backend/uploads/`) via Multer

---

## ❌ Not Implemented (Out of Scope)

- Payment integration
- Date-wise availability
- Room types
- Booking cancellation
