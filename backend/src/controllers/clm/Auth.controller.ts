import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { Utilisateur } from '../../models/clm/utilisateur';
import { Argon2 } from '../../utils/clm/argon.utils';
import { Session } from '../../models/clm/session';
import { CoreController } from './Core.controller';

export class AuthController extends CoreController {
	static async logIn(req: Request, res: Response): Promise<void> {
		let { email: providedEmail, mot_de_passe } = req.body;

		// TODO email
		providedEmail = providedEmail.trim().toLowerCase();

		try {
			const utilisateur = await Utilisateur.findOne({ where: { email: providedEmail } });
			if (!utilisateur) {
				res.status(401).end();
				return;
			}

			const hashedPassword = utilisateur.getDataValue('mot_de_passe');
			if (!(await Argon2.verify(hashedPassword, mot_de_passe))) {
				res.status(401).end();
				return;
			}

			const apiKey = process.env.API_KEY as string;
			if (!apiKey) {
				throw new Error('Clé secrète manquante.');
			}

			const token = sign(
				{
					utilisateur_id: utilisateur.getDataValue('utilisateur_id'),
					pseudonyme: utilisateur.getDataValue('pseudonyme'),
				},
				apiKey,
			);

			await Session.create({
				token,
				utilisateur_id: utilisateur.getDataValue('utilisateur_id'),
			});

			res.status(200).json({ access_token: token });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async logOut(req: Request, res: Response): Promise<void> {
		// TODO to remove when the auth middleware is implemented
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			res.status(400).end();
			return;
		}

		try {
			const session = await Session.findOne({ where: { token } });
			if (!session) {
				res.status(404).end();
				return;
			}

			await session.destroy();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
