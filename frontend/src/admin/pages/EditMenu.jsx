import React from 'react'

const EditMenu = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center -mt-16">
        <img 
          src="/assets/images/bob-the-builder.gif" 
          alt="Under Development" 
          className="w-64 h-64 mb-8 rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          This feature is currently being developed. Check back soon!
        </p>
      </div>
    </div>
  )
}

export default EditMenu