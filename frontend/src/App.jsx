import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slices/authSlice";



//these are routes...
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import Chat from "./pages/Chat";
import FindVet from "./pages/FindVet";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";



const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" />;
};

const VetRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "vet") return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
      <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/find-vet"
          element={
            <ProtectedRoute>
              <FindVet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
 

      </Routes>
    </>
  );
}

export default App;
