import { Router } from 'express';

import { AuthController } from '../../controllers/clm/Auth.controller';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router.post('/log-in', AuthController.logIn).get('/log-out', isAuthenticated, AuthController.logOut);

export default router;
