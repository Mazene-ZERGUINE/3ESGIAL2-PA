import { Request, Response } from 'express';

import { CoreController } from './Core.controller';
import { Utilisateur } from '../../models/clm/utilisateur';

import { frenchDepartmentsData } from '../../utils/clm/data/french-departments.data';
import { Argon2 } from '../../utils/clm/argon.utils';

export class UtilisateurController extends CoreController {
	static async create(req: Request, res: Response): Promise<void> {
		const { email, mot_de_passe, pseudonyme, nom, prenom, departement, ville, role, statut } = req.body;

		try {
			if (await Utilisateur.findOne({ where: { email } })) {
				res.status(409).json({ message: 'Le mail existe déjà.' });
				return;
			}
			if (await Utilisateur.findOne({ where: { pseudonyme } })) {
				res.status(409).json({ message: 'Le pseudonyme existe déjà.' });
				return;
			}
			if (!(departement in frenchDepartmentsData)) {
				res.status(400).json({ message: "Le département n'existe pas." });
				return;
			}
			// TODO: role, statut...

			await Utilisateur.create({ ...req.body, mot_de_passe: await Argon2.hash(mot_de_passe) });
			res.status(201).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async getByPseudonyme(req: Request, res: Response): Promise<void> {
		const { pseudonyme } = req.params;

		try {
			const utilisateur = await Utilisateur.findOne({ where: { pseudonyme } });
			if (!utilisateur) {
				res.status(404).end();
				return;
			}

			res.status(200).json({ data: utilisateur });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async updateByPseudonyme(req: Request, res: Response): Promise<void> {
		const { email, mot_de_passe, pseudonyme, nom, prenom, departement, ville, role, statut } = req.body;
		const { pseudonyme: pseudonymeParam } = req.params;
		// TODO check pseudo...

		try {
			const currentUser = await Utilisateur.findOne({ where: { pseudonyme: pseudonymeParam } });
			if (!currentUser) {
				res.status(404).end();
				return;
			}

			const shouldChangeEmail = currentUser?.getDataValue('email') !== email;
			if (shouldChangeEmail) {
				if (await Utilisateur.findOne({ where: email })) {
					res.status(409).json({ message: 'Le mail existe déjà.' });
					return;
				}
			}

			const shouldChangePseudonyme = currentUser?.getDataValue('pseudonyme') !== pseudonyme;
			if (shouldChangePseudonyme) {
				if (await Utilisateur.findOne({ where: pseudonyme })) {
					res.status(409).json({ message: 'Le pseudonyme existe déjà.' });
					return;
				}
			}

			if (!(departement in frenchDepartmentsData)) {
				res.status(400).json({ message: "Le département n'existe pas." + departement });
				return;
			}

			// TODO: role, statut...
			const isPasswordSame = await Argon2.verify(currentUser?.getDataValue('mot_de_passe'), mot_de_passe);
			currentUser.setAttributes({
				...req.body,
				mot_de_passe: isPasswordSame ? currentUser?.getDataValue('mot_de_passe') : await Argon2.hash(mot_de_passe),
			});

			await currentUser.save();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
