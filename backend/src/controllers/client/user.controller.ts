import { Request, Response } from 'express';
import { argon2id, hash, verify } from 'argon2';

import { Model } from '../../enum/model.enum';
import { createOne, getMany, getOneBy, removeOneBy, updateOneBy } from '../../utils/crud';
import { User } from '../../models/client/user.model';

const clientPool: any = require('../../db/clientPool');

const getUserById = (req: Request, res: any): void => {
	const id: number = parseInt(req.params.id);

	if (!id) {
		res.status(400).send('Bad request...');
		return;
	}

	clientPool.query(getOneBy(Model.clientUser, ['id']), [id], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'internal server error',
				details: error,
			});

			return;
		}

		if (results.rows.length === 0) {
			res.status(404).json({ error: 'item not found' });
			return;
		}

		res.status(200).send({ users: results.rows });
	});
};

const getAllUsers = (req: Request, res: Response): void => {
	clientPool.query(getMany(Model.clientUser), (error: Error, results: any) => {
		if (error) {
			res.status(501).send('Internal server error' + error);
			return;
		}

		res.status(200).json({ users: results.rows });
	});
};

const createUser = (req: Request, res: Response): void => {
	const { email, first_name, last_name, password } = req.body;
	type UserWithoutIdKey = Omit<User, 'id'>;

	const isOnePropertyInvalid = !email.trim() || !first_name.trim() || !last_name.trim() || !password.trim();
	if (isOnePropertyInvalid) {
		res.status(400).end();
	}

	clientPool.query(getOneBy(Model.clientUser, ['email']), [email], async (error: Error, results: any) => {
		if (error) {
			res.status(500).send('Internal server error ' + error);
			return;
		}

		if (results.rows.length >= 1) {
			res.status(400).json({ message: 'Utilisateur deja existant.' });
			return;
		}

		let hashedPassword: string;
		try {
			hashedPassword = await hash(password, { type: argon2id });
		} catch (e: any) {
			res.status(500).send('Internal server error: ' + e.message);
			return;
		}

		const userWithoutIdKey: UserWithoutIdKey = {
			email,
			first_name,
			last_name,
			password: hashedPassword,
			created_at: new Date(),
			updated_at: null,
		};

		const columns = Object.keys(userWithoutIdKey);
		const values = Object.values(userWithoutIdKey);
		clientPool.query(createOne(Model.clientUser, columns), values, (error: Error, _: any) => {
			if (error) {
				res.status(500).send('Internal server error ' + error);
				return;
			}

			res.status(201).end();
		});
	});
};

const updateUser = (req: Request, res: Response): void => {
	const { email: emailParam } = req.params;
	const { email, first_name, last_name, password } = req.body;
	type UserWithoutIdKey = Omit<User, 'id'>;

	const isOnePropertyInvalid = !email.trim() || !first_name.trim() || !last_name.trim() || password == null;
	if (isOnePropertyInvalid) {
		res.status(400).end();
		return;
	}

	clientPool.query(getOneBy(Model.clientUser, ['email']), [emailParam], async (error: Error, results: any) => {
		if (error) {
			res.status(500).send('Internal server error ' + error);
			return;
		}

		if (results.rows.length <= 0) {
			res.status(400).end();
			return;
		}

		const foundUser = results.rows[0];
		let isPasswordSame;
		let isPasswordValid = typeof password === 'string' && (password as string).length >= 1;
		if (isPasswordValid) {
			isPasswordSame = await verify(foundUser.password, password);
		}

		const shouldUpdateUser =
			email !== foundUser.email ||
			first_name !== foundUser.first_name ||
			last_name !== foundUser.last_name ||
			typeof password === 'string' ||
			!isPasswordSame;

		if (!shouldUpdateUser) {
			res.status(400).json({ message: 'Pas de mise à jour utilisateur à effectuer.' });
			return;
		}

		let hashedPassword = '';
		if (isPasswordValid) {
			try {
				hashedPassword = await hash(password, { type: argon2id });
			} catch (e: any) {
				res.status(500).send('Internal server error: ' + e.message);
				return;
			}
		}

		const userWithoutIdKey: UserWithoutIdKey = {
			email,
			first_name,
			last_name,
			password: !password ? foundUser.password : hashedPassword,
			created_at: foundUser.created_at,
			updated_at: new Date(),
		};
		const userColumns = Object.keys(userWithoutIdKey);
		const userValues = Object.values(userWithoutIdKey);
		const values = [emailParam, ...userValues];

		clientPool.query(updateOneBy(Model.clientUser, userColumns, ['email']), values, (error: Error, _: any) => {
			if (error) {
				res.status(500).send('Internal server error ' + error);
				return;
			}

			res.status(200).end();
		});
	});
};

const deleteUser = (req: Request, res: Response): void => {
	const { email } = req.params;

	if (!email.trim()) {
		res.status(400).json({ status_code: 400 });
		return;
	}

	clientPool.query(getOneBy(Model.clientUser, ['email']), [email], async (error: Error, results: any) => {
		if (results.rows.length <= 0) {
			res.status(400).end();
			return;
		}

		clientPool.query(removeOneBy(Model.clientUser, ['email']), [email], (error: Error, _: any) => {
			if (error) {
				res.status(500).json({
					error: 'Internal server error',
					details: error,
				});

				return;
			}

			return res.status(200).json({ status_code: 200, message: 'user successfully deleted' });
		});
	});
};

export const userController = {
	getOneUserById: getUserById,
	getAllUsers,
	createUser,
	deleteUser,
	updateUser,
};
