import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import FleetPage from "./screens/Fleet";
import "./index.css";
import AboutPage from "./screens/AboutUs";
import Book from "./screens/Book";
import Contact from "./screens/ContactUs";
import ServicesPage from "./screens/Services";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProfilePage from "./screens/Profile";
import AdminDashboard from "./screens/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fleet" element={<FleetPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Book />
          </ProtectedRoute>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;