import { useState, useEffect } from "react";
import API from "../api/axios";
import BookingCard from "../components/BookingCard";

// fetches and manages the user booking history
const MyBookingsContainer = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect (() => {
        const fetchBookings = async () => {
            try {
                const { data } = await API.get("/bookings/my");
                setBookings(data);
            } catch (err) {
                setError("Failed to load your bookings.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="state-center"><p>Loading your bookings...</p></div>;
    if (error) return <div className="state-center"><p className="error-text">{error}</p></div>;

    return (
        <div className="container">
            <div className="page-body">
                <div style={{marginBottom: "1.5rem"}}>
                    <p className="section-title">My Bookings</p>
                    <p className="section-subtitle">
                        {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
                    </p>
                </div>
                {bookings.length === 0 ? (
                    <div className="state-center">
                        <p style={{ fontSize: "2.5rem" }}>📋</p>
                        <p>You have no bookings yet.</p>
                      </div>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsContainer;