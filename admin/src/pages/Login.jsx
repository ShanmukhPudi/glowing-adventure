import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await API.post("/auth/login", { email, password});

            // only allow admin users into the admin panel
            if (data.role !== "admin") {
                setError("Access denied. Admin accounts only.");
                setLoading(false);
                return;
            }

            login(data);
            navigate("/hotels");
        } catch(err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
  <div className="login-page">
    <div className="login-card">
      <h2>ATLANTIS</h2>
      <p>Sign in to manage hotels and bookings</p>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  </div>
);
};

const styles = {
    container: {
        minheight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
    },
    card: {
        backgroundColor: "white",
        padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: { margin: "0 0 0.5rem", color: "#1a1a2e", textAlign: "center" },
  subtitle: { margin: "0 0 1.5rem", color: "#666", textAlign: "center", fontSize: "0.9rem" },
  error: { color: "red", marginBottom: "1rem", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#570fe8",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Login;