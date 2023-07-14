import { Router } from 'express';

import { AuthController } from '../../controllers/clm/Auth.controller';

const router = Router();
router
	.post('/log-in', AuthController.logIn)
	.get('/log-out', AuthController.logOut)
	.post('/forgotten-password/confirmation', AuthController.sendMailWithConfirmation)
	.get('/forgotten-password/reset', AuthController.sendMailWithPassword);

export default router;
