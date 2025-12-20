import React from "react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, BookOpen, Users } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: Home },
    { name: "Add Course", path: "/educator/add-course", icon: PlusCircle },
    { name: "My Courses", path: "/educator/my-courses", icon: BookOpen },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: Users },
  ];

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          Educator Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
             
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
