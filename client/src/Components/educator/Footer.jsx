import React from "react";

const EducatorFooter = () => {
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

        {/* LEFT */}
        <p>
          ©  2025
          <span className="font-medium text-gray-700">
              Study<span className="text-blue-600">X</span>
          </span>
          . All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="hover:text-blue-600 cursor-pointer">
            Help
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Privacy
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Terms
          </span>
        </div>

      </div>
    </footer>
  );
};

export default EducatorFooter;
