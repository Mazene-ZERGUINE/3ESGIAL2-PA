import { Router } from 'express';
import { signInController } from '../../controllers/client/sign-in.controller';

const router: Router = Router();

router.post('/', signInController.signIn);

export default router;
