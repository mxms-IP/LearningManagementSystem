import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/educator", 
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    { 
      name: "Add Course", 
      path: "/educator/add-course", 
      icon: "M12 4v16m8-8H4"
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      name: "Students",
      path: "/educator/student-enrolled",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
  ];

  return (
    isEducator && (
      <>
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-40
            md:w-64 w-64
            min-h-screen
            bg-white border-r border-gray-200
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full py-6">
            {/* Sidebar Header - Mobile */}
            <div className="px-6 mb-6 md:hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Educator Menu
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-3">
              {menuItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  end={item.path === "/educator"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 mb-1 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <svg 
                        className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="font-medium text-sm">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="px-6 pt-6 border-t border-gray-200">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-xs text-gray-600 mb-2">Need help?</p>
                <a 
                  href="#" 
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  Contact Support
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </>
    )
  );
};

export default Sidebar;