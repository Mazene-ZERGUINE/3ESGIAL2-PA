import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { Session } from '../../models/clm/session';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Role } from '../../enum/clm/role.enum';

export async function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const bearer: undefined | string = req.headers.authorization;
		const isBearerInvalid = !bearer || !bearer.startsWith('Bearer ');
		if (isBearerInvalid) {
			res.status(401).end();
			return;
		}

		const apiKey: undefined | string = process.env.API_KEY;
		if (!apiKey) {
			throw new Error('Clé incorrecte.');
		}

		const token: undefined | string = bearer?.split(' ')[1]?.trim();
		if (!token) {
			res.status(401).end();
			return;
		}

		const payload = verify(token, apiKey);
		const isPayloadInvalid = !payload || typeof payload === 'string';
		if (isPayloadInvalid) {
			res.status(401).end();
			return;
		}

		// if (payload['exp']) {
		// 	const isExpired = Date.now() >= payload['exp'] * 1000;
		// 	if (isExpired) {
		// 		res.status(401).end();
		// 		return;
		// 	}
		// }

		const pseudo = payload['pseudonyme'];
		if (!pseudo) {
			res.status(401).end();
			return;
		}

		if (!(await Utilisateur.findOne({ where: { pseudonyme: pseudo } }))) {
			res.status(401).end();
			return;
		}
		if (!(await Session.findOne({ where: { token } }))) {
			res.status(401).end();
			return;
		}

		next();
	} catch (error) {
		handleError(error, res);
	}
}

/**
 * ⚠️ The `isAuthenticated` middleware must be used before this one.
 * @param req
 * @param res
 * @param next
 * @see isAuthenticated
 */
export async function isAdministrator(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const apiKey: undefined | string = process.env.API_KEY;
		if (!apiKey) {
			throw new Error('Clé incorrecte.');
		}

		const payload = verify(req.headers.authorization?.split(' ')[1]?.trim() as string, apiKey);
		if (!payload) {
			throw new Error('Données incorrectes.');
		}

		const isPayloadInvalid = typeof payload === 'string';
		if (isPayloadInvalid) {
			res.status(401).end();
			return;
		}
		const pseudo = payload['pseudonyme'];
		if (!pseudo) {
			res.status(401).end();
			return;
		}

		const utilisateur = await Utilisateur.findOne({ where: { pseudonyme: pseudo } });
		if (utilisateur?.getDataValue('role') !== Role.administrator) {
			res.status(403).end();
			return;
		}

		next();
	} catch (error) {
		handleError(error, res);
	}
}

function handleError(error: any, res: Response) {
	console.error(error);
	res.status(500).json({ message: "Une erreur s'est produite. Réessayez plus tard." });
}
