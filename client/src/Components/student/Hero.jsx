import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-24 pt-12 py-4
      px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100'>

      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800
        max-w-3xl mx-auto'>
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

      <SearchBar />
    </div>
  )
}

export default Hero
