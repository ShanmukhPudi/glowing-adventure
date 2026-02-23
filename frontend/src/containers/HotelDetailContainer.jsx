import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Handles fetching a single hotel and the entire booking flow
const HotelDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState(1);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data } = await API.get(`/hotels/${id}`);
        setHotel(data);
      } catch (err) {
        setError("Hotel not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBooking(true);
    setBookingError("");

    try {
      await API.post("/bookings", { hotelId: id, roomsBooked: rooms });
      setBookingSuccess(true);
      // Update the local hotel state to reflect reduced rooms
      setHotel((prev) => ({ ...prev, availableRooms: prev.availableRooms - rooms }));
    } catch (err) {
      setBookingError(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="state-center"><p>Loading hotel...</p></div>;
  if (error) return <div className="state-center"><p className="error-text">{error}</p></div>;

  return (
    <div className="container">
      <div className="page-body">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="hotel-detail-grid">
          {/* Left — Image and Info */}
          <div>
            <div className="hotel-detail-images">
              {hotel.images && hotel.images.length > 0 ? (
                <img
                  src={`http://localhost:5000${hotel.images[0]}`}
                  alt={hotel.name}
                />
              ) : (
                "🏨"
              )}
            </div>

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

          {/* Right — Booking Widget */}
          <div className="booking-widget">
            <h3>Reserve a Room</h3>
            <p className="booking-widget-price">
              ${hotel.pricePerNight} <span>/ night</span>
            </p>

            {bookingSuccess ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</p>
                <p className="success-text" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Booking confirmed!
                </p>
                <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.4rem" }}>
                  {rooms} room{rooms > 1 ? "s" : ""} reserved
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: "1.2rem", width: "100%" }}
                  onClick={() => navigate("/my-bookings")}
                >
                  View My Bookings
                </button>
              </div>
            ) : hotel.availableRooms === 0 ? (
              <p className="error-text" style={{ textAlign: "center", padding: "1rem 0" }}>
                This hotel is fully booked.
              </p>
            ) : (
              <>
                <div className="booking-form-group">
                  <label>Number of rooms</label>
                  <input
                    type="number"
                    className="booking-input"
                    min={1}
                    max={hotel.availableRooms}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                  />
                  <p className="booking-rooms-info">
                    Max {hotel.availableRooms} room{hotel.availableRooms !== 1 ? "s" : ""} available
                  </p>
                </div>

                {bookingError && (
                  <p className="error-text" style={{ marginBottom: "0.75rem" }}>
                    {bookingError}
                  </p>
                )}

                <button
                  className="btn btn-primary"
                  onClick={handleBook}
                  disabled={booking}
                >
                  {booking ? "Booking..." : user ? "Book Now" : "Login to Book"}
                </button>

                {!user && (
                  <p style={{ fontSize: "0.8rem", color: "#aaa", textAlign: "center", marginTop: "0.75rem" }}>
                    You need to be logged in to make a booking
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailContainer;