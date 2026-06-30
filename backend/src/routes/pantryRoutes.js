import express from 'express';
import { checkPantry } from '../controllers/pantryController.js';

const router = express.Router();

router.post('/', checkPantry);

export default router;
