import { Request, Response } from 'express';
import { signInQuery } from '../../queries/client/sign-in-queries';

const clientPool: any = require('../../db/clientPool');

const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	let isUserFound = false;

	await clientPool.query(signInQuery.findUser(), [email], (error: Error, results: any) => {
		if (error) {
			res.status(500).send('Internal server error' + error);
			return;
		}

		isUserFound = results.rows[0]?.count >= 1;
		if (!isUserFound) {
			res.status(400).json({ error: 'Vos identifiants sont incorrects.' });
			return;
		}

		clientPool.query(signInQuery.findUserWithEmailAndPassword(), [email, password], (error: Error, results: any) => {
			if (error) {
				res.status(500).send('Internal server error' + error);
				return;
			}

			isUserFound = results.rows[0]?.count >= 1;
			if (!isUserFound) {
				res.status(400).json({ error: 'Vos identifiants sont incorrects.' });
			} else {
				res.status(204).end();
			}
		});
	});
};

export const signInController = {
	signIn,
};
