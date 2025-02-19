import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
// import JSConfetti from 'js-confetti'

// styles for card flip animation
const flipCardStyles = `
  .flip-card {
    perspective: 1000px;
    height: 70px;
    width: 100%;
    cursor: pointer;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
  }
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
  }
  .flip-card-front {
    transform: rotateY(0deg);
    z-index: 2;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
  .flip-card:hover .flip-card-front {
    background-color: rgba(0, 0, 0, 0.05); // Light hover effect for light mode
  }
  .dark .flip-card:hover .flip-card-front {
    background-color: rgb(0,0,0); // Subtle hover effect for dark mode
  .flip-card:hover .flip-card-inner {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  .flip-card.flipped:hover .flip-card-inner {
    transform: rotateY(180deg) translateY(-2px);
  }
`;

// styles for feast container


const EkTimeKaMenu = ({ meal, menuData, isFeast=false }) => {
  const { darkMode } = useTheme();
  const [flippedCards, setFlippedCards] = useState({});
  
  const items = menuData?.items?.map(item => item.name) || [];
  // const itemIDs = menuData?.items?.map(item => item._id) || [];
  const itemRatings = menuData?.items?.map(item => item.averageRating) || [];
  const itemRatingsCount = menuData?.items?.map(item => item.numberOfUsers) || [];

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
 
  const getFoodTypeIcon = (itemName) => {
    const nonVegItems = ['chicken', 'egg', 'omlette'];
    const isNonVeg = nonVegItems.some(item => 
      itemName.toLowerCase().includes(item)
    );
    
    return isNonVeg ? 
      <span className="h-2 w-2 rounded-full bg-red-500"></span> : 
      <span className="h-2 w-2 rounded-full bg-green-500"></span>;
  };

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = flipCardStyles;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);

  const formatItemName = (name) => {
    return name.replace(/\\/g, '\u200B\\');  // Adds zero-width space before each slash
  };

  const displayRating = (rating, count) => {
    // if (rating === 0) {
    //   return 'No ratings yet';
    // }
    const ratingText = rating.toFixed(1);
    return `${ratingText} ⭐ out of ${count} ratings`;
  };
  
  const getEmoji = (rating) => {
    if (rating >= 4.5) return '😍';
    else if (rating >= 4) return '😀';
    else if (rating >= 3) return '😐';
    else if (rating > 0) return '😞';
    return '';
  };

  const getTextColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500';
    else if (rating >= 4) return 'text-yellow-500';
    else if (rating >= 3) return 'text-orange-500';
    else if (rating > 0) return 'text-red-500';
    return 'text-gray-500';
  };

  // Add menuData to the dependency array of useEffect
  useEffect(() => {
    // Reset flipped cards whenever menuData changes
    setFlippedCards({});
  }, [menuData]);

  return (
    <div 
      className={`
        rounded-lg p-6 
        ${mealColors[meal]}
        ${isFeast ? `
          relative
          border-amber-500
          border-2
          ` : ''}
        max-w-2xl mx-auto
      `}
    >
  
    {isFeast && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-amber-300">
        ✨ Feast ✨
      </div>
    )}

      <div className="flex items-center justify-between mb-4 relative z-10"> 
        <h2 className="text-2xl font-bold capitalize flex items-center gap-2 dark:text-slate-600">
          {mealIcons[meal]} {meal}  
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 h-[400px] overflow-y-auto">
          {items.length > 0 ? (
            <ul className="space-y-3">
              {items.map((item, index) => (
                  <div
                    key={index}
                    className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
                    onClick={() => setFlippedCards(prev => ({...prev, [index]: !prev[index]}))}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front bg-white dark:bg-gray-800 p-4">
                        <div className="flex items-center">
                          <span className="font-medium text-sm sm:text-base dark:text-white flex items-center gap-2 w-full text-left">
                            {getFoodTypeIcon(item)} {getEmoji(itemRatings[index])}
                            <span className={`break-words ${getTextColor(itemRatings[index])}`}>{formatItemName(item)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flip-card-back bg-white dark:bg-gray-800 p-4">
                            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                              {displayRating(itemRatings[index], itemRatingsCount[index])}
                            </div>
                        </div>
                      </div>
                  </div>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No menu items available</p>
          )}
        </div>
      
      </div>
    </div>
  )
}
export default EkTimeKaMenu
