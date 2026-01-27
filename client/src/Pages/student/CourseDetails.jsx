import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/student/Footer";
import YouTube from "react-youtube";
import Loading from "../../Components/student/Loading";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, calculateRating, currency } = useContext(AppContext);

  const [openChapters, setOpenChapters] = useState([]);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);

  const courseData = useMemo(() => {
    if (!allCourses || allCourses.length === 0) return null;
    return allCourses.find((course) => course._id === id) || null;
  }, [allCourses, id]);

  if (!courseData) {
    return <Loading />;
  }

  // ---------- META ----------
  const rating = calculateRating(courseData);
  const enrolled = courseData.studentsEnrolled ?? 0;
  const totalRatings = courseData.courseRatings?.length || 0;

  const totalMinutes =
    courseData.courseContent?.reduce((chapterSum, chapter) => {
      const minutes =
        chapter?.chapterContent?.reduce(
          (sum, lecture) => sum + Number(lecture?.lectureDuration || 0),
          0
        ) || 0;
      return chapterSum + minutes;
    }, 0) || 0;

  const durationLabel = humanizeDuration(totalMinutes * 60 * 1000, {
    units: ["h", "m"],
    round: true,
  });

  const totalLectures =
    courseData.courseContent?.reduce(
      (count, chapter) => count + (chapter?.chapterContent?.length || 0),
      0
    ) || 0;

  const finalPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  const oldPrice = courseData.coursePrice?.toFixed
    ? courseData.coursePrice.toFixed(2)
    : courseData.coursePrice;

  // ---------- Accordion ----------
  const toggleChapter = (index) => {
    setOpenChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <section className="border-b border-gray-200">
        <div className="w-full px-6 md:px-10 py-8 md:py-10 flex flex-col lg:flex-row lg:gap-10">
          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {courseData.courseTitle}
            </h1>

            <p className="mt-3 text-gray-600 max-w-2xl">
              Learn the fundamentals of {courseData.courseTitle}.
            </p>

            <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-3">
              <span className="font-semibold text-gray-900">
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-500">⭐ ({totalRatings})</span>
              <span className="text-gray-500">
                • {enrolled.toLocaleString()} students
              </span>
              <span className="text-gray-500">• {durationLabel}</span>
              <span className="text-gray-500">• {totalLectures} lectures</span>
            </div>

            {/* COURSE STRUCTURE */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Course Structure
              </h2>

              <div className="space-y-3">
                {courseData.courseContent.map((chapter, index) => {
                  const isOpen = openChapters[index];

                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleChapter(index)}
                        className="w-full px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                      >
                        <p className="font-medium text-gray-900">
                          {chapter.chapterTitle}
                        </p>
                        <span className="text-sm text-gray-500">
                          {chapter.chapterContent.length} lectures
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-gray-200 px-4 py-3 space-y-2 bg-gray-50/40">
                          {chapter.chapterContent.map((lecture, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentLecture(lecture)}
                              className={`w-full flex justify-between text-sm px-3 py-2 rounded-xl transition
                                ${
                                  currentLecture?.videoId === lecture.videoId
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "hover:bg-white border border-transparent"
                                }`}
                            >
                              <span className="text-left text-gray-800">
                                {i + 1}. {lecture.lectureTitle}
                              </span>
                              <span className="text-gray-500">
                                {lecture.lectureDuration} min
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Course Description
              </h2>
              <div
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <aside className="lg:w-80 mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* YOUTUBE PLAYER */}
              <div className="relative w-full aspect-[16/10] sm:aspect-video bg-black">
                {currentLecture ? (
                  <YouTube
                    videoId={currentLecture.videoId}
                    className="absolute inset-0"
                    iframeClassName="w-full h-full"
                  />
                ) : (
                  <img
                    src={courseData.courseThumbnail}
                    alt={courseData.courseTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* PRICE */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {currency}
                    {finalPrice}
                  </p>

                  {oldPrice && (
                    <p className="text-sm line-through text-gray-400 mt-1">
                      {currency}
                      {oldPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setIsAlreadyEnrolled(true)}
                  disabled={isAlreadyEnrolled}
                  className={`w-full py-3 rounded-full font-medium text-white transition
                    ${
                      isAlreadyEnrolled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                  {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Instant access • Learn anytime • Lifetime updates
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetails;
