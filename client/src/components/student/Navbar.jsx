import React, { useContext } from "react";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { user } = useUser();
  const { isEducator } = useContext(AppContext);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {user ? (
              <>
                {/* My Learning Button */}
                <Link
                  to="/my-enrollments"
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors hidden sm:block"
                >
                  My Learning
                </Link>

                {/* Become Educator / Dashboard Button */}
                <Link
                  to="/educator"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">
                    {isEducator ? "Dashboard" : "Become Educator"}
                  </span>
                  <span className="sm:hidden">Teach</span>
                </Link>

                {/* User Avatar */}
                <div className="[&>button]:w-10 [&>button]:h-10">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 ring-2 ring-purple-200"
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              // Not Logged In
              <div className="flex items-center gap-2 md:gap-3">
                <SignInButton mode="modal">
                  <button className="px-4 md:px-5 py-2 md:py-2.5 text-gray-700 font-semibold hover:text-purple-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;