import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { dummyDashboardData, assets } from "../../assets/assets";
import Loading from "../../Components/student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);

  const [dashboardData] = useState(dummyDashboardData);

  if (!dashboardData) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Educator Dashboard
      </h1>

      <div className="flex flex-wrap gap-6">

        {/* TOTAL ENROLLMENTS */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
          <img src={assets.students_icon} alt="students" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {dashboardData.totalStudents}
            </p>
            <p className="text-base text-gray-500">Total Enrollments</p>
          </div>
        </div>

        {/* TOTAL COURSES */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
          <img src={assets.appointments_icon} alt="courses" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {dashboardData.totalCourses}
            </p>
            <p className="text-base text-gray-500">Total Courses</p>
          </div>
        </div>

        {/* TOTAL EARNINGS */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
          <img src={assets.earning_icon} alt="earnings" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {currency}{dashboardData.totalEarnings}
            </p>
            <p className="text-base text-gray-500">Total Earnings</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
