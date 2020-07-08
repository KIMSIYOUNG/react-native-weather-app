import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "3147da487cd903f92848f0c5f86f1eee";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [condition, setCondition] = useState(null);

  const getWeather = async (latitude, longitude) => {
    const { data: {
              main: { temp },
              weather
          }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    setIsLoading(false);
    setTemp(temp);
    setCondition(weather[0].main);
  }

  const requestLocation = async () => {
    try {
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
    }
    catch (error) {
      console.log("No Permission", "so sad");
    }
  }

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>
  );
}

export default App;