import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import QuickActions from "./QuickActions";
import StatsSection from "./StatsSection";

const DashboardSection = () => {
  const user = useSelector(selectUser);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WELCOME SECTION */}
        <div className="mb-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {getCurrentGreeting()}, <span className="text-red-600">{user.name}!</span> 👋
              </h1>
              <p className="text-gray-600 text-lg">
                {user.role === "petOwner" ? "🐕 Pet Owner" : "🏥 Veterinarian"} • 
                <span className="ml-2">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div className="text-6xl animate-bounce">
              {user.role === "petOwner" ? "🐾" : "💉"}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* STATS SECTION */}
        <StatsSection />
      </div>
    </section>
  );
};

export default DashboardSection;