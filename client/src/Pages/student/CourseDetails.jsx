import React, {
  useContext,
  useMemo,
  useState,
  
} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/student/Footer";
import YouTube from "react-youtube";
import Loading from "../../Components/student/Loading";
const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, calculateRating, currency } =
    useContext(AppContext);

  const [openChapters, setOpenChapters] = useState([]);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] =
    useState(false);
  const [currentLecture, setCurrentLecture] =
    useState(null);

  
  const courseData = useMemo(() => {
    if (!allCourses || allCourses.length === 0)
      return null;
    return (
      allCourses.find(
        (course) => course._id === id
      ) || null
    );
  }, [allCourses, id]);

  if (!courseData) {
  return <Loading />;
}


  // ---------- META ----------
  const rating = calculateRating(courseData);
  const enrolled =
    courseData.studentsEnrolled ?? 0;
  const totalRatings =
    courseData.courseRatings?.length || 0;

  const totalMinutes =
    courseData.courseContent?.reduce(
      (chapterSum, chapter) => {
        const minutes =
          chapter?.chapterContent?.reduce(
            (sum, lecture) =>
              sum +
              Number(
                lecture?.lectureDuration || 0
              ),
            0
          ) || 0;
        return chapterSum + minutes;
      },
      0
    ) || 0;

  const durationLabel = humanizeDuration(
    totalMinutes * 60 * 1000,
    { units: ["h", "m"], round: true }
  );

  const totalLectures =
    courseData.courseContent?.reduce(
      (count, chapter) =>
        count +
        (chapter?.chapterContent?.length ||
          0),
      0
    ) || 0;

  const finalPrice = (
    courseData.coursePrice -
    (courseData.discount *
      courseData.coursePrice) /
      100
  ).toFixed(2);

  const oldPrice =
    courseData.coursePrice?.toFixed
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
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white">
      <section className="border-b">
   <div className="w-full px-6 md:px-10 py-6 md:py-8 flex flex-col lg:flex-row lg:gap-10">


          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">
              {courseData.courseTitle}
            </h1>

            <p className="mt-3 text-gray-700 max-w-2xl">
              Learn the fundamentals of{" "}
              {courseData.courseTitle}.
            </p>

            <div className="mt-4 text-sm text-gray-700 flex flex-wrap gap-3">
              <span className="font-medium">
                {rating.toFixed(1)}
              </span>
              <span>
                ⭐ ({totalRatings})
              </span>
              <span>
                • {enrolled.toLocaleString()} students
              </span>
              <span>
                • {durationLabel}
              </span>
              <span>
                • {totalLectures} lectures
              </span>
            </div>

            {/* COURSE STRUCTURE */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Course Structure
              </h2>

              <div className="space-y-3">
                {courseData.courseContent.map(
                  (chapter, index) => {
                    const isOpen =
                      openChapters[index];

                    return (
                      <div
                        key={index}
                        className="bg-white border rounded-xl"
                      >
                        <button
                          onClick={() =>
                            toggleChapter(index)
                          }
                          className="w-full px-4 py-3 flex justify-between items-center"
                        >
                          <p className="font-medium">
                            {chapter.chapterTitle}
                          </p>
                          <span className="text-sm text-gray-500">
                            {
                              chapter.chapterContent
                                .length
                            }{" "}
                            lectures
                          </span>
                        </button>

                        {isOpen && (
                          <div className="border-t px-4 py-3 space-y-2">
                            {chapter.chapterContent.map(
                              (lecture, i) => (
                                <button
                                  key={i}
                                  onClick={() =>
                                    setCurrentLecture(
                                      lecture
                                    )
                                  }
                                  className={`w-full flex justify-between text-sm px-2 py-2 rounded
                                    ${
                                      currentLecture?.videoId ===
                                      lecture.videoId
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                    }`}
                                >
                                  <span>
                                    {i + 1}.{" "}
                                    {
                                      lecture.lectureTitle
                                    }
                                  </span>
                                  <span className="text-gray-500">
                                    {
                                      lecture.lectureDuration
                                    }{" "}
                                    min
                                  </span>
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Course Description
              </h2>
              <div
                className="bg-white p-6 rounded shadow text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    courseData.courseDescription,
                }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <aside className="lg:w-72">
            <div className="bg-white rounded-xl shadow overflow-hidden">

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
              <div className="p-4 space-y-4">
                <p className="text-2xl font-bold">
                  {currency}
                  {finalPrice}
                </p>

                {oldPrice && (
                  <p className="text-sm line-through text-gray-400">
                    {currency}
                    {oldPrice}
                  </p>
                )}

                <button
                  onClick={() =>
                    setIsAlreadyEnrolled(true)
                  }
                  disabled={isAlreadyEnrolled}
                  className={`w-full py-3 rounded text-white
                    ${
                      isAlreadyEnrolled
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isAlreadyEnrolled
                    ? "Already Enrolled"
                    : "Enroll Now"}
                </button>
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
