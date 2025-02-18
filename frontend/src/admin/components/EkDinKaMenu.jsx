import React, { useState, useEffect } from 'react'
import EkTimeKaMenu from './EkTimeKaMenu'
import {useNavigate} from 'react-router-dom';

const EkDinKaMenu = ({ day,  date }) => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true); 
  // const breakfastId = menuData?.[0]?._id;
  // const lunchId = menuData?.[1]?._id;
  // const snacksId = menuData?.[2]?._id;
  // const dinnerId = menuData?.[3]?._id;
  const navigation = useNavigate();
  
  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };
  
  console.log("Date in EkDinKaMenu: ", getFormattedDate(date));
  
  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/user/menu`);
      const menu = await response.json();
      console.log("This is menu",menu);
      if(!menu){
        navigation('/no-menu-availible');
      }
      console.log("This is menu",menu);
      const dayMenu = menu.days[day].meals;
      console.log("This is dayMenu",dayMenu);
      setMenuData(dayMenu);
    } finally {
      setLoading(false);
    }
  }  

  const fetchFeastMenu = async (date, meal) => {
    try {
      const queryString = `date=${encodeURIComponent(date)}&meal=${encodeURIComponent(meal.toLowerCase())}`; 
      console.log("This is query string",queryString);
      const response = await fetch(`/api/user/feast?${queryString}`);
      if(!response.ok){
        throw new Error("Failed to fetch feast menu");
      }
      const feastMenu = await response.json();
      // console.log("This is feastMenu",feastMenu);
      return feastMenu;
    } catch(error){
      console.log("This is error  in fetching feast menu",error);
    }
      finally {
      setLoading(false);
    }
  } 
  
  useEffect(() => {
    fetchMenu()
  }, [day]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent dark:border-blue-400"></div>
      </div>
    )
  }

  const displayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const isFeast = menuData.some(meal => meal.isFeast.status === true && meal.isFeast.date === getFormattedDate(date));

  const breakfastData = () => {
    if(menuData[0].isFeast.status === true){
      const feastDate = menuData[0].isFeast.date;
      const currentDate = getFormattedDate(date);
      if(feastDate === currentDate){
        // fetch from /user/feast
        return fetchFeastMenu(feastDate, "breakfast");
      }
      
    }
    else{
      return menuData[0];
    }
  }

  const lunchData = () => {
    if(menuData[1].isFeast.status === true){
      const feastDate = menuData[1].isFeast.date;
      const currentDate = getFormattedDate(date);
      if(feastDate === currentDate){
        // fetch from /user/feast
        return fetchFeastMenu(feastDate, "lunch");
      }
    }
    else{
      return menuData[1];
    }
  }

  const snacksData = () => {
    if(menuData[2].isFeast.status === true){
      const feastDate = menuData[2].isFeast.date;
      const currentDate = getFormattedDate(date);
      if(feastDate === currentDate){
        // fetch from /user/feast
        return fetchFeastMenu(feastDate, "snacks");
      }
    }
    else{
      return menuData[2];
    }
  }

  const dinnerData = () => {
    if(menuData[3].isFeast.status == true){
      const feastDate = menuData[3].isFeast.date;
      const currentDate = getFormattedDate(date);
      console.log("I am in feast for dinner");
      if(feastDate === currentDate){
        // fetch from /user/feast
        const feast = fetchFeastMenu(feastDate, "dinner");
        return feast;
      }
    }
    else{
      console.log("I am NOT in feast for dinner");
      return menuData[3];
    }
  }

    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Menu
          </h1>
          {/* {isHome && <p className="text-gray-600 dark:text-gray-300 font-medium">{displayDate}</p>} */}
        </div>

        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            <div>
              {console.log("This is breakfast data",breakfastData())}
              <EkTimeKaMenu meal="breakfast"  menuData={breakfastData()}  isFeast={isFeast[0]} />
            </div>
            <div>
              {console.log("This is lunch data",lunchData())}
              <EkTimeKaMenu meal="lunch"  menuData={lunchData()}  isFeast={isFeast[1]}/>
            </div>
            <div>
              {console.log("This is snacks data",snacksData())}
              <EkTimeKaMenu meal="snacks"  menuData={snacksData()}  isFeast={isFeast[2]}/>
            </div>
            <div>
              {console.log("This is dinner data",dinnerData())}
              <EkTimeKaMenu meal="dinner"  menuData={dinnerData()}  isFeast={isFeast[3]}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EkDinKaMenu
