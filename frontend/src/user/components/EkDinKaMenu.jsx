import React, { useState, useEffect } from 'react';
import EkTimeKaMenu from './EkTimeKaMenu';
import { useNavigate } from 'react-router-dom';

const EkDinKaMenu = ({ day, date, isHome }) => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mealStates, setMealStates] = useState([null, null, null, null]);
  const navigation = useNavigate();

  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/user/menu`);
      const menu = await response.json();
      if (!menu) {
        navigation('/no-menu-available');
      }
      const dayMenu = menu.days[day].meals;
      setMenuData(dayMenu);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeastMenu = async (date, meal) => {
    try {
      const queryString = `date=${encodeURIComponent(date)}&meal=${encodeURIComponent(meal.toLowerCase())}`;
      console.log(queryString);
      const response = await fetch(`/api/user/feast?${queryString}`);
      // console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch feast menu");
      }
      const feastMenu = await response.json();
      console.log("fetchFeastMenu is returning this: ", feastMenu);
      return feastMenu;
    } catch (error) {
      console.error("Error fetching feast menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [day, date]);

  const getMealData = async (index) => {
    if (menuData[index].isFeast.status && menuData[index].isFeast.date === getFormattedDate(date)) {
      console.log("Fetching Date:", menuData[index].isFeast.date);
      try {
        const feast = await fetchFeastMenu(menuData[index].isFeast.date, menuData[index].name);
        console.log("getMealData is returning this: ", feast);
        return feast;
      } catch (error) {
        console.error("Error in getMealData:", error);
        return menuData[index]; // Fallback to regular menu if feast fetch fails
      }
    }
    return menuData[index];
  };

  useEffect(() => {
    const loadMeals = async () => {
      if (!loading && menuData) {
        const meals = await Promise.all([
          getMealData(0),
          getMealData(1),
          getMealData(2),
          getMealData(3)
        ]);
        setMealStates(meals);
      }
    };
    
    loadMeals();
  }, [menuData, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent dark:border-blue-400"></div>
      </div>
    );
  }

  // const getMealData = (index) => {
  //   if (menuData[index].isFeast.status && menuData[index].isFeast.date === getFormattedDate(date)) {
  //     console.log("Fetching Date:", menuData[index].isFeast.date);
  //     const feast = fetchFeastMenu(menuData[index].isFeast.date, menuData[index].name);
  //     console.log("getMealData is returning this: ", feast);
  //     return feast;
  //   }
  //   else return menuData[index];
  // };


  // Log what is being passed to EkTimeKaMenu
  console.log("Breakfast Data:", getMealData(0));
  console.log("Lunch Data:", getMealData(1));
  console.log("Snacks Data:", getMealData(2));
  console.log("Dinner Data:", getMealData(3));

  console.log("Breakfast isFeast:", menuData[0].isFeast.status);
  console.log("Lunch isFeast:", menuData[1].isFeast.status);
  console.log("Snacks isFeast:", menuData[2].isFeast.status);
  console.log("Dinner isFeast:", menuData[3].isFeast.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Menu
          </h1>
        </div>

        {/* <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <EkTimeKaMenu meal="breakfast" menuData={getMealData(0)} isFeast={menuData[0].isFeast.status && menuData[0].isFeast.date === getFormattedDate(date)} />
            </div>
            <div>
              <EkTimeKaMenu meal="lunch" menuData={getMealData(1)} isFeast={menuData[1].isFeast.status && menuData[1].isFeast.date === getFormattedDate(date)} />
            </div>
            <div>
              <EkTimeKaMenu meal="snacks" menuData={getMealData(2)} isFeast={menuData[2].isFeast.status && menuData[2].isFeast.date === getFormattedDate(date)} />
            </div>
            <div>
              <EkTimeKaMenu meal="dinner" menuData={getMealData(3)} isFeast={menuData[3].isFeast.status && menuData[3].isFeast.date === getFormattedDate(date)} />
            </div>
          </div>
        </div> */}
        <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <EkTimeKaMenu 
              meal="breakfast" 
              menuData={mealStates[0]} 
              isFeast={menuData[0].isFeast.status && menuData[0].isFeast.date === getFormattedDate(date)}
              isHome={isHome}
              // mealId={mealStates[0]?._id}
            />
          </div>
          <div>
            <EkTimeKaMenu 
              meal="lunch" 
              menuData={mealStates[1]} 
              isFeast={menuData[1].isFeast.status && menuData[1].isFeast.date === getFormattedDate(date)}
              isHome={isHome}
              // mealId={mealStates[1]?._id}
            />
          </div>
          <div>
            <EkTimeKaMenu 
              meal="snacks" 
              menuData={mealStates[2]} 
              isFeast={menuData[2].isFeast.status && menuData[2].isFeast.date === getFormattedDate(date)}
              isHome={isHome}
              // mealId={mealStates[2]?._id}
            />
          </div>
          <div>
            <EkTimeKaMenu 
              meal="dinner" 
              menuData={mealStates[3]} 
              isFeast={menuData[3].isFeast.status && menuData[3].isFeast.date === getFormattedDate(date)}
              isHome={isHome}
              // mealId={mealStates[3]?._id}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EkDinKaMenu;