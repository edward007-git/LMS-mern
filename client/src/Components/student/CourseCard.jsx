import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency } = useContext(AppContext)

  const finalPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2)

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-200 overflow-hidden rounded-2xl bg-white
      hover:shadow-xl transition duration-300 shadow-sm"
    >
      {/* Thumbnail */}
      <img
        className="w-full h-44 object-cover"
        src={course.courseThumbnail}
        alt="thumbnail"
      />

      <div className="p-4 text-left">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-gray-500 text-sm mt-1">
          {course.educator?.name}
        </p>

        {/* Rating with star icon */}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-sm text-gray-700">4.5</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={assets.star}
                alt="star"
                className="w-4 h-4 opacity-90"
              />
            ))}
          </div>

          <p className="text-gray-400 text-sm">(22)</p>
        </div>

        {/* Price */}
        <p className="text-base font-semibold text-blue-600 mt-3">
          {currency}
          {finalPrice}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard
