import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'shared/components/Header.jsx'; // Updated path
import Footer from 'shared/components/Footer.jsx'; // Updated path

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;