import React from 'react'

const Privacy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 md:px-16 py-12">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Privacy Policy</h2>

        <p className="text-gray-700 text-justify leading-relaxed mb-4">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information on the <span className="font-semibold">Hospital Patient Care Dashboard</span>.
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">1. Information Collection</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            We collect personal, medical, and hospital-related data necessary for patient management and operational efficiency.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">2. Data Usage</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            Collected data is used strictly for patient care, hospital administration, and improving service delivery. We do not sell or share your data with third parties without consent.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">3. Security</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            We implement strong encryption, access control, and audit systems to keep your information secure and confidential.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">4. Your Rights</h3>
          <p className="text-gray-700 text-justify leading-relaxed">
            You have the right to access, update, or delete your personal information at any time by contacting your system administrator.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Privacy
