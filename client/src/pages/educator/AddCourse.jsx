import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams , useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import Quill from "quill";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const editCourseId = searchParams.get("edit");

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image && !existingImage) {
        toast.error("Thumbnail Not Selected");
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      if (image) {
        formData.append("image", image);
      }

      const token = await getToken();
      const url = editCourseId 
        ? `${backendUrl}/api/educator/edit-course/${editCourseId}`
        : `${backendUrl}/api/educator/add-course`;
      
      const { data } = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message);
        if(editCourseId){
          navigate("/educator/my-courses");
        } else {
          setCourseTitle("");
          setCoursePrice(0);
          setDiscount(0);
          setImage(null);
          setChapters([]);
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load course data if editing
  const loadCourseData = async () => {
    if (!editCourseId) return;
    
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/course/${editCourseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const course = data.courseData;
        setCourseTitle(course.courseTitle);
        setCoursePrice(course.coursePrice);
        setDiscount(course.discount);
        setExistingImage(course.courseThumbnail);
        setChapters(course.courseContent.map(ch => ({
          ...ch,
          collapsed: false
        })));
        
        // Set Quill content after a small delay to ensure it's initialized
        setTimeout(() => {
          if (quillRef.current) {
            quillRef.current.root.innerHTML = course.courseDescription;
          }
        }, 100);
      }
    } catch (error) {
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  useEffect(() => {
    if (editCourseId && quillRef.current) {
      loadCourseData();
    }
  }, [editCourseId, quillRef.current]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30 pb-10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {editCourseId ? "Edit" : "Create New"} <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Course</span>
          </h1>
          <p className="text-gray-600">{editCourseId ? "Update your course details" : "Fill in the details to create your course"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => setCourseTitle(e.target.value)}
                  value={courseTitle}
                  type="text"
                  placeholder="e.g., Complete Web Development Bootcamp"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <div ref={editorRef} className="bg-white border-2 border-gray-200 rounded-xl min-h-[200px]"></div>
              </div>

              {/* Price and Discount Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={(e) => setCoursePrice(e.target.value)}
                    value={coursePrice}
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Thumbnail <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="thumbnailImage"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl cursor-pointer hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {existingImage && !image ? "Change Image" : "Choose Image"}
                  </label>
                  <input
                    type="file"
                    id="thumbnailImage"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    hidden
                  />
                  {image ? (
                    <div className="flex items-center gap-3">
                      <img
                        className="h-16 w-24 object-cover rounded-lg border-2 border-purple-200"
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                      />
                      <span className="text-sm text-gray-600">{image.name}</span>
                    </div>
                  ) : existingImage ? (
                    <div className="flex items-center gap-3">
                      <img
                        className="h-16 w-24 object-cover rounded-lg border-2 border-gray-200"
                        src={existingImage}
                        alt="Current thumbnail"
                      />
                      <span className="text-sm text-gray-500">Current image</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                <span className="text-pink-600 font-bold">2</span>
              </div>
              Course Content
            </h2>

            {/* Chapters List */}
            <div className="space-y-3 mb-4">
              {chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  {/* Chapter Header */}
                  <div className="bg-gray-50 flex justify-between items-center p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => handleChapter("toggle", chapter.chapterId)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            chapter.collapsed ? "-rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <span className="font-semibold text-gray-900">
                        Chapter {chapterIndex + 1}: {chapter.chapterTitle}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {chapter.chapterContent.length} lectures
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChapter("remove", chapter.chapterId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Lectures List */}
                  {!chapter.collapsed && (
                    <div className="p-4 space-y-2">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <div
                          key={lectureIndex}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {lectureIndex + 1}. {lecture.lectureTitle}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span>{lecture.lectureDuration} mins</span>
                              <span>•</span>
                              <a
                                href={lecture.lectureUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:underline"
                              >
                                View Link
                              </a>
                              <span>•</span>
                              <span className={lecture.isPreviewFree ? "text-green-600" : "text-gray-500"}>
                                {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)}
                            className="ml-2 p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}

                      {/* Add Lecture Button */}
                      <button
                        type="button"
                        onClick={() => handleLecture("add", chapter.chapterId)}
                        className="w-full mt-2 py-2.5 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-lg hover:border-purple-500 hover:text-purple-600 transition-colors"
                      >
                        + Add Lecture
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Chapter Button */}
            <button
              type="button"
              onClick={() => handleChapter("add")}
              className="w-full py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-bold rounded-xl hover:from-purple-200 hover:to-pink-200 transition-all"
            >
              + Add Chapter
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              {editCourseId ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>

      {/* Add Lecture Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Lecture</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lecture Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  placeholder="e.g., Introduction to JavaScript"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  placeholder="30"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isPreviewFree"
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                <label htmlFor="isPreviewFree" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Make this lecture free to preview
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addLecture}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Add Lecture
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;