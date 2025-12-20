import React from 'react'
import Hero from '../../Components/student/Hero'
import Companies from '../../Components/student/Companies'
import CoursesSection from '../../Components/student/CoursesSection'
import TestimonialSection from '../../Components/student/TestimonialSection'
import CallToAction from '../../Components/student/CallToAction'
import Footer from '../../Components/student/Footer'

const Home = () => {
  return (
    <>
  
      <div className='flex flex-col items-center space-y-6 text-center'>
        <Hero/>
        <Companies/>
        <CoursesSection/>
        <TestimonialSection/>
        <CallToAction />
      </div>

      
      <Footer />
    </>
  )
}

export default Home
