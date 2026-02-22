// export default App
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Bookings from "./pages/Bookings";

//  Protects routes from inauthenticated access
const PrivateRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<PrivateRoute><Bookings/></PrivateRoute>} />
        <Route path="/hotels" element={<PrivateRoute><Hotels/></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/hotels"/>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;