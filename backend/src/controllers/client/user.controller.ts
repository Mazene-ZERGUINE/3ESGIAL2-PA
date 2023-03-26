import { Request, Response } from 'express';
import { getMany, getOneById } from '../../utils/crud';

const clientPool: any = require('../../db/clientPool');

const getOneUserById = (req: Request, res: any): void => {
	const id: number = parseInt(req.params.id);

	if (!id) {
		res.status(400).send('Bad request...');
		return;
	}

	clientPool.query(getOneById('client_user'), [id], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'internal server error',
				details: error,
			});

			return;
		}

		if (results.rows.length === 0) {
			res.status(404).json({ error: 'item not found' });
			return;
		}

		res.status(200).send({ users: results.rows });
	});
};

const getAllUsers = (req: Request, res: Response): void => {
	clientPool.query(getMany('client_user'), (error: Error, results: any) => {
		if (error) {
			res.status(501).send('Internal server error' + error);
			return;
		}

		res.status(200).json({ users: results.rows });
	});
};

export const userController = {
	getOneUserById,
	getAllUsers,
};
