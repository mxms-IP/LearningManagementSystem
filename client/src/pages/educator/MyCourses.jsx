import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      data.success && setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  const calculateEarnings = (course) => {
    return Math.floor(
      course.enrolledStudents.length *
        (course.coursePrice - (course.discount * course.coursePrice) / 100)
    );
  };

  return courses ? (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-gray-600 mt-1">{courses.length} {courses.length === 1 ? 'course' : 'courses'} published</p>
          </div>
          <a
            href="/educator/add-course"
            className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add Course</span>
          </a>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-200 overflow-hidden transition-all hover:shadow-lg group"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-full sm:w-40 md:w-48 h-32 sm:h-28 md:h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    {/* Left: Title and Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
                        {course.courseTitle}
                      </h3>

                      {/* Stats Row */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        {/* Students */}
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="font-medium">{course.enrolledStudents.length}</span>
                          <span>students</span>
                        </div>

                        <span className="text-gray-300">|</span>

                        {/* Earnings */}
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-green-600">
                            {currency}{calculateEarnings(course)}
                          </span>
                        </div>

                        <span className="text-gray-300">|</span>

                        {/* Published Date */}
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Price Info */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-600">
                          {currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
                        </span>
                        {course.discount > 0 && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              {currency}{course.coursePrice}
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                              {course.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex sm:flex-col gap-2 justify-end">
                      <a
                        href={`/educator/add-course?edit=${course._id}`}
                        className="px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition-colors text-sm text-center"
                      >
                        Edit
                      </a>
                      <a
                        href={`/course/${course._id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm text-center"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start creating your first course!</p>
            <a
              href="/educator/add-course"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Create Course
            </a>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;