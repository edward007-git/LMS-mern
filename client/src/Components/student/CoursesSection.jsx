import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {
  const { allCourses = [] } = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8 bg-gradient-to-b from-white via-gray-50 to-white'>
      
      <h2 className='text-3xl font-semibold text-gray-900'>
        Learn from the best
      </h2>

      <p className='text-sm md:text-base text-gray-600 mt-2 mb-6 max-w-3xl mx-auto text-center'>

        Explore high-quality courses taught by expert instructors. Build real skills,
        grow your knowledge, and learn at your own pace with content designed for
        beginners and professionals alike.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-14 my-10 gap-6">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to={'/course-list'}
          onClick={() => scrollTo(0, 0)}
          className='text-gray-700 border border-gray-200 px-10 py-3 rounded-full
          bg-white hover:bg-gray-100 transition shadow-sm'
        >
          Show all courses
        </Link>
      </div>
    </div>
  )
}

export default CoursesSection
