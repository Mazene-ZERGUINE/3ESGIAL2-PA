import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
const clientPool: any = require('../../db/clientPool');
const tasksQueries: any = require('../../queries/client/tasksQueries');

const addNewTask = (req: Request, res: Response) => {
	const { label, description, deadline, category_id, members } = req.body;
	var membersString: string = '';
	members.map((member: string) => (membersString += member + '\n'));
	const created_at = new Date();
	clientPool.query(
		tasksQueries.insertQuery,
		[category_id, label, description, deadline, created_at, null, 'TODO', membersString],
		(error: Error, results: any): Response => {
			if (error) {
				res.status(501).json({
					error: 'Internal server error',
					details: error,
				});
				throw error;
			}
			return res.status(200).send({ status_code: 200, message: 'task succsufuly created' });
		},
	);
};

const getAllTasksByCategory = (req: Request, res: Response): void => {
	const categoryId: number = parseInt(req.params.category_id);
	clientPool.query(tasksQueries.getOneByCategoryQuery, [categoryId], (error: Error, reslts: any): Response => {
		if (error) {
			res.status(501).json({
				error: 'Internal server error',
				details: error,
			});
			throw error;
		}
		return res.status(200).send({ status_code: 200, tasks: reslts.rows });
	});
};

const deleteTask = (req: Request, res: Response): void => {
	const taskId: number = parseInt(req.params.task_id);
	clientPool.query(tasksQueries.deleteQuery, [taskId], (error: Error, results: any): Response => {
		if (error) {
			res.status(501).json({
				error: 'Internal server error',
				details: error,
			});
			throw error;
		}
		return res.send({ status_code: 200, message: 'task deleted' });
	});
};

const updateTaskStatus = (req: Request, res: Response): void => {
	const taskId: number = parseInt(req.params.task_id);
	const { status } = req.body;
	clientPool.query(tasksQueries.updateStatusQuery, [status, taskId], (error: Error, result: any): void => {
		res.status(200).send({ status_code: 200, message: 'task updated' });
	});
};

module.exports = {
	addNewTask,
	getAllTasksByCategory,
	deleteTask,
	updateTaskStatus,
};
