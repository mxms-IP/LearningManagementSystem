import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600"></div>
      
      {/* Decorative Elements - Hidden on mobile for better performance */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl hidden md:block"></div>
      
      {/* Floating Shapes - Hidden on mobile */}
      <div className="absolute top-20 left-1/4 w-12 h-12 border-4 border-white/20 rounded-lg rotate-12 animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 right-1/4 w-10 h-10 border-4 border-white/20 rounded-full animate-bounce-slow hidden lg:block"></div>
      
      {/* Content Container with proper width constraints */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-white/30">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold text-white">Start Your Learning Journey</span>
          </div>

          {/* Heading - Responsive text sizes */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-2">
            Learn anything, anytime, anywhere
          </h2>

          {/* Description - Better mobile text size */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-4">
            Join thousands of learners worldwide and unlock your potential with expert-led courses. Start learning today and transform your future.
          </p>

          {/* CTA Buttons - Stack on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 mb-8 sm:mb-12 md:mb-16">
            {/* Primary CTA */}
            <Link
              to="/course-list"
              onClick={() => scrollTo(0, 0)}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-700 font-bold text-sm sm:text-base rounded-xl hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>

            {/* Secondary CTA */}
            <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold text-sm sm:text-base rounded-xl hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats - Responsive grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 border-t border-white/20 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
              <div className="text-xs sm:text-sm text-white/80">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">5K+</div>
              <div className="text-xs sm:text-sm text-white/80">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-xs sm:text-sm text-white/80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">1K+</div>
              <div className="text-xs sm:text-sm text-white/80">Expert Instructors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;