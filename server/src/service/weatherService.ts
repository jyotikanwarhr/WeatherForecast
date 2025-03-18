import dotenv from 'dotenv';
// import dayjs,{type Dayjs} from 'dayjs';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  name: string;
  state: string;
  country: string;
}
// TODO: Define a class for the Weather object
class Weather {
  // city: string;
  // date: Dayjs | string;
  tempF: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  iconDescription: string;
  constructor(

    // city: string,
    // date: Dayjs | string,
    tempF: number,
    feelsLike: number,
    humidity: number,
    windSpeed: number,
    iconDescription: string,
    icon: string
  ) {
   
    // this.city = city;
    // this.date = date;
    this.tempF = tempF;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // private baseURL : string = 'https://api.openweathermap.org/data/2.5/'; 

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() { 
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method

   private async fetchLocationData(query: string) {
   try {
    if (!this.baseURL || !this.apiKey) {
      throw new Error('Missing API key or base URL');
    }
    const response = await fetch(query)
    const data = await response.json();
    console.log("Line 63 Fetch location data", data);
    return data[0];
   } catch (error) {
     console.error(error);
     throw error;
   }
  }
  
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    if (!locationData) {
      throw new Error('Location data not found');
    }
    // console.log("Line 76 destructure location data",locationData);
    const { lat, lon, name, state, country } = locationData;
    const coordinates: Coordinates = { lat, lon, name, state, country };
    return coordinates;
   }
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    const geoCode = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;
    return geoCode;
   }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    return weatherQuery;
   }
  // TODO: Create fetchAndDestructureLocationData method 
  // did from here
   private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    // console.log("Line 95 - fetch and destructure location data", query);
    const locationData = await this.fetchLocationData(query);
    // console.log("Line 97",locationData);
    return this.destructureLocationData(locationData);
   }
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    // console.log("Line 102 Fetch weather data", query);
    const response = await fetch(query)
    // console.log("Line 104", response);
    const data = await response.json();
    return data;
   }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    // console.log("Line 111", response);
    const { tempF, feelsLike, humidity, windSpeed } = response.main;
    const { iconDescription, icon } = response.weather[0];
    return new Weather(tempF, feelsLike, humidity, iconDescription, icon, windSpeed);
   }

  //  city: string;
  // date: Dayjs | string;
  // tempF: number;
  // feelsLike: number;
  // humidity: number;
  // windSpeed: number;
  // icon: string;
  // iconDescription: string;
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any) {
    // console.log("Line 119", weatherData);
    const forecastArray: Weather[] = [currentWeather];
    for (let i = 1; i < 6; i++) {
      const { tempF, feelsLike, humidity, windSpeed } = weatherData.main;
      const { iconDescription, icon } = weatherData.weather[0];
      const weather = new Weather(tempF, feelsLike, humidity, iconDescription, icon, windSpeed);
      forecastArray.push(weather);
    }
    return forecastArray;
   }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    console.log(city);
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log("Line 150", weatherData);
    const currentWeather = this.parseCurrentWeather(weatherData);
    console.log("Line 134", currentWeather);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return forecastArray;
   }
}

export default new WeatherService();
