import React, { useState } from 'react'
import { IoMdChatboxes } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-toastify'

const FeedbackBox = ({ submitFeedback }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSending, setIsSending] = useState(false)

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (validTypes.includes(file.type)) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImage(file)
          setPreviewUrl(URL.createObjectURL(file))
        }
        reader.readAsDataURL(file)
      } else {
        toast.error('Please upload a valid image file (JPEG, PNG, or GIF)')
      }
    }
  }
  

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    
    const formData = new FormData()
    formData.append('rating', rating)
    formData.append('feedback', feedback)
    if (image) {
      formData.append('file', image)
    }
    
    try {
      await submitFeedback(formData)
      toast.success('Feedback submitted successfully!')
      
      // Reset form
      setRating(0)
      setFeedback('')
      setImage(null)
      setPreviewUrl('')
      setIsOpen(false)
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.')
    } finally {
      setIsSending(false)
    }
  }
  
  

  const handleStarClick = (star) => {
    setRating(prevRating => prevRating === star ? 0 : star)
  }
  

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <IoMdChatboxes size={24} />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Send Feedback</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <IoClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    } hover:scale-110`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                className="hidden"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                rows={3}
                placeholder="Tell us what you think..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Attach Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Choose Image
                </label>
              </div>
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-32 rounded object-cover w-full"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit Feedback</span>
                  <span>✨</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )}

export default FeedbackBox