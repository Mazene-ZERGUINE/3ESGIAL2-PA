import { Router, Request, Response } from 'express';

const router: Router = Router();
const tasksController: any = require('../../controllers/client/TasksController');

router.post('/', tasksController.addNewTask);
router.get('/:category_id', tasksController.getAllTasksByCategory);
router.delete('/:task_id', tasksController.deleteTask);
router.post('/:task_id', tasksController.updateTaskStatus);

module.exports = router;
