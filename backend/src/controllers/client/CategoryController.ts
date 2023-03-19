import { Router, Request, Response } from 'express';

const clientPool: any = require('../../db/clientPool');
const categoriesQueries: any = require('../../queries/client/CategoriesQueries');

const getAllCategories = (req: Request, res: Response) => {
	clientPool.query(categoriesQueries.getAllQuery, (error: Error, results: any) => {
		if (error) {
			res.status(501).send('Internal server error' + error);
			return;
		}
		res.status(200).json(results.rows);
	});
};

const getOneCategorieById = (req: Request, res: any) => {
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.getOneById, [id], (error: Error, results: any) => {
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
		res.status(200).json(results.rows);
	});
};

module.exports = {
	getAllCategories,
	getOneCategorieById,
};
