import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    fetchUserEnrolledCourses,
    calculateRating,
  } = useContext(AppContext);

  // Fetch enrolled courses on page load
  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  if (!enrolledCourses.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No enrollments yet
        </h2>
        <p className="text-gray-500 mt-2">
          Explore courses and start learning today.
        </p>
        <Link
          to="/course-list"
          className="mt-6 px-6 py-3 bg-black text-white rounded-md"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        My Enrollments
      </h1>

      <div className="space-y-6">
        {enrolledCourses.map((course) => {
          const rating = calculateRating(course);

          return (
            <div
              key={course._id}
              className="flex flex-col md:flex-row gap-6 bg-white border rounded-xl p-5 shadow-sm"
            >
              {/* Thumbnail */}
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full md:w-56 h-36 object-cover rounded-lg"
              />

              {/* Course Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {course.courseTitle}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Instructor: {course.educator?.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-500 font-medium">
                    ⭐ {rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({course.courseRatings?.length || 0} ratings)
                  </span>
                </div>

                {/* Progress bar (mock) */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center">
                <Link
                  to={`/course/${course._id}`}
                  className="px-6 py-2 bg-black text-white rounded-md text-sm"
                >
                  Continue
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEnrollments;
