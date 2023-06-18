import { CoreController } from './Core.controller';
import { Request, Response } from 'express';
import { Publication } from '../../models/clm/publication';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Categorie } from '../../models/clm/categorie';

export class PublicationController extends CoreController {
	static async updateById(req: Request, res: Response): Promise<void> {
		const { titre, description, statut, utilisateur_id, categorie_id, created_at, updated_at } = req.body;
		// TODO check...

		try {
			const currentPublication = await Publication.findByPk(req.params.id);
			if (!currentPublication) {
				res.status(404).end();
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: 'Utilisateur inexistant.' });
				return;
			}
			if (!(await Categorie.findByPk(categorie_id))) {
				res.status(400).json({ message: 'Catégorie inexistante.' });
				return;
			}

			currentPublication.setAttributes({ ...req.body, updated_at: new Date() });
			await currentPublication.save();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
