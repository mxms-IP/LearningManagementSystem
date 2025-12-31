import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";

const Educator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50/30">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Educator;