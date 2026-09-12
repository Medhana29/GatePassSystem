import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import ApplyGatePass from "./ApplyGatePass";
import AdminDashboard from "./AdminDashboard";
import SecurityDashboard from "./SecurityDashboard";
import Register from "./Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student"
          element={
            user?.role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/student/apply"
          element={
            user?.role === "student" ? (
              <ApplyGatePass />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/security"
          element={
            user?.role === "security" ? (
              <SecurityDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;