import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const FeastMenu = () => {
  const [formData, setFormData] = useState({
    date: '',
    meal: '',
    numberOfItems: '',
    items: []
  })

  const mealOptions = ['breakfast', 'lunch', 'snacks', 'dinner']

  useEffect(() => {
    const itemCount = parseInt(formData.numberOfItems) || 0
    setFormData(prev => ({
      ...prev,
      items: Array(itemCount).fill('')
    }))
  }, [formData.numberOfItems])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleItemChange = (index, value) => {
    setFormData(prev => {
      const newItems = [...prev.items]
      newItems[index] = value
      return {
        ...prev,
        items: newItems
      }
    })
  }

  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.items.length === 0) {
      toast.error('Please enter at least one item.')
      return;
    }

    else if(formData.date < new Date().toISOString().split('T')[0]) {
      toast.error('Please enter a valid date.')
      return;
    }

    console.log(formData);

    const submitData = {
      date: getFormattedDate(formData.date),
      meal: formData.meal,
      items: formData.items
    }

    console.log(submitData);
    try {
      const response = await fetch(`/api/admin/feast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })
      if (response.ok) {
        setFormData({
          date: '',
          meal: '',
          numberOfItems: '',
          items: []
        })
        toast.success('Feast menu submitted successfully.');
      }
      else{
        toast.error('Error submitting feast menu.')
      }
    } catch (error) {
      console.error('Error submitting feast menu:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Feast Menu</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="meal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Meal Type
            </label>
            <select
              id="meal"
              name="meal"
              value={formData.meal}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            >
              {mealOptions.map(meal => (
                <option key={meal} value={meal}>
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="numberOfItems" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Items
            </label>
            <input
              type="number"
              id="numberOfItems"
              name="numberOfItems"
              value={formData.numberOfItems}
              onChange={handleChange}
              min="0"
              max="30"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          {formData.items.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Enter Item Names
              </h2>
              {formData.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <label 
                    htmlFor={`item-${index}`} 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Item {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`item-${index}`}
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Add Feast Menu
          </button>
        </form>
      </div>
    </div>
  )
}

export default FeastMenu