import { useState, useEffect } from "react";
import API from "../api/axios";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                const { data } = await API.get("/bookings");
                setBookings(data);
            } catch (err) {
                setError("Failed to load bookings");
            }finally{
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading)
        return (
            <p style={styles.center}>
                Loading bookings...
            </p>
        );
    if (error)
       return (
            <p style={{...styles.center, color: "red"}}>
                {error}
            </p>
        );
    return (
  <div>
    <div className="page-header">
      <h1>All Bookings</h1>
    </div>

    <div className="page-body">
      {loading ? (
        <p className="state-center">Loading bookings...</p>
      ) : error ? (
        <p className="state-center error-text">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="state-center">No bookings yet.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Hotel</th>
                <th>Location</th>
                <th>Rooms Booked</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name || "N/A"}</td>
                  <td>{booking.user?.email || "N/A"}</td>
                  <td>{booking.hotel?.name || "N/A"}</td>
                  <td>{booking.hotel?.location || "N/A"}</td>
                  <td>
                    <span className="badge badge-green">{booking.roomsBooked}</span>
                  </td>
                  <td>
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString("en-IN",{
                        year: "numeric",
                        month: "short",
                        Day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

};

const styles = {
    container: { padding: "2rem" },
  center: {
    textAlign: "center",
    marginTop: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  th: { padding: "1rem", textAlign: "left" },
  tableRow: { borderBottom: "1px solid #eee" },
  td: { padding: "1rem" },
};

export default Bookings;