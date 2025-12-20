import React, { useContext, useMemo } from 'react'
import { AppContext } from '../../Context/AppContext'
import SearchBar from '../../Components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../Components/student/CourseCard'
import { X } from 'lucide-react'
import Footer from '../../Components/student/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()

  const filteredCourse = useMemo(() => {
    if (!allCourses || allCourses.length === 0) return []

    const search = input?.trim().toLowerCase()
    if (!search) return allCourses

    return allCourses.filter(course =>
      course.courseTitle?.toLowerCase().includes(search)
    )
  }, [allCourses, input])

  return (
    <>
      <div className="relative md:px-36 px-8 pt-10 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          {/* LEFT SIDE: Title + breadcrumb + chip */}
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>

            <p className="text-gray-500 mt-2">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              / <span>Course List</span>
            </p>

            {input && (
              <div className="inline-flex items-center gap-2 px-4 py-1 mt-3 border rounded-full text-gray-600 text-sm">
                <span>{input}</span>
                <button
                  type="button"
                  onClick={() => navigate('/course-list')}
                  className="cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: search bar */}
          <SearchBar data={input || ''} />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CoursesList
