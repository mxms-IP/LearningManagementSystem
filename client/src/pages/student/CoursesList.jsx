import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourses(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourses(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Breadcrumb and Title */}
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-3">
                  <button
                    onClick={() => navigate("/")}
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </button>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600">Courses</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Explore All <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Courses</span>
                </h1>
                <p className="text-gray-600 mt-2">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-auto md:min-w-[400px]">
                <SearchBar data={input} />
              </div>
            </div>

            {/* Active Filter Tag */}
            {input && (
              <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-white rounded-xl border-2 border-purple-200 text-gray-700 shadow-sm">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Searching:</span>
                <span className="text-purple-600 font-semibold">"{input}"</span>
                <button
                  onClick={() => navigate("/course-list")}
                  className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index % 8) * 50}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or explore all courses</p>
              <button
                onClick={() => navigate("/course-list")}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Courses
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;