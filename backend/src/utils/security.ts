import e, { Request, Response } from 'express';
import { argon2id, hash, verify } from 'argon2';

const nodemailer = require('nodemailer');

const clientPool: any = require('../db/clientPool');

export const recoverPassword = (req: Request, res: Response) => {
	const email = req.body.email;

	clientPool.query('SELECT id FROM client_user WHERE email = $1 ', [email], async (error: Error, results: any) => {
		if (error) {
			res.status(500).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			return;
		}
		if (results.rows.length === 0) {
			res.status(404).send({ status_code: 400, error: 'Aucun résultat.' });
			return;
		}
		const randomString = Math.random().toString(36).substring(2);

		const newPassword = await hash(randomString);

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: false,
			auth: {
				user: 'clm480416@gmail.com',
				pass: 'wyvigfqonzvghouv',
			},
		});
		console.log(email);
		const mailOptions = {
			from: 'clm480416@gmail.com',
			to: email,
			subject: 'Récupération de mot de passe ',
			text: `nouveau mot de passe: ${randomString} `,
		};

		// Send the email
		transporter.sendMail(mailOptions, (error: Error, info: any) => {
			if (error) {
				console.error('Error occurred while sending email:', error);
				res.status(500).send('An error occurred while sending the email.');
			} else {
				clientPool.query(
					'UPDATE client_user SET password = $1 WHERE email = $2',
					[newPassword, email],
					(error: Error, results: any) => {
						if (error) {
							console.error('Error occurred while sending email:', error);
							res.status(500).send('An error occurred while sending the email.');
							return;
						} else {
							res.status(200).send({ status_code: 200, message: 'password updated' });
						}
					},
				);
			}
		});
	});
};
