import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-4">
            <span className="text-2xl">💬</span>
            <span className="text-sm font-semibold text-pink-700">Student Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">learners say</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Header with Profile */}
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                {/* Decorative Circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
                
                <div className="relative flex items-center gap-4">
                  <div className="relative">
                    <img
                      className="h-14 w-14 rounded-full border-2 border-white shadow-md object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(testimonial.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.feedback}"
                </p>

                {/* Read More Link */}
                <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read full story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Decorative Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Testimonials */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold group">
            <span>View all success stories</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;