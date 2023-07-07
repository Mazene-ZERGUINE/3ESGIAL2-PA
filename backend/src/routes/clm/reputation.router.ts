import { Router } from 'express';
import { ReputationController } from '../../controllers/clm/Reputation.controller';
import { Reputation } from '../../models/clm/reputation';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/', ReputationController.coreGetAll(Reputation))
	.get('/:pseudonyme', ReputationController.getByPseudonyme)
	.post('/:pseudonyme', isAuthenticated, ReputationController.vote);

export default router;
