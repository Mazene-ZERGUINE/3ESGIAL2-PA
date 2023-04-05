import { Router, Request, Response } from 'express';

const router: Router = Router();
const tasksController: any = require('../../controllers/client/TasksController');

router.post('/', tasksController.addNewTask);
router.get('/:category_id', tasksController.getAllTasksByCategory);
router.delete('/:task_id', tasksController.deleteTask);
router.get('/:task_id/task', tasksController.getTaskById);
router.put('/:task_id/update', tasksController.updateTask);

module.exports = router;
