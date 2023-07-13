import { Request, Response } from 'express';
import { Op } from 'sequelize';
import * as fs from 'fs';

import { CoreController } from './Core.controller';
import { Publication } from '../../models/clm/publication';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Categorie } from '../../models/clm/categorie';
import { Status } from '../../enum/clm/status.enum';
import { Image } from '../../models/clm/image';

export class PublicationController extends CoreController {
	static async create(req: Request, res: Response): Promise<void> {
		const files = req.files;
		const { titre, description, statut, utilisateur_id, categorie_id } = req.body;
		// TODO check

		try {
			if (statut !== Status.active) {
				res.status(400).json({ message: 'Statut incorrect.' });
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: 'Utilisateur incorrect.' });
				return;
			}
			if (!(await Categorie.findByPk(categorie_id))) {
				res.status(400).json({ message: 'Catégorie incorrecte.' });
				return;
			}

			const publication = await Publication.create({
				titre,
				description,
				statut,
				utilisateur_id,
				categorie_id,
				created_at: new Date(),
				updated_at: null,
			});

			if (!files || !Array.isArray(files)) {
				res.status(201).end();
				return;
			}

			for (const file of files) {
				await Image.create({
					titre,
					libelle: file.originalname,
					lien: `${process.env.HOST}${process.env.PORT ? `:${process.env.PORT}` : ''}/${file.path}`,
					publication_id: publication.getDataValue('publication_id'),
				});
			}

			res.status(201).end();
		} catch (error) {
			if (Array.isArray(files)) {
				for (const file of files) {
					fs.unlink(file.path, (err) => console.error(err));
				}
			}

			CoreController.handleError(error, res);
		}
	}

	static async getAllActive(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const providedPage = page ? Number(page) : 1;

		try {
			const data = await Publication.findAndCountAll({
				offset: (providedPage - 1) * CoreController.PAGE_SIZE,
				limit: CoreController.PAGE_SIZE,
				where: { statut: Status.active },
				include: {
					all: true,
					nested: true,
				},
				order: [['publication_id', 'DESC']],
			});

			res.status(200).json({ data: data });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async search(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const { categorie_id, searches } = req.body;
		const providedPage = page ? Number(page) : 1;
		// TODO check
		// if (!searches || searches.length === 0) {
		// 	res.status(400).end();
		// 	return;
		// }

		try {
			let data;
			if (categorie_id) {
				data = await Publication.findAndCountAll({
					offset: (providedPage - 1) * CoreController.PAGE_SIZE,
					limit: CoreController.PAGE_SIZE,
					where: categorie_id <= 0 ? {} : { categorie_id },
					include: {
						all: true,
						nested: true,
					},
					order: [['created_at', 'DESC']],
					distinct: true,
				});

				res.status(200).json({ data });
				return;
			}

			data = await Publication.findAndCountAll({
				offset: (providedPage - 1) * CoreController.PAGE_SIZE,
				limit: CoreController.PAGE_SIZE,
				where: {
					[Op.or]: [
						{
							titre: {
								[Op.like]: {
									[Op.any]: searches.map((search: string) => `%${search}%`),
								},
							},
						},
						{
							description: {
								[Op.like]: {
									[Op.any]: searches.map((search: string) => `%${search}%`),
								},
							},
						},
					],
				},
				include: {
					all: true,
					nested: true,
				},
				order: [['created_at', 'DESC']],
				distinct: true,
			});

			res.status(200).json({ data });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async updateById(req: Request, res: Response): Promise<void> {
		const { id: publicationId } = req.params;
		const files = req.files;
		const { titre, description, statut, utilisateur_id, categorie_id, created_at, updated_at, removed_files } =
			req.body;
		// TODO check...

		try {
			const currentPublication = await Publication.findByPk(req.params.id);
			if (!currentPublication) {
				res.status(404).end();
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: 'Utilisateur incorrect.' });
				return;
			}
			if (!(await Categorie.findByPk(categorie_id))) {
				res.status(400).json({ message: 'Catégorie incorrecte.' });
				return;
			}

			if (!files || !Array.isArray(files)) {
				res.status(200).end();
				return;
			}

			if (typeof removed_files === 'string') {
				const image = await Image.findOne({ where: { libelle: removed_files, publication_id: publicationId } });
				if (image) {
					const path = image.getDataValue('lien').split('/uploads/publications/images/')[1];
					fs.unlink(`uploads/publications/images/${path}`, (err) => console.error(err));
					await image.destroy();
				}
			}
			if (Array.isArray(removed_files)) {
				for (const removedFile of removed_files) {
					console.log('removed file: ' + removedFile);
					const image = await Image.findOne({ where: { libelle: removedFile, publication_id: publicationId } });
					if (!image) {
						continue;
					}

					const path = image.getDataValue('lien').split('/uploads/publications/images/')[1];
					fs.unlink(`uploads/publications/images/${path}`, (err) => console.error(err));
					await image.destroy();
				}
			}

			for (const file of files) {
				await Image.create({
					titre,
					libelle: file.originalname,
					lien: `${process.env.HOST}${process.env.PORT ? `:${process.env.PORT}` : ''}/${file.path}`,
					publication_id: currentPublication.getDataValue('publication_id'),
				});
			}

			currentPublication.setAttributes({
				...req.body,
				utilisateur_id: currentPublication.getDataValue('utilisateur_id'),
				created_at: currentPublication.getDataValue('created_at'),
				updated_at: new Date(),
			});
			await currentPublication.save();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
