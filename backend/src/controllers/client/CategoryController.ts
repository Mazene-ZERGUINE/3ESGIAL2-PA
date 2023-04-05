import { Router, Request, Response } from 'express';
import Category from '../../models/client/Categories';

const clientPool: any = require('../../db/clientPool');
const categoriesQueries: any = require('../../queries/client/CategoriesQueries');

const getAllCategories = (req: Request, res: Response) => {
	clientPool.query(categoriesQueries.getAllQuery, (error: Error, results: any) => {
		if (error) {
			res.status(501).send('Internal server error' + error);
			return;
		}
		res.status(200).send({ categories: results.rows });
	});
};

const getOneCategorieById = (req: Request, res: any) => {
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.getOneQuery, [id], (error: Error, results: any) => {
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
		res.status(200).send({ categories: results.rows });
	});
};

const addNewCategory = (req: Request, res: Response) => {
	const { title, desciption } = req.body;
	clientPool.query(categoriesQueries.addNewCategoryQuery, [title, desciption], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Internal server error',
				details: error,
			});
			throw error;
		}
		res.status(200).send({ status_code: 200, messasge: 'category added' });
	});
};

const deleteCategory = (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.getOneById, [id], (error: Error, results: any) => {
		if (results.rows.length === 0) {
			res.status(404).json({ error: 'item not found' });
			return;
		}
		clientPool.query(categoriesQueries.deleteQuery, [id], (error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Internal server error',
					details: error,
				});
				return;
			}
			res.status(200).send({ status_code: 200, message: 'category deleted' });
		});
	});
};

const updateCategory = (req: Request, res: Response) => {
	const { title, desciption } = req.body;
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.getOneById, [id], (error: Error, results: any) => {
		if (results.rows.length === 0) {
			res.status(404).json({ error: 'item not found' });
			return;
		}
		clientPool.query(categoriesQueries.updateQuery, [title, desciption, id], (error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Internal server error',
					details: error,
				});
				return;
			}
			res.status(200).send({ status_code: 200, message: 'category updated' });
		});
	});
};

module.exports = {
	getAllCategories,
	getOneCategorieById,
	addNewCategory,
	deleteCategory,
	updateCategory,
};
