import React from "react";
import GlassSidebar from "./Sidebar";
import FloatingPaws from "../landing/FloatingPaws";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <FloatingPaws/>
      <GlassSidebar />
      <div className="flex-1 ml-20 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;