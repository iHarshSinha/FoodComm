import React, { useState } from 'react'
import EkDinKaMenu from '../components/EkDinKaMenu'

const WeeklyMenu = () => {
  const getCurrentDayIndex = () => {
    const dayIndex = new Date().getDay()
    // Convert Sunday (0) to 6, and rest days-1 to match our data structure
    return dayIndex === 0 ? 6 : dayIndex - 1
  }
  
  const [currentDay, setCurrentDay] = useState(getCurrentDayIndex())
  
  const handlePrevDay = () => {
    setCurrentDay(prev => Math.max(0, prev - 1))
  }

  const handleNextDay = () => {
    setCurrentDay(prev => Math.min(6, prev + 1))
  }


  const getFormattedDate = (format) => (dayOffset) => {
    const today = new Date()
    const currentDayNum = today.getDay()
    const mondayOffset = currentDayNum === 0 ? -6 : 1 - currentDayNum
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + mondayOffset + dayOffset)
    
    if(format === "forFeast"){
      return targetDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
    else if(format === "forMenu"){
      return targetDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handlePrevDay}
            disabled={currentDay === 0}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors text-xs sm:text-base"
          >
            Previous Day
          </button>
          
          <p className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            {getFormattedDate("forMenu")(currentDay)}
          </p>
          
          <button 
            onClick={handleNextDay}
            disabled={currentDay === 6}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors text-xs sm:text-base"
          >
            Next Day
          </button>
        </div>

        <EkDinKaMenu day={currentDay} date={getFormattedDate("forFeast")(currentDay)} />
      </div>
    </div>
  )
}

export default WeeklyMenu
