import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const EducatorNavbar = () => {
  const { user } = useUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">

        {/* LEFT: TEXT LOGO */}
        <Link to="/educator/dashboard" className="text-2xl font-semibold tracking-tight">
          Study<span className="text-blue-600">X</span>
        </Link>

        {/* RIGHT: USER */}
        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-sm font-medium">
            Hi! {user ? user.fullName : "Educator"}
          </p>

          <UserButton afterSignOutUrl="/" />
        </div>

      </div>
    </nav>
  );
};

export default EducatorNavbar;
