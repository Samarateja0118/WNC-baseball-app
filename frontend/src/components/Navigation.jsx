import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import nationalsLogo from '../assets/wnl.jpg'

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "About", path: "/about" },
];

const Navigation = () => {
  const { pathname } = useLocation();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-1">
            <img
              src={nationalsLogo}
              alt="wnc logo"
              className='w-11 h-11 object-contain'
            />
            <h1 className="text-2xl font-bold text-nationals-red">
              MLB Pitch Analysis of Washington Nationals
            </h1>
          </div>

          {/* Nav Items */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-4 py-2 rounded-md font-medium transition-colors
                  ${isActive(item.path)
                    ? "bg-baseball-green text-white"
                    : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
