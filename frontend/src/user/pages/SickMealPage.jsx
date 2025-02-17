import React from 'react'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const SickMealPage = () => {
  const today = new Date().toISOString().split('T')[0]
  
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    mealType: 'Veg (Khichdi)',
    startDate: today,
    endDate: today,
    meals: [],
    instructions: ''
  })

  const navigate = useNavigate();

  const mealTimes = [
    'breakfast',
    'lunch', 
    'dinner'
  ]

  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const meals = [...formData.meals]
      if (meals.includes(value)) {
        meals.splice(meals.indexOf(value), 1)
      } else {
        meals.push(value)
      }
      setFormData(prev => ({ ...prev, meals }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }
    const handleSubmit = async (e) => {
      e.preventDefault()

      // Create a copy of formData and format the dates
      const formattedData = {
        ...formData,
        startDate: formData.startDate.split('-').reverse().join('-'),
        endDate: formData.endDate.split('-').reverse().join('-')
      }

      console.log(formattedData);
    
      try {
        const response = await fetch('/api/user/sick', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData)
        })
  
        if (response.ok) {
          toast.success("Sick meal request submitted successfully!", {
            onClose: () => {
              navigate('/')
            }
          })
        } else {
          toast.error("Failed to submit request. Please try again.")
        }
      } catch (error) {
        toast.error(error)
      }
    }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-20 p-6 bg-[#FFF8EA] dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sick Meal Request</h2>
      
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="eg. Harsh Sinha"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        {/* Room Input */}
        <div>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Room</label>
          <input
            type="text"
            id="room"
            name="room"
            placeholder="eg. V516"
            value={formData.room}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        {/* Meal Type Select */}
        <div>
          <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Meal Type</label>
          <select
            id="mealType"
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select meal type</option>
            <option value="Veg (Khichdi)">Veg (Khichdi)</option>
            <option value="Veg (Regular)">Veg (Regular)</option>
            <option value="Non-Veg (Regular)">Non-Veg (Regular)</option>
          </select>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Meals Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Meals <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {formData.meals.length > 0 
              ? `Selected meals: ${formData.meals.join(', ')}`
              : 'Choose at least one meal'
            }
          </p>
    
          <div className="space-y-2">
            <input 
              type="checkbox" 
              className="hidden" 
              checked={formData.meals.length > 0}
              required
            />
            {mealTimes.map(meal => (
              <div key={meal} className="flex items-center">
                <input
                  type="checkbox"
                  id={meal}
                  name="meals"
                  value={meal}
                  checked={formData.meals.includes(meal)}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
                <label htmlFor={meal} className="ml-2 text-sm text-gray-700 dark:text-gray-200 capitalize">
                  {meal}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Textarea */}
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Special Instructions (Optional)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="eg. I am allergic to onions (Upto 100 characters)"
            value={formData.instructions}
            onChange={handleChange}
            rows={5}
            maxLength={100}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 mb-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 px-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit Request
        </button>
      </div>
    </form>
  )
}

export default SickMealPage

