import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [path, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer rotating circle */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-gray-200 border-t-4 border-t-purple-600 rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-semibold text-gray-700 animate-pulse">
        Loading...
      </p>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-4">
        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
};

export default Loading;