import { argon2d, hash } from 'argon2';
import { Request, Response } from 'express';

const clientPool: any = require('../../db/clientPool');

export async function dbSync(req: Request, res: Response) {
	try {
		const users: any[] = req.body.users;
		const projects: any[] = req.body.projects;
		const tasks: any[] = req.body.tasks;
		let usersSyncQuery: string = '';
		if (users.length > 0) {
			usersSyncQuery = `INSERT INTO client_user (email, password, first_name, last_name, created_at, role) VALUES\n`;

			for (const user of users) {
				const { id, email, password, firstName, lastName, createdAt, role } = user;
				const hashPassword: string = await hash(password);
				const query: string = `('${email}', '${hashPassword}', '${firstName}', '${lastName}', '${createdAt}', '${role}'),\n`;
				usersSyncQuery += query;
			}

			const lastCommaIndex: number = usersSyncQuery.lastIndexOf(',');
			if (lastCommaIndex !== -1) {
				usersSyncQuery = usersSyncQuery.substring(0, lastCommaIndex) + ';';
			}
		}

		let projectsSyncQuery: string = '';
		if (projects.length > 0) {
			projectsSyncQuery = `INSERT INTO categories (title, desciption) VALUES\n`;

			for (const project of projects) {
				const { id, title, description } = project;
				const query: string = `('${title}', '${description}'),\n`;
				projectsSyncQuery += query;
			}

			const lastProjectIndex: number = projectsSyncQuery.lastIndexOf(',');
			if (lastProjectIndex !== -1) {
				projectsSyncQuery = projectsSyncQuery.substring(0, lastProjectIndex) + ';';
			}
		}

		const backupQuery: string = usersSyncQuery + projectsSyncQuery;

		if (backupQuery.length > 0) {
			clientPool.query(backupQuery, (error: Error, result: any) => {
				if (error) {
					res.status(500).json('Internal server error');
					console.log('err', error);
				} else {
					res.status(200).json('Database sync complete');
				}
			});
		} else {
			res.status(400).send('no data to sync');
		}
	} catch (error) {
		res.status(500).json('Internal server error');
		console.log('error', error);
	}
}
