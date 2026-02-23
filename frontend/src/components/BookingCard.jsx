const BookingCard = ({ booking }) => {
    return (
        <div className="booking-card">
            <div className="booking-card-left">
                <p className="booking-card-hotel">{booking.hotel?.name || "N/A"}</p>
                <p className="booking-card-location">
                    📍 {booking.hotel?.location || "N/A"}
                </p>
                <div className="booking-card-meta">
                    <span>
                        💰 ${booking.hotel?.pricePerNight} / night
                    </span>
                    <span>
                        📅{" "}
                        {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>
            <div className="booking-card-right">
                <p className="booking-card-rooms">{booking.roomsBooked}</p>
                <p className="booking-card-rooms-label">
                    {booking.roomsBooked === 1 ? "room" : "rooms"} booked
                </p>
            </div>
        </div>
    );
};

export default BookingCard;