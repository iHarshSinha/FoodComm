import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTheme } from '../context/ThemeContext'

const EkTimeKaMenu = ({ meal, isHome, menuData, mealID }) => {
  const { darkMode } = useTheme();
  const [ratings, setRatings] = useState({});
  const [canRate, setCanRate] = useState(false);
  
  const items = menuData?.items?.map(item => item.name) || [];
  const itemIDs = menuData?.items?.map(item => item._id) || [];

  const mealColors = {
    breakfast: darkMode ? "bg-orange-900/40" : "bg-orange-100",
    lunch: darkMode ? "bg-green-900/40" : "bg-green-100", 
    snacks: darkMode ? "bg-yellow-900/40" : "bg-yellow-100",
    dinner: darkMode ? "bg-blue-900/40" : "bg-blue-100"
  }
  

  const mealIcons = {
    breakfast: "🍳",
    lunch: "🍱",
    snacks: "🍿",
    dinner: "🍽️"
  }

  const mealTimes = {
    breakfast: '07:30',
    lunch: '12:30',
    snacks: '16:30',
    dinner: '19:30'
  }

  useEffect(() => {
    const checkRatingTime = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      const allowedTime = mealTimes[meal]
      setCanRate(currentTime >= allowedTime)
    }

    checkRatingTime()
    const timer = setInterval(checkRatingTime, 60000)
    return () => clearInterval(timer)
  }, [meal])

  const handleRating = (itemId, rating) => {
    setRatings(prev => ({
      ...prev,
      [itemId]: prev[itemId] === rating ? 0 : rating
    }))
  }

  const submitRatings = async () => {
    const Rating = Object.entries(ratings)
      .filter(([_, rating]) => rating > 0)
      .map(([index, rating]) => ({
        itemId: itemIDs[index],
        rating: rating,
      }));

    console.log("Valid Ratings to Submit:", Rating);
    
    try {
      const response = await fetch(`/api/user/rating/${mealID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Rating: Rating})
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit ratings');
      }
      
      console.log("Ratings submitted successfully");
      toast.success("Ratings submitted successfully!");
      setRatings({});
      setCanRate(false);
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  }
  const getFoodTypeIcon = (itemName) => {
    const nonVegItems = ['chicken', 'egg', 'omlette'];
    const isNonVeg = nonVegItems.some(item => 
      itemName.toLowerCase().includes(item)
    );
    
    return isNonVeg ? 
      <span className="h-2 w-2 rounded-full bg-red-500"></span> : 
      <span className="h-2 w-2 rounded-full bg-green-500"></span>;
  };

  return (
    <div className={`rounded-lg shadow-md p-6 ${mealColors[meal]} max-w-2xl mx-auto`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold capitalize flex items-center gap-2 dark:text-slate-600">
          {mealIcons[meal]} {meal}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 h-[400px] overflow-y-auto">
          {items.length > 0 ? (
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 px-3 hover:bg-white/40 dark:hover:bg-gray-700/40 rounded-lg transition-colors"
                >
                  <span className="font-medium min-w-36 dark:text-white flex items-center gap-2">
                    {getFoodTypeIcon(item)}
                    {item}
                  </span>
                  {isHome && canRate && (
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(index, star)}
                            className={`text-xl transition-colors ${
                              star <= ratings[index] ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            } hover:scale-110`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {ratings[index] > 0 && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          ({ratings[index]}/5)
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No menu items available</p>
          )}
        </div>
        
        {isHome && canRate && Object.keys(ratings).length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={submitRatings}
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
              <span>Submit Ratings</span>
              <span>✨</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default EkTimeKaMenu
