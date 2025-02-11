import { Router } from 'express';
import { get } from 'node:http';
const router = Router();

 import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  WeatherService.getWeatherForCity(req.body.city)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

  // TODO: save city to search history
   HistoryService.addCity(req.body.city)
    .then((city) => {
      res.json(city);
    })
});

// TODO: GET search history
router.get('/history', async (req, res) => {HistoryService.getCities()});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
