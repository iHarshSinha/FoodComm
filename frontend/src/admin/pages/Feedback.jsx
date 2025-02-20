import { useState, useEffect } from "react";
import {WhatsApp} from '@mui/icons-material'

export default function Feedback() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page) => {
    try {
      const response = await fetch(`/api/admin/review?page=${page}&limit=5`);
      const data = await response.json();
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // const toggleExpand = (reviewId) => {
  //   setExpandedReviews(prev => ({
  //     ...prev,
  //     [reviewId]: !prev[reviewId]
  //   }));
  // };

  // const truncateText = (text, limit = 100) => {
  //   if (text.length <= limit) return text;
  //   return text.slice(0, limit) + '...';
  // };

  const shareOnWhatsApp = (review) => {
    let text = `Rating: ${review.rating} stars\nFeedback: ${review.feedback}\nDate: ${new Date(review.date).toLocaleDateString()}`;
    
    // Add image URL if it exists
    if (review.image) {
      text += `\n\nImage: ${review.image}`;
    }
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white transition-colors duration-200">
        Student Feedback
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:shadow-gray-900/30">
      
            <div 
                  className="h-48 overflow-hidden cursor-pointer relative group"
                  onClick={() => review.image && setSelectedImage(review.image)}
                >
                  {review.image ? (
                    <img 
                      src={review.image} 
                      alt="Review" 
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">No Image</span>
                    </div>
                  )}
                  {review.image && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        View Full Image
                      </span>
                    </div>
                  )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-yellow-500 dark:text-yellow-400">
                  {review.rating}
                </span>
                <span className="text-2xl">{Array(review.rating).fill('⭐').join('')}</span>
              </div>
              {/* <div className="text-gray-700 dark:text-gray-300 flex-1 overflow-y-auto transition-colors duration-200">
                {review.feedback}
              </div> */}
              <div className="text-gray-700 dark:text-gray-300 flex-1 overflow-y-auto transition-colors duration-200 max-h-[150px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 pr-2">
                {review.feedback}
              </div>
                
              {/* Whatsapp */}
              <div className="flex justify-end mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareOnWhatsApp(review);
                    }}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                  >
                    {/* <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        d="M12 2C6.48 2 2 6.48 2 12C2 13.7 2.43 15.3 3.17 16.7L2 22L7.3 20.83C8.7 21.57 10.3 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2ZM12 20C10.47 20 9 19.6 7.69 18.92L7.26 18.68L4.27 19.33L4.92 16.34L4.68 15.91C3.9997 14.6 3.6 13.13 3.6 11.6C3.6 7.36 7.36 3.6 11.6 3.6C15.84 3.6 19.6 7.36 19.6 11.6C19.6 15.84 15.84 19.6 11.6 19.6H12V20ZM15.5 14.2L14.7 13.8C14.7 13.8 13.9 13.4 13.4 13.2C13.3 13.2 13.2 13.1 13.1 13.1C12.8 13.1 12.6 13.2 12.4 13.4C12.4 13.4 12 13.9 11.9 14C11.8 14.1 11.7 14.1 11.6 14.1H11.5C11.4 14.1 11.2 14 11.1 14C10.8 13.9 10.4 13.7 10 13.4C9.6 13.1 9.2 12.7 8.9 12.3C8.8 12.1 8.6 11.9 8.5 11.7C8.4 11.5 8.5 11.4 8.5 11.3C8.5 11.3 8.7 11.1 8.8 11C8.9 10.9 8.9 10.8 9 10.7C9.1 10.6 9.1 10.5 9.1 10.4C9.1 10.3 9 10.2 9 10.1C9 10.1 8.6 9.1 8.4 8.7C8.3 8.3 8.1 8.4 8 8.4H7.6C7.4 8.4 7.2 8.5 7 8.7C6.8 8.9 6.3 9.3 6.3 10.3C6.3 11.3 7 12.3 7.1 12.4C7.2 12.5 8.4 14.3 10.2 15.2C10.6 15.4 11 15.5 11.3 15.6C11.8 15.8 12.3 15.8 12.7 15.7C13.1 15.6 13.9 15.2 14.1 14.7C14.3 14.2 14.3 13.8 14.2 13.7C14.1 13.6 14 13.6 13.8 13.5L13.5 13.4L13.5 13.4C13.5 13.4 13.5 13.4 13.5 13.4L15.5 14.2Z"
                      />
                    </svg> */}
                    <WhatsApp />
                    <span className="text-sm">Share</span>
                  </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-200">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={selectedImage} 
              alt="Full size review" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

        <div className="flex justify-center items-center mt-8 gap-4">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-28 px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-lg font-medium text-gray-800 dark:text-white transition-colors duration-200">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-28 px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
  );
}