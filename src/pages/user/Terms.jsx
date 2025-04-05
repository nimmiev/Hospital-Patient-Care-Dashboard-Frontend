import React from 'react'

const Terms = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 md:px-16 py-12">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Terms of Use</h2>

        <p className="text-gray-700 text-justify leading-relaxed mb-4">
          By accessing and using the <span className="font-semibold">Hospital Patient Care Dashboard</span>, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our platform.
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">1. Use of Platform</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            You may use our dashboard solely for managing patient data, hospital operations, and related healthcare services. Unauthorized use or duplication is strictly prohibited.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">2. User Responsibilities</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            Users are responsible for maintaining the confidentiality of their login credentials and for any activity conducted under their account.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">3. Data Accuracy</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            All data entered must be accurate and updated regularly. Misuse or falsification of information may result in account suspension.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">4. Modifications</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            We reserve the right to update these terms at any time. Continued use after changes implies acceptance of the revised terms.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Terms
