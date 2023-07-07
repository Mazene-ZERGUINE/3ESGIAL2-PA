import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { CoreController } from './Core.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Reputation } from '../../models/clm/reputation';
import { sequelize } from '../../db/clm/db_connection';
import { where } from 'sequelize';

export class ReputationController extends CoreController {
	static async getByPseudonyme(req: Request, res: Response) {
		const { pseudonyme } = req.params;

		try {
			const utilisateur = await Utilisateur.findOne({ where: { pseudonyme } });
			if (!utilisateur) {
				res.status(404).end();
				return;
			}

			const reputation = await Reputation.findOne({
				attributes: [[sequelize.fn('SUM', sequelize.col('note')), 'reputation']],
				where: { evalue_id: utilisateur?.getDataValue('utilisateur_id') },
			});

			let value = reputation?.getDataValue('reputation');
			res.status(200).json({ data: { reputation: value == null ? 0 : +value } });
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}

	static async getVote(req: Request, res: Response) {
		const { pseudonyme, utilisateurId } = req.params;
		const token = decode(req.headers?.authorization!.split(' ')[1]);
		const utilisateur_id = (token as any)?.utilisateur_id;

		try {
			const votedUtilisateur = await Utilisateur.findOne({ where: { pseudonyme } });
			if (!votedUtilisateur) {
				res.status(400).json({ message: "L'utilisateur évalué est incorrect." });
				return;
			}

			const currentUtilisateur = await Utilisateur.findOne({ where: { utilisateur_id } });
			if (!currentUtilisateur) {
				res.status(401).end();
				return;
			}

			const reputation = await Reputation.findOne({
				where: {
					evaluateur_id: currentUtilisateur.getDataValue('utilisateur_id'),
					evalue_id: votedUtilisateur.getDataValue('utilisateur_id'),
				},
			});

			res.status(200).json({ data: reputation?.getDataValue('note') });
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}

	static async vote(req: Request, res: Response) {
		const { pseudonyme } = req.params;
		const token = decode(req.headers?.authorization!.split(' ')[1]);
		const utilisateur_id = (token as any)?.utilisateur_id;
		let { vote } = req.body;
		// TODO check

		if (vote === 0) {
			res.status(400).end();
			return;
		}

		try {
			const utilisateur = await Utilisateur.findOne({ where: { pseudonyme } });
			if (!utilisateur) {
				res.status(400).json({ message: "L'utilisateur évalué est incorrect." });
				return;
			}
			if (utilisateur_id === utilisateur.getDataValue('utilisateur_id')) {
				res.status(400).json({ message: 'Vous ne pouvez pas voter pour vous-même.' });
				return;
			}

			const reputation = await Reputation.findOne({
				where: {
					evaluateur_id: utilisateur_id,
					evalue_id: utilisateur.getDataValue('utilisateur_id'),
				},
			});

			let note = reputation?.getDataValue('note');
			note = note === undefined ? vote : note + vote;
			// if (vote <= -1) {
			// 	// vote = note <= -1 ? 0 : -1;
			// 	// note--
			// 	note = !note ? -1 : note--;
			// } else if (vote >= 1) {
			// 	// vote = note >= 1 ? 0 : 1;
			// 	// note++
			// 	note = !note ? 1 : note++;
			// }

			await Reputation.upsert({
				evaluateur_id: utilisateur_id,
				evalue_id: utilisateur.getDataValue('utilisateur_id'),
				note,
			});

			res.status(200).end();
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}
}
