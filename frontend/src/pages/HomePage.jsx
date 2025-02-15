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
  const response = await fetch('/api/user/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  })

  if(!response.ok) {
    console.error('Failed to submit feedback!')
  }

  const data = await response.json();
  return data;
}

const HomePage = () => {
  const currentDayIndex = getCurrentDayIndex();

  return (
    <>
      <EkDinKaMenu day={currentDayIndex} isHome={true} />
      <FeedbackBox submitFeedback={submitFeedback}/>
      
    </>
  )
}

export default HomePage
