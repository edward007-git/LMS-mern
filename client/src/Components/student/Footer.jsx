import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2b2b2b] via-[#1f1f1f] to-[#141414] text-gray-200 px-4 md:px-12 py-8 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        {/* ==== TOP SECTION ==== */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-10 border-b border-gray-200">

          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-gray-50">
                Study<span className="text-blue-600">X</span>
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>

          {/* ==== COMPANY LINKS ==== */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-50">Company</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-gray-50 transition">Home</a></li>
              <li><a href="#" className="hover:text-gray-50 transition">About us</a></li>
              <li><a href="#" className="hover:text-gray-50 transition">Contact us</a></li>
              <li><a href="#" className="hover:text-gray-50 transition">Privacy policy</a></li>
            </ul>
          </div>

          {/* ==== NEWSLETTER ==== */}
          <div className="max-w-sm">
            <h3 className="font-semibold mb-4 text-gray-50">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-md bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 text-sm rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ==== COPYRIGHT ==== */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Copyright 2025 © StudyX. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
