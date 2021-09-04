import express from 'express';
import publicController from '../controllers/public';

const router = express.Router();

router.get('/example', publicController.example);

export default router;
