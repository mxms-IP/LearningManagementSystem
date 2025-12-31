import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  const rating = calculateRating(course);

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Course Thumbnail with Overlay */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          src={course.courseThumbnail}
          alt="courseThumbnail"
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Discount Badge (if applicable) */}
        {course.discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {course.discount}% OFF
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5 space-y-3">
        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {course.courseTitle}
        </h3>

        {/* Educator Name */}
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {course.educator?.name || "Unknown Educator"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <span className="text-xs text-gray-400">({course.courseRatings.length})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currency}
              {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
            </p>
            {course.discount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {currency}{course.coursePrice.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Arrow Icon */}
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
            <svg className="w-4 h-4 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;