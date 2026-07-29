import React from "react";
import { Link } from "react-router-dom";

const ActionCard = ({ icon: Icon, title, description, path, color, emoji }) => {
  const colorStyles = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    indigo: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
  };

  const bgStyles = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
    red: "bg-red-50",
    indigo: "bg-indigo-50",
  };

  const iconStyles = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
    indigo: "text-indigo-600",
  };

  return (
    <Link to={path}>
      <div className={`${bgStyles[color]} p-6 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:scale-105 cursor-pointer h-full border-2 border-transparent hover:border-current`}>
        
        {/* TOP SECTION */}
        <div className="flex items-start justify-between mb-4">
          {/* EMOJI */}
          <span className="text-4xl">{emoji}</span>
          
          {/* GRADIENT ICON BACKGROUND */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorStyles[color].split(" ")[0]} ${colorStyles[color].split(" ")[1]} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={24} />
          </div>
        </div>

        {/* TITLE */}
        <h3 className={`text-xl font-bold mb-2 ${iconStyles[color]}`}>
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* ARROW INDICATOR */}
        <div className={`flex items-center gap-2 ${iconStyles[color]} font-semibold text-sm`}>
          <span>Get Started</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ActionCard;