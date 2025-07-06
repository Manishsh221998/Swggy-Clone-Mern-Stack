import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Helmet>
        <title>Eatzy - Page Not Found</title>
      </Helmet>
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        {/* Illustration */}
        <div className="mx-auto w-48 h-48 mb-6 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">404 - Page Not Found</h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action Button */}
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-black hover:shadow-2xl"
        >
          Back to Home
        </Link>
        
      </div>
    </div>
  );
};

export default NotFoundPage;