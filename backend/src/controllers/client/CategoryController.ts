import e, { Router, Request, Response } from 'express';
import Category from '../../models/client/Categories';

const clientPool: any = require('../../db/clientPool');
const categoriesQueries: any = require('../../queries/client/CategoriesQueries');

const getAllCategories = (req: Request, res: Response) => {
	clientPool.query(categoriesQueries.getAllQuery, (error: Error, results: any) => {
		if (error) {
			res.status(501).send('Erreur serveur interne.');
			return;
		}
		res.status(200).send({ status_code: 200, categories: results.rows });
	});
};

const getOneCategorieById = (req: Request, res: any) => {
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.getOneQuery, [id], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			return;
		}
		if (results.rows.length === 0) {
			res.status(404).json({ error: 'Aucun résultat.' });
			return;
		}
		res.status(200).send({ categories: results.rows });
	});
};

const addNewCategory = (req: Request, res: Response) => {
	const members: number[] = req.body.members;
	const { title, desciption } = req.body;
	clientPool.query(categoriesQueries.addNewCategoryQuery, [title, desciption], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne. ',
				details: error,
			});
			return;
		}
		members.forEach((member: number) => {
			clientPool.query(
				categoriesQueries.addProjectsMumbers,
				[results.rows[0].id, member],
				(error: Error, resuts: any) => {
					if (error) {
						res.status(501).json({
							error: 'Erreur serveur interne. ',
							details: error,
						});
						return;
					}
				},
			);
		});
	});
	res.status(200).send({ status_code: 200, messasge: 'Projet ajouté.' });
};

const deleteCategory = (req: Request, res: Response) => {
	console.log('ok');
	const id: number = parseInt(req.params.id_category);
	clientPool.query(categoriesQueries.deleteQuery, [id], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			return;
		}

		res.status(200).send({ status_code: 200, message: 'Projet supprimé.' });
	});
};

const updateCategory = (req: Request, res: Response) => {
	const { title, desciption } = req.body;
	const id: number = parseInt(req.params.id_category);
	const members: number[] = req.body.members;

	clientPool.query(categoriesQueries.getOneQuery, [id], (error: Error, results: any) => {
		if (results.rows.length === 0) {
			res.status(404).json({ error: 'Aucun résultat.' });
			return;
		}
		clientPool.query(categoriesQueries.updateQuery, [title, desciption, id], (error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Erreur serveur interne.',
					details: error,
				});
				return;
			}
			clientPool.query('DELETE FROM categories_members WHERE id_project = $1', [id], (error: Error, results: any) => {
				if (error) {
					res.status(501).json({
						error: 'Erreur serveur interne.',
						details: error,
					});
					console.log(error);
					return;
				}
				members.forEach((member: number) => {
					clientPool.query(categoriesQueries.addProjectsMumbers, [id, member], (error: Error, resuts: any) => {
						if (error) {
							res.status(501).json({
								error: 'Erreur serveur interne. ',
								details: error,
							});
							return;
						}
					});
				});
			});
		});
	});
	res.status(200).send({ status_code: 200, message: 'Projet mis à jour.' });
};

const getDevProjects = (req: Request, res: Response): void => {
	const userId = parseInt(req.params.user_id);
	clientPool.query(categoriesQueries.getUserProjectsQuery, [userId], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			console.log(error);
			return;
		}
		res.status(200).send({ projects: results.rows }).end();
	});
};

const projectMembers = (req: Request, res: Response) => {
	const id = req.params.cat_id;
	clientPool.query(categoriesQueries.allProjectQuery, [id], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			console.log(error);
			return;
		}
		res.status(200).send({ projects: results.rows }).end();
	});
};

module.exports = {
	getAllCategories,
	getOneCategorieById,
	addNewCategory,
	deleteCategory,
	updateCategory,
	getDevProjects,
	projectMembers,
};
