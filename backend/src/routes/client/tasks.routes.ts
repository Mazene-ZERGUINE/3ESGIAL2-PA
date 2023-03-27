import { Router, Request, Response } from 'express';

const router: Router = Router();
const tasksController: any = require('../../controllers/client/TasksController');

router.post('/', tasksController.addNewTask);
router.get('/:category_id', tasksController.getAllTasksByCategory);

module.exports = router;
