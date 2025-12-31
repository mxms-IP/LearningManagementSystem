import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/" + id);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Login to Enroll");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Already Enrolled");
      }

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30">
        {/* Hero Section - Full Width */}
        <div className="w-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 pt-16 md:pt-20 pb-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Course Title and Basic Info */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {courseData.courseTitle}
            </h1>

            {/* Short Description */}
            <p
              className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 max-w-4xl"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.replace(/<[^>]*>/g, '').slice(0, 200) + "..."
              }}
            ></p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm lg:text-base mb-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-bold text-gray-900">
                  {calculateRating(courseData).toFixed(1)}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        i < Math.floor(calculateRating(courseData))
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-purple-600 font-medium">
                  ({courseData.courseRatings.length})
                </span>
              </div>

              <span className="text-gray-300">•</span>

              {/* Students */}
              <div className="flex items-center gap-1.5 text-gray-700">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{courseData.enrolledStudents.length} students</span>
              </div>

              <span className="text-gray-300 hidden sm:inline">•</span>

              {/* Educator */}
              <div className="flex items-center gap-1.5 text-gray-700">
                <span>By</span>
                <span className="font-semibold text-purple-600">
                  {courseData.educator.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Takes More Space */}
            <div className="flex-1 lg:max-w-none space-y-8 md:space-y-12">
              {/* Course Content Sections */}
              <section>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Course Content
                </h2>

                <div className="space-y-2 md:space-y-3">
                  {courseData.courseContent.map((chapter, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-200 transition-colors"
                    >
                      <button
                        className="w-full flex items-center justify-between px-3 md:px-4 lg:px-6 py-3 md:py-4 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <svg
                            className={`w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0 transform transition-transform ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                            {chapter.chapterTitle}
                          </h3>
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-medium ml-2 flex-shrink-0">
                          {chapter.chapterContent.length} • {calculateChapterTime(chapter)}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openSections[index] ? "max-h-[1000px]" : "max-h-0"
                        }`}
                      >
                        <div className="border-t border-gray-200 bg-gray-50 p-3 md:p-4 lg:p-6">
                          <ul className="space-y-2 md:space-y-3">
                            {chapter.chapterContent.map((lecture, i) => (
                              <li key={i} className="flex items-start gap-2 md:gap-3">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                    <p className="text-xs md:text-sm lg:text-base text-gray-800 truncate">
                                      {lecture.lectureTitle}
                                    </p>
                                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                                      {lecture.isPreviewFree && (
                                        <button
                                          onClick={() =>
                                            setPlayerData({
                                              videoId: lecture.lectureUrl.split("/").pop(),
                                            })
                                          }
                                          className="text-xs md:text-sm font-semibold text-purple-600 hover:text-purple-700"
                                        >
                                          Preview
                                        </button>
                                      )}
                                      <span className="text-xs md:text-sm text-gray-500">
                                        {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Full Description */}
              <section>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  About This Course
                </h2>
                <div
                  className="prose prose-sm md:prose-base lg:prose-lg max-w-none rich-text"
                  dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                ></div>
              </section>
            </div>

            {/* Right Column - Sticky Sidebar (Desktop Only) */}
            <div className="lg:w-96 xl:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <CoursePreviewCard
                  courseData={courseData}
                  playerData={playerData}
                  setPlayerData={setPlayerData}
                  currency={currency}
                  calculateRating={calculateRating}
                  calculateCourseDuration={calculateCourseDuration}
                  calculateNoOfLectures={calculateNoOfLectures}
                  enrollCourse={enrollCourse}
                  isAlreadyEnrolled={isAlreadyEnrolled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

// Course Preview Card Component
const CoursePreviewCard = ({
  courseData,
  playerData,
  setPlayerData,
  currency,
  calculateRating,
  calculateCourseDuration,
  calculateNoOfLectures,
  enrollCourse,
  isAlreadyEnrolled,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl">
      {/* Video/Thumbnail */}
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
        {playerData ? (
          <YouTube
            videoId={playerData.videoId}
            opts={{ playerVars: { autoplay: 1 } }}
            iframeClassName="w-full h-full"
          />
        ) : (
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Urgency Banner */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs md:text-sm text-red-700">
            <span className="font-bold">5 days</span> left at this price!
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {currency}
            {((courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2))}
          </p>
          {courseData.discount > 0 && (
            <>
              <p className="text-lg md:text-xl text-gray-400 line-through">
                {currency}{courseData.coursePrice}
              </p>
              <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 text-xs md:text-sm font-bold rounded-full">
                {courseData.discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{calculateRating(courseData).toFixed(1)}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{calculateCourseDuration(courseData)}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{calculateNoOfLectures(courseData)}</span>
          </div>
        </div>

        {/* Enroll Button */}
        <button
          onClick={enrollCourse}
          disabled={isAlreadyEnrolled}
          className={`w-full py-3 md:py-4 rounded-xl font-bold text-white text-sm md:text-base transition-all ${
            isAlreadyEnrolled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105"
          }`}
        >
          {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>

        {/* What's Included */}
        <div className="pt-3 md:pt-4 border-t border-gray-200">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
            What's included
          </h3>
          <ul className="space-y-2 md:space-y-3">
            {[
              "Lifetime access with free updates",
              "Step-by-step project guidance",
              "Downloadable resources & code",
              "Interactive quizzes",
              "Certificate of completion",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 md:gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;