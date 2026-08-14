import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      dispatch(logout());
      dispatch(clearVetState());
      dispatch(clearPetState());
      dispatch(clearAppointmentState());
      dispatch(clearChat());
      dispatch(clearVetSearch());

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  // -----------------------------
  // MENU ITEMS
  // -----------------------------
  const menuItems =
    user?.role === "petOwner"
      ? [
          {
            icon: Heart,
            label: "My Pets",
            path: "/pets",
          },
          {
            icon: MapPin,
            label: "Find Vet",
            path: "/find-vet",
          },
          {
            icon: Calendar,
            label: "Appointments",
            path: "/appointments",
          },
          {
            icon: MessageSquare,
            label: "Chat",
            path: "/chat",
          },
          {
            icon: User,
            label: "Profile",
            path: "/profile",
          },
        ]
      : [
          {
            icon: Calendar,
            label: "Appointments",
            path: "/appointments",
          },
          {
            icon: Heart,
            label: "My Patients",
            path: "/my-patients",
          },
          {
            icon: MessageSquare,
            label: "Messages",
            path: "/chat",
          },
          {
            icon: User,
            label: "Profile",
            path: "/profile",
          },
        ];

  // -----------------------------
  // ACTIVE ROUTE
  // -----------------------------
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* =========================================
          MOBILE MENU BUTTON
      ========================================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed top-4 left-4 z-[60]
          lg:hidden
          w-11 h-11
          flex items-center justify-center
          rounded-xl
          bg-red-500
          text-white
          shadow-lg
          hover:bg-red-600
          hover:scale-105
          active:scale-95
          transition-all duration-200
        "
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0
            bg-black/30
            backdrop-blur-sm
            z-30
            lg:hidden
          "
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside
        className={`
          fixed
          left-0
          top-0
          h-screen
          z-40

          bg-white/90
          backdrop-blur-2xl

          border-r
          border-gray-200/80

          shadow-[4px_0_25px_rgba(0,0,0,0.05)]

          transition-all
          duration-300
          ease-in-out

          ${isOpen ? "w-64" : "w-20"}

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="h-full flex flex-col">

          {/* =====================================
              COLLAPSE BUTTON
          ===================================== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              hidden
              lg:flex

              absolute
              -right-4
              top-8

              w-8
              h-8

              items-center
              justify-center

              rounded-full

              bg-white
              border
              border-gray-200

              text-gray-600

              shadow-md

              hover:text-red-500
              hover:scale-110

              transition-all
              duration-200

              z-50
            "
          >
            {isOpen ? (
              <ChevronLeft size={17} />
            ) : (
              <ChevronRight size={17} />
            )}
          </button>

          {/* =====================================
              LOGO
          ===================================== */}
          <div
            className={`
              h-[90px]
              flex
              items-center

              border-b
              border-gray-100

              ${
                isOpen
                  ? "justify-start px-6"
                  : "justify-center px-2"
              }
            `}
          >
            <Link
              to="/"
              className="
                flex
                items-center
                justify-center
              "
            >
              {isOpen ? (
                <Logo size={250} />
              ) : (
                <div className="
    w-11 h-11
    rounded-xl
    bg-red-500
    flex
    items-center
    justify-center
    text-white
    font-bold
    text-lg
    shadow-md
    shadow-red-500/20
  ">
    FF
  </div>
              )}
            </Link>
          </div>

          {/* =====================================
              NAVIGATION
          ===================================== */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">

            {/* MAIN LABEL */}
            {isOpen && (
              <p className="
                px-3
                mb-3
                text-[11px]
                font-semibold
                tracking-widest
                uppercase
                text-gray-400
              ">
                Main
              </p>
            )}

            {/* MENU */}
            <div className="space-y-1.5">

              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      // Close sidebar on mobile
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    title={!isOpen ? item.label : ""}
                    className={`
                      group

                      relative

                      flex
                      items-center

                      ${
                        isOpen
                          ? "gap-3 px-3.5"
                          : "justify-center px-2"
                      }

                      h-11

                      rounded-xl

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-red-500
                            text-white
                            shadow-md
                            shadow-red-500/20
                          `
                          : `
                            text-gray-600
                            hover:bg-red-50
                            hover:text-red-500
                          `
                      }
                    `}
                  >

                    {/* ACTIVE INDICATOR */}
                    {active && (
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2
                          -translate-y-1/2

                          w-1
                          h-6

                          rounded-r-full

                          bg-red-700
                        "
                      />
                    )}

                    {/* ICON */}
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.4 : 2}
                      className="
                        flex-shrink-0
                        transition-transform
                        duration-200
                        group-hover:scale-105
                      "
                    />

                    {/* LABEL */}
                    {isOpen && (
                      <span
                        className="
                          text-sm
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {item.label}
                      </span>
                    )}

                    {/* MOBILE/COLLAPSED TOOLTIP */}
                    {!isOpen && (
                      <span
                        className="
                          absolute
                          left-16

                          px-3
                          py-1.5

                          rounded-lg

                          bg-gray-900
                          text-white

                          text-xs
                          font-medium

                          whitespace-nowrap

                          opacity-0
                          pointer-events-none

                          group-hover:opacity-100

                          transition-opacity
                          duration-200

                          shadow-lg

                          z-50
                        "
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* =====================================
              BOTTOM SECTION
          ===================================== */}
          <div className="
            px-3
            py-4

            border-t
            border-gray-100

            space-y-1.5
          ">

            {/* SUPPORT LABEL */}
            {isOpen && (
              <p className="
                px-3
                mb-3

                text-[11px]
                font-semibold
                tracking-widest
                uppercase

                text-gray-400
              ">
                Support
              </p>
            )}

            {/* SETTINGS */}
            <button
              className={`
                group
                w-full
                h-11

                flex
                items-center

                ${
                  isOpen
                    ? "gap-3 px-3.5"
                    : "justify-center px-2"
                }

                rounded-xl

                text-gray-600

                hover:bg-gray-100
                hover:text-gray-900

                transition-all
                duration-200
              `}
              title={!isOpen ? "Settings" : ""}
            >
              <Settings
                size={20}
                className="
                  flex-shrink-0
                  group-hover:rotate-45
                  transition-transform
                  duration-300
                "
              />

              {isOpen && (
                <span className="text-sm font-medium">
                  Settings
                </span>
              )}
            </button>

            {/* HELP */}
            <button
              className={`
                group
                w-full
                h-11

                flex
                items-center

                ${
                  isOpen
                    ? "gap-3 px-3.5"
                    : "justify-center px-2"
                }

                rounded-xl

                text-gray-600

                hover:bg-gray-100
                hover:text-gray-900

                transition-all
                duration-200
              `}
              title={!isOpen ? "Help" : ""}
            >
              <HelpCircle
                size={20}
                className="flex-shrink-0"
              />

              {isOpen && (
                <span className="text-sm font-medium">
                  Help & Support
                </span>
              )}
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className={`
                group
                w-full
                h-11

                flex
                items-center

                ${
                  isOpen
                    ? "gap-3 px-3.5"
                    : "justify-center px-2"
                }

                rounded-xl

                text-gray-600

                hover:bg-red-50
                hover:text-red-500

                transition-all
                duration-200
              `}
              title={!isOpen ? "Logout" : ""}
            >
              <LogOut
                size={20}
                className="
                  flex-shrink-0
                  group-hover:translate-x-0.5
                  transition-transform
                  duration-200
                "
              />

              {isOpen && (
                <span className="text-sm font-medium">
                  Logout
                </span>
              )}
            </button>
          </div>

          {/* =====================================
              USER PROFILE
          ===================================== */}
          <div className="
            p-3
            border-t
            border-gray-100
          ">
            <div
              className={`
                flex
                items-center

                ${
                  isOpen
                    ? "gap-3 px-2.5 py-2.5"
                    : "justify-center py-2"
                }

                rounded-xl

                bg-gray-50
                border
                border-gray-100
              `}
            >

              {/* AVATAR */}
             <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold flex-shrink-0 border border-red-200">
  {user?.avatar ? (
    <img
      src={user.avatar}
      alt={user.name}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    user?.name?.charAt(0).toUpperCase()  // Fallback to initial
  )}
</div>

              {/* USER INFORMATION */}
              {isOpen && (
                <div className="
                  min-w-0
                  flex-1
                ">
                  <p className="
                    text-sm
                    font-semibold
                    text-gray-900
                    truncate
                  ">
                    {user?.name || "User"}
                  </p>

                  <p className="
                    mt-0.5
                    text-xs
                    text-gray-500
                    truncate
                  ">
                    {user?.role === "petOwner"
                      ? "Pet Owner"
                      : "Veterinarian"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default GlassSidebar;