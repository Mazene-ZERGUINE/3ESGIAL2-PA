import { Router, Request, Response } from 'express';

const router: Router = Router();
const tasksController: any = require('../../controllers/client/TasksController');

router.post('/', tasksController.addNewTask);

module.exports = router;
