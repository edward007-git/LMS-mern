import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='relative overflow-hidden flex flex-col items-center justify-center w-full md:pt-24 pt-12 py-10
      px-7 md:px-0 space-y-7 text-center
      bg-gradient-to-b from-white via-gray-50 to-white'>

      {/* Background STUDYX Text */}
      <h1 className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        text-[70px] md:text-[180px] font-extrabold tracking-widest
        text-black/5 select-none">
        STUDYX
      </h1>

      {/* Animated Content */}
      <div className="relative z-10 animate-fadeInUp space-y-7">
        <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-900
          max-w-3xl mx-auto leading-tight'>
          Learn Anytime, Anywhere
          <span className='text-blue-600'> — Discover Courses That Fit Your Journey</span>
        </h1>

        <p className='hidden md:block text-gray-600 max-w-2xl mx-auto'>
          Explore expert-crafted courses designed to help you grow in your career,
          learn new skills, and achieve your goals — all at your own pace.
        </p>

        <p className='md:hidden text-gray-600 max-w-sm mx-auto'>
          Learn new skills, grow your career, and explore courses made for your goals.
        </p>

        <div className="w-full max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Hero
