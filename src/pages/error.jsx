import React from 'react'

const Error = () => {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
          <div class="max-w-md p-8 bg-white shadow-lg rounded-2xl text-center">
              <h1 class="text-6xl font-bold text-red-500">401</h1>
              <h2 class="mt-4 text-xl font-semibold text-gray-700">Unauthorized Access</h2>
              <p class="mt-2 text-gray-500">You do not have permission to access this page.</p>
              
              <div class="mt-6">
                  <img src="https://i.imgur.com/qIufhof.png" alt="Unauthorized" class="mx-auto w-40 h-40" />
              </div>
              
              <a href="/" class="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Go to Homepage</a>
          </div>
      </div>
    </>
  )
}

export default Error
