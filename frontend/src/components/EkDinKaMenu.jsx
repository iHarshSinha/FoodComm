import React, { useState, useEffect } from 'react'
import EkTimeKaMenu from './EkTimeKaMenu'

const EkDinKaMenu = ({ day, isHome }) => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const breakfastId = menuData?.[0]?._id;
  const lunchId = menuData?.[1]?._id;
  const snacksId = menuData?.[2]?._id;
  const dinnerId = menuData?.[3]?._id;

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/user/menu`);
      const menu = await response.json();
      console.log("This is menu",menu);
      const dayMenu = menu.days[day].meals;
      console.log("This is dayMenu",dayMenu);
      setMenuData(dayMenu);
    } finally {
      setLoading(false);
    }
  }  

  useEffect(() => {
    fetchMenu()
  }, [day]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent dark:border-blue-400"></div>
      </div>
    )
  }

  const displayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {isHome ? "Today's Menu" : "Menu"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium">{displayDate}</p>
        </div>

        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            <div className="transform hover:scale-[1.02] transition-transform">
              <EkTimeKaMenu meal="breakfast" isHome={isHome} menuData={menuData[0]} mealID={breakfastId} />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform">
              <EkTimeKaMenu meal="lunch" isHome={isHome} menuData={menuData[1]} mealID={lunchId} />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform">
              <EkTimeKaMenu meal="snacks" isHome={isHome} menuData={menuData[2]} mealID={snacksId} />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform">
              <EkTimeKaMenu meal="dinner" isHome={isHome} menuData={menuData[3]} mealID={dinnerId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EkDinKaMenu
