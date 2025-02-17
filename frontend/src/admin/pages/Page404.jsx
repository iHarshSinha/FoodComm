import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPizzaSlice, 
  faHamburger, 
  faCookie, 
  faIceCream, 
  faDrumstickBite,
  faBacon,
  faCheese,
  faHotdog,
  faCandyCane,
  faEgg 
} from '@fortawesome/free-solid-svg-icons'

const Page404 = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
      {/* Food Icons with adjusted positions */}
      <div className="absolute animate-float1 top-20 left-20">
        <FontAwesomeIcon icon={faPizzaSlice} className="text-3xl text-orange-500 dark:text-orange-400" />
      </div>
      <div className="absolute animate-float2 top-40 right-32">
        <FontAwesomeIcon icon={faHamburger} className="text-3xl text-red-500 dark:text-red-400" />
      </div>
      <div className="absolute animate-float3 bottom-40 left-32">
        <FontAwesomeIcon icon={faCookie} className="text-3xl text-yellow-700 dark:text-yellow-600" />
      </div>
      <div className="absolute animate-float2 top-60 right-20">
        <FontAwesomeIcon icon={faIceCream} className="text-3xl text-pink-500 dark:text-pink-400" />
      </div>
      <div className="absolute animate-float1 bottom-20 right-40">
        <FontAwesomeIcon icon={faDrumstickBite} className="text-3xl text-amber-600 dark:text-amber-500" />
      </div>
      <div className="absolute animate-float2 top-32 left-40">
        <FontAwesomeIcon icon={faBacon} className="text-3xl text-red-400 dark:text-red-300" />
      </div>
      <div className="absolute animate-float3 bottom-32 right-28">
        <FontAwesomeIcon icon={faCheese} className="text-3xl text-yellow-400 dark:text-yellow-300" />
      </div>
      <div className="absolute animate-float1 top-24 right-36">
        <FontAwesomeIcon icon={faHotdog} className="text-3xl text-orange-400 dark:text-orange-300" />
      </div>
      <div className="absolute animate-float2 bottom-24 left-36">
        <FontAwesomeIcon icon={faCandyCane} className="text-3xl text-red-300 dark:text-red-200" />
      </div>
      <div className="absolute animate-float3 top-48 left-28">
        <FontAwesomeIcon icon={faEgg} className="text-3xl text-gray-200 dark:text-gray-300" />
      </div>

      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md -translate-y-[50px] z-10 relative">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/admin" 
          className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default Page404
