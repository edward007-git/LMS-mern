import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import { AppContext } from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState(() =>
    dummyCourses.filter(course => course.isPublished)
  );

  const [iseducator, setEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  const calculateRating = useCallback((course) => {
    if (!course?.courseRatings?.length) return 0;
    const total = course.courseRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    return total / course.courseRatings.length;
  }, []);

  const value = useMemo(() => ({
    currency,
    allCourses,
    setAllCourses,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses,
    navigate,
    calculateRating,
    iseducator,
    setEducator,
  }), [currency, allCourses, enrolledCourses, navigate, calculateRating, iseducator]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
