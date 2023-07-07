import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { CoreController } from './Core.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Reputation } from '../../models/clm/reputation';
import { sequelize } from '../../db/clm/db_connection';

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

			if (vote <= -1) {
				vote = reputation?.getDataValue('note') <= -1 ? 0 : -1;
			} else if (vote >= 1) {
				vote = reputation?.getDataValue('note') >= 1 ? 0 : 1;
			}

			await Reputation.upsert({
				evaluateur_id: utilisateur_id,
				evalue_id: utilisateur.getDataValue('utilisateur_id'),
				note: vote,
			});

			res.status(200).end();
		} catch (err) {
			CoreController.handleError(err, res);
		}
	}
}
