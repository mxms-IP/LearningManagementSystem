import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Course Structure */}
            <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0 order-2 lg:order-1">
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-white">Course Content</h2>
                </div>

                {/* Course Structure */}
                <div className="p-4 space-y-2 max-h-[600px] overflow-y-auto">
                  {courseData.courseContent.map((chapter, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-200 transition-colors"
                    >
                      {/* Chapter Header */}
                      <button
                        className="w-full flex items-center justify-between px-3 md:px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <svg
                            className={`w-4 h-4 text-purple-600 flex-shrink-0 transform transition-transform ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {chapter.chapterTitle}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {chapter.chapterContent.length} • {calculateChapterTime(chapter)}
                        </span>
                      </button>

                      {/* Chapter Lectures */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openSections[index] ? "max-h-[500px]" : "max-h-0"
                        }`}
                      >
                        <div className="border-t border-gray-200 bg-gray-50 p-2">
                          <ul className="space-y-1">
                            {chapter.chapterContent.map((lecture, i) => (
                              <li
                                key={i}
                                className={`flex items-start gap-2 p-2 rounded-lg transition-colors ${
                                  playerData?.lectureId === lecture.lectureId
                                    ? "bg-purple-100"
                                    : "hover:bg-white"
                                }`}
                              >
                                {/* Icon */}
                                {progressData &&
                                progressData.lectureCompleted.includes(lecture.lectureId) ? (
                                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                  </svg>
                                )}

                                {/* Lecture Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col gap-1">
                                    <p className="text-xs md:text-sm text-gray-800 truncate">
                                      {lecture.lectureTitle}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      {lecture.lectureUrl && (
                                        <button
                                          onClick={() =>
                                            setPlayerData({
                                              ...lecture,
                                              chapter: index + 1,
                                              lecture: i + 1,
                                            })
                                          }
                                          className="text-xs font-semibold text-purple-600 hover:text-purple-700"
                                        >
                                          Watch
                                        </button>
                                      )}
                                      <span className="text-xs text-gray-500">
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

                {/* Rating Section */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                    Rate this Course
                  </h3>
                  <Rating initialRating={initialRating} onRate={handleRate} />
                </div>
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                {/* Video Player */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  {playerData ? (
                    <YouTube
                      videoId={playerData.lectureUrl}
                      className="absolute inset-0 w-full h-full"
                      iframeClassName="absolute inset-0 w-full h-full"
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                      <svg className="w-20 h-20 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold mb-2">Select a lecture to start</h3>
                      <p className="text-gray-400">Choose any lecture from the course content</p>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                {playerData && (
                  <div className="p-4 md:p-6 space-y-4">
                    {/* Lecture Title */}
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
                        Lecture {playerData.chapter}.{playerData.lecture}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {playerData.lectureTitle}
                      </h2>
                    </div>

                    {/* Mark Complete Button */}
                    <button
                      onClick={() => markLectureAsCompleted(playerData.lectureId)}
                      disabled={
                        progressData &&
                        progressData.lectureCompleted.includes(playerData.lectureId)
                      }
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        progressData &&
                        progressData.lectureCompleted.includes(playerData.lectureId)
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {progressData &&
                      progressData.lectureCompleted.includes(playerData.lectureId) ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      ) : (
                        "Mark as Complete"
                      )}
                    </button>
                  </div>
                )}
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

export default Player;