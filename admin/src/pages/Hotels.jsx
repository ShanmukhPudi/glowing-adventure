import { useState, useEffect } from "react";
import API from "../api/axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    availableRooms: "",
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all hotels on page load
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await API.get("/hotels");
      setHotels(data);
    } catch (err) {
      setError("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      availableRooms: hotel.availableRooms,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await API.delete(`/hotels/${id}`);
      setHotels(hotels.filter((h) => h._id !== id));
    } catch (err) {
      alert("Failed to delete hotel");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", description: "", pricePerNight: "", availableRooms: "" });
    setImages([]);
    setEditingHotel(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Use FormData because we're sending images alongside text
      const form = new FormData();
      form.append("name", formData.name);
      form.append("location", formData.location);
      form.append("description", formData.description);
      form.append("pricePerNight", formData.pricePerNight);
      form.append("availableRooms", formData.availableRooms);
      Array.from(images).forEach((img) => form.append("images", img));

      if (editingHotel) {
        const { data } = await API.put(`/hotels/${editingHotel._id}`, form);
        setHotels(hotels.map((h) => (h._id === editingHotel._id ? data : h)));
      } else {
        const { data } = await API.post("/hotels", form);
        setHotels([data, ...hotels]);
      }

      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save hotel");
    } finally {
      setSubmitting(false);
    }
  };

//   if (loading) return <p style={styles.center}>Loading hotels...</p>;
//   if (error) return <p style={{ ...styles.center, color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Hotels</h2>
        <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
          {showForm ? "Cancel" : "+ Add Hotel"}
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>{editingHotel ? "Edit Hotel" : "Add New Hotel"}</h3>
          <div style={styles.grid}>
            <input
              placeholder="Hotel Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
              required
            />
            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="number"
              placeholder="Price Per Night"
              value={formData.pricePerNight}
              onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="number"
              placeholder="Available Rooms"
              value={formData.availableRooms}
              onChange={(e) => setFormData({ ...formData, availableRooms: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={styles.textarea}
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            style={styles.input}
          />
          <div style={styles.formButtons}>
            <button type="submit" style={styles.saveButton} disabled={submitting}>
              {submitting ? "Saving..." : editingHotel ? "Update Hotel" : "Add Hotel"}
            </button>
            <button type="button" onClick={resetForm} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Hotels Table */}
      {hotels.length === 0 ? (
        <p style={styles.center}>No hotels yet. Add one above.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Price/Night</th>
              <th style={styles.th}>Rooms Available</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id} style={styles.tableRow}>
                <td style={styles.td}>{hotel.name}</td>
                <td style={styles.td}>{hotel.location}</td>
                <td style={styles.td}>${hotel.pricePerNight}</td>
                <td style={styles.td}>{hotel.availableRooms}</td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(hotel)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(hotel._id)} style={styles.deleteButton}>
                    Delete
                  </button>
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
    header: { 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1.5rem"
    },
    center: {
        textAlign: "center",
        margintop: "2rem",
    },
    addButton: {
        backgroundColor: "#1a1a2e",
        color: "white",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
    },
    form: {
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    grid: {
        display: "grid",
        gridTemplateColums: "1fr 1fr",
        gap: "1rem",
        marginBottom: "1rem",
    },
    input: {
        padding: "0.7rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        padding: "0.7rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "1rem",
        minHeight: "80px",
        marginBottom: "1rem",
        boxSizing: "border-box",
    },
    formButtons: {
        display: "flex",
        gap: "1rem",
        margintop: "1rem",
    },
    saveButton: {
        backgroundColor: "#e94560",
        color: "white",
        border: "none",
        padding: "0.7rem 1.5rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: " 1rem",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        color: "#333",
        border: "none",
        padding: "0.7rem 1.5rem",
        borderRadius: " 4px",
        cursor: "pointer",
        fontSize: "1rem",
    },
    table: {
        width: "100%",
        borderCollapse: " collapse",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    tableHeader: {
        backgroundColor: "#1a1a2e",
        color: "white",
    },
    th: {padding: "1rem", textAlign: "left"},
    tableRow: {borderBottom: "1px solid #eee"},
    td: {padding: "1rem"},
    editButton: {
        backgroundColor: "#f0a500",
        color: "white",
        border: "none",
        padding: "0.4rem 0,8rem",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "0.5rem",
    },
    deleteButton: {
        backgroundColor: "#e94560",
        color: "white",
        border: "none",
        padding: "0.4rem 0.8rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default Hotels;