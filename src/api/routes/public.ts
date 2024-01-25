import express from 'express';

import { PublicSubRoutes } from '../../types/enums';
import publicController from '../controllers/public';

const router = express.Router();

router.get(PublicSubRoutes.EXAMPLE, publicController.example);

export default router;
