import React from 'react'
import EkDinKaMenu from '../components/EkDinKaMenu'
import FeedbackBox from '../components/FeedbackBox'

const getCurrentDayIndex = () => {
  const dayIndex = new Date().getDay()
  // Convert Sunday (0) to 6, and rest days-1 to match our data structure
  return dayIndex === 0 ? 6 : dayIndex - 1
}

// submit feedback
const submitFeedback = async (feedbackData) => {
  // check server response
  const response = await fetch('/api/user/review', {
    method: 'POST',
    body: feedbackData
  })

  console.log(response);

  if (!response.ok) {
    return false
  }

  return true

}

// get todays date in format 12 Feb 2025
const getFormattedDate = () => {
  const date = new Date()
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const HomePage = () => {
  const currentDayIndex = getCurrentDayIndex();

  return (
    <>
      <EkDinKaMenu day={currentDayIndex} isHome={true} date={getFormattedDate()}/>
      <FeedbackBox submitFeedback={submitFeedback}/>
      
    </>
  )
}

export default HomePage
