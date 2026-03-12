import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, NavLink, useNavigate, useParams } from "react-router-dom";

// ─── Dummy Data ───────────────────────────────────
const dummyHotels = [
  {
    _id: "1",
    name: "The Grand Atlantis",
    location: "Maldives",
    description: "A luxury beachfront resort with stunning ocean views, private pools and world class dining.",
    pricePerNight: 299,
    availableRooms: 8,
  },
  {
    _id: "2",
    name: "Sea Pearl",
    location: "Vizag",
    description: "A serene coastal getaway with panoramic sea views and modern amenities.",
    pricePerNight: 350,
    availableRooms: 3,
  },
  {
    _id: "3",
    name: "Beach Castle",
    location: "Bali",
    description: "Nestled between lush rice fields and pristine beaches, offering an authentic Balinese experience.",
    pricePerNight: 541,
    availableRooms: 7,
  },
  {
    _id: "4",
    name: "Royal Dunes",
    location: "Dubai",
    description: "An opulent desert retreat with breathtaking dune views, spa facilities and fine dining.",
    pricePerNight: 480,
    availableRooms: 5,
  },
  {
    _id: "5",
    name: "Blue Lagoon Inn",
    location: "Santorini",
    description: "Perched on volcanic cliffs overlooking the Aegean Sea with iconic white-washed architecture.",
    pricePerNight: 620,
    availableRooms: 4,
  },
  {
    _id: "6",
    name: "The Maple Lodge",
    location: "Switzerland",
    description: "A cozy alpine lodge surrounded by snow capped mountains, perfect for skiing and relaxation.",
    pricePerNight: 390,
    availableRooms: 0,
  },
];

const dummyBookings = [
  {
    _id: "b1",
    hotel: { name: "The Grand Atlantis", location: "Maldives", pricePerNight: 299 },
    roomsBooked: 2,
    createdAt: "2026-02-20T10:30:00.000Z",
  },
  {
    _id: "b2",
    hotel: { name: "Sea Pearl", location: "Vizag", pricePerNight: 350 },
    roomsBooked: 1,
    createdAt: "2026-02-22T14:15:00.000Z",
  },
];

// ─── Navbar ───────────────────────────────────────
const Navbar = () => (
  <header className="navbar">
    <div className="navbar-inner">
      <NavLink to="/" className="navbar-brand">
        Atlantis <span>Hotels</span>
      </NavLink>
      <nav className="navbar-links">
        <NavLink
          to="/my-bookings"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          My Bookings
        </NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
        <NavLink to="/signup">
          <button className="nav-btn nav-btn-solid">Sign Up</button>
        </NavLink>
      </nav>
    </div>
  </header>
);

// ─── Search Bar ───────────────────────────────────
const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search by hotel name or location..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSearch()}
    />
    <button onClick={onSearch}>Search</button>
  </div>
);

// ─── Hotel Card ───────────────────────────────────
const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  return (
    <div className="hotel-card" onClick={() => navigate(`/hotels/${hotel._id}`)}>
      <div style={{
        width: "100%", height: "180px", overflow: "hidden",
        borderRadius: "8px 8px 0 0", backgroundColor: "#e8f4f8",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2.5rem", color: "#ccc", flexShrink: 0,
      }}>
        🏨
      </div>
      <div className="hotel-card-body">
        <p className="hotel-card-name">{hotel.name}</p>
        <p className="hotel-card-location">📍 {hotel.location}</p>
        <div className="hotel-card-footer">
          <p className="hotel-card-price">
            ${hotel.pricePerNight} <span>/ night</span>
          </p>
          <span className={`hotel-card-rooms ${hotel.availableRooms > 0 ? "rooms-available" : "rooms-full"}`}>
            {hotel.availableRooms > 0 ? `${hotel.availableRooms} rooms left` : "Fully Booked"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Home Page ────────────────────────────────────
const HomePage = () => {
  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState(dummyHotels);

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    if (!query) { setHotels(dummyHotels); return; }
    setHotels(dummyHotels.filter(
      (h) => h.name.toLowerCase().includes(query) || h.location.toLowerCase().includes(query)
    ));
  };

  const handleClear = () => { setSearch(""); setHotels(dummyHotels); };

  return (
    <>
      <section className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>Explore our handpicked collection of premium hotels</p>
        <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
      </section>
      <div className="container">
        <div className="page-body">
          {search ? (
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="section-title">{hotels.length} result{hotels.length !== 1 ? "s" : ""} for "{search}"</p>
              <button className="btn btn-outline" onClick={handleClear}
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>Clear</button>
            </div>
          ) : (
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="section-title">All Hotels</p>
              <p className="section-subtitle">Browse our available properties</p>
            </div>
          )}
          {hotels.length === 0 ? (
            <div className="state-center"><p style={{ fontSize: "2rem" }}>🏨</p><p>No hotels found.</p></div>
          ) : (
            <div className="hotels-grid">
              {hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ─── Hotel Detail Page ────────────────────────────
const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = dummyHotels.find((h) => h._id === id);
  const [rooms, setRooms] = useState(1);
  const [booked, setBooked] = useState(false);

  if (!hotel) return <div className="state-center"><p className="error-text">Hotel not found.</p></div>;

  return (
    <div className="container">
      <div className="page-body">
        <button className="btn btn-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="hotel-detail-grid">
          <div>
            <div className="hotel-detail-images">🏨</div>
            <div className="hotel-detail-info">
              <h1>{hotel.name}</h1>
              <p className="hotel-detail-location">📍 {hotel.location}</p>
              <div className="hotel-detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Price per night</span>
                  <span className="meta-value">${hotel.pricePerNight}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Rooms available</span>
                  <span className="meta-value">{hotel.availableRooms}</span>
                </div>
              </div>
              <hr className="divider" />
              <p className="hotel-detail-description">{hotel.description}</p>
            </div>
          </div>
          <div className="booking-widget">
            <h3>Reserve a Room</h3>
            <p className="booking-widget-price">${hotel.pricePerNight} <span>/ night</span></p>
            {booked ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</p>
                <p className="success-text" style={{ fontSize: "1rem", fontWeight: 600 }}>Booking confirmed!</p>
                <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.4rem" }}>{rooms} room{rooms > 1 ? "s" : ""} reserved</p>
                <button className="btn btn-outline" style={{ marginTop: "1.2rem", width: "100%" }}
                  onClick={() => navigate("/my-bookings")}>View My Bookings</button>
              </div>
            ) : hotel.availableRooms === 0 ? (
              <p className="error-text" style={{ textAlign: "center", padding: "1rem 0" }}>This hotel is fully booked.</p>
            ) : (
              <>
                <div className="booking-form-group">
                  <label>Number of rooms</label>
                  <input type="number" className="booking-input" min={1}
                    max={hotel.availableRooms} value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))} />
                  <p className="booking-rooms-info">Max {hotel.availableRooms} room{hotel.availableRooms !== 1 ? "s" : ""} available</p>
                </div>
                <button className="btn btn-primary" onClick={() => setBooked(true)}>Book Now (Demo)</button>
                <p style={{ fontSize: "0.78rem", color: "#aaa", textAlign: "center", marginTop: "0.75rem" }}>
                  This is a UI demo — no real booking is made
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── My Bookings Page ─────────────────────────────
const MyBookingsPage = () => (
  <div className="container">
    <div className="page-body">
      <div style={{ marginBottom: "1.5rem" }}>
        <p className="section-title">My Bookings</p>
        <p className="section-subtitle">{dummyBookings.length} bookings found</p>
      </div>
      <div className="bookings-list">
        {dummyBookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div>
              <p className="booking-card-hotel">{booking.hotel.name}</p>
              <p className="booking-card-location">📍 {booking.hotel.location}</p>
              <div className="booking-card-meta">
                <span>💰 ${booking.hotel.pricePerNight} / night</span>
                <span>📅 {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric", month: "short", day: "numeric"
                })}</span>
              </div>
            </div>
            <div className="booking-card-right">
              <p className="booking-card-rooms">{booking.roomsBooked}</p>
              <p className="booking-card-rooms-label">{booking.roomsBooked === 1 ? "room" : "rooms"} booked</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Auth Pages ───────────────────────────────────
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Sign in to your Atlantis Hotels account</p>
        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Sign In (Demo)
          </button>
        </div>
        <p className="auth-footer">
          Don't have an account? <a onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create an account</h2>
        <p>Join Atlantis Hotels and start booking</p>
        <div className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-input" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-input" placeholder="Min. 6 characters" />
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Create Account (Demo)
          </button>
        </div>
        <p className="auth-footer">
          Already have an account? <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────
const Demo = () => (
  <BrowserRouter basename="/glowing-adventure">
    <div className="page-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default Demo;