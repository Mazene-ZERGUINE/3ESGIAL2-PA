import { Request, Response } from 'express';

import { CoreController } from './Core.controller';
import { Publication } from '../../models/clm/publication';
import { Commentaire } from '../../models/clm/commentaire';

export class CommentaireController extends CoreController {
	static async getByPublicationId(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const providedPage = page ? Number(page) : 1;

		const { publicationId } = req.params;
		// TODO check

		try {
			if (!(await Publication.findByPk(publicationId))) {
				res.status(404).end();
				return;
			}

			const data = await Commentaire.findAndCountAll({
				// offset: (providedPage - 1) * CoreController.PAGE_SIZE,
				// limit: CoreController.PAGE_SIZE,
				offset: (providedPage - 1) * 10,
				limit: 10,
				include: { all: true, nested: true },
				where: { publication_id: publicationId },
				order: [['created_at', 'DESC']],
				distinct: true,
			});

			res.status(200).json({ data });
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}
}
