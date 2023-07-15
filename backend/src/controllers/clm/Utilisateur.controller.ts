import { Request, Response } from 'express';
import { decode, sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

import { CoreController } from './Core.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { frenchDepartmentsData } from '../../utils/clm/data/french-departments.data';
import { Argon2 } from '../../utils/clm/argon.utils';
import { Publication } from '../../models/clm/publication';
import { Role } from '../../enum/clm/role.enum';
import { PublicationFavori } from '../../models/clm/publication_favori';
import { getSignupConfirmationEmailTemplate } from '../../utils/clm/sign-up-confirmation-email-template';

export class UtilisateurController extends CoreController {
	static async create(req: Request, res: Response): Promise<void> {
		const { token } = req.query;
		try {
			if (typeof token !== 'string') {
				res.status(400).end();
				return;
			}

			let decodedToken = decodeURIComponent(token);
			const apiKey: undefined | string = process.env.API_KEY;
			if (!apiKey) {
				throw new Error('Clé incorrecte.');
			}

			decodedToken = decodedToken?.trim();
			if (!decodedToken) {
				res.status(400).end();
				return;
			}

			const payload = verify(decodedToken, apiKey);
			const isPayloadInvalid = !payload || typeof payload === 'string';
			if (isPayloadInvalid) {
				res.status(401).end();
				return;
			}

			const { email, mot_de_passe, pseudonyme, nom, prenom, departement, ville, role, statut } = payload;
			if (!email || !mot_de_passe || !pseudonyme || !nom || !prenom || !departement || !ville || !role || !statut) {
				res.status(400).end();
				return;
			}
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
			// TODO check role, statut...

			await Utilisateur.create({
				email,
				mot_de_passe: await Argon2.hash(mot_de_passe),
				pseudonyme,
				nom,
				prenom,
				departement,
				ville,
				role,
				statut,
			});

			res.redirect(301, 'http://localhost:4200/login');
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async sendMailWithConfirmation(req: Request, res: Response): Promise<void> {
		const { email, mot_de_passe, pseudonyme, nom, prenom, departement, ville, role, statut } = req.body;
		if (!email || !mot_de_passe || !pseudonyme || !nom || !prenom || !departement || !ville || !role || !statut) {
			res.status(400).end();
			return;
		}
		// TODO check role, statut...

		try {
			const apiKey = process.env.API_KEY as string;
			if (!apiKey) {
				throw new Error('Clé secrète manquante.');
			}

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

			const token = sign({ email, mot_de_passe, pseudonyme, nom, prenom, departement, ville, role, statut }, apiKey);

			const transporter = createTransport({
				service: 'gmail',
				secure: false,
				auth: {
					user: 'clm480416@gmail.com',
					pass: 'wyvigfqonzvghouv',
				},
			});

			const mailOptions: MailOptions = {
				from: 'CLM <clm480416@gmail.com>',
				to: email,
				subject: "Confirmation d'inscription",
				html: getSignupConfirmationEmailTemplate({ prenom, token }),
			};

			await transporter.sendMail(mailOptions);
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async getAllFavoris(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const providedPage = page ? Number(page) : 1;
		const { pseudonyme: pseudonymeParam } = req.params;

		const token = decode(req.headers?.authorization?.split(' ')[1] as any);
		const utilisateur_id = (token as any)?.utilisateur_id;
		const pseudonyme = (token as any)?.pseudonyme;
		const role = (token as any)?.role;

		const isSameUser = pseudonyme === pseudonymeParam && Boolean(utilisateur_id);
		const isAuthorised = isSameUser || role === Role.administrator;
		if (!isAuthorised) {
			res.status(401).end();
			return;
		}

		try {
			const data = await PublicationFavori.findAndCountAll({
				offset: (providedPage - 1) * CoreController.PAGE_SIZE,
				limit: CoreController.PAGE_SIZE,
				where: { utilisateur_id },
				include: [
					{
						model: Publication,
						all: true,
						nested: true,
					},
				],
				order: [['created_at', 'DESC']],
				distinct: true,
			});

			res.status(200).json({ data });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async getAllPublications(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const providedPage = page ? Number(page) : 1;
		const { pseudonyme: pseudonymeParam } = req.params;

		const token = decode(req.headers?.authorization?.split(' ')[1] as any);
		const utilisateur_id = (token as any)?.utilisateur_id;
		const pseudonyme = (token as any)?.pseudonyme;
		const role = (token as any)?.role;

		const isSameUser = pseudonyme === pseudonymeParam && Boolean(utilisateur_id);
		const isAuthorised = isSameUser || role === Role.administrator;
		if (!isAuthorised) {
			res.status(401).end();
			return;
		}

		try {
			const items = await Publication.findAll({
				offset: (providedPage - 1) * CoreController.PAGE_SIZE,
				limit: CoreController.PAGE_SIZE,
				where: { utilisateur_id },
				order: [['created_at', 'DESC']],
			});

			res.status(200).json({ data: items });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async countAllPublications(req: Request, res: Response): Promise<void> {
		const { page } = req.query;
		const providedPage = page ? Number(page) : 1;
		const { pseudonyme: pseudonymeParam } = req.params;

		const token = decode(req.headers?.authorization?.split(' ')[1] as any);
		const utilisateur_id = (token as any)?.utilisateur_id;
		const pseudonyme = (token as any)?.pseudonyme;
		const role = (token as any)?.role;

		const isSameUser = pseudonyme === pseudonymeParam && Boolean(utilisateur_id);
		const isAuthorised = isSameUser || role === Role.administrator;
		if (!isAuthorised) {
			res.status(401).end();
			return;
		}

		try {
			const { count } = await Publication.findAndCountAll({ where: { utilisateur_id } });
			res.status(200).json({ data: count });
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async countAllPublicationsWithoutAuth(req: Request, res: Response): Promise<void> {
		const { pseudonyme } = req.params;

		try {
			const utilisateur = await Utilisateur.findOne({ where: { pseudonyme } });
			if (!utilisateur) {
				res.status(404).end();
				return;
			}

			const { count } = await Publication.findAndCountAll({
				where: { utilisateur_id: utilisateur.getDataValue('utilisateur_id') },
			});

			res.status(200).json({ data: count });
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

	static async updatePassword(req: Request, res: Response): Promise<void> {
		const { mot_de_passe } = req.body;
		const { pseudonyme: pseudonymeParam } = req.params;
		// TODO check

		try {
			const currentUser = await Utilisateur.findOne({ where: { pseudonyme: pseudonymeParam } });
			if (!currentUser) {
				res.status(404).end();
				return;
			}

			const shouldChangePassword = !(await Argon2.verify(currentUser?.getDataValue('mot_de_passe'), mot_de_passe));
			if (!shouldChangePassword) {
				res.status(400).json({ message: 'Le mot de passe est identique.' });
				return;
			}

			currentUser.set({ mot_de_passe: await Argon2.hash(mot_de_passe) });
			await currentUser.save();

			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async updateByPseudonyme(req: Request, res: Response): Promise<void> {
		const { email, pseudonyme, nom, prenom, departement, ville, role, statut } = req.body;
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
				if (await Utilisateur.findOne({ where: { email } })) {
					res.status(409).json({ message: 'Le mail existe déjà.' });
					return;
				}
			}

			const shouldChangePseudonyme = currentUser?.getDataValue('pseudonyme') !== pseudonyme;
			if (shouldChangePseudonyme) {
				if (await Utilisateur.findOne({ where: { pseudonyme } })) {
					res.status(409).json({ message: 'Le pseudonyme existe déjà.' });
					return;
				}
			}
			if (!(departement in frenchDepartmentsData)) {
				res.status(400).json({ message: "Le département n'existe pas." + departement });
				return;
			}

			// TODO: role, statut...
			currentUser.setAttributes({
				...req.body,
				mot_de_passe: currentUser?.getDataValue('mot_de_passe'),
			});

			await currentUser.save();
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
