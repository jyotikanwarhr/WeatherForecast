import dotenv from 'dotenv';
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
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  constructor(

    temp: number,
    feelsLike: number,
    humidity: number,
    windSpeed: number,
    description: string,
    icon: string
  ) {
   
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.description = description;
    this.icon = icon;
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
    this.baseURL = process.env.API_baseURL || 'https://api.openweathermap.org';
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method

   private async fetchLocationData(query: string) {
   try {
    if (!this.baseURL || !this.apiKey) {
      throw new Error('Missing API key or base URL');
    }
    const response: Coordinates[] = await fetch(query).then((res) => res.json());
    return response[0];
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
    const { lat, lon, name, state, country } = locationData;
    const coordinates: Coordinates = { lat, lon, name, state, country };
    return coordinates;
   }
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    const geoCode = `${this.baseURL}/geocode/v1/json?q=${this.cityName}&limit=1&key=${this.apiKey}`;
    return geoCode;
   }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    return weatherQuery;
   }
  // TODO: Create fetchAndDestructureLocationData method 
  // did from here
   private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
   }
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query).then((res) => res.json());
    return response;
   }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    const { temp, feels_like, humidity, wind_speed } = response.current;
    const { description, icon } = response.current.weather[0];
    return new Weather(temp, feels_like, humidity, wind_speed, description, icon);
   }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [currentWeather];
    for (let i = 1; i < 6; i++) {
      const { temp, feels_like, humidity, wind_speed } = weatherData[i].daily;
      const { description, icon } = weatherData[i].daily.weather[0];
      const weather = new Weather(temp, feels_like, humidity, wind_speed, description, icon);
      forecastArray.push(weather);
    }
    return forecastArray;
   }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return forecastArray;
   }
}

export default new WeatherService();
