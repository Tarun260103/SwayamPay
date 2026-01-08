import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the homepage.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full flex justify-center items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;