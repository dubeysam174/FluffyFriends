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
  const navLinks = [
    {
      name: "Find Vet",
      path: "/find-vet",
      icon: MapPin,
      show: user.role === "petOwner",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: Calendar,
      show: true,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: MessageSquare,
      show: true,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
      show: true,
    },
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };


  // Logged in navbar
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
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12">
              <Logo size={48} isDark={false} />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks
              .filter((link) => link.show)
              .map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1 transition ${
                      isActive
                        ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400 pb-4"
                        : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
          </div>

          {/* USER INFO & LOGOUT - DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role === "petOwner" ? "🐕 Pet Owner" : "🏥 Veterinarian"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            {/* MOBILE NAV LINKS */}
            {navLinks
              .filter((link) => link.show)
              .map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 transition ${
                      isActive
                        ? "text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950 border-l-4 border-red-600 dark:border-red-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

            {/* MOBILE USER INFO */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-800 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {user.role === "petOwner" ? "🐕 Pet Owner" : "🏥 Veterinarian"}
              </p>
            </div>

            {/* MOBILE LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
