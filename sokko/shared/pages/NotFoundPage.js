import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button.jsx'; // Updated path

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;