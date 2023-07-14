import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { CoreController } from './Core.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { UtilisateurSignalement } from '../../models/clm/utilisateur-signalement';

export class UtilisateurSignalementController extends CoreController {
	static async create(req: Request, res: Response): Promise<void> {
		const { signaleur_id, signale_id, description, statut, created_at, update_at } = req.body;
		// TODO check

		try {
			if (!(await Utilisateur.findByPk(signaleur_id))) {
				res.status(400).json({ message: 'Utilisateur signalant incorrect.' });
				return;
			}
			if (!(await Utilisateur.findByPk(signale_id))) {
				res.status(400).json({ message: 'Utilisateur signalé incorrect.' });
				return;
			}

			await UtilisateurSignalement.create({ ...req.body, created_at: new Date() });
			res.status(201).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async isReportedBySignaleurId(req: Request, res: Response): Promise<void> {
		const { signaleur_id, signale_id } = req.params;
		// TODO check

		try {
			if (!(await Utilisateur.findByPk(signaleur_id))) {
				res.status(400).json({ message: "L'utilisateur signalant est incorrect." });
				return;
			}
			if (!(await Utilisateur.findByPk(signale_id))) {
				res.status(400).json({ message: "L'utilisateur signalé est incorrect." });
				return;
			}

			const item = await UtilisateurSignalement.findOne({
				where: { signaleur_id, signale_id },
				include: { all: true, nested: true },
			});

			res.status(200).json({ data: { reported: item != null } });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	/**
	 * On update un signialment
	 * @param req
	 * @param res
	 * @returns
	 */
	static async SPupdateById(req: Request, res: Response): Promise<void> {
		const { id: signalement_personne_id } = req.params;
		const files = req.files;
		const { description, status, utilisateur_id, created_at, updated_at } = req.body;

		try {
			const signalement_personne = await UtilisateurSignalement.findByPk(req.params.id);

			if (!signalement_personne) {
				res.status(404).end();
				return;
			}

			signalement_personne.setAttributes({
				...req.body,
				created_at: signalement_personne.getDataValue('created_at'),
				updated_at: new Date(),
			});

			await signalement_personne.save();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	/**
	 * Get all pour afficher que les Ouvert ou fermer
	 */
	static async getAllByStatus(req: Request, res: Response) {
		try {
			const { status } = req.body;

			// Vérifier si le statut est fourni dans le corps de la requête
			if (!status) {
				res.status(400).json({ error: 'Le statut doit être fourni.' });
				return;
			}

			// Construire la condition de recherche en fonction des statuts fournis
			const whereCondition = {
				data: {
					[Op.in]: status,
				},
			};

			// Rechercher les signalements de personnes correspondant aux statuts
			const signalements = await UtilisateurSignalement.findAll({ where: whereCondition });

			res.status(200).json(signalements);
		} catch (error) {
			console.error('Erreur lors de la recherche des signalements de personnes :', error);
			res.status(500).json({ error: 'Erreur serveur lors de la recherche des signalements de personnes.' });
		}
	}
}
