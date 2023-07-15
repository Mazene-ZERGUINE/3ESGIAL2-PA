import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

import { Utilisateur } from '../../models/clm/utilisateur';
import { Argon2 } from '../../utils/clm/argon.utils';
import { Session } from '../../models/clm/session';
import { CoreController } from './Core.controller';
import { Status } from '../../enum/clm/status.enum';
import { getResetPasswordEmailTemplate } from '../../utils/clm/reset-password-email-template';
import { getResetPasswordConfirmationEmailTemplate } from '../../utils/clm/reset-password-confirmation-email-template';

export class AuthController extends CoreController {
	static async logIn(req: Request, res: Response): Promise<void> {
		let { email: providedEmail, mot_de_passe } = req.body;

		// TODO email
		providedEmail = providedEmail?.trim().toLowerCase();

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
			if (utilisateur.getDataValue('statut') === Status.banned) {
				res.status(401).json({ message: 'Vous ne pouvez plus vous connecter.' });
				return;
			}

			const token = sign(
				{
					pseudonyme: utilisateur.getDataValue('pseudonyme'),
					utilisateur_id: utilisateur.getDataValue('utilisateur_id'),
					role: utilisateur.getDataValue('role'),
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
		try {
			const token = req.headers.authorization?.split(' ')[1];
			if (!token) {
				res.status(400).end();
				return;
			}

			const session = await Session.findOne({ where: { token } });
			if (session) {
				await session.destroy();
			}

			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async sendMailWithConfirmation(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		// TODO check

		try {
			const utilisateur = await Utilisateur.findOne({ where: { email } });
			if (!utilisateur) {
				res.status(400).end();
				return;
			}
			if (utilisateur.getDataValue('statut') === Status.banned) {
				res.status(401).json({ message: 'Vous ne pouvez plus changer le mot de passe.' });
				return;
			}

			const apiKey = process.env.API_KEY as string;
			if (!apiKey) {
				throw new Error('Clé secrète manquante.');
			}

			const token = sign(
				{
					pseudonyme: utilisateur.getDataValue('pseudonyme'),
					utilisateur_id: utilisateur.getDataValue('utilisateur_id'),
					role: utilisateur.getDataValue('role'),
				},
				apiKey,
			);

			await Session.create({
				token,
				utilisateur_id: utilisateur.getDataValue('utilisateur_id'),
			});

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
				subject: 'Confirmation de réinitialisation du mot de passe ',
				html: getResetPasswordConfirmationEmailTemplate({ prenom: utilisateur.getDataValue('prenom'), token }),
			};

			await transporter.sendMail(mailOptions);
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}

	static async sendMailWithPassword(req: Request, res: Response): Promise<void> {
		// const { email } = req.body;
		const { token } = req.query;
		if (typeof token !== 'string') {
			res.status(400).end();
			return;
		}

		try {
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

			const utilisateur_id = payload['utilisateur_id'];
			if (!utilisateur_id) {
				res.status(401).end();
				return;
			}

			const utilisateur = await Utilisateur.findOne({ where: { utilisateur_id } });
			if (!utilisateur) {
				res.status(400).end();
				return;
			}

			const randomPassword = Math.random().toString(36).substring(2);
			utilisateur.set({ mot_de_passe: await Argon2.hash(randomPassword) });
			await utilisateur.save();

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
				to: utilisateur.getDataValue('email'),
				subject: 'Réinitialisation du mot de passe ',
				html: getResetPasswordEmailTemplate({
					prenom: utilisateur.getDataValue('prenom'),
					mot_de_passe: randomPassword,
				}),
			};

			await transporter.sendMail(mailOptions);
			res.status(200).end();
		} catch (error) {
			CoreController.handleError(error, res);
		}
	}
}
