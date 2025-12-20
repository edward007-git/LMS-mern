import React from 'react';
import { dummyTestimonial } from '../../assets/assets';

const TestimonialSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 cursor-pointer">
      {dummyTestimonial.map((testimonial, index) => (
        <div
          key={index}
        className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center 
           transition-transform duration-300 hover:scale-105 hover:shadow-xl"

        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <h1 className="text-lg font-semibold mt-4">{testimonial.name}</h1>
          <p className="text-sm text-gray-500">{testimonial.role}</p>

          {/* Rating stars */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {testimonial.feedback}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSection;
