import { CoreController } from './Core.controller';
import { Request, Response } from 'express';
import { Session } from '../../models/clm/session';
import { Status } from '../../enum/clm/status.enum';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Categorie } from '../../models/clm/categorie';
import { Publication } from '../../models/clm/publication';
import { Image } from '../../models/clm/image';
import { Commentaire } from '../../models/clm/commentaire';
import fs from 'fs';

export class CommentaireController extends CoreController {
	//On doit afficher les commentaire en fonction du poste,
	static async getByIdPublication(req: Request, res: Response): Promise<void> {
		try {
			const publicationId: string = req.params.publication_id;
			const commentaires: Commentaire[] = await Commentaire.findAll({ publication_id: publicationId });

			if (!commentaires) {
				res.status(400).end();
				return;
			}

			res.status(200).json(commentaires);
		} catch (error) {
			res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.', error });
		}
	}
}
