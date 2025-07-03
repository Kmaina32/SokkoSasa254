import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Kenya Market Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;