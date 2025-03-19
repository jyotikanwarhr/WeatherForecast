Weather Dashboard

## Description

This is a full-stack weather dashboard application that allows users to search for a city and view its current and future weather conditions. The front end has already been created, and this project focuses on developing the back end, integrating the two, and deploying the complete application to Render.

## Technologies Used

Node.js

Express.js

OpenWeather API

File System (fs) Module

JSON for Data Storage

Render for Deployment

## User Story

As a traveler, I Want to see the weather outlook for multiple cities, So that I can plan a trip accordingly.


API Routes

HTML Route

GET * - Returns the index.html file.

Weather API Routes

GET /api/weather/history - Reads searchHistory.json and returns all saved cities as JSON.

POST /api/weather - Receives a city name in the request body, saves it with a unique ID, and returns associated weather data.

DELETE /api/weather/history/:id (Bonus) - Deletes a city from the search history.


description, screenshot, and deployment link.

Links

GitHub Repository: https://github.com/jyotikanwarhr/WeatherForecast

Live Deployment: http://localhost:3002/

OpenWeather API Documentation: https://openweathermap.org/api
