import React from "react";

const StatsSection = () => {
  const stats = [
    {
      icon: "📅",
      label: "Upcoming Appointments",
      value: "2",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🐕",
      label: "Your Pets",
      value: "3",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "💬",
      label: "Unread Messages",
      value: "1",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "⭐",
      label: "Account Rating",
      value: "4.9",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 transition"
          >
            {/* GRADIENT BACKGROUND ACCENT */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-8 -mt-8`}></div>

            {/* CONTENT */}
            <div className="relative z-10">
              {/* ICON */}
              <div className="text-4xl mb-3">{stat.icon}</div>

              {/* VALUE */}
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>

              {/* LABEL */}
              <p className="text-gray-600 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ADDITIONAL INFO */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-2">📢 Last Appointment</h3>
            <p className="text-gray-600 text-sm">
              Checkup with Dr. Sharma on Dec 15, 2024
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-bold text-gray-900 mb-2">✅ Next Appointment</h3>
            <p className="text-gray-600 text-sm">
              Vaccination scheduled for Jan 5, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;