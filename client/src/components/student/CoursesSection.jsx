import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-purple-700">Popular Courses</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">best</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {allCourses.slice(0, 4).map((course, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to={"/course-list"}
            onClick={() => scrollTo(0, 0)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <span>Explore All Courses</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;