import { Request, Response } from 'express';

import { CoreController } from './Core.controller';
import { Publication } from '../../models/clm/publication';
import { Utilisateur } from '../../models/clm/utilisateur';
import { PublicationSignalement } from '../../models/clm/publication_signalement';
import { ReportStatus } from '../../enum/clm/report-status.enum';
import * as Util from 'util';

export class PublicationSignalementController extends CoreController {
	static async create(req: Request, res: Response): Promise<void> {
		const { publication_id, utilisateur_id, description, statut } = req.body;
		// TODO check

		try {
			if (statut !== ReportStatus.open) {
				res.status(400).json({ message: 'Statut incorrect.' });
				return;
			}
			if (!(await Publication.findByPk(publication_id))) {
				res.status(400).json({ message: 'La publication est incorrecte.' });
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: "L'utilisateur est incorrect." });
				return;
			}
			if (await PublicationSignalement.findOne({ where: { publication_id, utilisateur_id } })) {
				res.status(409).json({ message: 'Publication déjà signalée.' });
				return;
			}

			await PublicationSignalement.create({ ...req.body, created_at: new Date() });
			res.status(201).end();
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}

	static async isReportedByUtilisateurId(req: Request, res: Response): Promise<void> {
		const { publication_id, utilisateur_id } = req.params;
		// TODO check

		try {
			if (!(await Publication.findByPk(publication_id))) {
				res.status(400).json({ message: 'La publication est incorrecte.' });
				return;
			}
			if (!(await Utilisateur.findByPk(utilisateur_id))) {
				res.status(400).json({ message: "L'utilisateur est incorrect." });
				return;
			}

			const item = await PublicationSignalement.findOne({
				where: { publication_id, utilisateur_id },
				include: { all: true, nested: true },
			});

			res.status(200).json({ data: { reported: item != null } });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
