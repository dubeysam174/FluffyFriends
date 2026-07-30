import React, { useState } from "react";
import GlassSidebar from "./Sidebar";
import FloatingPaws from "../landing/FloatingPaws";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-white">
      <FloatingPaws />

      <GlassSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;