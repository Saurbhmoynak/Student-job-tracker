import React from 'react';
import LOGO from "../assets/jobtrack.svg";

const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-center px-4 sm:px-6 py-2 drop-shadow-md sticky top-0 z-10">
      <img 
        src={LOGO} 
        alt="Job Track Logo" 
        className="h-10 sm:h-12 md:h-14 lg:h-16 transition-all duration-200"
      />
    </div>
  );
};

export default Navbar;
