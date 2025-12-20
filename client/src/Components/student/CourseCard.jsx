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
      className="border border-gray-500/30 overflow-hidden rounded-lg bg-white"
    >
      {/* Thumbnail */}
      <img
        className="w-full h-44 object-cover"
        src={course.courseThumbnail}
        alt="thumbnail"
      />

      <div className="p-3 text-left">
        {/* Title */}
        <h3 className="text-base font-semibold line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-gray-500 text-sm mt-1">
          {course.educator?.name}
        </p>

        {/* Rating with star icon */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm">4.5</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={assets.star}
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">(22)</p>
        </div>

        {/* Price */}
        <p className="text-base font-semibold text-gray-800 mt-2">
          {currency}
          {finalPrice}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard;

