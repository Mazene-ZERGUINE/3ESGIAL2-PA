import { Router, Request, Response } from 'express';

const clientPool: any = require('../../db/clientPool');

const getAllCategories = (req: Request, res: Response) => {
	clientPool.query('SELECT * FROM categories', (error: Error, results: any) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

module.exports = {
	getAllCategories,
};
