import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totalLectures, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  const getProgressPercentage = (index) => {
    if (!progressArray[index]) return 0;
    const { totalLectures, lectureCompleted } = progressArray[index];
    if (!totalLectures || totalLectures === 0) return 0; // Fix NaN when course has no lectures
    return (lectureCompleted * 100) / totalLectures;
  };

  const isCompleted = (index) => {
    if (!progressArray[index]) return false;
    const { totalLectures, lectureCompleted } = progressArray[index];
    if (!totalLectures || totalLectures === 0) return false; // Course with no lectures can't be completed
    return lectureCompleted === totalLectures && lectureCompleted > 0;
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
        {/* Header */}
        <div className="w-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Learning</span>
                </h1>
                <p className="text-gray-600">
                  {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'} enrolled
                </p>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {enrolledCourses.length > 0 && progressArray.length > 0
                      ? enrolledCourses.filter((_, i) => isCompleted(i)).length
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">
                    {enrolledCourses.length > 0 && progressArray.length > 0
                      ? enrolledCourses.filter((_, i) => !isCompleted(i)).length
                      : enrolledCourses.length}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-200 overflow-hidden transition-all hover:shadow-lg group"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-full sm:w-32 md:w-40 h-24 sm:h-24 md:h-28 object-cover rounded-xl"
                      />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 space-y-3">
                      {/* Title and Duration */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                            {course.courseTitle}
                          </h3>

                          {/* Duration - Desktop */}
                          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{calculateCourseDuration(course)}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                            isCompleted(index)
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {isCompleted(index) ? "✓ Completed" : "In Progress"}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {progressArray[index] && (
                              <>
                                <span className="font-semibold text-purple-600">
                                  {progressArray[index].lectureCompleted}
                                </span>
                                {" / "}
                                <span className="text-gray-500">
                                  {progressArray[index].totalLectures} lectures
                                </span>
                              </>
                            )}
                          </span>
                          <span className="font-bold text-purple-600">
                            {getProgressPercentage(index).toFixed(0)}%
                          </span>
                        </div>

                        {/* Custom Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                            style={{ width: `${getProgressPercentage(index)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => navigate("/player/" + course._id)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all group-hover:scale-105"
                      >
                        {isCompleted(index) ? "Review Course" : "Continue Learning"}
                        <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
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
              <p className="text-gray-600 mb-6">Start your learning journey today!</p>
              <button
                onClick={() => navigate("/course-list")}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;