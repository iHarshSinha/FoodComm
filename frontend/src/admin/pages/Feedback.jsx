import { useState, useEffect } from "react";

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

  const toggleExpand = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const truncateText = (text, limit = 100) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white transition-colors duration-200">
        Student Feedback
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:shadow-gray-900/30">
            {/* <div 
              className="h-48 overflow-hidden cursor-pointer relative group"
              onClick={() => setSelectedImage(review.image)}
            >
              <img 
                src={review.image} 
                alt="Review" 
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View Full Image
                </span>
              </div>
            </div> */}
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
              <div className="text-gray-700 dark:text-gray-300 flex-1 overflow-y-auto transition-colors duration-200">
                {expandedReviews[review._id] ? review.feedback : truncateText(review.feedback)}
                {review.feedback.length > 100 && (
                  <button
                    onClick={() => toggleExpand(review._id)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                  >
                    {expandedReviews[review._id] ? 'Show Less' : 'Show More'}
                  </button>
                )}
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