import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center md:pt-32 pt-20 pb-16 md:pb-20 px-4 sm:px-6 space-y-6 sm:space-y-8 text-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      
      {/* Decorative Floating Elements - Hidden on small mobile */}
      <div className="absolute top-20 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-purple-200 rounded-full opacity-20 animate-bounce hidden sm:block" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-32 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-pink-200 rounded-full opacity-20 animate-bounce hidden sm:block" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-200 rounded-full opacity-20 animate-bounce hidden md:block" style={{animationDuration: '5s'}}></div>
      
      {/* Main Heading */}
      <div className="relative w-full max-w-4xl mx-auto px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Empower your future with the courses designed to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            fit your choice
          </span>
        </h1>
      </div>

      {/* Subtitle - Desktop */}
      <p className="hidden md:block text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-4">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      {/* Subtitle - Mobile */}
      <p className="md:hidden text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mx-auto pt-2 sm:pt-4">
        <SearchBar />
      </div>

      {/* Stats Section - Responsive grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 px-4">
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">50K+</div>
          <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Active Students</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">1,000+</div>
          <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Expert Instructors</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">5,000+</div>
          <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Courses Available</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;