import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const [isFocused, setIsFocused] = useState(false);

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className={`max-w-3xl w-full transition-all duration-300 ${
        isFocused ? 'shadow-float' : 'shadow-card'
      }`}
    >
      <div className="flex items-center bg-white rounded-xl border-2 border-neutral-200 focus-within:border-primary-500 transition-all duration-300 overflow-hidden">
        {/* Search Icon */}
        <div className="pl-5 pr-3">
          <svg 
            className="w-5 h-5 text-neutral-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={input}
          type="text"
          placeholder="Search for courses, skills, or instructors..."
          className="flex-1 h-14 md:h-16 outline-none text-body-md text-neutral-700 placeholder:text-neutral-400 bg-transparent"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="btn btn-primary h-10 md:h-12 m-2 px-6 md:px-10 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span className="font-semibold">Search</span>
          <svg 
            className="w-4 h-4 hidden md:block" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;