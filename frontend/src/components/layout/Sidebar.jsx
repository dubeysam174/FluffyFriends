import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/slices/authSlice";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { Menu, X, LogOut, Home, Heart, Calendar, MessageSquare, User, MapPin, Pill, Settings, HelpCircle } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Different menu items based on role
  const menuItems = user?.role === "petOwner" 
    ? [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: Heart, label: "My Pets", path: "/pets" },
        { icon: MapPin, label: "Find Vet", path: "/find-vet" },
        { icon: Calendar, label: "Appointments", path: "/appointments" },
        { icon: MessageSquare, label: "Chat", path: "/chat" },
        { icon: User, label: "Profile", path: "/profile" },
      ]
    : [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: Calendar, label: "Appointments", path: "/appointments" },
        { icon: Heart, label: "My Patients", path: "/my-patients" },
        { icon: MessageSquare, label: "Messages", path: "/chat" },
        { icon: User, label: "Profile", path: "/profile" },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-red-600 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-red-600 to-red-700 text-white transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-20"
        } lg:translate-x-0 ${!isOpen && "lg:w-20"}`}
      >
        {/* LOGO */}
        <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-red-500">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 font-bold text-xl">
            🐾
          </div>
          {isOpen && <span className="font-bold text-lg hidden lg:inline">FluffyFriends</span>}
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-white/20 text-white"
                    : "text-red-100 hover:bg-white/10"
                }`}
                title={!isOpen ? item.label : ""}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="hidden lg:inline">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="p-4 border-t border-red-500 space-y-2">
          {/* SETTINGS */}
          <button
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-100 hover:bg-white/10 transition"
            title="Settings"
          >
            <Settings size={20} className="flex-shrink-0" />
            {isOpen && <span className="hidden lg:inline">Settings</span>}
          </button>

          {/* HELP */}
          <button
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-100 hover:bg-white/10 transition"
            title="Help"
          >
            <HelpCircle size={20} className="flex-shrink-0" />
            {isOpen && <span className="hidden lg:inline">Help</span>}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-100 hover:bg-red-500 transition"
            title="Logout"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="hidden lg:inline">Logout</span>}
          </button>
        </div>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-red-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            {isOpen && (
              <div className="hidden lg:block text-sm min-w-0">
                <p className="font-semibold truncate">{user?.name}</p>
                <p className="text-red-200 text-xs capitalize truncate">
                  {user?.role === "petOwner" ? "🐕 Pet Owner" : "🏥 Vet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className={`transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-20"} pt-16 lg:pt-0`}>
        {/* Content will be passed as children */}
      </div>
    </>
  );
};

export default Sidebar;