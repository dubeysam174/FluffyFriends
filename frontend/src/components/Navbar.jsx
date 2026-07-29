import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/slices/authSlice";
import API from "../api/axios";
import toast from "react-hot-toast";
import {
  Menu,
  X,
  LogOut,
  MapPin,
  Calendar,
  MessageSquare,
  User,
} from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    console.log('useEffect ran')
    const handleScroll = () => {
       console.log(window.scrollY);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show navbar on login/register/verify-otp pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/verify-otp"
   
  ) {
    return null;
  }
 

  // If user not logged in, show minimal navbar
  if (!user) {
    return (
    <nav
  className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
    scrolled
      ? "top-4 w-[92%] max-w-6xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/100 shadow-2xl"
      : "top-0 w-full bg-transparent"
  }`}
>
  <div className="px-8">
    <div
      className={`flex justify-between items-center transition-all duration-500 ${
        scrolled ? "h-16" : "h-20"
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-20 ">
          <Logo size={250} isDark={false} />
        </div>
      </Link>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  </div>
</nav>
    );
  }

  // Navigation links based on user role
 

  // Handle logout
  


  // Logged in navbar
 
};

export default Navbar;
