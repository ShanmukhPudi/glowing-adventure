import { useState, useEffect, useRef } from "react";
import API from "../api/axios";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";

// This container handles ALL the logic — fetching, searching, state
const HotelsContainer = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const debounceTimer = useRef(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get(`/hotels${query ? `?search=${query}` : ""}`);
      setHotels(data);
    } catch (err) {
      setError("Failed to load hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new debounced search
    debounceTimer.current = setTimeout(() => {
      fetchHotels(value.trim());
    }, 300);
  };

  const handleClear = () => {
    setSearch("");
    fetchHotels();
  };

  return (
    <>
      {/* Hero with integrated search */}
      <section className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>Explore our handpicked collection of premium hotels</p>
        <SearchBar 
          value={search} 
          onChange={(value) => {
            setSearch(value);
            handleSearch(value);
          }} 
          onSearch={() => handleSearch(search)} 
        />
      </section>

      {/* Hotels grid */}
      <div className="container">
        <div className="page-body">
          {search && !loading && (
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className="section-title">
                  {hotels.length} result{hotels.length !== 1 ? "s" : ""} for "{search}"
                </p>
              </div>
              <button className="btn btn-outline" onClick={handleClear}
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                Clear
              </button>
            </div>
          )}

          {!search && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="section-title">All Hotels</p>
              <p className="section-subtitle">Browse our available properties</p>
            </div>
          )}

          {loading ? (
            <div className="state-center"><p>Loading hotels...</p></div>
          ) : error ? (
            <div className="state-center"><p className="error-text">{error}</p></div>
          ) : hotels.length === 0 ? (
            <div className="state-center">
              <p style={{ fontSize: "2rem" }}>🏨</p>
              <p>No hotels found. Try a different search.</p>
            </div>
          ) : (
            <div className="hotels-grid">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelsContainer;