import express from 'express';

import { SubRoutes } from '../../../types/enums';
import controllers from '../controllers/controllers';

const router = express.Router();

router.get(SubRoutes.PUBLIC, controllers.public);
router.get(SubRoutes.PROTECTED, controllers.protected);

export default router;
