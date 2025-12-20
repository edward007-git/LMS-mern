import React from 'react'

const CallToAction = () => {
  return (
    <div className="text-center max-w-2xl mx-auto py-20 px-4">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Learn anything, anytime, anywhere
      </h1>

      {/* Updated paragraph text */}
      <p className="text-gray-600 mb-8">
        Start your learning journey with high-quality courses designed to boost your
        skills and help you grow at your own pace.
      </p>

      <div className="flex items-center justify-center gap-4">
        
        {/* Primary Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
          Get started
        </button>

        {/*  Updated Learn more text */}
        <button className="group flex items-center gap-1 text-gray-700 font-medium">
          Explore courses
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

      </div>

    </div>
  )
}

export default CallToAction
