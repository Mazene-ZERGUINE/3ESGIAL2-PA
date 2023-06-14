import { Router } from 'express';
import { userController } from '../../controllers/client/user.controller';

const router: Router = Router();

router
	.get('/', userController.getAllUsers)
	.get('/:id', userController.getOneUserById)
	.post('/', userController.createUser)
	.put('/:email', userController.updateUser)
	.delete('/:email', userController.deleteUser)
	.post('/update_password/:user_id', userController.updatePassword);

export default router;
