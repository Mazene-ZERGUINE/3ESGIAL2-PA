import { Request, Response } from 'express';
import { verify } from 'argon2';

import { signInQuery } from '../../queries/client/sign-in-queries';
import { getOneBy } from '../../utils/crud';

const clientPool: any = require('../../db/clientPool');

const signIn = (req: Request, res: Response) => {
	const { email, password } = req.body;
	let isUserFound = false;

	clientPool.query(signInQuery.countUserByEmail(), [email], (error: Error, results: any) => {
		if (error) {
			res.status(500).send('Erreur serveur interne.');
			return;
		}

		isUserFound = results.rows[0]?.count >= 1;
		if (!isUserFound) {
			res.status(400).json({ error: 'Vos identifiants sont incorrects.' });
			return;
		}

		clientPool.query(getOneBy('client_user', ['email']), [email], async (error: Error, results: any) => {
			if (error) {
				res.status(500).send('Erreur serveur interne.');
				return;
			}

			const userPassword = results.rows[0].password;
			let isPasswordVerified = false;

			try {
				isPasswordVerified = await verify(userPassword, password);
				if (!isPasswordVerified) {
					res.status(400).json({ error: 'Vos identifiants sont incorrects.' });
					return;
				}

				res.status(204).end();
				return;
			} catch (e) {
				res.status(500).send('Erreur serveur interne.');
			}
		});
	});
};

export const signInController = {
	signIn,
};
