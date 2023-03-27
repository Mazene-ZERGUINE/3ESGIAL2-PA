import { Router, Request, Response } from 'express';
const clientPool: any = require('../../db/clientPool');
const tasksQueries: any = require('../../queries/client/tasksQueries');

const addNewTask = (req: Request, res: Response) => {
	console.log(req.body);
	const { label, description, deadline, category_id } = req.body;
	const created_at = new Date();
	clientPool.query(
		tasksQueries.insertQuery,
		[category_id, label, description, deadline, created_at, null, 'TODO'],
		(error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Internal server error',
					details: error,
				});
				throw error;
			}
			const membersId: number[] = req.body.members;
			membersId.map((id: number) => {
				clientPool.query(tasksQueries.insertMemebersQuery, [id, results.rows[0].taskid], (error: Error, res: any) => {
					if (error) {
						throw error;
					}
				});
			});
			res.status(200).send({ status_code: 200, message: 'task succsufuly created' });
		},
	);
};

module.exports = {
	addNewTask,
};
