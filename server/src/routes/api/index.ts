import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';
router.use('/weather', weatherRoutes);
//import historyRoutes from './historyRoutes.js';

export default router;
