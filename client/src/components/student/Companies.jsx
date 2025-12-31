import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="py-12 md:py-16 px-6">
      {/* Title */}
      <p className="text-center text-base md:text-lg text-gray-500 font-medium mb-8">
        Trusted by learners from leading companies
      </p>

      {/* Company Logos with Gradient Background */}
      <div className="relative">
        {/* Decorative gradient blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-yellow-100/50 blur-3xl -z-10"></div>
        
        {/* Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8">
          <div className="group transition-all duration-300 hover:scale-110">
            <img
              src={assets.microsoft_logo}
              alt="Microsoft"
              className="w-24 md:w-32 opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
          <div className="group transition-all duration-300 hover:scale-110">
            <img 
              src={assets.walmart_logo} 
              alt="Walmart" 
              className="w-24 md:w-32 opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
          <div className="group transition-all duration-300 hover:scale-110">
            <img
              src={assets.accenture_logo}
              alt="Accenture"
              className="w-24 md:w-32 opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
          <div className="group transition-all duration-300 hover:scale-110">
            <img 
              src={assets.adobe_logo} 
              alt="Adobe" 
              className="w-24 md:w-32 opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
          <div className="group transition-all duration-300 hover:scale-110">
            <img 
              src={assets.paypal_logo} 
              alt="Paypal" 
              className="w-24 md:w-32 opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;