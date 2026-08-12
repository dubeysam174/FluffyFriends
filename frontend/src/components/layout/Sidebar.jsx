import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/slices/authSlice";
import { clearPetState } from "../../store/slices/petSlice";
import { clearVetState } from "../../store/slices/vetSlice";
import { clearAppointmentState } from "../../store/slices/appointmentSlice";
import { clearChat } from "../../store/slices/chatSlice";
import { clearVetSearch } from "../../store/slices/VetSearchSlice";
import API from "../../api/axios";
import toast from "react-hot-toast";
import {
  Menu,
  X,
  LogOut,
  Heart,
  Calendar,
  MessageSquare,
  User,
  MapPin,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Logo from "../Logo";

const GlassSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

const handleLogout = async () => {
  try {
    await API.post("/auth/logout");
    dispatch(logout());
    dispatch(clearVetState());
    dispatch(clearPetState());
    dispatch(clearAppointmentState());
    dispatch(clearChat());
    dispatch(clearVetSearch());
    // ✅ Removed broken dispatch()

    toast.success("Logged out successfully");
    navigate("/login");  // ← Add this if not already
  } catch (error) {
    toast.error("Logout failed");
  }
};

  // Different menu items based on role
  const menuItems =
    user?.role === "petOwner"
      ? [
          { icon: Heart, label: "My Pets", path: "/pets" },
          { icon: MapPin, label: "Find Vet", path: "/find-vet" },
          { icon: Calendar, label: "Appointments", path: "/appointments" },
          { icon: MessageSquare, label: "Chat", path: "/chat" },
          { icon: User, label: "Profile", path: "/profile" },
        ]
      : [
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
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg backdrop-blur-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* GLASS SIDEBAR */}
      <div
        className={` fixed left-0 top-0 h-screen  transition-all duration-300 z-40
                    backdrop-blur-xl bg-white/10 border-r border-white/20
                    shadow-2xl ${isOpen ? "w-64" : "w-20"} lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:flex absolute -right-4 top-8
             w-8 h-8 rounded-full bg-white
             shadow-xl border border-gray-200
             items-center justify-center
             hover:scale-110 transition-all"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
          {/* LOGO */}
          <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-white/10">
            <div
              className={`border-b border-white/10 transition-all duration-300
  ${isOpen ? "px-6 py-5" : "py-5 flex justify-center"}`}
            >
              <Link to="/" className="flex items-center">
                {isOpen ? (
                  <Logo size={170} />
                ) : (
                  <Logo size={45} /> // Only the icon/paw logo
                )}
              </Link>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                    active
                      ? "bg-white/30 text-black backdrop-blur-md border  shadow-lg"
                      : "text-black hover:bg-red-500/30 hover:backdrop-blur-md"
                  }`}
                  title={!isOpen ? item.label : ""}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {isOpen && (
                    <span className="hidden lg:inline">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* BOTTOM SECTION */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {/* SETTINGS */}
            <button
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-black hover:bg-red-500/30 hover:backdrop-blur-md transition"
              title="Settings"
            >
              <Settings size={20} className="flex-shrink-0" />
              {isOpen && <span className="hidden lg:inline">Settings</span>}
            </button>

            {/* HELP */}
            <button
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-black hover:bg-red-500/30 hover:backdrop-blur-md transition"
              title="Help"
            >
              <HelpCircle size={20} className="flex-shrink-0" />
              {isOpen && <span className="hidden lg:inline">Help</span>}
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-black hover:bg-red-500/30 hover:backdrop-blur-md transition"
              title="Logout"
            >
              <LogOut size={20} className="flex-shrink-0" />
              {isOpen && <span className="hidden lg:inline">Logout</span>}
            </button>
          </div>

          {/* USER PROFILE */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center text-black font-bold flex-shrink-0 backdrop-blur-md border border-white/40">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              {isOpen && (
                <div className="hidden lg:block text-sm min-w-0">
                  <p className="font-semibold text-black truncate">
                    {user?.name}
                  </p>
                  <p className="text-black text-xs capitalize truncate">
                    {user?.role === "petOwner" ? "🐕 Pet Owner" : "🏥 Vet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlassSidebar;
