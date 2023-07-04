import { Router } from 'express';

import { AuthController } from '../../controllers/clm/Auth.controller';

const router = Router();
router
	.post('/forgotten-password', AuthController.sendMailWithPassword)
	.post('/log-in', AuthController.logIn)
	.get('/log-out', AuthController.logOut);

export default router;
