import { Bold } from 'lucide-react'
import React from 'react'

const About = () => {
  return  (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 md:px-16 py-12">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h2>
        
        <p className="text-lg text-gray-700 text-justify leading-relaxed">
          Welcome to <span className="font-semibold">Hospital Patient Care Dashboard</span>, where we 
          strive to make hospital management seamless and efficient. Our platform is designed to 
          <span className='font-medium'> simplify patient record management, doctor coordination, and hospital operations</span> in 
          a single, user-friendly interface.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            Our mission is to revolutionize healthcare management by providing <span className='font-medium'>secure, scalable, and 
            intuitive</span> digital solutions. We focus on <span className='font-medium'>optimizing hospital workflows</span>, ensuring 
            <span className='font-medium'>real-time data access</span>, and <span className='font-medium'>enhancing patient care</span>.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><span className="font-semibold"> Efficient Patient Management:</span> Easily track patient history and appointments.</li>
            <li><span className="font-semibold"> Doctor & Staff Coordination:</span> Real-time availability and scheduling.</li>
            <li><span className="font-semibold"> Secure & Scalable:</span> Data encryption and seamless integration.</li>
            <li><span className="font-semibold"> Emergency Alerts:</span> Quick response for critical cases.</li>
          </ul>
        </div>

        {/* <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Learn More
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default About
