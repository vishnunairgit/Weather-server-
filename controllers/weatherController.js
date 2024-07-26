const axios = require('axios');
const Weather = require('../models/Weather');

// Fetch current weather from OpenWeatherMap
exports.fetchCurrentWeather = async (req, res) => {
  const city = req.query.city || 'Delhi';

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });
    const data = response.data;

    // Save weather data to the database
    const weather = new Weather({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
    await weather.save();

    // Respond with the weather data
    res.json(weather);
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
};

