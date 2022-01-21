import React from 'react';
import Navbar from './Navbar';


const Layout: React.FC = ({ children }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="mt-20 max-w-screen-extmedium mx-auto pb-10">
        {children}
      </div>
    </div>
  )
};

export default Layout;