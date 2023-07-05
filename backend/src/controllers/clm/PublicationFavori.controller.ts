import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { CoreController } from './Core.controller';
import { Publication } from '../../models/clm/publication';
import { Utilisateur } from '../../models/clm/utilisateur';
import { PublicationFavori } from '../../models/clm/publication_favori';

export class PublicationFavoriController extends CoreController {
	static async addStar(req: Request, res: Response) {
		const { publication_id } = req.body;
		const token = decode(req.headers?.authorization!.split(' ')[1]);
		const utilisateur_id = (token as any)?.utilisateur_id;

		try {
			if (!(await Publication.findByPk(publication_id))) {
				res.status(400).json({ message: 'La publication est incorrecte.' });
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: "L'utilisateur est incorrect." });
				return;
			}
			if (await PublicationFavori.findOne({ where: { publication_id, utilisateur_id } })) {
				res.status(409).json({ message: 'Publication déjà en favori.' });
				return;
			}

			await PublicationFavori.create({ publication_id, utilisateur_id });
			res.status(201).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async deleteStar(req: Request, res: Response) {
		const { publicationId } = req.params;
		// TODO check

		try {
			const token = decode(req.headers?.authorization!.split(' ')[1]);
			const utilisateur_id = (token as any)?.utilisateur_id;
			if (!utilisateur_id) {
				res.status(401).end();
				return;
			}
			if (!(await Publication.findByPk(publicationId))) {
				res.status(400).json({ message: 'La publication est incorrecte.' });
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: "L'utilisateur est incorrect." });
				return;
			}

			const publicationFavori = await PublicationFavori.findOne({
				where: {
					publication_id: publicationId,
					utilisateur_id,
				},
			});
			if (!publicationFavori) {
				res.status(400).json({ message: 'Publication déjà pas en favori.' });
				return;
			}

			await publicationFavori.destroy();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async getByPublicationId(req: Request, res: Response) {
		const { publicationId } = req.params;
		// TODO check

		try {
			if (!(await Publication.findByPk(publicationId))) {
				res.status(400).json({ message: 'La publication est incorrecte.' });
			}

			const publicationFavoris = await PublicationFavori.findAll({
				where: { publication_id: publicationId },
			});
			// if (publicationFavoris.length === 0) {
			// 	res.status(404).end();
			// 	return;
			// }

			const token = req.headers?.authorization?.split(' ')[1];
			const decodedToken = !token ? '' : decode(token);
			const utilisateur_id = (decodedToken as any)?.utilisateur_id;
			if (!utilisateur_id) {
				res.status(200).json({
					data: {
						count: publicationFavoris.length,
						liked: false,
					},
				});

				return;
			}

			const publicationFavori = await PublicationFavori.findOne({
				where: { publication_id: publicationId, utilisateur_id },
			});

			res.status(200).json({
				data: {
					count: publicationFavoris.length,
					liked: publicationFavori != null,
				},
			});
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
