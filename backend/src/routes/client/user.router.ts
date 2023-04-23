import { Router } from 'express';
import { userController } from '../../controllers/client/user.controller';

const router: Router = Router();

router
	.get('/', userController.getAllUsers)
	.get('/:id', userController.getOneUserById)
	.post('/', userController.createUser);

export default router;
