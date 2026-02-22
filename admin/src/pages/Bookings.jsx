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
        <div style={styles.container}>
            <h2 style={{ marginBottom: "1.5rem"}}>
                All Bookings
            </h2>

            {bookings.length === 0 ?(
                <p style={styles.center}>
                    No bookings yet.
                </p>
            ) : (
               <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Hotel</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>
                Rooms Booked
              </th>
              <th style={styles.th}>
                Booking Date
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
                <tr
                key={booking._id}
                style={styles.tableRow}
              >
                <td style={styles.td}>
                  {booking.user?.name || "N/A"}
                </td>
                <td style={styles.td}>
                  {booking.user?.email || "N/A"}
                </td>
                <td style={styles.td}>
                  {booking.hotel?.name || "N/A"}
                </td>
                <td style={styles.td}>
                  {booking.hotel?.location ||
                    "N/A"}
                </td>
                <td style={styles.td}>
                  {booking.roomsBooked}
                </td>
                <td style={styles.td}>
                  {new Date(
                    booking.createdAt,
                  ).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
            )}
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