import { Router, Request, Response } from 'express';
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
		(error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Internal server error',
					details: error,
				});
				throw error;
			}
			res.status(200).send({ status_code: 200, message: 'task succsufuly created' });
		},
	);
};

const getAllTasksByCategory = (req: Request, res: Response) => {
	const categoryId: number = parseInt(req.params.category_id);
	clientPool.query(tasksQueries.getOneByCategoryQuery, [categoryId], (error: Error, reslts: any) => {
		if (error) {
			res.status(501).json({
				error: 'Internal server error',
				details: error,
			});
			throw error;
		}
		res.status(200).send({ status_code: 200, tasks: reslts.rows });
	});
};

const getTaskMembers = (req: Request, res: Response) => {
	const categoryId: number = parseInt(req.params.category_id);
	clientPool.query(tasksQueries.getTaskMemenersQuery, [categoryId], (error: Error, result: any) => {
		if (error) {
			res.status(501).json({
				error: 'Internal server error',
				details: error,
			});
			throw error;
		}
		res.status(200).send({ status_code: 200, members: result.rows });
	});
};

module.exports = {
	addNewTask,
	getAllTasksByCategory,
	getTaskMembers,
};
