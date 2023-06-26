import { Request, Response } from 'express';
import { Publication } from '../../models/clm/publication';
import { Utilisateur } from '../../models/clm/utilisateur';
import { CoreController } from './Core.controller';
import { PublicationAppreciation } from '../../models/clm/publication-appreciation';
import { decode } from 'jsonwebtoken';

export class PublicationAppreciationController extends CoreController {
	static async addLike(req: Request, res: Response) {
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
			if (await PublicationAppreciation.findOne({ where: { publication_id, utilisateur_id } })) {
				res.status(409).json({ message: 'Publication déjà aimée.' });
				return;
			}

			await PublicationAppreciation.create({ publication_id, utilisateur_id });
			res.status(201).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async deleteLike(req: Request, res: Response) {
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

			const publicationAppreciation = await PublicationAppreciation.findOne({
				where: {
					publication_id: publicationId,
					utilisateur_id,
				},
			});
			if (!publicationAppreciation) {
				res.status(400).json({ message: 'Publication déjà pas aimée.' });
				return;
			}

			await publicationAppreciation.destroy();
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

			const publicationAppreciations = await PublicationAppreciation.findAll({
				where: { publication_id: publicationId },
			});
			if (!publicationAppreciations) {
				res.status(404).end();
				return;
			}

			const token = req.headers?.authorization?.split(' ')[1];
			const decodedToken = !token ? '' : decode(token);
			const utilisateur_id = (decodedToken as any)?.utilisateur_id;
			if (!utilisateur_id) {
				res.status(200).json({
					data: {
						count: publicationAppreciations.length,
						liked: false,
					},
				});

				return;
			}

			const publicationAppreciation = await PublicationAppreciation.findOne({
				where: { publication_id: publicationId, utilisateur_id },
			});

			res.status(200).json({
				data: {
					count: publicationAppreciations.length,
					liked: publicationAppreciation != null,
				},
			});
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async getByIds(req: Request, res: Response) {
		const { publication_id, utilisateur_id } = req.body;

		try {
			const publicationAppreciation = await PublicationAppreciation.findOne({
				where: { publication_id, utilisateur_id },
			});

			if (!publicationAppreciation) {
				res.status(400).end();
				return;
			}

			res.status(200).json({ data: publicationAppreciation });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
