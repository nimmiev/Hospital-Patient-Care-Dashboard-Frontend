import React, { useState} from 'react'
import { axiosInstance } from '../../config/axiosInstance';

const Contact = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/contact', formData);
      setSuccessMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSuccessMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 md:px-16 py-12">
      <div className="max-w-4xl w-full">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          We’d love to hear from you! Whether you have a question about our platform, need support, 
          or just want to say hello, feel free to reach out to us.
        </p>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">📍 Our Office</h3>
            <p className="text-gray-700 leading-relaxed">
              HEALTHCARE,  
              <br /> 123 Healthcare Street,  
              <br /> City, State, 56789
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">📞 Get in Touch</h3>
            <p className="text-gray-700 leading-relaxed">
              📧 Email: <a href="mailto:contact@hospitalcare.com" className="text-blue-600 hover:underline">contact@healthcare.com</a>  
              <br /> 📱 Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 234 567 890</a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Send Us a Message</h3>
          {/* <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                placeholder="Enter your name" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                rows="4" 
                placeholder="Type your message here..." 
                required 
              ></textarea>
            </div>

            <div className="text-center">
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form> */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
                rows="4"
                placeholder="Type your message here..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
