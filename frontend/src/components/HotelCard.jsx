import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="hotel-card" onClick={() => navigate(`/hotels/${hotel._id}`)}>

      {/* Image wrapper */}
      <div style={{
        width: "100%",
        height: "180px",
        overflow: "hidden",
        borderRadius: "8px 8px 0 0",
        backgroundColor: "#e8f4f8",
        flexShrink: 0,
      }}>
        {hotel.images && hotel.images.length > 0 ? (
          <img
            src={`http://localhost:5000${hotel.images[0]}`}
            alt={hotel.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#ccc",
          }}>
            🏨
          </div>
        )}
      </div>

      {/* Card body */}
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

export default HotelCard;