import { Router } from 'express';

import { AuthController } from '../../controllers/clm/Auth.controller';

const router = Router();
router.post('/log-in', AuthController.logIn).get('/log-out', AuthController.logOut);

export default router;
